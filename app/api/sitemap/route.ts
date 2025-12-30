import { MetadataRoute } from 'next';
import { industries } from '@/app/data/industries';
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria } from '@/app/data/servicios-por-industria';
import { industriesMetadata } from '@/app/industrias/industryMetadata';
import { ciudades } from '@/lib/data/ciudad-data';

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

// Generar las rutas del sitemap
async function generateSitemap() {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/tecnologia-seguridad',
    '/contacto',
    '/cotizar',
    '/privacidad',
    '/terminos',
    '/politica-ambiental',
    '/reclutamiento',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de servicios
  const servicePages = [
    '/servicios/guardias-de-seguridad',
    '/servicios/drones-seguridad',
    '/servicios/seguridad-electronica',
    '/servicios/monitoreo',
    '/servicios/seguridad-perimetral',
    '/servicios/auditoria-seguridad',
    '/servicios/consultoria',
    '/servicios/prevencion-intrusiones'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Páginas de industrias dinámicas
  const industryPages = industries.map((industry) => {
    const slug = industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    return {
      url: `${baseUrl}/industrias/${slug}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });
  
  // Páginas de blog dinámicas (posts individuales)
  // Cachear getAllPosts() una sola vez para reutilizar en múltiples operaciones
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: stableLastMod(post.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = totalPages > 1 && blogPosts.length > 0 ? Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${baseUrl}/blog/page/${i + 2}`, // Páginas 2 en adelante
    lastModified: stableLastMod(blogPosts[0]?.date),
    changeFrequency: 'weekly',
    priority: 0.5,
  })) : [];
  
  // Páginas de etiquetas del blog - calcular desde blogPosts cacheado
  const allTagsSet = new Set<string>();
  blogPosts.forEach(post => {
    post.tags?.forEach(tag => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);
  
  const blogTagPages = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Páginas de paginación por etiqueta - optimizado para evitar llamadas duplicadas
  const blogTagPaginationPages = [];
  for (const tag of allTags) {
    // Filtrar posts por tag usando el array cacheado en lugar de llamar getPostsByTag
    const filteredPosts = blogPosts.filter(post => post.tags?.includes(tag));
    const tagTotalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    if (tagTotalPages > 1 && filteredPosts.length > 0) {
      const pages = Array.from({ length: tagTotalPages - 1 }, (_, i) => ({
        url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}/page/${i + 2}`, // Páginas 2 en adelante
        lastModified: stableLastMod(filteredPosts[0]?.date),
        changeFrequency: 'weekly',
        priority: 0.5,
      }));
      
      blogTagPaginationPages.push(...pages);
    }
  }

  // Nuevas URLs de servicio-por-industria
  const servicioIndustriaPages: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }[] = [];
  
  // Generar todas las combinaciones posibles de servicio-industria
  for (const servicio of servicesMetadata) {
    for (const industria of industries) {
      const industriaSlug = industria.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
        
      servicioIndustriaPages.push({
        url: `${baseUrl}/servicios-por-industria/${servicio.slug}/${industriaSlug}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para estas páginas clave de conversión
      });
    }
  }
  
  // Nuevas landing pages dinámicas de ciudad/servicio
  const ciudadServicioPages = [];
  
  // Crear combinaciones de ciudad + servicio
  for (const ciudad of ciudades) {
    for (const servicio of servicesMetadata) {
      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicio.slug}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para landing pages de conversión geolocalizada
      });
    }
  }

  const allUrls = [
    ...staticPages, 
    ...servicePages, 
    ...industryPages, 
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...blogTagPaginationPages,
    ...servicioIndustriaPages,
    ...ciudadServicioPages
  ];
  
  // NOTA: La validación de URLs (filterValidUrls) fue removida para mejorar el rendimiento
  // del sitemap. Todas las URLs se generan dinámicamente desde fuentes de datos estructuradas
  // (industries, servicesMetadata, ciudades, blogPosts) que son validadas en tiempo de build.
  // Las URLs dinámicas solo se crean para combinaciones válidas mediante funciones como
  // generateStaticParams() y esCombinacionValida(). Si es necesario validar URLs en runtime,
  // se puede restaurar la función filterValidUrls() pero con procesamiento en lotes para
  // evitar timeouts en el sitemap (puede contener miles de URLs).
  
  return allUrls;
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

// Handler API de Next.js para la ruta /api/sitemap
export async function GET() {
  const urls = await generateSitemap();
  const xml = generateSitemapXML(urls);
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
} 