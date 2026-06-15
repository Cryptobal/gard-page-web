/**
 * Constantes de Google Search Console para gard.cl.
 * Fuente única para sitemap, property URL y rutas de API.
 */
export const searchConsoleConfig = {
  /** Property preferida (URL-prefix con www). */
  siteUrl: 'https://www.gard.cl/',
  /** Variantes que GSC puede registrar según cómo se verificó el dominio. */
  propertyCandidates: [
    'https://www.gard.cl/',
    'https://gard.cl/',
    'sc-domain:gard.cl',
  ] as const,
  sitemapUrl: 'https://www.gard.cl/sitemap.xml',
  robotsUrl: 'https://www.gard.cl/robots.txt',
  /** País objetivo en International Targeting (config manual en GSC). */
  geoTarget: 'Chile (CL)' as const,
} as const;

export type SearchConsoleConfig = typeof searchConsoleConfig;
