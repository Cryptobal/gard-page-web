import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';
import { isValidUrl } from '@/lib/utils';
import { ciudades } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { serviciosPorIndustria } from '../data/servicios-por-industria';

// Función para verificar y filtrar URLs
async function filterValidUrls(urls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[]) {
  console.log(`Verificando ${urls.length} URLs...`);
  
  // Agrupar las URLs en lotes para procesarlas de forma más eficiente
  const batchSize = 10; // Procesar 10 URLs a la vez
  const validUrls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[] = [];
  
  // Función para procesar un lote de URLs
  const processBatch = async (batch: typeof urls) => {
    // Verificar todas las URLs en el lote en paralelo
    const results = await Promise.allSettled(
      batch.map(async (urlItem) => {
        const isValid = await isValidUrl(urlItem.url);
        return { urlItem, isValid };
      })
    );
    
    // Filtrar las URLs válidas
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.isValid) {
        validUrls.push(result.value.urlItem);
      } else if (result.status === 'fulfilled') {
        console.log(`URL no válida (redirección o error): ${result.value.urlItem.url}`);
      }
    });
  };
  
  // Procesar las URLs en lotes
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await processBatch(batch);
    console.log(`Progreso: ${Math.min(i + batchSize, urls.length)}/${urls.length} URLs procesadas`);
  }
  
  console.log(`URLs válidas: ${validUrls.length} de ${urls.length}`);
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

  // URLs antiguas que ahora son redirecciones (no se incluyen en el sitemap)
  // '/automatizacion-y-domotica',
  // '/drones-de-seguridad-para-empresas-e-industrias',
  // '/guardias-de-seguridad-privada-para-empresas',
  // '/noticias-de-seguridad-privada',
  // '/servicios-de-seguridad-privada',
  // '/tecnologias',

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

  // Combinaciones prioritarias de servicio-industria
  const servicioIndustriaPrioritarias = [
    {servicio: 'guardias-de-seguridad', industria: 'retail'},
    {servicio: 'guardias-de-seguridad', industria: 'mineria'},
    {servicio: 'drones-seguridad', industria: 'mineria'},
    {servicio: 'seguridad-electronica', industria: 'retail'},
    {servicio: 'central-monitoreo', industria: 'edificios-corporativos'},
    {servicio: 'auditoria-seguridad', industria: 'instituciones-publicas'},
    {servicio: 'consultoria', industria: 'edificios-corporativos'},
    {servicio: 'prevencion-intrusiones', industria: 'parques-industriales'}
  ];

  const combinacionesPages = servicioIndustriaPrioritarias.map(({ servicio, industria }) => ({
    url: `${baseUrl}/servicios/${servicio}/${industria}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));
  
  // Nuevas URLs de servicio-por-industria
  const servicioIndustriaPages: {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }[] = [];
  
  // Generar todas las combinaciones válidas de servicio-industria
  serviciosPorIndustria.forEach(item => {
    const industria = item.industria;
    item.servicios.forEach(servicio => {
      servicioIndustriaPages.push({
        url: `${baseUrl}/servicios-por-industria/${servicio}/${industria}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para estas páginas clave de conversión
      });
    });
  });
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog principal (solo la primera página adicional)
  // Se limita la paginación para evitar URLs no canónicas
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = totalPages > 1 ? [
    {
      url: `${baseUrl}/blog/page/2`, // Solo incluimos la página 2 como referencia
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }
  ] : [];
  
  // Páginas de etiquetas del blog (solo las páginas principales, sin paginación)
  const allTags = await getAllTags();
  const blogTagPages = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Se elimina completamente la sección de paginación por etiqueta que está causando los errores
  // const blogTagPaginationPages = [];
  // for (const tag of allTags) { ... }
  
  // Nuevas landing pages dinámicas de ciudad/servicio
  const ciudadServicioPages = [];
  
  // Extraer los slugs de los servicios del array importado
  const servicioSlugs = servicesMetadata.map(servicio => servicio.slug);
  
  // Crear combinaciones de ciudad + servicio
  for (const ciudad of ciudades) {
    for (const servicioSlug of servicioSlugs) {
      ciudadServicioPages.push({
        url: `${baseUrl}/${ciudad.slug}/${servicioSlug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para landing pages de conversión geolocalizada
      });
    }
  }

  const allUrls = [
    ...staticPages, 
    ...servicePages, 
    ...industryPages,
    ...combinacionesPages, 
    ...servicioIndustriaPages,
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...ciudadServicioPages // Añadimos las nuevas páginas de ciudad/servicio
  ];
  
  // Filtrar URLs para incluir solo las que devuelven código 200
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