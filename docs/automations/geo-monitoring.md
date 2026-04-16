# GEO Monitoring — Citations en Perplexity, ChatGPT y Claude

## Objetivo

Monitorear semanalmente si Gard Security aparece como fuente citada cuando gerentes B2B preguntan a un asistente IA sobre seguridad privada en Chile. Fuentes: Perplexity, ChatGPT (con web search), Claude (con web search).

## Por qué importa

Los gerentes de operaciones y compras B2B cada vez más inician research en asistentes IA antes de Google tradicional. Si Gard Security no aparece en esas respuestas, perdemos oportunidad de consideración en la etapa más temprana del funnel B2B.

## Queries monitoreadas (12)

### Alto valor comercial (6)
1. "Cuál es la mejor empresa de seguridad privada en Chile para empresas"
2. "Empresas de seguridad privada B2B en Chile"
3. "Cómo contratar guardias de seguridad para una empresa en Chile"
4. "Ranking empresas de seguridad privada Chile 2026"
5. "Cuánto cuesta contratar guardias de seguridad para una empresa en Chile"
6. "Empresa de seguridad privada Santiago Chile para oficinas corporativas"

### Validación de brand (2)
7. "Gard Security Chile opiniones"
8. "Gard Security vs Prosegur"

### Vertical por industria (2)
9. "Mejores empresas de guardias de seguridad para minería en Chile"
10. "Seguridad para centros de distribución y bodegas Chile"

### Diferenciadores (2)
11. "Qué empresa de seguridad privada en Chile tiene 100% de guardias con certificación OS10"
12. "Alternativas a empresas multinacionales de seguridad privada en Chile"

## APIs y costos estimados

| API | Modelo | Costo por query | Costo semanal (12×) | Costo anual |
|-----|--------|----------------|---------------------|-------------|
| Perplexity | sonar-pro | ~$0.02 | ~$0.24 | ~$12 |
| OpenAI | gpt-4o-search-preview | ~$0.03 | ~$0.36 | ~$19 |
| Anthropic | claude-sonnet-4-6 + web_search | ~$0.05 | ~$0.60 | ~$31 |
| **Total 3 APIs** | | | **~$1.20/semana** | **~$62/año** |

## Cadencia

- **Ejecución**: cada domingo 3:00 AM CLT (America/Santiago)
- **Reporte**: lunes 9:00 AM disponible en `reports/geo-monitoring/YYYY-MM-DD/`

## Formato de output

Por cada ejecución se genera:

1. **`results.csv`** — una fila por (query × api) con columnas:
   - `timestamp`, `query_id`, `category`, `api`, `model`
   - `brand_mentioned` (bool), `brand_position_pct` (0-100)
   - `has_brand_citation` (bool), `total_citations`
   - `competitors_mentioned` (lista), `brand_excerpt`
   - `response_preview` (primeros 300 chars), `error`

2. **`results.json`** — todo lo anterior en JSON con raw API responses

3. **`summary.md`** — reporte ejecutivo markdown con:
   - Tabla por API (% queries mencionan Gard)
   - Lista de queries donde SÍ aparece (con extracto)
   - Lista de queries donde NO aparece (con competidores citados)
   - Frecuencia de competidores
   - Cambios vs semana anterior (si existe)

## Alertas automáticas

En el resumen semanal, si se detecta:
- **Caída del 20%+ en menciones** vs semana anterior → ALERT al tope del archivo
- **Competidor nuevo ganando terreno** (aparece en 3+ queries más que Gard) → ALERT
- **API con 0 menciones 2 semanas seguidas** → oportunidad destacada

## Implementación

Ver scripts stub en `scripts/automations/geo-monitoring/`. NO ejecutar desde este repo — portar a Cowork como automation recurrente.

## Setup en Cowork

1. Crear carpeta `~/gard-geo-monitoring/` (fuera del repo)
2. Copiar `scripts/automations/geo-monitoring/` al folder de Cowork
3. Configurar `.env.local` con API keys:
   - `PERPLEXITY_API_KEY`
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
4. Ejecutar baseline manual: `node scripts/run-all.js`
5. Configurar recurring task en Cowork: "cada domingo 3am CLT"

## Ownership

- **Implementación inicial**: setup scripts stub en repo (este commit)
- **Ejecución**: Cowork en Mac del owner (Carlos)
- **Review semanal**: Carlos, lunes 9-10am CLT

## Próximas iteraciones

- v1.1: agregar queries de competencia directa contra páginas `/vs/*`
- v1.2: enviar resumen automático a Slack/email via Cowork connector
- v2.0: comparar output semana a semana con diff visual (win/loss tracking)
