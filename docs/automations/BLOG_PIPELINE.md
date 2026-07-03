# BLOG_PIPELINE — Rutina remota de generación de contenido SEO/GEO para gard.cl

> **Contexto de ejecución:** rutina remota de Claude Code en la nube de Anthropic. El repo `Cryptobal/gard-page-web` ya está clonado; trabajas desde su raíz. No necesitas clonar nada.
> **Modo:** 100% autónomo. Si un guardrail bloquea, NO publiques y termina reportando el motivo — eso es un resultado correcto.
> **Cierre obligatorio v1:** SIEMPRE terminar en **Pull Request**. Prohibido hacer merge a `main`. (Cuando Carlos apruebe 3 corridas consecutivas, él cambiará esta regla.)
> **Principio rector:** calidad > cadencia. Un post mediocre daña más que no publicar.

## Variables de entorno esperadas (configuradas en el entorno cloud "Gard Web")

- `CF_IMAGES_TOKEN` — token de Cloudflare con permisos **Workers AI: Read** (generación de imagen) e **Images: Edit** (subida)
- `OPENAI_API_KEY` — opcional, vía B de imagen (solo útil si el preflight muestra api.openai.com alcanzable)
- `SLACK_WEBHOOK_URL` — webhook entrante de Slack del canal `#gard-web-blog` (notificaciones con push real)
- Credencial GSC — opcional en modo PR (la indexación se hace post-merge)

Si una variable falta, no falles la corrida completa: aplica el fallback documentado en cada fase y déjalo anotado en el PR.

---

## GUARDRAILS INNEGOCIABLES

1. **B2B absoluto.** El post apunta a un DECISOR de empresa (gerente de operaciones, administrador de contratos, facility manager), jamás a un guardia buscando trabajo. **Prohibido** en título, slug, H2s y keyword objetivo: `curso os10`, `trabajo de guardia`, `empleo guardia`, `sueldo guardia`, `cómo ser guardia`, `postular`, `vacante` y toda variante job-seeker. La autoridad es `docs/seo/estrategia-keywords.md` — léelo SIEMPRE antes de elegir tema.
2. **Cero datos inventados.** Toda cifra externa lleva fuente verificable enlazada (Fiscalía, INE, Subsecretaría de Prevención del Delito, CNC, prensa seria). Sin fuente, la cifra no existe.
3. **Cifras corporativas solo desde `lib/data/company-stats.ts`** (leerlo en cada corrida y usar los valores vigentes). `activeClients` es INTERNO: prohibido en superficies públicas. Preferencia: los posts informativos no necesitan cifras de Gard.
4. **Sin claims no verificables** ("#1", "la mejor", "líder indiscutido"). Permitido: hechos verificables (rating GMB con link, 10 ciudades, 100% OS10).
5. **No canibalizar.** Listar slugs existentes (`ls docs/blog_posts/`) y las landings del sitemap. Si el tema ya está cubierto por un post o una landing comercial, cambiar de ángulo o descartar. Los posts atacan long-tail informacional y enlazan hacia las landings — nunca compiten con ellas por el mismo head term.
6. **Enlaces internos solo a rutas vigentes** verificadas contra `https://www.gard.cl/sitemap.xml`. Los posts legacy enlazan a URLs muertas del WordPress viejo — no repetir ese error.

---

## FASE 0 — Contexto

0.1 `git pull origin main` para asegurar el estado más reciente.
0.2 Leer: `docs/seo/estrategia-keywords.md`, `ESPECIFICACIONES_IMAGENES_BLOG.md`, `lib/data/company-stats.ts` y, si existe, `docs/seo/blog-topic-queue.md` (cola editorial).
0.3 Listar los slugs existentes: `ls docs/blog_posts/`.
0.4 Descargar rutas vigentes: `curl -s https://www.gard.cl/sitemap.xml` → lista para el interlinking.
0.5 **Trabajo en vuelo (anti-duplicados):** listar las ramas y PRs de blog NO mergeados: `git ls-remote origin 'refs/heads/content/blog-*'` y los PRs abiertos vía `gh pr list --state open` o la API de GitHub. Sus temas y slugs cuentan como YA CUBIERTOS, exactamente igual que los posts en `main` — un post esperando revisión sigue siendo un post existente. **Tope de backlog:** si hay 2 o más PRs de blog abiertos sin mergear, NO publicar otro: notificar por la Fase 6 que la revisión está atascada (con los links pendientes) y terminar la corrida.

