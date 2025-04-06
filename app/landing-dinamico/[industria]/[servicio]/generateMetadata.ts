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
  
  // Título dinámico optimizado para SEO con variación según industria y servicio
  let title = '';
  let descriptor = '';
  
  // Añadir descriptores específicos según el servicio para diferenciación
  if (servicio.includes('guardias')) {
    descriptor = 'Vigilancia profesional';
  } else if (servicio.includes('camaras') || servicio.includes('cctv')) {
    descriptor = 'Videovigilancia HD';
  } else if (servicio.includes('alarmas')) {
    descriptor = 'Detección inmediata';
  } else if (servicio.includes('monitoreo')) {
    descriptor = 'Supervisión remota';
  } else if (servicio.includes('control-acceso')) {
    descriptor = 'Gestión de ingresos';
  } else {
    descriptor = 'Protección integral';
  }

  // Crear título único basado en la combinación específica de industria y servicio
  if (industria === 'construccion') {
    if (servicio.includes('guardias')) {
      title = `Guardias de Seguridad para Construcción | ${descriptor} en Obras | Gard Security`;
    } else if (servicio.includes('camaras')) {
      title = `Cámaras de Seguridad para Construcción | CCTV en Obras | Gard Security`;
    } else if (servicio.includes('control-acceso')) {
      title = `Control de Acceso para Obras | Registro de Ingresos en Construcción | Gard Security`;
    } else {
      title = `${servicioFormatted} para Construcción | ${descriptor} en Obras | Gard Security`;
    }
  } else if (industria === 'hospitales') {
    if (servicio.includes('guardias')) {
      title = `Guardias de Seguridad para Hospitales | ${descriptor} Clínica Sanitaria | Gard Security`;
    } else if (servicio.includes('camaras')) {
      title = `Cámaras de Seguridad para Hospitales | CCTV en Clínicas | Gard Security`;
    } else if (servicio.includes('alarmas')) {
      title = `Alarmas para Hospitales | Sistemas de Alerta en Clínicas | Gard Security`;
    } else {
      title = `${servicioFormatted} para Sector Salud | ${descriptor} en Hospitales | Gard Security`;
    }
  } else if (industria === 'mineria') {
    if (servicio.includes('guardias')) {
      title = `Guardias de Seguridad para Minería | ${descriptor} en Yacimientos | Gard Security`;
    } else if (servicio.includes('monitoreo')) {
      title = `Monitoreo Remoto para Minería | Control a Distancia de Yacimientos | Gard Security`;
    } else if (servicio.includes('control-acceso')) {
      title = `Control de Acceso para Minería | Gestión de Ingresos en Yacimientos | Gard Security`;
    } else {
      title = `${servicioFormatted} para Sector Minero | ${descriptor} en Yacimientos | Gard Security`;
    }
  } else if (industria === 'retail') {
    if (servicio.includes('guardias')) {
      title = `Guardias para Retail | ${descriptor} Anti-Hurto en Tiendas | Gard Security`;
    } else if (servicio.includes('camaras')) {
      title = `Cámaras para Retail | CCTV y Prevención de Pérdidas en Tiendas | Gard Security`;
    } else if (servicio.includes('alarmas')) {
      title = `Alarmas para Retail | Sistemas Anti-Hurto en Tiendas | Gard Security`;
    } else {
      title = `${servicioFormatted} para Sector Retail | ${descriptor} en Tiendas | Gard Security`;
    }
  } else if (industria === 'logistica') {
    if (servicio.includes('guardias')) {
      title = `Guardias para Logística | ${descriptor} en Bodegas y Distribución | Gard Security`;
    } else if (servicio.includes('control-acceso')) {
      title = `Control de Acceso para Logística | Gestión de Ingresos en Centros de Distribución | Gard Security`;
    } else {
      title = `${servicioFormatted} para Empresas de Logística | ${descriptor} en Distribución | Gard Security`;
    }
  } else if (industria === 'industrial') {
    if (servicio.includes('control-acceso')) {
      title = `Control de Acceso Industrial | Gestión de Ingresos en Plantas | Gard Security`;
    } else if (servicio.includes('camaras')) {
      title = `Cámaras de Seguridad Industrial | CCTV en Plantas y Fábricas | Gard Security`;
    } else {
      title = `${servicioFormatted} para Industrias | ${descriptor} en Plantas | Gard Security`;
    }
  } else {
    // Si es una combinación no específicamente cubierta, crear un título único que incluya ambos elementos
    title = `${servicioFormatted} para ${industriaFormatted} | ${descriptor} Profesional | Gard Security Chile`;
  }
  
  // Descripción dinámica optimizada con palabras clave y específica por industria y servicio
  let description = '';
  
  // Construir descripciones específicas por combinación de industria/servicio
  if (servicio.includes('guardias')) {
    if (industria === 'retail') {
      description = `Guardias de seguridad especializados en retail. Prevenimos robos, controlamos accesos y protegemos tiendas con personal capacitado en prevención de pérdidas. Soluciones 24/7 para retail en Chile.`;
    } else if (industria === 'construccion') {
      description = `Guardias especializados para obras y faenas de construcción en Chile. Control de acceso, vigilancia de materiales y prevención de robos con personal OS-10. Servicio certificado 24/7 en Santiago y regiones.`;
    } else if (industria === 'mineria') {
      description = `Guardias de seguridad capacitados para yacimientos mineros en Chile. Control de acceso especializado, vigilancia perimetral y monitoreo con personal certificado para entornos mineros de alto riesgo.`;
    } else if (industria === 'hospitales') {
      description = `Guardias de seguridad para hospitales y clínicas en Chile. Control de visitas, protección de áreas restringidas y seguridad sanitaria. Servicio 24/7 discreto y protocolo COVID para centros médicos.`;
    } else if (industria === 'logistica') {
      description = `Guardias de seguridad para bodegas y centros logísticos en Chile. Controlamos accesos, supervisamos carga/descarga y protegemos inventario con personal certificado OS-10 para empresas de logística.`;
    } else if (industria === 'industrial') {
      description = `Guardias de seguridad para plantas industriales en Chile. Control de acceso a instalaciones, vigilancia de perímetros y protección de activos críticos con personal certificado 24/7 para industrias.`;
    } else {
      description = `Guardias de seguridad profesionales para ${industriaFormatted} en Chile. Personal OS-10 capacitado que garantiza la protección de tus instalaciones, control de acceso y vigilancia permanente 24/7.`;
    }
  } else if (servicio.includes('camaras') || servicio.includes('cctv')) {
    if (industria === 'retail') {
      description = `Sistemas de cámaras CCTV para retail en Chile. Vigilancia HD de tiendas, analítica anti-hurto y monitoreo para prevención de pérdidas. Instalación profesional y monitoreo remoto 24/7 para comercios.`;
    } else if (industria === 'construccion') {
      description = `Cámaras de seguridad para obras en construcción en Chile. Vigilancia HD de materiales, monitoreo de personal y prevención de intrusiones. Sistemas resistentes adaptados a entornos de construcción.`;
    } else if (industria === 'mineria') {
      description = `Cámaras de seguridad industriales para minería en Chile. Vigilancia de perímetros extensos, monitoreo de operaciones y zonas críticas. Equipos certificados para condiciones extremas en yacimientos.`;
    } else if (industria === 'hospitales') {
      description = `Cámaras de seguridad para hospitales y clínicas en Chile. Vigilancia discreta de accesos, salas de espera y áreas sensibles. Sistemas CCTV HD con protocolos de privacidad para entornos sanitarios.`;
    } else if (industria === 'logistica') {
      description = `Cámaras de seguridad para centros logísticos en Chile. Vigilancia de almacenes, zonas de carga y control de operaciones. Sistemas CCTV con analítica para cadenas de suministro y distribución.`;
    } else if (industria === 'industrial') {
      description = `Cámaras de seguridad industrial para plantas y fábricas en Chile. Vigilancia de procesos productivos, perímetros y áreas críticas. Sistemas CCTV resistentes con certificación para entornos industriales.`;
    } else {
      description = `Sistemas de cámaras de seguridad profesionales para ${industriaFormatted} en Chile. Videovigilancia HD, detección temprana de incidentes y análisis inteligente con respaldo en la nube y monitoreo 24/7.`;
    }
  } else if (servicio.includes('alarmas')) {
    if (industria === 'retail') {
      description = `Sistemas de alarma para tiendas y comercios en Chile. Detección de intrusos, botones de pánico y conexión directa a central de monitoreo. Protección integral anti-hurto para negocios retail 24/7.`;
    } else if (industria === 'industrial') {
      description = `Alarmas industriales de alta seguridad para plantas en Chile. Detección temprana de intrusiones, sistemas contra incendios y sensores especializados para entornos industriales. Monitoreo continuo 24/7.`;
    } else if (industria === 'hospitales') {
      description = `Sistemas de alarma para hospitales y clínicas en Chile. Protección de áreas restringidas, farmacia y equipamiento médico con alertas silenciosas. Monitoreo especializado para sector salud 24/7.`;
    } else {
      description = `Sistemas de alarma profesionales para ${industriaFormatted} en Chile. Detectamos intrusiones con tecnología avanzada, alertamos en tiempo real y coordinamos respuesta inmediata con nuestra central de monitoreo.`;
    }
  } else if (servicio.includes('monitoreo')) {
    if (industria === 'mineria') {
      description = `Monitoreo remoto para yacimientos mineros en Chile. Vigilancia 24/7 de perímetros extensos, instalaciones críticas y operaciones. Respuesta coordinada inmediata con tecnología satelital para zonas aisladas.`;
    } else if (industria === 'industrial') {
      description = `Monitoreo remoto para plantas industriales en Chile. Vigilancia 24/7 de procesos productivos, perímetros y zonas críticas. Central de operaciones con personal especializado en seguridad industrial.`;
    } else {
      description = `Central de monitoreo 24/7 para ${industriaFormatted} en Chile. Vigilancia remota permanente, verificación de alarmas y coordinación inmediata ante incidentes. Operadores certificados y tecnología de última generación.`;
    }
  } else if (servicio.includes('control-acceso')) {
    if (industria === 'industrial') {
      description = `Control de acceso para plantas industriales en Chile. Sistemas biométricos, tarjetas de proximidad y registro centralizado para empleados y contratistas. Gestión de visitas y control de activos para industrias.`;
    } else if (industria === 'mineria') {
      description = `Control de acceso para yacimientos mineros en Chile. Sistemas de alta seguridad para personal, vehículos y activos. Identificación biométrica y gestión de contratistas especializada para minería.`;
    } else if (industria === 'hospitales') {
      description = `Control de acceso para hospitales y clínicas en Chile. Restricción de áreas sensibles, gestión de visitas y registro de personal médico. Soluciones integradas para la seguridad sanitaria.`;
    } else {
      description = `Sistemas de control de acceso para ${industriaFormatted} en Chile. Tecnología biométrica, tarjetas de proximidad, gestión de visitas y registro detallado de entradas y salidas. Seguridad integral personalizada.`;
    }
  } else {
    // Descripción genérica mejorada si no hay una específica
    description = `${servicioFormatted} profesional para ${industriaFormatted} en Chile. Tecnología avanzada de seguridad, personal certificado y soluciones personalizadas. Protegemos tu negocio con servicios certificados y experiencia comprobada.`;
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
      title: `${title} | Empresa Líder en Seguridad`,
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
      title: `${title} | Seguridad Profesional`,
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
      'og:title': `${title} | Empresa Líder en Seguridad`,
      'og:image:alt': `${servicioFormatted} profesional para ${industriaFormatted} - Gard Security Chile`,
      'twitter:title': `${title} | Seguridad Profesional`,
      'twitter:image:alt': `${servicioFormatted} profesional para ${industriaFormatted} - Gard Security Chile`,
      'author': 'Gard Security Chile',
      'og:site_name': 'Gard Security Chile',
    },
  };
}

export default generateMetadata; 