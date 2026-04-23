#!/bin/bash
# Script para subir las 10 fotos reales de guardias Gard (abril 2026) a Cloudflare Images.
# Requiere: CLOUDFLARE_API_TOKEN con permiso "Images Edit".
# Account ID: e56e6231ebbfb3edd31e85df0a7092bc
#
# Genera: scripts/guardias-fotos-ids.json con el mapping clave_logica -> cloudflare_id.

set -u

ACCOUNT_ID="e56e6231ebbfb3edd31e85df0a7092bc"
API_URL="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUT_JSON="${SCRIPT_DIR}/guardias-fotos-ids.json"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "${PROJECT_ROOT}/.env.local" ]; then
  TOKEN_LINE=$(grep -E '^CLOUDFLARE_API_TOKEN=' "${PROJECT_ROOT}/.env.local" | head -1 | cut -d'=' -f2-)
  if [ -n "$TOKEN_LINE" ]; then
    export CLOUDFLARE_API_TOKEN="$TOKEN_LINE"
    echo "Token cargado desde .env.local"
  fi
fi

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "Error: Define CLOUDFLARE_API_TOKEN con permiso 'Images Edit'."
  echo "Crea el token en https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi

SRC_DIR="/Users/caco/Library/CloudStorage/GoogleDrive-carlos.irigoyen@gard.cl/Mi unidad/Marketing/Foto Guardias"

# orden | archivo_local | nombre_cloudflare | clave_logica
MAPPING=(
  "Cambio de imagen Abr 23 2026 (6).png|guardia-hombre-bodega-logistica|guardia_logistica"
  "Cambio de imagen abr 23 2026 (7).png|equipo-guardias-bandera-chilena-corporativo|equipo_home"
  "Cambio de imagen abr 23 2026 (8).png|guardia-mujer-recepcion-corporativo|recepcion_mujer"
  "Cambio de imagen abr 23 2026 (9).png|equipo-guardias-edificio-patrimonial-panoramico|panoramico_patrimonial"
  "Cambio de imagen abr 23 2026 (10).png|guardia-mujer-garita-acceso-vehicular|acceso_vehicular"
  "Cambio de imagen abr 23 2026 (11).png|guardia-mujer-chaleco-reflectante-industrial|industrial_reflectante"
  "Cambio de imagen abr 23 2026 (12).png|guardia-hombre-gorra-edificio-residencial|residencial_gorra"
  "ChatGPT Imagen Abr 23 2026 Edición UI (1).png|guardia-recepcion-lobby-premium-cctv|lobby_premium"
  "ChatGPT Imagen Abr 23 2026 Edición UI (2).png|guardia-institucional-atacama-norte|institucional_norte"
  "ChatGPT Imagen Abr 23 2026 Edición UI.png|guardia-mujer-garita-industrial-barrera|industrial_garita"
)

parse_id() {
  local json="$1"
  if command -v node &>/dev/null; then
    printf '%s' "$json" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);console.log(j.success&&j.result?j.result.id:'')}catch(e){console.log('')}});"
  else
    printf '%s' "$json" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4
  fi
}

upload_one() {
  local file_path="$1"
  local cf_name="$2"
  local attempt=1
  local max=3
  local resp=""
  while [ $attempt -le $max ]; do
    resp=$(curl -sS -X POST "$API_URL" \
      -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      -F "file=@${file_path}" \
      -F "metadata={\"name\":\"${cf_name}\"}")
    local id
    id=$(parse_id "$resp")
    if [ -n "$id" ]; then
      echo "$id"
      return 0
    fi
    echo "  [intento $attempt] fallo subir '${cf_name}': $resp" >&2
    attempt=$((attempt+1))
    sleep 1
  done
  return 1
}

echo "Subiendo 10 fotos de guardias a Cloudflare Images..."
echo "Directorio origen: $SRC_DIR"
echo ""

declare -a KEYS
declare -a IDS

for entry in "${MAPPING[@]}"; do
  IFS='|' read -r FILENAME CF_NAME LOGIC_KEY <<< "$entry"
  FULL_PATH="${SRC_DIR}/${FILENAME}"
  if [ ! -f "$FULL_PATH" ]; then
    echo "Error: no existe el archivo '${FULL_PATH}'" >&2
    exit 1
  fi
  echo "-> ${LOGIC_KEY} (${FILENAME})"
  CF_ID=$(upload_one "$FULL_PATH" "$CF_NAME") || {
    echo "Upload falló para ${LOGIC_KEY}. Deteniendo." >&2
    exit 1
  }
  echo "   id: $CF_ID"
  KEYS+=("$LOGIC_KEY")
  IDS+=("$CF_ID")
done

echo ""
echo "Escribiendo ${OUT_JSON}..."
{
  echo "{"
  for i in "${!KEYS[@]}"; do
    SEP=","
    if [ "$i" -eq $(( ${#KEYS[@]} - 1 )) ]; then SEP=""; fi
    printf '  "%s": "%s"%s\n' "${KEYS[$i]}" "${IDS[$i]}" "$SEP"
  done
  echo "}"
} > "$OUT_JSON"

echo ""
echo "✅ Listo. Mapping guardado en: ${OUT_JSON}"
cat "$OUT_JSON"
