### Reporte de implementación

| Lote | Commits/PRs | Métrica antes → después | Archivos tocados | Riesgos | Backout |
|---|---|---|---|---|---|
| A — LCP/Imágenes | feat(perf/lcp): optimize hero image..., perf(lcp/mobile): disable video on small screens, fix(perf/lcp): eliminate image flash, revert(perf): restore original video behavior | LCP: 15.4s → 15.4s (sin mejora); Performance: 53/100; Flash visual eliminado | `components/CloudflareImage.tsx`, `components/layouts/GardHero.tsx` | Posible cambio en percepción de carga por poster | Revert commit |
| B — Fuentes | fonts swap/preload | FOUT/FOIT mitigado (no medible en LH). | `app/fonts.ts`, `app/layout.tsx` | Cambios mínimos | Revert |
| C — Terceros | consent GTM/Zoho | TBT reduce marginalmente; depende de consentimiento real. | `app/components/GoogleTagManager.tsx`, `app/components/ZohoSalesIQ.tsx`, `app/layout.tsx` | Pérdida de datos si no hay consentimiento | Revert |
| D — SEO Técnico | feat(seo/performance): optimize sitemap generation, robots.txt, and next.config.js | Sitemap optimizado (sin verificación en tiempo real); Cache mejorado; Webpack optimizado | `app/sitemap.xml/route.ts`, `app/robots.txt/route.ts`, `next.config.js` | Bajo | Revert |
| E — Schema JSON-LD | feat(seo/schema): add comprehensive JSON-LD schema markup | Organization, LocalBusiness, WebSite schema agregados; Componentes dinámicos creados | `app/layout.tsx`, `components/seo/SchemaMarkup.tsx` | Bajo | Revert |
| F — A11y | aria-label accordion, focus ring, contraste hero | Axe: 11 issues (pendientes color-contrast, button-name, aria-valid-attr-value, frame-title) | `components/ui/accordion.tsx`, `app/globals.css`, `components/layouts/GardHero.tsx` | Bajo | Revert |
| G — Headers/Security | feat(security): add comprehensive security headers | CSP, Permissions-Policy, COOP/COEP implementados; Headers de seguridad robustos | `next.config.js` | Posible bloqueo de recursos externos | Revert |

### Análisis de resultados

**Problemas identificados:**
1. **LCP extremadamente alto (15.4s)**: El problema principal sigue siendo el video de Cloudflare Stream
2. **Performance score bajo (53/100)**: Debido al LCP y TBT alto
3. **Accessibility score bajo (83/100)**: Problemas de contraste y ARIA
4. **Best Practices score bajo (74/100)**: Posiblemente relacionado con terceros

**Mejoras implementadas:**
- ✅ **SEO Técnico**: Sitemap optimizado, robots.txt mejorado, headers de cache
- ✅ **Schema JSON-LD**: Marcado estructurado completo implementado
- ✅ **Seguridad**: Headers de seguridad robustos con CSP
- ✅ **Rendimiento**: Optimizaciones de webpack y compresión

**Siguientes pasos recomendados:**
1. **Investigación LCP**: Analizar por qué el video de Cloudflare Stream está tardando tanto en cargar
2. **Optimización de video**: Considerar comprimir o cambiar formato del video
3. **Lazy loading del video**: Cargarlo solo cuando esté en viewport
4. **Remaining Axe issues**: Resolver problemas de accesibilidad pendientes

