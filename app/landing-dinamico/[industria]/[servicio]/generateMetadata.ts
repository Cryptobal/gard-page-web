import { Metadata } from 'next';
import getLandingText from '@/lib/data/landingText';

// Tipos para los parámetros
type Props = {
  params: {
    industria: string;
    servicio: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Función para generar metadatos dinámicos
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { industria, servicio } = params;
  
  // Obtener textos dinámicos según industria y servicio
  const landingText = getLandingText(industria, servicio);
  
  // Capitalizar primera letra y formatear para legibilidad
  const industriaFormatted = industria.charAt(0).toUpperCase() + industria.slice(1).replace(/-/g, ' ');
  const servicioFormatted = servicio.charAt(0).toUpperCase() + servicio.slice(1).replace(/-/g, ' ');
  
  // Título dinámico optimizado para SEO con variación según industria
  let title = '';

  // Crear título único basado en la combinación específica
  if (industria === 'construccion') {
    title = `${servicioFormatted} Profesional para ${industriaFormatted} | Gard Security`;
  } else if (industria === 'hospitales') {
    title = `${servicioFormatted} Especializado para ${industriaFormatted} y Clínicas | Gard Security`;
  } else if (industria === 'mineria') {
    title = `${servicioFormatted} Industrial para ${industriaFormatted} | Gard Security`;
  } else if (industria === 'retail') {
    title = `${servicioFormatted} para ${industriaFormatted} y Tiendas | Gard Security`;
  } else if (industria === 'logistica') {
    title = `${servicioFormatted} para Empresas de ${industriaFormatted} | Gard Security`;
  } else if (industria === 'industrial') {
    title = `${servicioFormatted} para Plantas ${industriaFormatted}es | Gard Security`;
  } else {
    title = `${servicioFormatted} para ${industriaFormatted} | Servicio Profesional | Gard Security`;
  }
  
  // Descripción dinámica optimizada con palabras clave
  const description = `Protección profesional para ${industriaFormatted} con tecnología avanzada en ${servicioFormatted.toLowerCase()}. Solicita tu cotización sin compromiso y asegura tu negocio con expertos.`;
  
  // URL canónica
  const url = `https://gard.cl/landing-dinamico/${industria}/${servicio}`;
  
  // Imagen OG
  const ogImage = landingText.imageId 
    ? `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${landingText.imageId}/public` 
    : 'https://gard.cl/images/og-image.jpg';
  
  // Extraer UTM params y gclid para tracking
  const utm_source = searchParams.utm_source || '';
  const utm_medium = searchParams.utm_medium || '';
  const utm_campaign = searchParams.utm_campaign || '';
  const gclid = searchParams.gclid || '';
  
  // Generar alternates para diferentes versiones de la URL con parámetros UTM preservados
  let canonicalUrl = url;
  
  // Si la URL tiene parámetros UTM y es una campaña específica, mantener el canonical sin UTMs
  // pero permitir versiones alternativas
  const alternates = {
    canonical: canonicalUrl,
    languages: {
      'es-CL': canonicalUrl,
    },
  };
  
  // Generar keywords más específicas basadas en la industria y servicio
  const baseKeywords = [
    'seguridad', 
    `${servicio.replace(/-/g, ' ')}`, 
    `${industria.replace(/-/g, ' ')}`,
    'empresas de seguridad', 
    'protección', 
    'Chile', 
    'Gard Security'
  ];
  
  // Añadir keywords específicas basadas en el servicio
  let servicioKeywords: string[] = [];
  if (servicio.includes('guardias')) {
    servicioKeywords = ['guardias de seguridad', 'vigilantes', 'personal de seguridad', 'control de acceso'];
  } else if (servicio.includes('camaras')) {
    servicioKeywords = ['cámaras de vigilancia', 'CCTV', 'video vigilancia', 'monitoreo remoto'];
  } else if (servicio.includes('alarmas')) {
    servicioKeywords = ['sistemas de alarma', 'sensores', 'detección de intrusión', 'monitoreo 24/7'];
  }
  
  // Añadir keywords específicas basadas en la industria
  let industriaKeywords: string[] = [];
  if (industria.includes('retail')) {
    industriaKeywords = ['tiendas', 'centros comerciales', 'prevención de pérdidas', 'seguridad retail'];
  } else if (industria.includes('industrial')) {
    industriaKeywords = ['plantas industriales', 'bodegas', 'control perimetral', 'seguridad industrial'];
  } else if (industria.includes('corporativo')) {
    industriaKeywords = ['oficinas', 'edificios corporativos', 'control de acceso', 'seguridad empresarial'];
  }
  
  // Combinar y filtrar keywords duplicadas
  const allKeywords = [...baseKeywords, ...servicioKeywords, ...industriaKeywords];
  const uniqueKeywords = Array.from(new Set(allKeywords)).join(', ');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Gard Security',
      locale: 'es_CL',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${servicioFormatted} para ${industriaFormatted} - Gard Security`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@GardSecurity',
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
      'geo.placename': 'Santiago',
      'og:locale': 'es_CL',
      'og:type': 'website',
      'twitter:site': '@GardSecurity',
    },
  };
}

export default generateMetadata; 