# Baseline SEO · Google Search Console

> Placeholder — se regenera con `pnpm run gsc-analytics` o el workflow semanal **GSC Search Analytics export**.

## Cómo generar

```bash
export GSC_SERVICE_ACCOUNT_EMAIL="..."
export GSC_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
pnpm run gsc-analytics
```

Requisito extra en Google Cloud: habilitar **Google Search Console API** (además de Indexing API).

## Checklist manual en Search Console

- [ ] Property `https://www.gard.cl/` verificada
- [ ] Sitemap `https://www.gard.cl/sitemap.xml` enviado (también declarado en robots.txt)
- [ ] International Targeting → **Chile**
- [ ] Asociar GA4 `G-4XJ2YKYYDH` (Settings → Associations)
- [ ] Service account con rol **Owner** (Indexing API) o al menos acceso al property (Search Analytics)
- [ ] Revisar semanalmente: Pages, Core Web Vitals, Experience → HTTPS
