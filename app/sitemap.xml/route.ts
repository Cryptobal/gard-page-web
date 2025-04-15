import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';
import { isValidUrl, hasNoindexMetaTag } from '@/lib/utils';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria, esCombinacionValida } from '../data/servicios-por-industria';

// Función para verificar y filtrar URLs mejorada
async function filterValidUrls(urls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[]) {
  console.log(`Verificando ${urls.length} URLs para el sitemap...`);
  
  // Agrupar las URLs en lotes más pequeños para procesarlas eficientemente
  const batchSize = 5; // Reducimos a 5 por lote para evitar problemas de rendimiento
  const validUrls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[] = [];
  
  // Función para procesar un lote de URLs
  const processBatch = async (batch: typeof urls) => {
    // Verificar todas las URLs en el lote en paralelo
    const results = await Promise.allSettled(
      batch.map(async (urlItem) => {
        try {
          // Paso 1: Verificar redirecciones con HEAD request
          const response = await fetch(urlItem.url, { 
            method: 'HEAD',
            redirect: 'manual' // No seguir redirecciones automáticamente
          });
          
          // Si la URL redirecciona, no incluirla en el sitemap
          if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('location');
            console.log(`URL con redirección excluida: ${urlItem.url} -> ${redirectUrl || 'destino desconocido'}`);
            return { urlItem, valid: false, reason: 'redirect' };
          }
          
          // Si la URL no devuelve 200, no incluirla
          if (response.status !== 200) {
            console.log(`URL con estado no-200 excluida: ${urlItem.url} (${response.status})`);
            return { urlItem, valid: false, reason: 'non-200' };
          }
          
          // Paso 2: Verificar si la página tiene noindex
          const hasNoindex = await hasNoindexMetaTag(urlItem.url);
          if (hasNoindex) {
            console.log(`URL con noindex excluida: ${urlItem.url}`);
            return { urlItem, valid: false, reason: 'noindex' };
          }
          
          // Si pasa todas las verificaciones, es válida
          return { urlItem, valid: true };
        } catch (error) {
          console.error(`Error al verificar URL ${urlItem.url}:`, error);
          return { urlItem, valid: false, reason: 'error' };
        }
      })
    );
    
    // Procesar los resultados
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.valid) {
        validUrls.push(result.value.urlItem);
      }
    });
  };
  
  // Procesar las URLs en lotes
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await processBatch(batch);
    console.log(`Progreso: ${Math.min(i + batchSize, urls.length)}/${urls.length} URLs procesadas`);
  }
  
  console.log(`URLs válidas para sitemap: ${validUrls.length} de ${urls.length}`);
  return validUrls;
}

// Función para generar las URLs del sitemap
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
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de servicios principales
  const servicePages = servicesMetadata.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: new Date().toISOString(),
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
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });
  
  // Nuevas URLs de servicio-por-industria
  const servicioIndustriaPages: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }[] = [];
  
  // Generar combinaciones de servicio-por-industria usando la función esCombinacionValida
  for (const servicio of servicesMetadata) {
    for (const industria of industries) {
      const industriaSlug = industria.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      // Solo incluir combinaciones válidas
      if (esCombinacionValida(servicio.slug, industriaSlug)) {
        servicioIndustriaPages.push({
          url: `${baseUrl}/servicios-por-industria/${servicio.slug}/${industriaSlug}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly', // Actualizado a semanal para mejor indexación
          priority: 0.9,
        });
      }
    }
  }
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog (solo la primera página adicional)
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = totalPages > 1 ? [
    {
      url: `${baseUrl}/blog/page/2`, // Solo incluimos la página 2 como referencia
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }
  ] : [];
  
  // Nuevas landing pages dinámicas de ciudad/servicio - solo las combinaciones más relevantes
  const ciudadServicioPages = [];
  
  // Extraer los slugs de los servicios del array importado
  const servicioSlugs = servicesMetadata.map(servicio => servicio.slug);
  
  // Crear combinaciones prioritarias de ciudad + servicio para reducir la cantidad total
  // Seleccionamos solo las 5 ciudades principales y los 4 servicios más importantes
  const ciudadesPrincipales = ciudades.slice(0, 5); // Solo las 5 primeras ciudades
  const serviciosPrincipales = [
    'guardias-de-seguridad',
    'seguridad-electronica',
    'central-monitoreo',
    'drones-seguridad'
  ];
  
  for (const ciudad of ciudadesPrincipales) {
    for (const servicioSlug of serviciosPrincipales) {
      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicioSlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para landing pages de conversión geolocalizada
      });
    }
  }

  // Combinamos todas las URLs
  const allUrls = [
    ...staticPages, 
    ...servicePages, 
    ...industryPages,
    ...servicioIndustriaPages,
    ...blogPostPages, 
    ...blogPaginationPages,
    ...ciudadServicioPages
  ];
  
  // Filtrar URLs para incluir solo las válidas (200 OK, sin redirecciones, sin noindex)
  return await filterValidUrls(allUrls);
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

// Handler para la ruta sitemap.xml
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