## FASE 1 — Investigación

1.1 **Semrush (conector MCP disponible; base de datos siempre `'cl'`):**
   - `phrase_related` sobre 2-3 semillas rotativas B2B: `guardias de seguridad para empresas`, `seguridad privada empresas`, `monitoreo cámaras empresas`, `seguridad {industria}` — volumen ≥ 10, descartando intención job-seeker.
   - `phrase_questions` sobre la semilla del día → candidatos a FAQ y títulos informacionales.
   - `domain_organic` de 2 competidores rotativos (`securitaschile.cl`, `firstsecurity.cl`, `sicseguridad.cl`, `grupovsm.cl`, `sseguridad.cl`, `federalseguridad.cl`, `akaseguridad.cl`) → gaps informacionales donde ellos rankean y gard.cl no.
1.2 **Frescura:** revisar los blogs de 2 competidores + noticias de seguridad privada en Chile de los últimos 7 días (Ley 21.659, estadísticas de delitos, incidentes con ángulo B2B). Lo noticioso-B2B puntúa alto.
1.3 Mantener `docs/seo/blog-topic-queue.md` como **libro de estados**, no una lista simple. Cada tema lleva: `estado: pendiente | en-PR (rama, fecha) | publicado (slug, fecha) | descartado (motivo)`. Al iniciar cada corrida, reconciliar la cola contra `docs/blog_posts/` y contra los PRs del paso 0.5: un tema cuyo slug ya existe en `main` pasa a `publicado`; uno con PR abierto queda `en-PR`. Agregar los candidatos nuevos con su score; máximo 20 en estado `pendiente`.

## FASE 2 — Selección del tema

Score (0-10): intención B2B (0-3, eliminatorio en 0) + demanda/momentum (0-3) + gap competitivo (0-2) + no-duplicación (0-2, eliminatorio si duplica).
**Umbral: ≥ 6.** Si nada llega, terminar reportando "sin tema publicable hoy" sin abrir PR.

**Dedup semántico (no solo por slug):** extraer `title` y `keywords` del frontmatter de todos los posts (`grep -h -E '^(title|keywords):' docs/blog_posts/*.md`) más los títulos de los PRs abiertos del 0.5. Un candidato ES duplicado si comparte la keyword objetivo o la entidad principal (misma ley, misma tecnología, mismo servicio×industria) con algo `publicado` o `en-PR` — aunque el slug propuesto sea distinto. Ejemplo: si existe `ley-21719-videovigilancia`, entonces "protección de datos en cámaras de seguridad" es DUPLICADO. Duplicado = eliminatorio. Solo se admite volver a una entidad ya cubierta con una intención de búsqueda claramente distinta (p. ej. guía normativa vs. checklist de implementación) y enlazando al post original. En el mismo commit del post, el tema elegido queda marcado `en-PR` en la cola.

## FASE 3 — Redacción

Crear `docs/blog_posts/<slug>.md` con este frontmatter (compatible con `lib/blog.ts`):
```yaml
---
title: "<máx 60 caracteres, keyword objetivo incluida>"
seoTitle: "<opcional si difiere>"
date: "<YYYY-MM-DD de hoy>"
description: "<150-160 caracteres>"
author: "Gard Security"
keywords: ["<objetivo>", "<2-4 secundarias>"]
tags: ["<2-3 tags reales del tema, NO el trío genérico legacy>"]
category: "<Seguridad Privada | Tecnología | Normativa | Industrias>"
imageId: "<UUID Cloudflare de la FASE 4 — omitir el campo si la fase 4 usó fallback>"
faqSchema:
  - question: "<pregunta real de phrase_questions>"
    answer: "<respuesta directa de 40-60 palabras>"
  # 3 a 5 pares — alimenta el schema FAQ, crítico para GEO
---
```
Cuerpo: 1.200-1.800 palabras, español de Chile, tono consultor B2B. Keyword objetivo en el primer párrafo. H2/H3 descriptivos. 3-5 enlaces internos a rutas verificadas en 0.4 (prioridad: landing de servicio/ciudad afín + `/cotizar`). Mínimo 2 fuentes externas enlazadas. Una tabla o lista comparativa si el tema lo permite (citabilidad IA). CTA final a cotización sin promesas fuera de company-stats.

