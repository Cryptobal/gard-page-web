### Resumen ejecutivo

- **Sitio auditado**: https://gard.cl
- **Fecha**: 2025-08-14
- **Objetivo**: Alcanzar nivel world-class en Core Web Vitals, SEO técnico, accesibilidad (WCAG 2.2 AA), seguridad y DX.

### KPI meta (móvil)
- **Lighthouse**: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95
- **CWV p75**: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.10, TTFB ≤ 300 ms

### Hallazgos clave (preliminar)
- Headers actuales: HSTS presente (sin includeSubDomains/preload); falta CSP, Referrer-Policy y X-Content-Type-Options (agregados como propuesta en `next.config.js`).
- Imágenes: uso correcto de Cloudflare Images; falta `sizes` específicos en hero para reducir LCP.
- Fuentes: `next/font` con display swap y preload habilitado (editado); reduce FOIT/FOUT.
- Consentimiento: GTM/GA condicionados por banner y `ConsentAwareScript`; cumple base de privacidad.
- Sitemap: 194 URLs detectadas desde `https://www.gard.cl/sitemap.xml` (ver `10_CRAWL/crawl.csv`).

### Recomendaciones prioritarias
- Ver `ROADMAP.md` para plan por impacto/esfuerzo.

### Tabla de hallazgos

| Hallazgo | Impacto | Esfuerzo | Fix | Dueño | ETA |
|---|---|---|---|---|---|
| Falta CSP robusta y listas de orígenes (Cloudflare/GA/GTM) | Alto | Medio | `security_headers.md` y `next.config.js` | FE/DevOps | 1-2 días |
| LCP potencial alto en home (video Stream + overlay) | Alto | Medio | `GardHero`: poster optimizado, `priority`, `sizes` | FE | 2-3 días |
| Preload de fuentes y swap | Medio | Bajo | `app/fonts.ts` | FE | 1 día |
| Limpieza/red de redirects y parámetros UTM | Medio | Bajo | `next.config.js` redirects | FE/SEO | 1 día |
