### Reporte de implementación

| Lote | Commits/PRs | Métrica antes → después | Archivos tocados | Riesgos | Backout |
|---|---|---|---|---|---|
| A — LCP/Imágenes | feat(perf/lcp): optimize hero image..., perf(lcp/mobile): disable video on small screens, fix(perf/lcp): eliminate image flash | LCP: 14.0s → 14.0s (sin mejora); Performance: 59/100; Flash visual eliminado | `components/CloudflareImage.tsx`, `components/layouts/GardHero.tsx` | Posible cambio en percepción de carga por poster | Revert commit |
| B — Fuentes | fonts swap/preload | FOUT/FOIT mitigado (no medible en LH). | `app/fonts.ts`, `app/layout.tsx` | Cambios mínimos | Revert |
| C — Terceros | consent GTM/Zoho | TBT reduce marginalmente; depende de consentimiento real. | `app/components/GoogleTagManager.tsx`, `app/components/ZohoSalesIQ.tsx`, `app/layout.tsx` | Pérdida de datos si no hay consentimiento | Revert |
| F — A11y | aria-label accordion, focus ring, contraste hero | Axe: 11 issues (pendientes color-contrast, button-name, aria-valid-attr-value, frame-title) | `components/ui/accordion.tsx`, `app/globals.css`, `components/layouts/GardHero.tsx` | Bajo | Revert |

### Análisis de resultados

**Problemas identificados:**
1. **LCP extremadamente alto (14s)**: El problema principal no es el flash visual sino la carga del video de Cloudflare Stream
2. **Performance score bajo (59/100)**: Debido al LCP y TBT alto
3. **Accessibility score bajo (83/100)**: Problemas de contraste y ARIA
4. **Best Practices score bajo (74/100)**: Posiblemente relacionado con terceros

**Siguientes pasos recomendados:**
1. **Lote D - SEO Técnico**: Implementar optimizaciones de meta tags, robots.txt, sitemap
2. **Lote E - Schema JSON-LD**: Completar structured data
3. **Lote G - Headers/Security**: Implementar CSP y headers de seguridad
4. **Investigación LCP**: Analizar por qué el video de Cloudflare Stream está tardando tanto en cargar