## FASE 4 — Imagen única

4.0 **Preflight de red (diagnóstico, no bloqueante):** probar conectividad real y dejar constancia en el reporte/PR de qué dominio respondió y cuál bloqueó el proxy:
```bash
for d in api.cloudflare.com api.openai.com hooks.slack.com www.gard.cl; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$d" || echo "BLOQUEADO")
  echo "$d → $code"
done
```
(Cualquier código HTTP = dominio alcanzable; fallo de CONNECT/timeout = bloqueado por la política de red del entorno.)

4.1 Seguir `ESPECIFICACIONES_IMAGENES_BLOG.md`. Por defecto: 1200×630, estética corporativa sobria (Gard Blue `#002992`, contexto industrial chileno), sin texto incrustado, sin rostros reconocibles, sin logos de terceros.

4.2 Generar por la primera vía disponible, en este orden:
   - **A) Cloudflare Workers AI (vía principal — mismo dominio y mismo token que la subida):**
```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/e56e6231ebbfb3edd31e85df0a7092bc/ai/run/@cf/black-forest-labs/flux-1-schnell" \
  -H "Authorization: Bearer $CF_IMAGES_TOKEN" -H "Content-Type: application/json" \
  -d '{"prompt":"<prompt descriptivo en inglés, estética corporativa>","steps":6}' \
  | python3 -c 'import sys,json,base64; open("raw.png","wb").write(base64.b64decode(json.load(sys.stdin)["result"]["image"]))'
convert raw.png -resize 1200x630^ -gravity center -extent 1200x630 imagen.png   # si falta ImageMagick: pip install pillow y hacerlo con PIL
```
     Requiere que el token tenga además el permiso **Workers AI: Read**. Si la respuesta es error de permisos, reportarlo textual en el PR (es 1 clic de Carlos en el dashboard).
   - **B)** API de OpenAI Images con `$OPENAI_API_KEY` — solo si el preflight mostró `api.openai.com` alcanzable.
   - **C)** Conector Hugging Face — solo si expone una herramienta de generación de imagen (si la invocación está deshabilitada por configuración `gradio=none`, saltar sin insistir).
   - **D)** Banco local: si existe `docs/automations/image-bank.md` (mapa categoría → UUID de Cloudflare ya subido), usar el UUID de la categoría más afín al tema y anotarlo en el PR como "imagen de banco".

4.3 (Solo vías A/B/C) Subir a Cloudflare Images:
```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/e56e6231ebbfb3edd31e85df0a7092bc/images/v1" \
  -H "Authorization: Bearer $CF_IMAGES_TOKEN" -F "file=@imagen.png"
```
Capturar el UUID de la respuesta INMEDIATAMENTE y validarlo contra `^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$` antes de escribirlo en el frontmatter.

4.4 **Fallback final honesto:** si ninguna vía funcionó, OMITIR el campo `imageId` (el sitio usa la imagen de sección por defecto), anotar en el PR "PENDIENTE: imagen única" junto al diagnóstico del preflight 4.0. **Prohibido inventar un UUID o reutilizar `5eea1064-8a2d-4e8b-5606-d28775467a00`.**

4.5 **Backfill de auto-reparación:** si la vía A funcionó en esta corrida, revisar en `main` los posts de los últimos 14 días SIN campo `imageId` (los que salieron con "PENDIENTE" en corridas anteriores). Generar y subir imagen para hasta 2 de ellos y agregar su `imageId` en el mismo commit/PR de esta corrida, listándolos en la descripción como "🔧 Backfill de imagen: <slugs>".

