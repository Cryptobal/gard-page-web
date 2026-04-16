import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';

// Revalidar el sitemap cada 24 horas (ISR) en lugar de regenerar por request.
// Esto mejora performance y reduce carga en el servidor sin afectar la frecuencia
// con la que Google recrawlea el sitemap (Google respeta cache headers pero relee regularmente).
export const revalidate = 86400;
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria, esCombinacionValida } from '../data/servicios-por-industria';

const STATIC_LASTMOD = process.env.SITE_LASTMOD ?? '2025-10-09T00:00:00.000Z';

const stableLastMod = (date?: string | null): string => {
  // Si no hay fecha o es una cadena vacía, usar STATIC_LASTMOD
  if (!date || typeof date !== 'string' || date.trim() === '') {
    return STATIC_LASTMOD;
  }
  
  try {
    const parsed = new Date(date);
    // Verificar si la fecha es válida
    if (isNaN(parsed.getTime())) {
      return STATIC_LASTMOD;
    }
    
    // Verificar que la fecha esté en un rango razonable (años 1970-2100)
    const year = parsed.getFullYear();
    if (year < 1970 || year > 2100) {
      return STATIC_LASTMOD;
    }
    
    // Intentar generar el ISO string
    const isoString = parsed.toISOString();
    
    // Verificar que el resultado sea válido
    if (!isoString || isoString.length === 0) {
      return STATIC_LASTMOD;
    }
    
    return isoString;
  } catch (error) {
    // Si hay cualquier error al parsear, usar STATIC_LASTMOD
    console.warn(`Error parsing date "${date}":`, error);
    return STATIC_LASTMOD;
  }
};

// Priorización de industrias según enfoque B2B
const INDUSTRIAS_PRIORITARIAS = [
  'mineria', 
  'bodegas', 
  'transporte-y-logistica', 
  'edificios-corporativos', 
  'construccion', 
  'parques-industriales',
  'manufactura',
  'sector-energetico'
];

const INDUSTRIAS_SECUNDARIAS = [
  'retail', 
  'salud', 
  'sector-financiero', 
  'centros-comerciales',
  'puertos-terminales',
  'centros-de-datos',
  'farmaceutica',
  'agroindustria',
  'instituciones-publicas',
  'infraestructura-critica'
];

const INDUSTRIAS_BAJA_PRIORIDAD = [
  'eventos-y-espectaculos', 
  'hoteleria-y-turismo', 
  'condominios-residenciales',
  'educacion',
  'instalaciones-deportivas'
];

// Función helper para obtener prioridad y frecuencia por industria
function getIndustriaPriority(industriaSlug: string): { priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' } {
  if (INDUSTRIAS_PRIORITARIAS.includes(industriaSlug)) {
    return { priority: 0.95, changeFrequency: 'weekly' };
  }
  if (INDUSTRIAS_SECUNDARIAS.includes(industriaSlug)) {
    return { priority: 0.75, changeFrequency: 'monthly' };
  }
  return { priority: 0.5, changeFrequency: 'yearly' };
}

