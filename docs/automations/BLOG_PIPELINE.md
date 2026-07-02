# BLOG_PIPELINE — Rutina remota de generación de contenido SEO/GEO para gard.cl

> **Contexto de ejecución:** rutina remota de Claude Code en la nube de Anthropic. El repo `Cryptobal/gard-page-web` ya está clonado; trabajas desde su raíz. No necesitas clonar nada.
> **Modo:** 100% autónomo. Si un guardrail bloquea, NO publiques y termina reportando el motivo — eso es un resultado correcto.
> **Cierre obligatorio v1:** SIEMPRE terminar en **Pull Request**. Prohibido hacer merge a `main`. (Cuando Carlos apruebe 3 corridas consecutivas, él cambiará esta regla.)
> **Principio rector:** calidad > cadencia. Un post mediocre daña más que no publicar.

## Variables de entorno esperadas (configuradas en el entorno cloud "Gard Web")

- `CF_IMAGES_TOKEN` — token de Cloudflare Images (subida de imagen del post)
- `OPENAI_API_KEY` — opcional, para generación de imagen vía API
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

## FASE 1 — Investigación

1.1 **Semrush (conector MCP disponible; base de datos siempre `'cl'`):**
   - `phrase_related` sobre 2-3 semillas rotativas B2B: `guardias de seguridad para empresas`, `seguridad privada empresas`, `monitoreo cámaras empresas`, `seguridad {industria}` — volumen ≥ 10, descartando intención job-seeker.
   - `phrase_questions` sobre la semilla del día → candidatos a FAQ y títulos informacionales.
   - `domain_organic` de 2 competidores rotativos (`securitaschile.cl`, `firstsecurity.cl`, `sicseguridad.cl`, `grupovsm.cl`, `sseguridad.cl`, `federalseguridad.cl`, `akaseguridad.cl`) → gaps informacionales donde ellos rankean y gard.cl no.
1.2 **Frescura:** revisar los blogs de 2 competidores + noticias de seguridad privada en Chile de los últimos 7 días (Ley 21.659, estadísticas de delitos, incidentes con ángulo B2B). Lo noticioso-B2B puntúa alto.
1.3 Actualizar `docs/seo/blog-topic-queue.md`: candidatos nuevos con score, máximo 20 temas.

## FASE 2 — Selección del tema

Score (0-10): intención B2B (0-3, eliminatorio en 0) + demanda/momentum (0-3) + gap competitivo (0-2) + no-duplicación (0-2, eliminatorio si duplica).
**Umbral: ≥ 6.** Si nada llega, terminar reportando "sin tema publicable hoy" sin abrir PR.

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

4.1 Seguir `ESPECIFICACIONES_IMAGENES_BLOG.md`. Por defecto: 1200×630, estética corporativa sobria (Gard Blue `#002992`, contexto industrial chileno), sin texto incrustado, sin rostros reconocibles, sin logos de terceros.
4.2 Generar por una de estas vías (en orden de preferencia):
   - **A)** API de OpenAI Images con `$OPENAI_API_KEY` (generar horizontal y recortar/redimensionar a 1200×630 con ImageMagick o sharp).
   - **B)** Conector Hugging Face → Space de texto-a-imagen.
4.3 Subir a Cloudflare Images:
```bash
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/e56e6231ebbfb3edd31e85df0a7092bc/images/v1" \
  -H "Authorization: Bearer $CF_IMAGES_TOKEN" -F "file=@imagen.png"
```
Capturar el UUID de la respuesta INMEDIATAMENTE y validarlo contra `^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$` antes de escribirlo en el frontmatter.
4.4 **Fallbacks honestos:** si no hay vía de generación o falta `CF_IMAGES_TOKEN`, OMITIR el campo `imageId` (el sitio usa la imagen de sección por defecto) y anotar en el PR: "PENDIENTE: imagen única". **Prohibido inventar un UUID o reutilizar `5eea1064-8a2d-4e8b-5606-d28775467a00`.**

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
Abrir **Pull Request** hacia `main` con: tema y score, keyword objetivo y volumen, enlaces internos usados, fuentes citadas, UUID de imagen (o "PENDIENTE"), y este checklist post-merge para Carlos:
- [ ] Verificar `https://www.gard.cl/blog/<slug>` responde 200 tras el deploy de Vercel
- [ ] Enviar la URL a la GSC Indexing API (o Inspección de URL → Solicitar indexación)

**NO hacer merge. Terminar la corrida después de abrir el PR.**

## FASE 6 — Reporte

Cerrar con un resumen: tema y score, slug, PR abierto (link), estado de la imagen, y los 3 próximos temas en cola. Si no se publicó: motivo exacto.
