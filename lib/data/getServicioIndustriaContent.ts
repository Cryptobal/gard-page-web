import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { industriesMetadata } from '@/app/industrias/industryMetadata';
import { getServicioIndustriaData, ServicioIndustriaData } from '@/app/data/servicios-por-industria';

export interface ServicioIndustriaContent {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  descripcion: string;
  beneficios: string[];
  casosDeUso: string[];
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
  videoId?: string;
}

interface ServicioBase {
  slug: string;
  title: string;
  description: string;
}

interface IndustriaBase {
  slug: string;
  title: string;
  description: string;
}

/**
 * Obtiene datos combinados de servicio e industria para generar contenido de landing pages
 */
export const getServicioIndustriaContent = (
  servicioSlug: string,
  industriaSlug: string
): ServicioIndustriaContent | null => {
  // Buscar el servicio por slug
  const servicio = servicesMetadata.find((s) => s.slug === servicioSlug) as ServicioBase;
  if (!servicio) return null;

  // Buscar la industria por slug
  const industria = industriesMetadata.find((i) => i.slug === industriaSlug) as IndustriaBase;
  if (!industria) return null;

  // Generar contenido dinámico basado en la combinación de servicio e industria
  return generarContenidoDinamico(servicio, industria);
};

/**
 * Genera contenido dinámico personalizado para cada combinación servicio-industria
 */
