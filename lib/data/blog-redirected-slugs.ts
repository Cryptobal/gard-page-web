/**
 * Slugs de posts del blog con redirect 308 permanente en next.config.js.
 * No deben aparecer en sitemap, listados, tags ni posts relacionados.
 *
 * Mantener sincronizado con la sección de redirects /blog/* en next.config.js.
 */
export const REDIRECTED_BLOG_SLUGS = [
  // Consolidado en /blog/drones-seguridad-privada-chile (GSC soft 404, PR #87).
  'innovacion-en-seguridad-privada-drones-en-seguridad',
  // Precios CLP inventados + teléfono NAP obsoleto — consolidado en money page comercial.
  'cuanto-cuesta-contratar-guardias-seguridad-chile-2025',
] as const;

export type RedirectedBlogSlug = (typeof REDIRECTED_BLOG_SLUGS)[number];

const redirectedBlogSlugSet = new Set<string>(REDIRECTED_BLOG_SLUGS);

export function isRedirectedBlogSlug(slug: string): boolean {
  return redirectedBlogSlugSet.has(slug);
}
