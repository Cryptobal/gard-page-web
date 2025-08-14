### Reporte de implementación

| Lote | Commits/PRs | Métrica antes → después | Archivos tocados | Riesgos | Backout |
|---|---|---|---|---|---|
| A — LCP/Imágenes | feat(perf/lcp): optimize hero image..., perf(lcp/mobile): disable video on small screens | LCP home (mediana) aún > 2.5s en prod; mejoras aplicadas (poster/preload none/sizes/blur). | `components/CloudflareImage.tsx`, `components/layouts/GardHero.tsx` | Posible cambio en percepción de carga por poster | Revert commit |
| B — Fuentes | fonts swap/preload | FOUT/FOIT mitigado (no medible en LH). | `app/fonts.ts`, `app/layout.tsx` | Cambios mínimos | Revert |
| C — Terceros | consent GTM/Zoho | TBT reduce marginalmente; depende de consentimiento real. | `app/components/GoogleTagManager.tsx`, `app/components/ZohoSalesIQ.tsx`, `app/layout.tsx` | Pérdida de datos si no hay consentimiento | Revert |
| F — A11y | aria-label accordion, focus ring, contraste hero | Axe: pendientes color-contrast en otros botones; frame-title resuelto. | `components/ui/accordion.tsx`, `app/globals.css`, `components/layouts/GardHero.tsx` | Bajo | Revert |