const generarContenidoDinamico = (
  servicio: ServicioBase,
  industria: IndustriaBase
): ServicioIndustriaContent => {
  // Extraer nombre del servicio sin la parte "| Gard Security"
  const nombreServicio = servicio.title.split('|')[0].trim();
  const servicioBase = servicioSlugToNombre(servicio.slug);
  
  // Extraer nombre de la industria sin la parte "| Gard Security"
  const nombreIndustriaCompleto = industria.title.split('|')[0].trim();
  // Limpiamos el nombre de la industria para evitar duplicar "Seguridad para"
  const nombreIndustria = nombreIndustriaCompleto
    .replace(/^Seguridad (para|en) (la |los |las )?/i, '')
    .replace(/^Guardias (para|en) (la |los |las )?/i, '');
    
  // Formato simple para referencias internas
  const industriaBase = industria.slug.replace(/-/g, ' ');

  // Obtener datos específicos de esta combinación servicio-industria si existen
  const datosEspecificos = getServicioIndustriaData(servicio.slug, industria.slug);

  // Crear título único SEO-friendly
  const title = `${servicioBase} para ${nombreIndustria} | Gard Security`;
  
  // Crear meta description con contexto específico
  const metaDescription = `Servicio profesional de ${servicioBase.toLowerCase()} para ${nombreIndustria}. Soluciones de seguridad adaptadas a las necesidades específicas del sector.`;
  
  // Crear H1 único y optimizado
  const h1 = `${servicioBase} para ${nombreIndustria} - Especialistas en Seguridad`;
  
  // Crear texto introductorio personalizado
  const intro = datosEspecificos.description || 
    `Gard Security ofrece servicios especializados de ${servicioBase.toLowerCase()} para ${nombreIndustria}, con personal capacitado y soluciones adaptadas a las características únicas de esta industria.`;
  
  // Crear descripción detallada combinando datos del servicio e industria
  const descripcion = `
    Nuestro servicio de ${servicioBase.toLowerCase()} para el sector de ${nombreIndustria} está diseñado considerando los desafíos y características específicas de esta industria. ${servicio.description}
    
    Entendemos que el sector de ${nombreIndustria} presenta necesidades de seguridad particulares que requieren un enfoque especializado y adaptado a los riesgos específicos.
    
    Nuestro equipo cuenta con amplia experiencia en la protección de empresas del sector ${nombreIndustria}, brindando una respuesta rápida y efectiva ante cualquier incidente.
  `.trim();
  
  // Generar beneficios personalizados según industria y servicio
  const beneficios = datosEspecificos.soluciones || generarBeneficios(nombreIndustria, servicioBase);
  
  // Crear casos de uso específicos para la combinación
  const casosDeUso = generarCasosDeUso(nombreIndustria, servicioBase, datosEspecificos);
  
  // Información sobre zonas críticas y cómo se abordan
  const zonasCriticas = {
    titulo: `Protección para puntos críticos en ${nombreIndustria}`,
    descripcion: `En el sector ${nombreIndustria}, identificamos áreas que requieren atención especial en términos de seguridad. Nuestro servicio de ${servicioBase.toLowerCase()} se adapta a las necesidades específicas de cada punto crítico:`,
    zonas: generarZonasCriticas(nombreIndustria, servicioBase)
  };
  
  // Generar preguntas frecuentes contextualmente relevantes
  const preguntasFrecuentes = generarFAQs(nombreIndustria, servicioBase);
  
  // Texto para Call-to-Action
  const ctaTexto = `Solicitar ${servicioBase} para ${nombreIndustria}`;
  
  // ID de imagen (podría ser dinámico según combinación)
  const imageId = getImageIdByIndustria(industria.slug);

  // ID de video (según la combinación servicio-industria)
  const videoId = getVideoIdForCombination(servicio.slug, industria.slug);
  
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
    imageId,
    videoId
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
 * Genera beneficios personalizados según industria y servicio
 */
const generarBeneficios = (industriaNombre: string, servicioNombre: string): string[] => {
  // Beneficios base según el tipo de servicio
  const beneficiosBase = [
    `Personal especializado en el sector ${industriaNombre}`,
    `Respuesta inmediata ante incidentes en instalaciones de ${industriaNombre}`,
    `Tecnología de punta adaptada a las necesidades del sector ${industriaNombre}`
  ];
  
  // Añadir beneficios específicos según servicio e industria
  if (servicioNombre.includes('Guardias')) {
    beneficiosBase.push(
      `Guardias capacitados en los riesgos específicos del sector ${industriaNombre}`,
      `Protocolos de seguridad diseñados para instalaciones de ${industriaNombre}`
    );
  } else if (servicioNombre.includes('Electrónica')) {
    beneficiosBase.push(
      `Sistemas adaptados a la infraestructura típica del sector ${industriaNombre}`,
      `Monitoreo remoto con conocimiento de puntos críticos en ${industriaNombre}`
    );
  } else if (servicioNombre.includes('Monitoreo')) {
    beneficiosBase.push(
      `Monitoreo 24/7 especializado para instalaciones de ${industriaNombre}`,
      `Coordinación directa con autoridades y equipos de respuesta`
    );
  } else if (servicioNombre.includes('Drones')) {
    beneficiosBase.push(
      `Cobertura aérea de grandes extensiones típicas del sector ${industriaNombre}`,
      `Vigilancia de áreas de difícil acceso en instalaciones de ${industriaNombre}`
    );
  }
  
  return beneficiosBase;
};

/**
 * Genera casos de uso específicos para la combinación industria-servicio
 */
const generarCasosDeUso = (industriaNombre: string, servicioNombre: string, datosEspecificos: ServicioIndustriaData): string[] => {
  // Si hay un caso de éxito específico, utilizarlo
  if (datosEspecificos.casoExito) {
    return [datosEspecificos.casoExito];
  }
  
  // De lo contrario, generar casos genéricos
  const casosBase: string[] = [
    `Implementación exitosa de ${servicioNombre.toLowerCase()} para una importante empresa del sector ${industriaNombre}, logrando reducir incidentes de seguridad en un 70%`,
    `Diseño e implementación de un sistema integral de seguridad para proteger activos críticos en una instalación de ${industriaNombre}`,
    `Mejora significativa en la seguridad perimetral de una planta de ${industriaNombre}, eliminando intrusiones no autorizadas`
  ];
  
  // Casos específicos según servicio
  if (servicioNombre.includes('Guardias')) {
    casosBase.push(
      `Control de acceso y vigilancia especializada para una sede corporativa del sector ${industriaNombre}`,
      `Protección de eventos especiales y situaciones de alta afluencia en instalaciones de ${industriaNombre}`
    );
  } else if (servicioNombre.includes('Electrónica')) {
    casosBase.push(
      `Implementación de sistemas de CCTV con analítica avanzada para prevención de robos en ${industriaNombre}`,
      `Control de acceso biométrico para áreas restringidas en instalaciones de ${industriaNombre}`
    );
  }
  
  return casosBase.slice(0, 5); // Limitar a 5 casos máximo
};

/**
 * Genera zonas críticas específicas según industria
 */
const generarZonasCriticas = (industriaNombre: string, servicioNombre: string): string[] => {
  const zonasCriticas: Record<string, string[]> = {
    'retail': [
      'Áreas de caja: Control de efectivo y prevención de robos',
      'Bodegas y almacenes: Protección de inventario de alto valor',
      'Entradas y salidas: Control de acceso y prevención de hurto',
      'Estacionamientos: Vigilancia de vehículos y prevención de delitos'
    ],
    'bodegas': [
      'Áreas de almacenamiento de productos de alto valor: Vigilancia especializada',
      'Muelles de carga: Control de entrada y salida de mercancías',
      'Perímetro exterior: Prevención de intrusiones',
      'Oficinas administrativas: Protección de información sensible'
    ],
    'construcción': [
      'Almacenamiento de materiales: Prevención de robos de materiales y equipos',
      'Maquinaria pesada: Protección contra vandalismo y uso no autorizado',
      'Oficinas de obra: Seguridad para documentación y equipos',
      'Perímetro de obra: Control de acceso y vigilancia'
    ],
    'transporte y logística': [
      'Centros de distribución: Monitoreo de entrada y salida de mercancías',
      'Flotas de vehículos: Seguimiento y protección',
      'Áreas de carga y descarga: Control de procesos críticos',
      'Almacenes temporales: Vigilancia continua de inventario'
    ],
    'minería': [
      'Plantas de procesamiento: Protección de equipos y materiales valiosos',
      'Áreas de extracción: Seguridad para personal y maquinaria',
      'Zonas de almacenamiento de explosivos: Control estricto de acceso',
      'Campamentos: Seguridad para personal en áreas remotas'
    ]
  };
  
  // Si existe una definición específica para la industria, usarla
  const industriaKey = Object.keys(zonasCriticas).find(key => 
    industriaNombre.toLowerCase().includes(key));
  
  if (industriaKey && zonasCriticas[industriaKey]) {
    return zonasCriticas[industriaKey];
  }
  
  // Si no hay zonas críticas específicas, crear genéricas
  return [
    `Áreas administrativas: Protección de información sensible y personal`,
    `Entradas principales: Control de acceso y verificación de visitantes`,
    `Zonas de almacenamiento: Vigilancia especializada para prevenir pérdidas`,
    `Perímetro exterior: Sistemas de detección temprana de intrusiones`
  ];
};

/**
 * Genera preguntas frecuentes contextuales
 */
const generarFAQs = (industriaNombre: string, servicioNombre: string): { pregunta: string; respuesta: string }[] => {
  return [
    {
      pregunta: `¿Por qué el sector ${industriaNombre} necesita ${servicioNombre} especializado?`,
      respuesta: `El sector ${industriaNombre} presenta desafíos únicos de seguridad debido a sus características específicas, como el manejo de activos de alto valor, procesos críticos o afluencia de personas. Un servicio de ${servicioNombre.toLowerCase()} especializado garantiza la protección efectiva considerando estos factores particulares.`
    },
    {
      pregunta: `¿Qué capacitación recibe su personal para trabajar en el sector ${industriaNombre}?`,
      respuesta: `Nuestro personal recibe formación específica sobre los riesgos, normativas y necesidades del sector ${industriaNombre}. Esto incluye protocolos de seguridad especializados, manejo de situaciones de emergencia propias de la industria, y conocimiento de los puntos críticos que requieren atención especial.`
    },
    {
      pregunta: `¿Cómo adaptan sus servicios a las necesidades específicas de mi empresa en el sector ${industriaNombre}?`,
      respuesta: `Realizamos un análisis detallado de su instalación para identificar riesgos y necesidades específicas. Basados en esta evaluación, diseñamos una solución personalizada que combina personal, tecnología y procedimientos adaptados a su operación, garantizando una protección óptima sin interferir con sus procesos de negocio.`
    },
    {
      pregunta: `¿Pueden integrar sus servicios de ${servicioNombre.toLowerCase()} con sistemas existentes en mis instalaciones?`,
      respuesta: `Absolutamente. Nuestros servicios están diseñados para integrarse perfectamente con sus sistemas actuales, ya sean controles de acceso, CCTV o alarmas. Trabajamos con las principales tecnologías del mercado y podemos adaptar nuestras soluciones para maximizar la efectividad de su inversión existente en seguridad.`
    },
    {
      pregunta: `¿Cuál es el costo de implementar ${servicioNombre} para mi empresa del sector ${industriaNombre}?`,
      respuesta: `El costo varía según factores como el tamaño de la instalación, nivel de riesgo, horas de cobertura necesarias y tecnologías requeridas. Ofrecemos una evaluación y cotización personalizada sin costo. Contáctenos para agendar una visita técnica donde podremos desarrollar una propuesta adaptada a sus necesidades y presupuesto.`
    }
  ];
};

/**
 * Retorna un ID de imagen según la industria
 */
const getImageIdByIndustria = (industriaSlug: string): string => {
  const imageIds: Record<string, string> = {
    'retail': 'df131c147f3a664d6549418ef3d48dbd',
    'bodegas': 'c540105af2c5a1c82d8f54f824931bcc',
    'transporte-y-logistica': '1b9bdec7a266cc1d33d02fa40a81680f',
    'construccion': 'fd815b72ef3987089a7318212b28d81b',
    'mineria': '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00'
  };
  
  return imageIds[industriaSlug] || 'ac93b4a10e87873748171425b9f8066d';
};

/**
 * Obtiene el ID de video para una combinación de servicio e industria
 */
const getVideoIdForCombination = (servicioSlug: string, industriaSlug: string): string => {
  // Definir la estructura de mapeo de videos
  const videoMapping: Record<string, string> = {
    // Videos específicos para servicios
    'guardia-edificio-dia': 'c0a460385f6fb9e90343feb3a97c55c3',
    'central-monitoreo-2': '0d56cfdd1e9ad578b04fb212ae9afc42',
    
    // Videos específicos para industrias
    'bodegas': 'c540105af2c5a1c82d8f54f824931bcc',
    'retail': 'df131c147f3a664d6549418ef3d48dbd',
    'transporte-y-logistica': '1b9bdec7a266cc1d33d02fa40a81680f',
    'construccion': 'fd815b72ef3987089a7318212b28d81b',
    
    // Video por defecto
    'default': 'ac93b4a10e87873748171425b9f8066d'
  };
  
  // Intentar encontrar un video específico para la combinación servicio-industria
  // (Esta sería una implementación futura para mapeos específicos)
  
  // Intentar encontrar un video para el servicio específico
  if (videoMapping[servicioSlug]) {
    return videoMapping[servicioSlug];
  }
  
  // Intentar encontrar un video para la industria específica
  if (videoMapping[industriaSlug]) {
    return videoMapping[industriaSlug];
  }
  
  // Usar el video por defecto
  return videoMapping['default'];
}; 