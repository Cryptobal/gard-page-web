# Cola editorial del blog — gard.cl

Actualizada automáticamente por la corrida diaria de contenido (Cowork).
Score = intención B2B (0-3, eliminatorio si 0) + demanda/momentum (0-3) + gap competitivo (0-2) + no-duplicación (0-2, eliminatorio si duplica). Umbral de publicación: ≥ 6.

| # | Tema propuesto | Keyword objetivo (vol cl) | Score | Estado |
|---|---|---|---|---|
| 1 | Guardia de seguridad o vigilante privado: qué debe contratar tu empresa según la Ley 21.659 | vigilante privado (1.300) / diferencia guardia y vigilante privado | 10 | ✅ Publicado 2026-07-02 |
| 2 | Videovigilancia y protección de datos personales: lo que exige la Ley 21.719 a las empresas antes de dic-2026 | ley 21.719 empresas / cámaras y datos personales | 9 | 🔶 PR abierto 2026-07-02 (#42, pendiente de aprobación) |
| 5 | ¿Puede un guardia de seguridad detener a una persona en Chile? Marco legal y responsabilidad para tu empresa | puede un guardia detener a una persona (70) / detención ciudadana guardia | 9 | ✅ Publicado 2026-07-02 |
| 3 | Fiscalización de la seguridad privada bajo la SPD: co-responsabilidad del mandante al contratar guardias | fiscalización seguridad privada | 8 | En cola (sin volumen en Semrush cl al 2026-07-02, revisar en próxima corrida) |
| 4 | Jornadas excepcionales en seguridad privada: qué debe saber quien administra el contrato | jornada excepcional guardias (20, cl) | 8 | En cola (revisar intent job-seeker) |
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

## Notas de la corrida adicional 2026-07-02 (segunda pasada, tema #5)
- Esta fue la **tercera corrida del pipeline en el mismo día**: el tema #1 ya estaba publicado en `main` (commit `9228c16`) y el tema #2 ya tenía PR abierto (#42, rama `claude/relaxed-volta-7rj08h`) antes de iniciar esta corrida. Para no canibalizar, se seleccionó el tema #5 de la cola.
- `phrase_related` sobre `fiscalización seguridad privada` (tema #3) y `phrase_this` sobre `puede un guardia detener` no devolvieron volumen en la base `cl` al momento de la corrida (posible límite de cobertura de Semrush para long-tail muy específico); se mantuvo el tema #5 igualmente por: (a) intención B2B explícita en el ángulo de responsabilidad legal de la empresa mandante, (b) gap competitivo confirmado — `federalseguridad.cl` tiene un post exacto sobre esta pregunta ("¿Puede la seguridad privada detener a una persona en Chile? Guía 2026") y gard.cl no tiene nada al respecto, (c) `securitaschile.cl` no cubre el tema (`domain_organic` solo devuelve keywords de marca/empleo), (d) cero duplicación con posts existentes de gard.cl (`grep` sobre `docs/blog_posts/` no encontró contenido sobre detención/arresto ciudadano/flagrancia).
- Frescura confirmada vía búsqueda web: reunión del Colegio de Profesionales de Seguridad Privada (CPSEG) con el subsecretario de Prevención del Delito (1-jul-2026) sobre ajustes reglamentarios a la Ley 21.659, con cambios esperados a fines de julio 2026 → nuevo candidato #8 agregado a la cola para la próxima corrida.
- `sitemap.xml` en vivo (`https://www.gard.cl/sitemap.xml`) no fue accesible desde este entorno (bloqueo de red saliente del proxy de la sesión); se usó `app/sitemap.xml/route.ts` y `app/servicios/serviceMetadata.ts` como fuente de verdad equivalente para verificar rutas internas vigentes.
