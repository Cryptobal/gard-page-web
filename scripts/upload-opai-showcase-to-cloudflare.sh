#!/usr/bin/env bash
# Sube las 6 capturas anonimizadas de OPAI (showcase para landings/SEO) a
# Cloudflare Images y parchea automáticamente los IDs en
# `lib/data/opai-images.ts`.
#
# Requisitos:
#   - CLOUDFLARE_API_TOKEN con permiso "Cloudflare Images:Edit" en el account
#     e56e6231ebbfb3edd31e85df0a7092bc
#   - Carpeta ./opai-images-anonimizadas/ con los 6 PNG (nombres exactos).
#
# Uso:
#   CLOUDFLARE_API_TOKEN=xxxx ./scripts/upload-opai-showcase-to-cloudflare.sh
#
# El script es idempotente: si los IDs ya están puestos en opai-images.ts
# distintos a "PENDING_UPLOAD", reintenta igual y los reemplaza con los
# nuevos IDs retornados por Cloudflare.

set -euo pipefail

ACCOUNT_ID="e56e6231ebbfb3edd31e85df0a7092bc"
API_URL="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="${PROJECT_ROOT}/opai-images-anonimizadas"
TARGET_TS="${PROJECT_ROOT}/lib/data/opai-images.ts"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Error: define CLOUDFLARE_API_TOKEN con permiso 'Cloudflare Images:Edit'." >&2
  echo "Crea el token en https://dash.cloudflare.com/profile/api-tokens" >&2
  exit 1
fi

if [[ ! -d "$IMAGES_DIR" ]]; then
  echo "Error: no existe $IMAGES_DIR" >&2
  exit 1
fi

if [[ ! -f "$TARGET_TS" ]]; then
  echo "Error: no existe $TARGET_TS" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: se requiere Node.js para parsear la respuesta JSON." >&2
  exit 1
fi

# filename -> clave TS usada en OPAI_IMAGES
declare -a ENTRIES=(
  "opai-portal-cliente-dashboard.png|portalCliente"
  "opai-mapa-rondas-operacion.png|mapaRondas"
  "opai-portal-supervisor.png|portalSupervisor"
  "opai-portal-control-acceso.png|portalControlAcceso"
  "opai-portal-guardia.png|portalGuardia"
  "opai-pauta-mensual-erp.png|pautaMensualErp"
)

parse_id() {
  node -e '
    let d = "";
    process.stdin.on("data", c => d += c);
    process.stdin.on("end", () => {
      try {
        const j = JSON.parse(d);
        if (j.success && j.result && j.result.id) {
          console.log(j.result.id);
        } else {
          console.error("Respuesta Cloudflare sin id:", JSON.stringify(j.errors || j));
          process.exit(2);
        }
      } catch (e) {
        console.error("Respuesta no-JSON:", d);
        process.exit(3);
      }
    });
  '
}

echo "Subiendo 6 capturas OPAI a Cloudflare Images (account ${ACCOUNT_ID})..."
echo ""

for entry in "${ENTRIES[@]}"; do
  FILE_NAME="${entry%%|*}"
  TS_KEY="${entry##*|}"
  FILE_PATH="${IMAGES_DIR}/${FILE_NAME}"

  if [[ ! -f "$FILE_PATH" ]]; then
    echo "  Skippeado (no existe): $FILE_NAME" >&2
    continue
  fi

  printf "  Subiendo %-40s -> " "$FILE_NAME"

  RESPONSE=$(curl -sS -X POST "$API_URL" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F "file=@${FILE_PATH}" \
    -F "metadata={\"source\":\"opai-showcase-2026\",\"slug\":\"${TS_KEY}\"}")

  NEW_ID=$(echo "$RESPONSE" | parse_id) || {
    echo "FAIL" >&2
    echo "$RESPONSE" >&2
    exit 1
  }

  echo "$NEW_ID"

  # Patch in-place el id del objeto `TS_KEY` en lib/data/opai-images.ts.
  # Matchea: `<TS_KEY>: {\n    id: "<algo>",` y reemplaza el id.
  node - "$TARGET_TS" "$TS_KEY" "$NEW_ID" <<'NODE_EOF'
const fs = require("fs");
const [, , file, key, newId] = process.argv;
const src = fs.readFileSync(file, "utf8");
// Captura: `<key>: {\n    id: "<anything>",`
const re = new RegExp(
  `(${key}:\\s*\\{\\s*\\n\\s*id:\\s*)"[^"]*"`
);
if (!re.test(src)) {
  console.error(`No se encontró la clave '${key}' en ${file}`);
  process.exit(4);
}
const out = src.replace(re, `$1"${newId}"`);
fs.writeFileSync(file, out);
NODE_EOF

done

echo ""
echo "Listo. IDs actualizados en: $TARGET_TS"
echo ""
echo "Verifica con:  git diff -- $TARGET_TS"
