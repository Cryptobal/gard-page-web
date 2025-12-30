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
  
  // Título y descripción con el formato solicitado
  const title = `${servicioFormatted} para ${industriaFormatted} | Seguridad Especializada en ${industriaFormatted} | Gard Security`;
  const description = `Protección con ${servicio.replace(/-/g, ' ')} especializado para el rubro ${industria.replace(/-/g, ' ')}. Soluciones avanzadas con Gard Security.`;
  
  // URL canónica
  const url = `https://www.gard.cl/landing-dinamico/${industria}/${servicio}`;
  
  // Imagen OG
  const ogImage = landingText.imageId 
    ? `https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/${landingText.imageId}/public` 
    : 'https://www.gard.cl/images/og-image.jpg';
  
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
    servicioKeywords = [
      'guardias de seguridad', 
      'vigilantes', 
      'personal de seguridad', 
      'control de acceso',
      'OS-10',
      'guardias certificados',
      'empresa de guardias',
      'servicio de vigilancia'
    ];
  } else if (servicio.includes('camaras')) {
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
  } else if (servicio.includes('alarmas')) {
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
  } else if (servicio.includes('monitoreo')) {
    servicioKeywords = [
      'monitoreo 24/7',
      'central de monitoreo',
      'vigilancia remota',
      'supervisión de seguridad',
      'central de operaciones',
      'vigilancia electrónica',
      'respuesta a alarmas'
    ];
  } else if (servicio.includes('control-acceso')) {
    servicioKeywords = [
      'control de acceso',
      'acceso biométrico',
      'tarjetas de proximidad',
      'registro de visitantes',
      'torniquetes',
      'control de entradas',
      'identificación automática'
    ];
  }
  
  // Añadir keywords específicas basadas en la industria
  let industriaKeywords: string[] = [];
  if (industria === 'retail') {
    industriaKeywords = [
      'tiendas', 
      'centros comerciales', 
      'prevención de pérdidas', 
      'seguridad retail',
      'tiendas comerciales',
      'antihurto',
      'seguridad en tiendas',
      'retail en Chile'
    ];
  } else if (industria === 'industrial') {
    industriaKeywords = [
      'plantas industriales', 
      'bodegas', 
      'control perimetral', 
      'seguridad industrial',
      'fábricas',
      'seguridad en plantas',
      'perímetros industriales',
      'industria en Chile'
    ];
  } else if (industria === 'hospitales') {
    industriaKeywords = [
      'clínicas',
      'hospitales',
      'centros médicos',
      'seguridad sanitaria',
      'instalaciones médicas',
      'sector salud',
      'seguridad en hospitales',
      'seguridad clínica'
    ];
  } else if (industria === 'construccion') {
    industriaKeywords = [
      'obras',
      'faenas',
      'construcción',
      'seguridad en obras',
      'sitios de construcción',
      'obras de construcción',
      'proyectos constructivos',
      'seguridad en faenas'
    ];
  } else if (industria === 'mineria') {
    industriaKeywords = [
      'yacimientos',
      'minería',
      'faenas mineras',
      'seguridad minera',
      'minas',
      'proyectos mineros',
      'operaciones mineras',
      'minería en Chile'
    ];
  } else if (industria === 'logistica') {
    industriaKeywords = [
      'centros de distribución',
      'bodegas',
      'almacenes',
      'logística',
      'cadena de suministro',
      'distribución',
      'seguridad en bodegas',
      'seguridad logística'
    ];
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
      siteName: 'Gard Security Chile',
      locale: 'es_CL',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${servicioFormatted} profesional para ${industriaFormatted} - Gard Security Chile`,
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
      'geo.placename': 'Santiago',
      'og:locale': 'es_CL',
      'og:type': 'website',
      'twitter:site': '@GardSecurity',
      'og:title': title,
      'og:image:alt': `${servicioFormatted} profesional para ${industriaFormatted} - Gard Security Chile`,
      'twitter:title': title,
      'twitter:image:alt': `${servicioFormatted} profesional para ${industriaFormatted} - Gard Security Chile`,
      'author': 'Gard Security Chile',
      'og:site_name': 'Gard Security Chile',
    },
  };
}

export default generateMetadata; 