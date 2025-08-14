### Supuestos y trazabilidad

- Lighthouse CI: se ejecuta contra producción `https://www.gard.cl` (no hay entorno staging expuesto).
- Cloudflare Images/Stream: los IDs permanecen válidos; el poster del video existe para el hero.
- Cambios aplicados son presentacionales y de headers; no afectan lógica de negocio.
- CSP propuesta aún no activada estricta para evitar romper Zoho/GTM durante la iteración.

