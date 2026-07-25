# Estrategia de keywords — gard.cl (vigente desde jun-2026)

## Principio
El SEO de gard.cl se orienta 100% a COMPRADORES B2B (mandantes que contratan
seguridad). NO atraemos postulantes vía SEO: el empleo vive en trabajo.gard.cl.

## Keywords NEGATIVAS — prohibido optimizar o crear contenido
curso os10 · certificado os10 (intent: obtenerlo) · acreditación os10 ·
capacitación de guardias · trabajo de guardia · empleo guardia · sueldo guardia ·
postulación · requisitos para ser guardia

Si una página rankea para estas keywords y pierde posiciones: NO recuperar.

## Keywords POSITIVAS — núcleo (volúmenes Semrush db cl, jun-2026)
- empresa(s) de guardias de seguridad — 1.000/mes — TÉRMINO DE ORO (home + /empresa-guardias-seguridad-chile)
- seguridad privada — 1.900/mes (intent mixto, trabajar vía contenido)
- empresas de seguridad — 590/mes
- empresa(s) de seguridad privada — 260/mes
- servicios de seguridad privada — 90/mes
- guardias de seguridad para empresas — 30/mes
- [ciudad] × [servicio] — p.ej. "empresas de seguridad en santiago" 390/mes (pos 5)

## Regla para agentes (Cursor / Claude Code / Cowork)
Antes de crear o editar contenido SEO, verificar contra este archivo. Ante
conflicto entre una keyword de alto volumen y esta estrategia, gana la estrategia.

## Salvaguarda técnica (pipeline automatizado de blog)
Como red de seguridad ante posts generados con intención de empleo, el sitemap
(`app/sitemap.xml/route.ts`) EXCLUYE automáticamente cualquier slug de blog que
matchee un patrón de empleo (`trabajo|trabaja|empleo|postula|postular|postulacion|
reclutamiento|vacante|sueldo`, ver `EMPLEO_SLUG_PATTERN`). Aun así, el pipeline NO
debe generar estos posts: la exclusión del sitemap es defensa en profundidad, no un
permiso para publicarlos. Un post de intención de empleo debe redirigir 301 a
`trabajo.gard.cl` (ver `next.config.js`).
