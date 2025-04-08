import { CiudadData, ciudades } from './ciudad-data';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

export interface CiudadServicioContent {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  descripcion: string;
  subtitle?: string;
  videoId?: string;
  beneficios: string[];
  casosDeUso: string[];
  features?: {
    title: string;
    description: string;
    iconName?: string;
  }[];
  referenciasLocales?: {
    barrios?: string[];
    zonasComerciales?: string[];
    puntosReferencia?: string[];
  };
  estadisticas?: {
    indiceDelincuencia?: number;
    tipoDelincuenciaPrincipal?: string;
    incidenciaRobos?: number;
  };
  casosExito?: {
    cliente: string;
    descripcion: string;
    resultado: string;
  }[];
  testimonios?: {
    nombre: string;
    cargo: string;
    empresa: string;
    texto: string;
    imageId?: string;
  }[];
  zonasCriticas: {
    titulo: string;
    descripcion: string;
    zonas: string[];
  };
  preguntasFrecuentes: {
    pregunta: string;
    respuesta: string;
  }[];
  ctaTexto: string;
  imageId?: string;
}

interface ServicioBase {
  slug: string;
  title: string;
  description: string;
}

/**
 * Obtiene datos combinados de ciudad y servicio para generar contenido de landing pages
 */
export const getCiudadServicioContent = (
  ciudadSlug: string,
  servicioSlug: string
): CiudadServicioContent | null => {
  // Buscar la ciudad por slug
  const ciudad = ciudades.find((c) => c.slug === ciudadSlug);
  if (!ciudad) return null;

  // Buscar el servicio por slug
  const servicio = servicesMetadata.find((s) => s.slug === servicioSlug) as ServicioBase;
  if (!servicio) return null;

  // Generar contenido dinámico basado en la combinación de ciudad y servicio
  return generarContenidoDinamico(ciudad, servicio);
};

/**
 * Genera contenido dinámico personalizado para cada combinación ciudad-servicio
 */
const generarContenidoDinamico = (
  ciudad: CiudadData,
  servicio: ServicioBase
): CiudadServicioContent => {
  // Extraer nombre del servicio sin la parte "| Gard Security"
  const nombreServicio = servicio.title.split('|')[0].trim();
  const servicioBase = servicioSlugToNombre(servicio.slug);

  // Crear título único SEO-friendly
  const title = `${servicioBase} en ${ciudad.nombre} ${ciudad.region} | Gard Security`;
  
  // Crear meta description con contexto local
  const metaDescription = `Servicio profesional de ${servicioBase.toLowerCase()} en ${ciudad.nombre}. Soluciones de seguridad adaptadas a las necesidades específicas de ${ciudad.nombre} y sus sectores como ${ciudad.barriosImportantes.slice(0, 3).join(', ')}.`;
  
  // Crear H1 único y optimizado
  const h1 = `${servicioBase} en ${ciudad.nombre} - Expertos en Seguridad Local`;
  
  // Crear texto introductorio personalizado
  const intro = `Gard Security ofrece servicios especializados de ${servicioBase.toLowerCase()} en ${ciudad.nombre}, con personal capacitado y soluciones adaptadas a las características únicas de la ${ciudad.region}.`;
  
  // Crear descripción detallada combinando datos de ciudad y servicio
  const descripcion = `
    Nuestro servicio de ${servicioBase.toLowerCase()} en ${ciudad.nombre} está diseñado considerando las características geográficas y desafíos de seguridad específicos de la zona. ${ciudad.descripcion} 
    
    Entendemos que ${ciudad.nombre} presenta necesidades de seguridad particulares debido a su geografía de ${ciudad.geografia.toLowerCase()} y actividades económicas centradas en ${ciudad.industriasClave.slice(0, 3).join(', ')}.
    
    Nuestro equipo local cuenta con amplio conocimiento de ${ciudad.nombre} y sus sectores, brindando una respuesta rápida y efectiva ante cualquier incidente.
  `.trim();
  
  // Generar beneficios personalizados según ciudad y servicio
  const beneficios = generarBeneficios(ciudad, servicioBase);
  
  // Crear casos de uso específicos para la combinación
  const casosDeUso = generarCasosDeUso(ciudad, servicioBase);
  
  // Información sobre zonas críticas y cómo se abordan
  const zonasCriticas = {
    titulo: `Seguridad especializada para zonas críticas de ${ciudad.nombre}`,
    descripcion: `En ${ciudad.nombre}, identificamos sectores que requieren atención especial en términos de seguridad. Nuestro servicio de ${servicioBase.toLowerCase()} se adapta a las necesidades específicas de cada zona:`,
    zonas: ciudad.zonasCriticas.map(zona => `${zona}: Plan de seguridad personalizado con ${getRandomSecurityFeature(servicioBase)}`)
  };
  
  // Generar preguntas frecuentes contextualmente relevantes
  const preguntasFrecuentes = generarFAQs(ciudad, servicioBase);
  
  // Texto para Call-to-Action
  const ctaTexto = `Solicitar ${servicioBase} en ${ciudad.nombre}`;
  
  // ID de imagen (podría ser dinámico según combinación)
  const imageId = getImageIdByService(servicio.slug);
  
  return {
    title,
    metaDescription,
    h1,
    intro,
    descripcion,
    beneficios,
    casosDeUso,
    zonasCriticas,
    preguntasFrecuentes,
    ctaTexto,
    imageId
  };
};