## FASE 5 — Validación y Pull Request

```bash
grep -icE "curso os10|trabajo de guardia|empleo|sueldo|postula|vacante" docs/blog_posts/<slug>.md   # esperado: 0
grep -c "#1" docs/blog_posts/<slug>.md                                                              # esperado: 0
grep -c "faqSchema" docs/blog_posts/<slug>.md                                                       # esperado: ≥1
./node_modules/.bin/tsc --noEmit && ./node_modules/.bin/next build
```
Si todo pasa:
```bash
git checkout -b content/blog-<slug>
git add docs/blog_posts/<slug>.md docs/seo/blog-topic-queue.md
git commit -m "content(blog): <slug>"
git push -u origin content/blog-<slug>
```
Abrir **Pull Request normal (NO draft — crear con `gh pr create` SIN `--draft`, o vía API con `"draft": false`)** hacia `main` con: tema y score, keyword objetivo y volumen, enlaces internos usados, fuentes citadas, UUID de imagen (o "PENDIENTE"), y este checklist post-merge para Carlos:
- [ ] Verificar `https://www.gard.cl/blog/<slug>` responde 200 tras el deploy de Vercel
- [ ] Enviar la URL a la GSC Indexing API (o Inspección de URL → Solicitar indexación)

**Link directo al post renderizado (con tope duro de espera):** tras abrir el PR, usar el conector de Vercel para obtener el Preview Deployment de la rama `content/blog-<slug>`. Polling secuencial cada 60-90 s con **tope máximo de 10 minutos** — prohibido dejar múltiples sleeps en background. Construir el link de lectura: `<url_del_preview>/blog/<slug>` (si el preview tiene protección, generar link compartible con la herramienta de Vercel) y agregarlo al inicio de la descripción del PR como "📖 Leer el post". **Si a los 10 minutos el build no está READY:** no seguir esperando — dejar el link con la nota "(se activa cuando termine el build de Vercel)", programar UN ÚNICO self check-in a ~60 minutos que verifique el estado, actualice el PR y reenvíe la notificación si cambió, y terminar la corrida.

**NO hacer merge. Terminar la corrida después de abrir el PR y notificar (Fase 6).**

## FASE 6 — Notificación a Carlos

- **Vía principal — webhook de Slack al canal `#gard-web-blog`** (mensaje de bot: genera badge y push en el celular, a diferencia de un DM propio):
```bash
curl -s -X POST "$SLACK_WEBHOOK_URL" -H 'Content-type: application/json' \
  --data "{\"text\":\"📝 Nuevo post listo para revisar: *<título>*\n📖 Leer: <link_preview_directo>\n✅ Aprobar (PR): <link_PR>\n🖼️ Imagen: <UUID | PENDIENTE | backfill: slugs>\"}"
```
  La respuesta del POST debe ser exactamente `ok`; cualquier otra cosa se trata como fallo de vía → usar el fallback y anotarlo en el reporte.
- Enviar también la notificación push nativa de la sesión con el resumen.
- Si la corrida NO publicó: mismo canal, motivo exacto (guardrail, tope de backlog o umbral de score).
- **Fallback** si `$SLACK_WEBHOOK_URL` no existe o el POST falla: mensaje directo a Carlos por el conector de Slack si está disponible (limitación conocida: los mensajes propios no generan push).
- Si el preflight 4.0 mostró dominios BLOQUEADOS, la notificación DEBE incluir la línea: "⚠️ Red del entorno bloquea: <dominios> → revisar Acceso a la red del entorno Gard Web".
- Prohibido escribir a cualquier otro canal, webhook o persona.

## FASE 7 — Reporte

Cerrar con un resumen: tema y score, slug, PR abierto (link), link de lectura del preview, estado de la imagen, y los 3 próximos temas en cola. Si no se publicó: motivo exacto.