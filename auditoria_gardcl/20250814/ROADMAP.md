### Roadmap de implementación (Impacto/Esfuerzo)

1) Quick wins de performance (imágenes responsivas/AVIF/WebP, preload crítico, fuentes self-host con `font-display: swap`).
2) Limpieza y control de third-parties (defer/async, load-on-interaction, consent mode) y cuantificación de costo JS.
3) Datos estructurados completos (Organization, LocalBusiness/SecurityService, Service, FAQPage, BreadcrumbList) validados sin warnings.
4) CI con LHCI + axe + budgets y asserts estrictos para prevenir regresiones.
5) Endurecimiento de headers de seguridad (HSTS, CSP con nonces/hashes, Referrer-Policy, Permissions-Policy, COOP/COEP si aplica).