/**
 * Convierte el slug del servicio a un nombre legible
 */
const servicioSlugToNombre = (slug: string): string => {
  const nombresServicios: Record<string, string> = {
    'guardias-de-seguridad': 'Guardias de Seguridad',
    'seguridad-electronica': 'Seguridad Electrónica',
    'central-monitoreo': 'Central de Monitoreo',
    'drones-seguridad': 'Drones de Seguridad',
    'seguridad-perimetral': 'Seguridad Perimetral',
    'auditoria-seguridad': 'Auditoría de Seguridad',
    'consultoria': 'Consultoría en Seguridad',
    'prevencion-intrusiones': 'Prevención de Intrusiones'
  };
  
  return nombresServicios[slug] || 'Servicio de Seguridad';
};

/**
 * Genera beneficios personalizados según ciudad y servicio
 */
const generarBeneficios = (ciudad: CiudadData, servicioNombre: string): string[] => {
  // Combinar necesidades de seguridad de la ciudad con beneficios del servicio
  const beneficiosBase = [
    `Personal con conocimiento local de ${ciudad.nombre} y sus sectores`,
    `Respuesta inmediata ante incidentes en toda el área de ${ciudad.nombre}`,
    `Tecnología de punta adaptada a las condiciones de ${ciudad.region}`
  ];
  
  // Añadir beneficios específicos según servicio y ciudad
  if (servicioNombre.includes('Guardias')) {
    beneficiosBase.push(
      `Guardias capacitados en las problemáticas específicas de ${ciudad.nombre}`,
      `Uniformados o de civil según las necesidades del sector`
    );
  } else if (servicioNombre.includes('Electrónica')) {
    beneficiosBase.push(
      `Sistemas adaptados al clima y geografía de ${ciudad.nombre}`,
      `Monitoreo remoto con conocimiento de puntos críticos locales`
    );
  } else if (servicioNombre.includes('Monitoreo')) {
    beneficiosBase.push(
      `Conocimiento detallado de los tiempos de respuesta en ${ciudad.nombre}`,
      `Coordinación directa con autoridades locales`
    );
  } else if (servicioNombre.includes('Drones')) {
    beneficiosBase.push(
      `Cobertura de áreas extensas adaptada a la geografía de ${ciudad.nombre}`,
      `Vigilancia aérea de zonas de difícil acceso en ${ciudad.region}`
    );
  }
  
  return beneficiosBase;
};

/**
 * Genera casos de uso específicos para la combinación ciudad-servicio
 */
const generarCasosDeUso = (ciudad: CiudadData, servicioNombre: string): string[] => {
  const casosBase: string[] = [];
  
  // Añadir casos según industrias clave de la ciudad
  ciudad.industriasClave.forEach(industria => {
    if (industria.includes('Minería')) {
      casosBase.push(`Protección de instalaciones mineras y transporte de minerales en la región de ${ciudad.region}`);
    } else if (industria.includes('Turismo')) {
      casosBase.push(`Seguridad para hoteles, restaurantes y zonas turísticas de ${ciudad.nombre}`);
    } else if (industria.includes('Comercio')) {
      casosBase.push(`Protección de centros comerciales y retail en ${ciudad.nombre}`);
    } else if (industria.includes('Portuaria') || industria.includes('Logística')) {
      casosBase.push(`Seguridad especializada para instalaciones portuarias y logísticas en ${ciudad.nombre}`);
    } else if (industria.includes('Educación')) {
      casosBase.push(`Protección para instituciones educativas en ${ciudad.nombre}`);
    } else if (industria.includes('Financieros')) {
      casosBase.push(`Seguridad para entidades financieras y bancarias en ${ciudad.nombre}`);
    }
  });
  
  // Añadir casos según servicio
  if (servicioNombre.includes('Guardias')) {
    casosBase.push(
      `Control de acceso y vigilancia en edificios corporativos de ${ciudad.nombre}`,
      `Seguridad para eventos masivos en ${ciudad.nombre}`
    );
  } else if (servicioNombre.includes('Electrónica')) {
    casosBase.push(
      `Sistemas de CCTV para monitoreo de áreas comerciales en ${ciudad.nombre}`,
      `Control de acceso para condominios y edificios residenciales`
    );
  }
  
  // Limitar a 5 casos máximo
  return casosBase.slice(0, 5);
};

