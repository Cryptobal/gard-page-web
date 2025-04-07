import { Metadata } from 'next';
import { getCiudadBySlug } from '@/lib/data/ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { getCiudadServicioContent } from '@/lib/data/ciudad-servicio';
import getLandingText from '@/lib/data/landingText';
import { traducirSlugServicio } from '@/lib/servicios-mapping';
import { cloudflareImages } from '@/lib/images';

// Tipos para los parámetros
type Props = {
  params: {
    ciudad: string;
    servicio: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Función para generar metadatos dinámicos
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { ciudad: ciudadSlug, servicio: servicioSlug } = params;
  
  // Obtener datos de la ciudad y servicio
  const ciudad = getCiudadBySlug(ciudadSlug);
  const servicioMetadata = servicesMetadata.find(s => s.slug === servicioSlug);
  
  // Si no existe la ciudad o servicio, usar metadatos generales
  if (!ciudad || !servicioMetadata) {
    return {
      title: 'Servicio de Seguridad | Gard Security Chile',
      description: 'Soluciones de seguridad personalizadas para empresas en todo Chile. Guardias, cámaras de seguridad, monitoreo y más.'
    };
  }
  
  // Traducir el slug de la URL al slug usado en los datos
  const servicioSlugDatos = traducirSlugServicio(servicioSlug);
  
  // Obtener textos genéricos del servicio
  const servicioGenerico = getLandingText(servicioSlug, servicioSlugDatos);
  
  // Obtener el contenido personalizado para ciudad-servicio
  const contenido = getCiudadServicioContent(ciudadSlug, servicioSlugDatos, ciudad, servicioGenerico);
  
  // Capitalizar y formatear para legibilidad
  const ciudadFormatted = ciudad.nombre;
  const servicioFormatted = servicioSlug.charAt(0).toUpperCase() + servicioSlug.slice(1).replace(/-/g, ' ');
  
  // Título dinámico con la nueva estructura optimizada para SEO
  const title = `${servicioFormatted} en ${ciudadFormatted} | Servicios Profesionales de Seguridad | Gard Security`;
  
  // Descripción dinámica con llamado a la acción clara y directa
  const description = `Contrata ${servicioSlug.replace(/-/g, ' ')} en ${ciudadFormatted} con Gard Security. Protección confiable, rápida y personalizada para tu empresa o proyecto.`;
  
  // URL canónica
  const url = `https://gard.cl/ciudades/${ciudadSlug}/${servicioSlug}`;
  
  // Imagen OG - manejar caso cuando contenido es nulo
  const defaultImage = `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${cloudflareImages.hero.services}/public`;
  const ogImage = contenido && contenido.imageId 
    ? `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${contenido.imageId}/public` 
    : defaultImage;
  
  // Extraer UTM params y gclid para tracking
  const utm_source = searchParams.utm_source || '';
  const utm_medium = searchParams.utm_medium || '';
  const utm_campaign = searchParams.utm_campaign || '';
  const gclid = searchParams.gclid || '';
  
  // Generar alternates para diferentes versiones de la URL
  const canonicalUrl = url;
  
  const alternates = {
    canonical: canonicalUrl,
    languages: {
      'es-CL': canonicalUrl,
    },
  };
  
  // Generar keywords más específicas basadas en la ciudad y servicio
  const baseKeywords = [
    'seguridad', 
    `${servicioSlug.replace(/-/g, ' ')}`, 
    `${ciudadFormatted}`,
    'empresas de seguridad', 
    'protección', 
    'Chile', 
    'Gard Security'
  ];
  
  // Añadir keywords específicas basadas en el servicio
  let servicioKeywords: string[] = [];
  if (servicioSlug.includes('guardias')) {
    servicioKeywords = [
      'guardias de seguridad', 
      'vigilantes', 
      'personal de seguridad', 
      'control de acceso',
      'OS-10',
      'guardias certificados',
      'empresa de guardias',
      'servicio de vigilancia',
      'empresa de seguridad',
      'guardias vip',
      'guardias para empresas',
      'seguridad privada',
      'empresas de seguridad',
      'servicio de guardias de seguridad',
      'empresas de seguridad privada',
      'servicios de seguridad',
      'guardias de seguridad privada',
      'empresa de seguridad privada',
      'vigilantes privados'
    ];
  } else if (servicioSlug.includes('camaras')) {
    servicioKeywords = [
      'cámaras de vigilancia', 
      'CCTV', 
      'video vigilancia', 
      'monitoreo remoto',
      'cámaras HD',
      'cámaras IP',
      'cámaras con IA',
      'analítica de video',
      'detección de movimiento'
    ];
  } else if (servicioSlug.includes('alarmas')) {
    servicioKeywords = [
      'sistemas de alarma', 
      'sensores', 
      'detección de intrusión', 
      'monitoreo 24/7',
      'alarmas conectadas',
      'respuesta inmediata',
      'central de alarmas',
      'alertas en tiempo real'
    ];
  } else if (servicioSlug.includes('monitoreo')) {
    servicioKeywords = [
      'monitoreo 24/7',
      'central de monitoreo',
      'vigilancia remota',
      'supervisión de seguridad',
      'central de operaciones',
      'vigilancia electrónica',
      'respuesta a alarmas'
    ];
  }
  
  // Añadir keywords específicas basadas en la ciudad
  const ciudadKeywords = [
    `seguridad en ${ciudadFormatted}`,
    `protección en ${ciudadFormatted}`,
    `empresa de seguridad ${ciudadFormatted}`,
    `${servicioFormatted} ${ciudadFormatted}`
  ];
  
  // Combinar y filtrar keywords duplicadas
  const allKeywords = [...baseKeywords, ...servicioKeywords, ...ciudadKeywords];
  const uniqueKeywords = Array.from(new Set(allKeywords)).join(', ');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Gard Security Chile',
      locale: 'es_CL',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${servicioFormatted} profesional en ${ciudadFormatted} - Gard Security Chile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@GardSecurity',
      site: '@GardSecurity',
    },
    alternates,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords: uniqueKeywords,
    // Metaetiquetas adicionales para SEO
    other: {
      'theme-color': '#1e3a8a',
      'format-detection': 'telephone=no',
      'geo.region': 'CL',
      'geo.placename': ciudad.nombre,
      'og:locale': 'es_CL',
      'og:type': 'website',
      'twitter:site': '@GardSecurity',
      'og:title': title,
      'og:image:alt': `${servicioFormatted} profesional en ${ciudadFormatted} - Gard Security Chile`,
      'twitter:title': title,
      'twitter:image:alt': `${servicioFormatted} profesional en ${ciudadFormatted} - Gard Security Chile`,
      'author': 'Gard Security Chile',
      'og:site_name': 'Gard Security Chile',
    },
  };
}

export default generateMetadata; 