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
  
  // Descripción dinámica optimizada con palabras clave y específica por industria y servicio
  let description = '';
  
  // Construir descripciones específicas por combinación de industria/servicio
  if (servicio.includes('guardias')) {
    if (industria === 'retail') {
      description = `Guardias de seguridad especializados en retail. Prevenimos robos, controlamos accesos y protegemos tiendas con personal capacitado. Soluciones 24/7 para comercios en Chile.`;
    } else if (industria === 'construccion') {
      description = `Guardias especializados para obras y faenas de construcción. Control de acceso, vigilancia de materiales y prevención de robos. Servicio certificado y confiable 24/7.`;
    } else if (industria === 'mineria') {
      description = `Guardias de seguridad capacitados para yacimientos mineros. Control de acceso, vigilancia perimetral y monitoreo de activos críticos. Personal certificado para entornos de alto riesgo.`;
    } else if (industria === 'hospitales') {
      description = `Guardias de seguridad para hospitales y clínicas. Control de visitas, protección de areas restringidas y seguridad para pacientes y personal médico. Servicio 24/7 discreto y eficiente.`;
    } else if (industria === 'logistica') {
      description = `Guardias de seguridad para bodegas y centros de distribución. Controlamos accesos, supervisamos carga/descarga y protegemos inventario. Servicio profesional para empresas de logística.`;
    } else {
      description = `Guardias de seguridad profesionales para ${industriaFormatted}. Personal capacitado que asegura la protección de tus instalaciones, control de acceso y vigilancia permanente 24/7.`;
    }
  } else if (servicio.includes('camaras') || servicio.includes('cctv')) {
    if (industria === 'retail') {
      description = `Sistemas de cámaras de seguridad para retail. Vigilancia de tiendas, detección de robos y analítica para prevención de pérdidas. Monitoreo remoto 24/7 para comercios.`;
    } else if (industria === 'construccion') {
      description = `Cámaras de seguridad para obras en construcción. Vigilancia de materiales, monitoreo de personal y prevención de intrusiones. Sistemas adaptados a entornos de construcción.`;
    } else if (industria === 'mineria') {
      description = `Cámaras de seguridad industriales para minería. Vigilancia de perímetros extensos, monitoreo de operaciones y zonas críticas. Equipos resistentes para condiciones extremas.`;
    } else {
      description = `Sistemas de cámaras de seguridad para ${industriaFormatted}. Monitoreo continuo, detección temprana de incidentes y videoanálisis inteligente con respaldo en la nube.`;
    }
  } else if (servicio.includes('alarmas')) {
    if (industria === 'retail') {
      description = `Sistemas de alarma para tiendas y comercios. Detección de intrusos, botones de pánico y conexión directa a central de monitoreo. Protección integral para negocios retail.`;
    } else if (industria === 'industrial') {
      description = `Alarmas industriales de alta seguridad. Detección temprana de intrusiones, sistemas contra incendios y sensores especializados para plantas industriales. Monitoreo 24/7.`;
    } else {
      description = `Sistemas de alarma profesionales para ${industriaFormatted}. Detectamos intrusiones, alertamos en tiempo real y coordinamos respuesta inmediata con nuestra central de monitoreo.`;
    }
  } else if (servicio.includes('monitoreo')) {
    description = `Central de monitoreo 24/7 para ${industriaFormatted}. Vigilancia remota permanente, verificación de alertas y coordinación inmediata ante incidentes. Tecnología avanzada y operadores certificados.`;
  } else if (servicio.includes('control-acceso')) {
    description = `Sistemas de control de acceso para ${industriaFormatted}. Tecnología biométrica, tarjetas de proximidad, gestión de visitas y registro detallado de entradas y salidas. Seguridad integral.`;
  } else {
    // Descripción genérica mejorada si no hay una específica
    description = `${servicioFormatted} de alta calidad para ${industriaFormatted}. Tecnología avanzada, personal capacitado y soluciones a medida. Protegemos tu negocio con servicios profesionales certificados.`;
  }
  
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