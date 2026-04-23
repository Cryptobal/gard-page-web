# Setup · Google Search Console Indexing API via Cowork

Ejecutor del script `/scripts/automations/gsc-indexing-submit.ts`: avisa a
Google que hay URLs nuevas/modificadas para que las recrawlee fuera del
ciclo normal (que suele tardar días o semanas).

Está diseñado para correr como **cron nightly en Cowork** (u otro runner
que soporte Node 20+). No requiere librerías externas: usa `crypto`
built-in y `fetch` nativos.

---

## Quota

- **200 URLs/día** por defecto (ajustable vía env var `GSC_INDEXING_MAX_PER_RUN`).
- Google recomienda usar Indexing API solo para URLs tipo `JobPosting` o
  `BroadcastEvent` oficialmente, pero en la práctica funciona para
  cualquier URL que Google pueda recrawlear. Si Google endurece la
  política, hay que volver al sitemap ping tradicional.

---

## Requisitos previos (una sola vez)

1. **Crear service account**
   - Google Cloud Console → APIs & Services → Credentials → Create Credentials → Service Account.
   - Dar nombre descriptivo: `gsc-indexing-gardcl`.
   - Descargar el JSON key (`credentials.json`).

2. **Habilitar Indexing API**
   - Google Cloud Console → APIs & Services → Library → "Indexing API" → Enable.

3. **Otorgar permiso de Owner en Search Console**
   - Search Console → Settings → Users and permissions → Add user.
   - Email: el `client_email` del service account.
   - Role: **Owner** (el Indexing API solo acepta Owner, no Full ni Restricted).

4. **Configurar env vars en Cowork (o donde corras el job)**

   ```bash
   export GSC_SERVICE_ACCOUNT_EMAIL="gsc-indexing-gardcl@<project>.iam.gserviceaccount.com"
   export GSC_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   export GSC_INDEXING_MAX_PER_RUN=200            # opcional
   export GSC_INDEXING_DRY_RUN=false              # "true" para simular sin POST
   ```

   Importante: el `private_key` del JSON tiene `\n` escapados. Al copiarlo
   a la env var, mantené los `\n` literales — el script los convierte a
   newlines reales antes de firmar.

---

## Input: `lib/data/recently-updated.json`

Array de objetos `{ url, type, reason? }`:

```json
[
  {
    "url": "https://www.gard.cl/santiago/guardias-de-seguridad",
    "type": "URL_UPDATED",
    "reason": "Gold-standard template shipped"
  },
  {
    "url": "https://www.gard.cl/blog/nuevo-post-2026",
    "type": "URL_UPDATED",
    "reason": "New blog post"
  }
]
```

Types válidos:
- `URL_UPDATED` — la URL existe y cambió contenido.
- `URL_DELETED` — la URL ya no existe (hay que sacar del índice).

---

## Ejecución

### Manual local (una vez)

```bash
pnpm dlx tsx scripts/automations/gsc-indexing-submit.ts
```

O con env prefixado:

```bash
GSC_INDEXING_DRY_RUN=true pnpm dlx tsx scripts/automations/gsc-indexing-submit.ts
```

El dry run imprime la lista de URLs que se enviarían sin hacer POST.

### Nightly en Cowork

Workflow sugerido (pseudocódigo):

```
schedule: every day at 03:00 UTC (23:00 hora Chile)
  steps:
    - git pull origin main
    - pnpm install --frozen-lockfile
    - pnpm dlx tsx scripts/automations/gsc-indexing-submit.ts
    - if log indica errores > 3: notificar en Slack
```

Priorización de envío recomendada (el script respeta el orden del array):
1. Nuevos posts de blog
2. Páginas modificadas en las últimas 24h
3. Páginas estáticas renovadas (ej. re-deploy)

---

## Output

- **stdout**: resumen `X ok / Y errores / Z total`.
- **Archivo de log**: `cowork-logs/gsc-indexing-<timestamp>.json` con el
  resultado por URL (status, retries, error si aplica). Este directorio
  no se trackea en git (ver `.gitignore`).
- **Exit code**: 0 si todo ok, 1 si alguna URL falló de forma persistente.

---

## Errores frecuentes

| HTTP | Causa típica | Qué hacer |
|---|---|---|
| 401 | Service account no es Owner del property | Volver al paso 3 del setup |
| 403 | Indexing API no habilitada | Paso 2 del setup |
| 429 | Quota excedida | Bajar `GSC_INDEXING_MAX_PER_RUN` o esperar 24h |
| 400 | URL inválida o no pertenece al property verificado | Revisar `recently-updated.json` |

---

## Monitoreo semanal

Despu
és de 7-14 días corriendo nightly, chequear en Search Console:

- **Páginas → Indexación**: ¿sube la cantidad de URLs indexadas?
- **Rendimiento → Páginas nuevas**: ¿aparecen antes en impresiones?

Si la indexación no mejora, el problema no es el API sino el contenido
(thin content, duplicación, etc.).

---

## Relación con el plan

Implementa **Tarea 4.4** de `docs/SEO_OVERHAUL_PLAN.md` y
`docs/EJECUTAR.md` (FASE 4 · Tuning técnico).
