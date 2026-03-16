#!/bin/bash
# Script para subir imágenes OPAI a Cloudflare Images
# Requiere: CLOUDFLARE_API_TOKEN con permiso "Images Edit"
# Account ID: e56e6231ebbfb3edd31e85df0a7092bc

set -e

ACCOUNT_ID="e56e6231ebbfb3edd31e85df0a7092bc"
API_URL="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1"

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "Error: Define CLOUDFLARE_API_TOKEN con un token que tenga permiso 'Images Edit'"
  echo "Crea el token en: https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Usar node para parsear JSON si está disponible
parse_id() {
  local json="$1"
  if command -v node &>/dev/null; then
    echo "$json" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);console.log(j.success&&j.result?j.result.id:'')});"
  else
    echo "$json" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4
  fi
}

echo "Subiendo opai-hero-blog-1200x630.png..."
HERO_RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -F "file=@${PROJECT_ROOT}/public/blog/opai-hero-blog-1200x630.png")

HERO_ID=$(parse_id "$HERO_RESPONSE")
if [ -n "$HERO_ID" ]; then
  echo "  Hero image ID: $HERO_ID"
else
  echo "  Error: $HERO_RESPONSE"
  exit 1
fi

echo ""
echo "Subiendo opai-linkedin-1080x1080.png..."
LINKEDIN_RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -F "file=@${PROJECT_ROOT}/public/blog/opai-linkedin-1080x1080.png")

LINKEDIN_ID=$(parse_id "$LINKEDIN_RESPONSE")
if [ -n "$LINKEDIN_ID" ]; then
  echo "  LinkedIn image ID: $LINKEDIN_ID"
else
  echo "  Error: $LINKEDIN_RESPONSE"
  exit 1
fi

echo ""
echo "=== IDs para actualizar el blog post OPAI ==="
echo "Hero (og:image + hero): $HERO_ID"
echo "Destacada (contenido):  $LINKEDIN_ID"
echo ""
echo "Actualiza docs/blog_posts/opai-erp-inteligencia-artificial-seguridad-privada-chile.md:"
echo "  imageId: \"$HERO_ID\""
echo "  heroGradient: false  (eliminar o cambiar a false)"
echo ""
echo "Y agrega la imagen destacada en el contenido con CloudflareImage id: $LINKEDIN_ID"
