# Setup · Google Search Console Indexing API

Notifica a Google cuándo hay URLs nuevas/modificadas para que las recrawlee
fuera del ciclo normal (que puede tardar días o semanas).

Ejecutor: `scripts/automations/gsc-indexing-submit.ts`. Library-free,
usa `node:crypto` + `fetch` nativos.

---

## Opciones de ejecución

| Runner | Recomendado cuando | Setup |
|---|---|---|
| **GitHub Actions** (default) | Tenés el repo en GitHub y querés versionado automático | Ver sección "Setup GitHub Actions" abajo |
| **Vercel Cron** | Preferís que sea parte del stack existente | Ver sección "Setup Vercel Cron" |
| **Cowork nightly** | Ya usás Cowork para otras tareas | Ver sección "Setup Cowork" |

---

## Requisitos previos (una sola vez, independiente del runner)

1. **Crear service account**
   - [Google Cloud Console → IAM & Admin → Service Accounts → Create](https://console.cloud.google.com/iam-admin/serviceaccounts/create)
   - Name: `gsc-indexing-gardcl`.
   - Role: **ninguno** (no necesita permisos IAM).
   - Done.

2. **Habilitar APIs en Google Cloud**
   - [Indexing API](https://console.cloud.google.com/apis/library/indexing.googleapis.com) → Enable (submit de URLs).
   - [Google Search Console API](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com) → Enable (export semanal de keywords vía `pnpm run gsc-analytics`).

3. **Descargar credentials JSON**
   - En el service account recién creado → Keys → Add key → Create new key → JSON.
   - Se descarga `credentials.json`. **Guardalo con cuidado, contiene el `private_key`.**

4. **Otorgar permiso Owner en Search Console**
   - [Search Console](https://search.google.com/search-console) → property `www.gard.cl` → Settings → Users and permissions → Add user.
   - Email: el `client_email` del service account (ej: `gard-gsc@maps-v1-453322.iam.gserviceaccount.com`).
   - Role: **Owner** (requerido por Indexing API; no acepta Full ni Restricted).

---

## Setup GitHub Actions (opción recomendada)

### Paso 1: Cargar secrets en el repo

1. GitHub → `Cryptobal/gard-page-web` → **Settings → Secrets and variables → Actions → New repository secret**.
2. Crear estos dos:

   | Name | Value |
   |---|---|
   | `GSC_SERVICE_ACCOUNT_EMAIL` | El `client_email` del JSON (ej: `gard-gsc@maps-v1-453322.iam.gserviceaccount.com`) |
   | `GSC_SERVICE_ACCOUNT_KEY` | El valor **completo** del campo `private_key` del JSON, con `\n` literales: `-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n` |

   Importante: pegá el `private_key` tal cual viene en el JSON. Los `\n`
   son literales de texto (2 caracteres `\` + `n`), no newlines. El script
   los convierte a newlines reales antes de firmar.

### Paso 2: Workflow

El workflow ya está en `.github/workflows/gsc-indexing.yml`. Corre:
- **Automáticamente**: cada día a las 03:00 UTC (23:00 Chile).
- **Manual**: en la pestaña "Actions" del repo → "GSC Indexing API cron" → "Run workflow".

Los logs se suben como artifact `gsc-indexing-log` con retención de 30 días.

### Paso 3: Verificación

Primera vez: apenas cargues los secrets, disparar manualmente via **Actions → GSC Indexing API cron → Run workflow**. Con `recently-updated.json` vacío el job sale OK pero imprime "No hay URLs para enviar. Saliendo." — esa es la señal de éxito.

---

## Setup Vercel Cron (alternativa)

Si preferís que sea parte de la aplicación Vercel en vez de GitHub Actions:

1. Vercel Dashboard → project → **Settings → Environment Variables**.
2. Agregar los mismos dos: `GSC_SERVICE_ACCOUNT_EMAIL` y `GSC_SERVICE_ACCOUNT_KEY`.
3. Scope: **Production** solo (no en Preview/Development).
4. Hay que agregar al repo:
   - Una API route Protected: `app/api/cron/gsc-indexing/route.ts` que invoque `runGscIndexing()` del script.
   - Entry en `vercel.json`:
     ```json
     "crons": [
       { "path": "/api/cron/gsc-indexing", "schedule": "0 3 * * *" }
     ]
     ```
   - Protección por `CRON_SECRET` env var (ver docs Vercel Cron).

Avisame si querés que arme este wiring.

---

## Setup Cowork (alternativa, como decía el plan original)

1. Env vars en Cowork:
   ```bash
   export GSC_SERVICE_ACCOUNT_EMAIL="gsc-indexing-gardcl@<project>.iam.gserviceaccount.com"
   export GSC_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   export GSC_INDEXING_MAX_PER_RUN=200            # opcional
   export GSC_INDEXING_DRY_RUN=false              # "true" para simular sin POST
   ```

2. Workflow Cowork sugerido (pseudocódigo):

   ```
   schedule: every day at 03:00 UTC
     steps:
       - git pull origin main
       - pnpm install --frozen-lockfile
       - pnpm run gsc-indexing
       - if log indica errores > 3: notificar en Slack
   ```

---

## Verificación local (una sola vez, antes de confiar en el runner)

```bash
# Terminal nueva, sin history shared.
export GSC_SERVICE_ACCOUNT_EMAIL="gard-gsc@maps-v1-453322.iam.gserviceaccount.com"
export GSC_SERVICE_ACCOUNT_KEY="$(jq -r .private_key ~/Desktop/credentials.json)"

# Dry run (no hace POST real a Google):
GSC_INDEXING_DRY_RUN=true pnpm run gsc-indexing

# Real (con URLs en lib/data/recently-updated.json):
pnpm run gsc-indexing
```

El `jq -r` extrae el `private_key` con newlines reales desde el JSON.
El script acepta tanto newlines reales como `\n` escapados.

---

## Input · `lib/data/recently-updated.json`

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

Priorización recomendada (el script respeta el orden del array):
1. Nuevos posts de blog.
2. Páginas modificadas en las últimas 24h.
3. Páginas estáticas renovadas tras re-deploy.

---

## Output

- **stdout**: resumen `X ok / Y errores / Z total`.
- **Artifact / log**: `cowork-logs/gsc-indexing-<timestamp>.json` con
  resultado por URL (status, retries, error si aplica).
  - GitHub Actions: se sube como artifact con retención 30 días.
  - Cowork/Vercel: queda en el filesystem del runner (configurable).
- **Exit code**: 0 si todo ok, 1 si alguna URL falló de forma persistente.

---

## Errores frecuentes

| HTTP | Causa típica | Qué hacer |
|---|---|---|
| 401 | Service account no es Owner del property | Volver al paso 4 del setup |
| 403 | Indexing API no habilitada | Paso 2 del setup |
| 429 | Quota excedida (200/día por default) | Bajar `GSC_INDEXING_MAX_PER_RUN` o esperar 24h |
| 400 | URL inválida o no pertenece al property verificado | Revisar `recently-updated.json` |
| `DECODER routines::unsupported` | `GSC_SERVICE_ACCOUNT_KEY` mal pegada en GitHub Secrets | Regenerar secret con `jq -r .private_key credentials.json` y correr `pnpm run gsc-verify` localmente antes de guardar |

---

## Monitoreo semanal

Después de 7-14 días corriendo cron, chequear en Search Console:

- **Páginas → Indexación**: ¿sube la cantidad de URLs indexadas?
- **Rendimiento → Páginas nuevas**: ¿aparecen antes en impresiones?

Si la indexación no mejora, el problema no es el API sino el contenido
(thin content, duplicación, etc.).

---

## Verificación HTML (meta tag)

Si la propiedad aún no está verificada, o querés redundancia DNS + HTML:

1. GSC → **Settings → Ownership verification → HTML tag**.
2. Copiá solo el valor del atributo `content=` (sin comillas).
3. En Vercel → **Environment Variables** → `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Production).
4. Redeploy. El tag se inyecta vía `app/metadata.ts`.

---

## Export semanal de keywords (Search Analytics API)

- Script: `scripts/automations/gsc-search-analytics-export.ts`
- Comando: `pnpm run gsc-analytics`
- Workflow: `.github/workflows/gsc-analytics-weekly.yml` (lunes 04:00 UTC)
- Output: `docs/seo-baseline-latest.md` + artifact `gsc-analytics-report`

Usa los mismos secrets `GSC_SERVICE_ACCOUNT_*` que el Indexing API cron.

---

## Checklist GSC completo (manual en dashboard)

| Item | Dónde | Estado |
|------|--------|--------|
| Property `https://www.gard.cl/` verificada | Settings → Ownership | Manual |
| Sitemap enviado | Sitemaps → Add `https://www.gard.cl/sitemap.xml` | Manual (ya en robots.txt) |
| Geo-target Chile | Legacy tools → International Targeting | Manual |
| GA4 vinculado (`G-4XJ2YKYYDH`) | Settings → Associations | Manual |
| Indexing API cron | GitHub Actions → GSC Indexing API cron | ✅ Configurado |
| Analytics export semanal | GitHub Actions → GSC Search Analytics export | ✅ Nuevo |
| Meta verification tag | Vercel env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Pendiente token |


- **200 URLs/día** por defecto (ajustable vía env var `GSC_INDEXING_MAX_PER_RUN`).
- Google recomienda oficialmente usar Indexing API solo para URLs tipo
  `JobPosting` o `BroadcastEvent`, pero en la práctica funciona para
  cualquier URL del property verificado. Si Google endurece la política,
  se vuelve al sitemap ping tradicional.

---

## Relación con el plan

Implementa **Tarea 4.4** de `docs/SEO_OVERHAUL_PLAN.md` y `docs/EJECUTAR.md`.
