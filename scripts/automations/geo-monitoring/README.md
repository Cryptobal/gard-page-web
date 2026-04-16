# GEO Monitoring Scripts — Stub para Cowork

Este directorio contiene scripts de scaffolding NO ejecutables desde este repo.

## Portar a Cowork

```bash
# Desde Mac del owner:
cp -r scripts/automations/geo-monitoring ~/gard-geo-monitoring
cd ~/gard-geo-monitoring

# Crear config
mkdir -p config
cat > config/.env.local << 'ENVEOF'
PERPLEXITY_API_KEY=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
ENVEOF

# Instalar deps
npm init -y
npm install dotenv

# Ejecutar baseline
node run-all.js
```

## Estructura

- `queries.json` — 12 queries a monitorear + brand terms + competitors
- `README.md` — este archivo
- Scripts de query por API: ver prompt de Cowork (no incluidos en este repo)

Ver documentación completa en `docs/automations/geo-monitoring.md`.
