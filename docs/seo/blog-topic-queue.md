# Cola editorial del blog — gard.cl

Actualizada automáticamente por la corrida diaria de contenido (Cowork).
Score = intención B2B (0-3, eliminatorio si 0) + demanda/momentum (0-3) + gap competitivo (0-2) + no-duplicación (0-2, eliminatorio si duplica). Umbral de publicación: ≥ 6.

| # | Tema propuesto | Keyword objetivo (vol cl) | Score | Estado |
|---|---|---|---|---|
| 1 | Guardia de seguridad o vigilante privado: qué debe contratar tu empresa según la Ley 21.659 | vigilante privado (1.300) / diferencia guardia y vigilante privado | 10 | ✅ Publicado 2026-07-02 |
| 2 | Videovigilancia y protección de datos personales: lo que exige la Ley 21.719 a las empresas antes de dic-2026 | ley 21.719 (2.900) / cámaras de vigilancia en el trabajo (590) | 10 | ✅ Publicado 2026-07-03 (PR #42) |
| 5 | ¿Puede un guardia de seguridad detener a una persona en Chile? Marco legal y responsabilidad para tu empresa | puede un guardia detener a una persona (70) / detención ciudadana guardia | 9 | ✅ Publicado 2026-07-02 |
| 3 | Fiscalización OS10 y SPD en Chile: guía 2026 para empresas | fiscalización os10 (20) / quién fiscaliza a los guardias de seguridad (20) | 9 | ✅ Publicado 2026-07-03 (PR #47) |
| 4 | Ley 21.561 (42 horas) y jornada excepcional de guardias de seguridad: qué debe verificar tu empresa | ley 21561 (2.900, cl) / jornada excepcional guardias de seguridad (20, cl) | 10 | ✅ Publicado 2026-07-03 (PR #46) |
| 6 | Central de monitoreo y televigilancia para empresas: qué exigirle al proveedor | televigilancia chile (30) / monitoreo de cámaras (110) | 6 | En cola (cuidar canibalización con /servicios/central-monitoreo y post existente) |
| 7 | Eventos masivos +3.000 asistentes: ventanilla única y plan de seguridad obligatorio | ley 21.659 eventos masivos | 6 | En cola (dup parcial con posts de eventos existentes — buscar ángulo ventanilla única) |
| 8 | Reglamento de la Ley 21.659 (ajustes esperados fines de julio 2026 tras mesa CPSEG-SPD): qué deben monitorear las empresas mandantes | reglamento ley seguridad privada 2026 | 7 | Nuevo candidato (corrida 2026-07-02) — noticia del 2026-07-01, validar volumen y detalle del reglamento cuando se publique |

## Descartados en corridas anteriores (con motivo)
- Curso/certificación OS10, requisitos para ser guardia, uniformes, sueldos → keyword negativa (job-seeker), ver `estrategia-keywords.md`.
- "Cuánto cuesta un guardia" → cubierto por landing `/cuanto-cuesta-guardia-seguridad-chile` (no canibalizar).
- Comisarías / plan cuadrante / salvoconducto (gap de federalseguridad.cl) → tráfico sin intención B2B, no convierte.

## Notas de la corrida 2026-07-02
- Semillas Semrush: `seguridad privada empresas` (sin resultados con filtro vol≥10), `central de monitoreo` (dominada por marca Verisure — B2C), `phrase_questions` sobre `seguridad privada`.
- Competidores analizados: federalseguridad.cl (fuerte en contenido job-seeker + noticias reactivas), sicseguridad.cl (fuerte en landings de ciudad).
- Momentum noticioso: Ley 21.659 vigente desde 28-nov-2025; plazos de adecuación corriendo durante 2026; ventanilla única de eventos masivos estrenada en 2026.

## Notas de la corrida 2026-07-02 (segunda publicación del día — tema #2)
- Semrush `phrase_related` sobre `ley de proteccion de datos personales`: `ley 21719` 2.900/mes, tendencia ascendente marcada (0,29 → 1,00 en 12 meses); `ley sobre cámaras de vigilancia en el trabajo chile` 590/mes, competencia 0,33, también con salto de tendencia reciente.
- `domain_organic` de securitaschile.cl filtrado por "ley": rankea fuerte para Ley 21.659 (seguridad privada) pero no aparece ninguna keyword de Ley 21.719 / datos personales / videovigilancia — gap competitivo confirmado.
- Ángulo elegido: cámaras de videovigilancia corporativas como dato personal bajo la Ley 21.719 (vigencia plena 1-dic-2026), con foco en EIPD, retención de imágenes y sanciones — evita duplicar los posts existentes sobre Ley 21.659 y sobre IA en cámaras.
- Imagen (Fase 4): `CF_IMAGES_TOKEN` y `OPENAI_API_KEY` no estaban disponibles en el entorno de ejecución al momento de la corrida → se aplicó el fallback documentado, `imageId` omitido en el frontmatter.

## Notas de la corrida 2026-07-03 (tema #3)
- Cuarta corrida del pipeline: al iniciar, el único PR de blog abierto sin mergear era #42 (tema #2, Ley 21.719), por debajo del tope de 2. La rama `content/blog-guardia-o-vigilante-privado` existe en remoto pero no tiene PR asociado (huérfana; su tema ya está publicado en `main` desde la corrida del tema #1), así que no cuenta para el tope.
- Se seleccionó el tema #3 de la cola con un ángulo concreto: `phrase_this` sobre `fiscalizacion seguridad privada` no devolvió volumen en Semrush `cl`, pero `fiscalizacion os10` y `quien fiscaliza a los guardias de seguridad` sí (20/mes cada una). Gap competitivo confirmado vía `domain_organic` de federalseguridad.cl: tiene 2 posts dedicados exactos a este tema ("Fiscalización OS10: qué revisa Carabineros…" y "¿Quién fiscaliza a los guardias de seguridad en Chile 2026?") que gard.cl no tenía.
- Dedup semántico: gard.cl ya tiene 2 posts sobre Ley 21.659 (guía normativa general y plazos) y 3 sobre certificación OS10 (proceso para obtener la credencial). El post nuevo cubre un ángulo distinto — checklist de fiscalización en terreno y co-responsabilidad operacional del mandante — y enlaza a ambos posts existentes para no competir por la misma intención de búsqueda.
- Cifras de multas (15-50 / 50-650 / 650-13.500 UTM por infracción leve/grave/gravísima) verificadas vía búsqueda web contra el texto de la Ley 21.659 (BCN); no se pudo hacer fetch directo de bcn.cl ni de subprevenciondeldelito.gob.cl desde este entorno (bloqueo de red del proxy de la sesión, igual que en corridas anteriores), por lo que se citan como fuente pero no se pudo verificar el artículo exacto con fetch en vivo.
- Preflight de red: `api.cloudflare.com`, `api.openai.com` y `hooks.slack.com` bloqueados por política de red del proxy (403 en el CONNECT, confirmado también en `$HTTPS_PROXY/__agentproxy/status`). Vía C (Hugging Face `evalstate/flux1_schnell`) deshabilitada por configuración `gradio=none`. No existe `docs/automations/image-bank.md`. Se omitió `imageId` (fallback 4.4).
- `SLACK_WEBHOOK_URL` no está configurada en el entorno (variable ausente, no solo inalcanzable).

## Notas de la corrida adicional 2026-07-02 (segunda pasada, tema #5)
- Esta fue la **tercera corrida del pipeline en el mismo día**: el tema #1 ya estaba publicado en `main` (commit `9228c16`) y el tema #2 ya tenía PR abierto (#42, rama `claude/relaxed-volta-7rj08h`) antes de iniciar esta corrida. Para no canibalizar, se seleccionó el tema #5 de la cola.
- `phrase_related` sobre `fiscalización seguridad privada` (tema #3) y `phrase_this` sobre `puede un guardia detener` no devolvieron volumen en la base `cl` al momento de la corrida (posible límite de cobertura de Semrush para long-tail muy específico); se mantuvo el tema #5 igualmente por: (a) intención B2B explícita en el ángulo de responsabilidad legal de la empresa mandante, (b) gap competitivo confirmado — `federalseguridad.cl` tiene un post exacto sobre esta pregunta ("¿Puede la seguridad privada detener a una persona en Chile? Guía 2026") y gard.cl no tiene nada al respecto, (c) `securitaschile.cl` no cubre el tema (`domain_organic` solo devuelve keywords de marca/empleo), (d) cero duplicación con posts existentes de gard.cl (`grep` sobre `docs/blog_posts/` no encontró contenido sobre detención/arresto ciudadano/flagrancia).
- Frescura confirmada vía búsqueda web: reunión del Colegio de Profesionales de Seguridad Privada (CPSEG) con el subsecretario de Prevención del Delito (1-jul-2026) sobre ajustes reglamentarios a la Ley 21.659, con cambios esperados a fines de julio 2026 → nuevo candidato #8 agregado a la cola para la próxima corrida.
- `sitemap.xml` en vivo (`https://www.gard.cl/sitemap.xml`) no fue accesible desde este entorno (bloqueo de red saliente del proxy de la sesión); se usó `app/sitemap.xml/route.ts` y `app/servicios/serviceMetadata.ts` como fuente de verdad equivalente para verificar rutas internas vigentes.

## Notas de la corrida 2026-07-03
- Reconciliación 0.5: PRs de blog abiertos = 1 (`#42`, tema #2, rama `claude/relaxed-volta-7rj08h`). Bajo el tope de backlog (2). Rama huérfana `content/blog-guardia-o-vigilante-privado` detectada en el remoto corresponde al tema #1, ya publicado en `main`; no representa trabajo en vuelo adicional.
- Semrush: `phrase_related` sobre `guardias de seguridad para empresas` (dominado por intención job-seeker, sin gaps nuevos aprovechables) y `phrase_questions` sobre `seguridad privada empresas` (sin candidatos con intención B2B clara). `domain_organic` de `grupovsm.cl` y `sseguridad.cl`: ambos rankean solo por listicles de marca/ciudad y postulaciones de empleo, sin gap informacional nuevo.
- Frescura (búsqueda web): confirmada la Ley N°21.561 ("40 horas") — el límite de jornada ordinaria baja de 44 a **42 horas semanales desde el 26-abr-2026** (DT, ORD. N°253/21; BCN Ley 21561). Este límite general aplica también al promedio semanal de los sistemas de jornada excepcional (4x4x12) de guardias de seguridad autorizados por la DT. `ley 21561` tiene 2.900/mes en Semrush cl (momentum alto); `jornada excepcional guardias de seguridad` 20/mes (long-tail específico).
- Gap competitivo: `sicseguridad.cl` tiene un post genérico sobre jornada excepcional de guardias (previo a la rebaja de abril 2026, sin mencionar la Ley 21.561). Ningún competidor revisado cruza la Ley 21.561 con la jornada excepcional de guardias desde la óptica del mandante (responsabilidad subsidiaria/solidaria).
- No-duplicación: `grep` sobre `docs/blog_posts/` no encontró contenido sobre Ley 21.561, "42 horas" o "40 horas" (las únicas coincidencias son menciones de horas de cursos, sin relación). Tema #4 seleccionado, score 10/10, marcado `en-PR`.