/**
 * Genera preguntas frecuentes contextuales
 */
const generarFAQs = (ciudad: CiudadData, servicioNombre: string): { pregunta: string; respuesta: string }[] => {
  return [
    {
      pregunta: `¿Cuál es el tiempo de respuesta de ${servicioNombre} en ${ciudad.nombre}?`,
      respuesta: `Nuestro tiempo de respuesta en ${ciudad.nombre} varía según el sector, pero garantizamos atención inmediata en menos de 15 minutos en el área urbana y tiempos optimizados para sectores más alejados como ${ciudad.barriosImportantes[ciudad.barriosImportantes.length - 1]}.`
    },
    {
      pregunta: `¿Tienen personal local en ${ciudad.nombre} para el servicio de ${servicioNombre}?`,
      respuesta: `Sí, contamos con personal 100% local en ${ciudad.nombre}, lo que nos permite conocer en detalle la ciudad, sus sectores, rutas y particularidades de seguridad. Esto garantiza una respuesta más eficiente y adaptada a las necesidades específicas de la zona.`
    },
    {
      pregunta: `¿Qué sectores de ${ciudad.nombre} cubren con su servicio de ${servicioNombre}?`,
      respuesta: `Cubrimos todos los sectores de ${ciudad.nombre} incluyendo: ${ciudad.barriosImportantes.join(', ')} y áreas periféricas. Nuestro servicio se adapta a las necesidades específicas de cada zona.`
    },
    {
      pregunta: `¿Cómo adaptan el servicio de ${servicioNombre} a las características de ${ciudad.nombre}?`,
      respuesta: `Adaptamos nuestros servicios considerando factores como la geografía ${ciudad.geografia.toLowerCase()}, las actividades económicas predominantes (${ciudad.industriasClave.slice(0, 3).join(', ')}), y las necesidades específicas de seguridad de ${ciudad.nombre}. Realizamos un análisis personalizado para cada cliente.`
    },
    {
      pregunta: `¿Cuál es el costo de ${servicioNombre} en ${ciudad.nombre}?`,
      respuesta: `El costo varía según las necesidades específicas, dimensiones de la propiedad, nivel de riesgo y requerimientos particulares. Ofrecemos una cotización personalizada gratuita para clientes en ${ciudad.nombre}. Contáctenos para una evaluación sin compromiso.`
    }
  ];
};

/**
 * Retorna una característica aleatoria de seguridad según el tipo de servicio
 */
const getRandomSecurityFeature = (servicioNombre: string): string => {
  if (servicioNombre.includes('Guardias')) {
    const features = [
      'patrullaje constante',
      'control de acceso especializado',
      'personal capacitado en situaciones de riesgo',
      'protocolos de emergencia específicos'
    ];
    return features[Math.floor(Math.random() * features.length)];
  } else if (servicioNombre.includes('Electrónica')) {
    const features = [
      'cámaras de alta definición',
      'sistemas de detección temprana',
      'analítica de video inteligente',
      'reconocimiento facial'
    ];
    return features[Math.floor(Math.random() * features.length)];
  } else if (servicioNombre.includes('Monitoreo')) {
    const features = [
      'monitoreo 24/7',
      'respuesta coordinada con autoridades',
      'alertas en tiempo real',
      'verificación remota de alarmas'
    ];
    return features[Math.floor(Math.random() * features.length)];
  } else {
    const features = [
      'protocolos de seguridad avanzados',
      'tecnología de última generación',
      'personal especializado',
      'soluciones adaptadas al sector'
    ];
    return features[Math.floor(Math.random() * features.length)];
  }
};

/**
 * Retorna un ID de imagen según el servicio
 */
const getImageIdByService = (servicioSlug: string): string => {
  const imageIds: Record<string, string> = {
    'guardias-de-seguridad': '5eea1064-8a2d-4e8b-5606-d28775467a00',
    'seguridad-electronica': '678cad4f-9b0d-49e6-3bbd-0d747a2fdc00',
    'central-monitoreo': '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
    'drones-seguridad': '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
    'seguridad-perimetral': '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    'auditoria-seguridad': '428c1028-8f6b-455a-e110-38421eeb5700',
    'consultoria': '4824f8b9-abb0-4e77-c654-efe920697b00',
    'prevencion-intrusiones': 'eeaf472c-ab11-448b-f5e2-d18415147800'
  };
  
  return imageIds[servicioSlug] || '5eea1064-8a2d-4e8b-5606-d28775467a00';
}; 