// Función para generar las URLs del sitemap optimizada
async function generateSitemap() {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas principales con prioridades ajustadas
  const staticPages = [
    { route: '', priority: 1.0, changeFreq: 'weekly' as const },
    { route: '/servicios', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/industrias', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/ciudades', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/cotizar', priority: 0.95, changeFreq: 'weekly' as const }, // Página de conversión
    { route: '/sobre-nosotros', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/tecnologia-seguridad', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/contacto', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/blog', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/privacidad', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terminos', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/politica-ambiental', priority: 0.4, changeFreq: 'yearly' as const },
    { route: '/reclutamiento', priority: 0.6, changeFreq: 'monthly' as const },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: changeFreq,
    priority,
  }));

  // Landing pages ultra-específicas para keywords comerciales (MÁXIMA PRIORIDAD SEO)
  const landingPagesEspecificas = [
    // Top commercial intent - nacionales
    { route: '/mejor-empresa-seguridad-chile', priority: 0.99, changeFreq: 'weekly' as const },
    { route: '/empresa-seguridad-privada-chile', priority: 0.99, changeFreq: 'weekly' as const },
    { route: '/empresa-guardias-seguridad-chile', priority: 0.99, changeFreq: 'weekly' as const },
    { route: '/ranking-empresas-seguridad-chile-2025', priority: 0.98, changeFreq: 'weekly' as const },

    // Landing por vertical de industria
    { route: '/guardias-seguridad-mineria-chile', priority: 0.98, changeFreq: 'weekly' as const },
    { route: '/seguridad-bodegas-logistica-chile', priority: 0.98, changeFreq: 'weekly' as const },
    { route: '/guardias-edificios-corporativos-santiago', priority: 0.98, changeFreq: 'weekly' as const },
    { route: '/seguridad-construccion-santiago', priority: 0.95, changeFreq: 'weekly' as const },

    // Landing por ciudad (complementa la matriz ciudad×servicio)
    { route: '/guardias-seguridad-antofagasta', priority: 0.95, changeFreq: 'weekly' as const },
    { route: '/guardias-seguridad-valparaiso', priority: 0.95, changeFreq: 'weekly' as const },

    // Landing informacionales con alto volumen de búsqueda
    { route: '/cuanto-cuesta-guardia-seguridad-chile', priority: 0.97, changeFreq: 'weekly' as const },
    { route: '/certificacion-os10-guardias-seguridad', priority: 0.96, changeFreq: 'weekly' as const },

    // Landing B2B keyword-rich (URL larga, evaluación alta)
    { route: '/guardias-de-seguridad-privada-para-empresas', priority: 0.97, changeFreq: 'weekly' as const },

    // Páginas comparativas vs competidores (Fase 3)
    { route: '/vs', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/vs/prosegur-alternativa', priority: 0.88, changeFreq: 'monthly' as const },
    { route: '/vs/g4s-alternativa', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/vs/securitas-alternativa', priority: 0.85, changeFreq: 'monthly' as const },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: changeFreq,
    priority,
  }));

  // Páginas de servicios principales (prioridad alta para conversión)
  const servicePages = servicesMetadata.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'weekly' as const,
    priority: 0.85, // Alta prioridad para páginas de servicios
  }));

  // Pre-calcular slugs de industrias para evitar normalización redundante en bucles
  const industriesWithSlugs = industries.map(industry => ({
    ...industry,
    slug: industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
  }));

  // Páginas de industrias dinámicas con prioridades diferenciadas
  const industryPages = industriesWithSlugs.map((industry) => {
    const { priority, changeFrequency } = getIndustriaPriority(industry.slug);
    
    return {
      url: `${baseUrl}/industrias/${industry.slug}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency,
      priority,
    };
  });
  
  // URLs de servicio-por-industria con prioridades diferenciadas por industria
  const servicioIndustriaPages = [];
  
  for (const servicio of servicesMetadata) {
    for (const industria of industriesWithSlugs) {
      if (esCombinacionValida(servicio.slug, industria.slug)) {
        const { priority: basePriority, changeFrequency } = getIndustriaPriority(industria.slug);
        // Las páginas servicio+industria tienen +0.05 de prioridad sobre las páginas de industria sola
        const priority = Math.min(basePriority + 0.05, 1.0);
        
        servicioIndustriaPages.push({
          url: `${baseUrl}/servicios-por-industria/${servicio.slug}/${industria.slug}`,
          lastModified: STATIC_LASTMOD,
          changeFrequency,
          priority,
        });
      }
    }
  }
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: stableLastMod(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog — TODAS las páginas, no solo page 2
  const totalBlogPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = Array.from(
    { length: Math.max(0, totalBlogPages - 1) },
    (_, i) => ({
      url: `${baseUrl}/blog/page/${i + 2}`,
      lastModified: stableLastMod(blogPosts[i]?.date ?? blogPosts[0]?.date),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })
  );

  // Páginas de etiquetas del blog (computar desde blogPosts en memoria, evita N+1)
  const allBlogTags = Array.from(
    new Set(blogPosts.flatMap((p) => p.tags ?? []))
  );

  const blogTagPages = allBlogTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Páginas de paginación por etiqueta
  const blogTagPaginationPages: Array<{
    url: string;
    lastModified: string;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }> = [];

  for (const tag of allBlogTags) {
    const countForTag = blogPosts.filter((p) => p.tags?.includes(tag)).length;
    const tagTotalPages = Math.ceil(countForTag / POSTS_PER_PAGE);
    if (tagTotalPages > 1) {
      for (let i = 0; i < tagTotalPages - 1; i++) {
        blogTagPaginationPages.push({
          url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}/page/${i + 2}`,
          lastModified: STATIC_LASTMOD,
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      }
    }
  }
  
  // Landing pages dinámicas de ciudad/servicio - MATRIZ COMPLETA 10×8 = 80 URLs
  const ciudadServicioPages = [];

  // Ciudades principales (metropolitanas y mineras) — mayor prioridad SEO
  const ciudadesPrincipales = ['santiago', 'antofagasta', 'valparaiso', 'concepcion'];

  // Servicios principales (alto intent B2B) — mayor prioridad
  const serviciosPrincipales = [
    'guardias-de-seguridad',
    'seguridad-electronica',
    'central-monitoreo',
    'seguridad-perimetral',
  ];

  // Servicios secundarios (nicho / evaluación) — prioridad moderada
  const serviciosSecundarios = [
    'drones-seguridad',
    'auditoria-seguridad',
    'consultoria',
    'prevencion-intrusiones',
  ];

  // Iterar TODOS los servicios (8) × TODAS las ciudades (10) = 80 combinaciones
  for (const ciudad of ciudades) {
    const esCiudadPrincipal = ciudadesPrincipales.includes(ciudad.slug);

    // Combinar ambos grupos de servicios
    const todosLosServicios = [
      ...serviciosPrincipales.map(s => ({ slug: s, esPrincipal: true })),
      ...serviciosSecundarios.map(s => ({ slug: s, esPrincipal: false })),
    ];

    for (const { slug: servicioSlug, esPrincipal } of todosLosServicios) {
      // Priorización 4-cuadrantes:
      //   Ciudad principal + Servicio principal   → 0.92 (alto SEO comercial)
      //   Ciudad principal + Servicio secundario  → 0.80
      //   Ciudad regional  + Servicio principal   → 0.78
      //   Ciudad regional  + Servicio secundario  → 0.65
      let priority: number;
      let changeFrequency: 'weekly' | 'monthly' | 'yearly';

      if (esCiudadPrincipal && esPrincipal) {
        priority = 0.92;
        changeFrequency = 'weekly';
      } else if (esCiudadPrincipal && !esPrincipal) {
        priority = 0.80;
        changeFrequency = 'monthly';
      } else if (!esCiudadPrincipal && esPrincipal) {
        priority = 0.78;
        changeFrequency = 'monthly';
      } else {
        priority = 0.65;
        changeFrequency = 'monthly';
      }

      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicioSlug}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency,
        priority,
      });
    }
  }

  // Combinamos todas las URLs — orden importa solo para humanos (Google las reordena igual)
  return [
    ...staticPages,
    ...landingPagesEspecificas,    // Landing pages de conversión (máxima prioridad)
    ...servicePages,               // /servicios/{slug}
    ...servicioIndustriaPages,     // /servicios-por-industria/{servicio}/{industria}
    ...ciudadServicioPages,        // /{ciudad}/{servicio} — matriz 10×8
    ...industryPages,              // /industrias/{slug}
    ...blogPostPages,              // /blog/{slug}
    ...blogPaginationPages,        // /blog/page/2, /3, ... (todas)
    ...blogTagPages,               // /blog/tag/{tag}
    ...blogTagPaginationPages,     // /blog/tag/{tag}/page/2, /3, ...
  ];
}

// Generar el XML del sitemap
function generateSitemapXML(urls: {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastModified}</lastmod>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`).join('\n')}
</urlset>`;
}

// Handler para la ruta sitemap.xml con cache optimizado
export async function GET() {
  const urls = await generateSitemap();
  const xml = generateSitemapXML(urls);
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache por 24 horas
    },
  });
} 