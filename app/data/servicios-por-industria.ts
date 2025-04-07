/**
 * Archivo que relaciona los servicios de Gard Security con las industrias específicas
 * Este archivo permite filtrar qué servicios están disponibles para cada industria
 */

type IndustriaServicios = {
  industria: string; // Slug de la industria
  servicios: string[]; // Array de slugs de servicios disponibles para esta industria
};

/**
 * Tipo que define los datos específicos para una combinación de servicio e industria
 */
export type ServicioIndustriaData = {
  description?: string;
  desafios?: string[];
  soluciones?: string[];
  casoExito?: string;
  testimonio?: string;
}

/**
 * Array que mapea industrias con sus servicios disponibles
 * Si una industria no aparece aquí, se mostrarán todos los servicios por defecto
 */
export const serviciosPorIndustria: IndustriaServicios[] = [
  {
    industria: "mineria",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "retail",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "eventos-y-espectaculos",
    servicios: [
      "guardias-de-seguridad",
      "drones-seguridad"
    ]
  },
  {
    industria: "bodegas",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "salud",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "educacion",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "edificios-corporativos",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "construccion",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "transporte-y-logistica",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "parques-industriales",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "instituciones-publicas",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "hoteleria-y-turismo",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  // NUEVAS INDUSTRIAS
  {
    industria: "sector-financiero",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral",
      "auditoria-seguridad",
      "consultoria",
      "prevencion-intrusiones"
    ]
  },
  {
    industria: "agroindustria",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "centros-comerciales",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "prevencion-intrusiones"
    ]
  },
  {
    industria: "manufactura",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral",
      "auditoria-seguridad"
    ]
  },
  {
    industria: "condominios-residenciales",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "centros-de-datos",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral",
      "prevencion-intrusiones",
      "auditoria-seguridad",
      "consultoria"
    ]
  },
  {
    industria: "puertos-terminales",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "sector-energetico",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral",
      "auditoria-seguridad"
    ]
  },
  {
    industria: "farmaceutica",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral",
      "auditoria-seguridad",
      "consultoria"
    ]
  },
  {
    industria: "instalaciones-deportivas",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad"
    ]
  }
];

/**
 * Verifica si una combinación de servicio e industria es válida
 * @param servicioSlug Slug del servicio
 * @param industriaSlug Slug de la industria
 * @returns true si la combinación es válida, false en caso contrario
 */
export function esCombinacionValida(servicioSlug: string, industriaSlug: string): boolean {
  // Buscamos la industria en nuestro mapa de servicios por industria
  const industriaConfig = serviciosPorIndustria.find(item => item.industria === industriaSlug);
  
  // Si la industria no tiene configuración explícita, permitimos todos los servicios
  if (!industriaConfig) {
    return true;
  }
  
  // Si hay configuración para la industria, verificamos si el servicio está en la lista
  return industriaConfig.servicios.includes(servicioSlug);
}

/**
 * Datos específicos para combinaciones de servicio e industria
 * Aquí se pueden añadir descripciones, desafíos, soluciones y otros datos específicos
 * La clave es "[servicio-slug]__[industria-slug]"
 */
const servicioIndustriaDataMap: Record<string, ServicioIndustriaData> = {
  // Guardias de seguridad para minería
  "guardias-de-seguridad__mineria": {
    description: "Nuestro servicio de guardias de seguridad para el sector minero está diseñado específicamente para proteger activos de alto valor y garantizar operaciones seguras en entornos de minería. Contamos con personal capacitado en los procedimientos y protocolos específicos de la industria minera.",
    desafios: [
      "Protección de instalaciones de extracción y procesamiento en ubicaciones remotas",
      "Control de acceso estricto a áreas restringidas y zonas de alto riesgo",
      "Prevención de robos de materiales y equipos de alto valor"
    ],
    soluciones: [
      "Personal con certificación especial para operaciones en entornos mineros",
      "Protocolos personalizados para control de acceso y verificación de identidad",
      "Sistemas de rotación adaptados a las necesidades operativas de minería 24/7"
    ],
    casoExito: "Implementamos un sistema integral de seguridad para una de las principales mineras del país, logrando reducir en un 85% los incidentes de seguridad y mejorando significativamente el cumplimiento normativo.",
    testimonio: "La presencia de guardias especializados en minería no solo ha mejorado nuestra seguridad, sino que ha contribuido positivamente a nuestra cultura de seguridad operacional. Su conocimiento del sector hace la diferencia."
  },
  
  // Guardias de seguridad para retail
  "guardias-de-seguridad__retail": {
    description: "Nuestros servicios de guardias de seguridad para retail están específicamente diseñados para prevenir pérdidas, disuadir actividades delictivas y garantizar un entorno seguro tanto para clientes como para personal. Implementamos técnicas discretas pero efectivas que no interfieren con la experiencia de compra.",
    desafios: [
      "Prevención de hurtos y mermas en tiendas con alto tráfico de clientes",
      "Manejo de situaciones conflictivas manteniendo la imagen de la marca",
      "Control simultáneo de múltiples accesos y áreas de riesgo"
    ],
    soluciones: [
      "Guardias capacitados en técnicas de observación y prevención discretas",
      "Protocolos especiales para manejo de situaciones conflictivas con clientes",
      "Coordinación con sistemas electrónicos para maximizar la cobertura"
    ],
    casoExito: "Redujimos las pérdidas por hurto en un 67% para una cadena nacional de retail, implementando un sistema integrado de guardias visibles y encubiertos con tecnología de apoyo.",
    testimonio: "La profesionalidad de los guardias de Gard ha transformado nuestra seguridad. Su enfoque discreto pero efectivo mantiene nuestra imagen de marca mientras protege nuestros activos."
  },
  
  // NUEVAS COMBINACIONES ESPECÍFICAS
  
  // Guardias de seguridad para sector financiero
  "guardias-de-seguridad__sector-financiero": {
    description: "Nuestro servicio de guardias de seguridad para instituciones financieras ofrece protección de máximo nivel con personal altamente capacitado en la detección de amenazas específicas del sector bancario. Garantizamos la protección de clientes, empleados y activos de valor con estrictos protocolos de seguridad.",
    desafios: [
      "Prevención de robos y atracos en sucursales bancarias",
      "Protección de áreas de alta sensibilidad como bóvedas y cajeros automáticos",
      "Control de accesos con verificación avanzada de identidad"
    ],
    soluciones: [
      "Guardias especializados en protocolos de seguridad bancaria",
      "Coordinación con sistemas de seguridad electrónica avanzados",
      "Procedimientos específicos para manejo de emergencias en entornos financieros"
    ],
    casoExito: "Implementamos un sistema de seguridad integral para una red de 14 sucursales bancarias, logrando cero incidentes de seguridad durante los últimos 2 años y mejorando la confianza de clientes y empleados.",
    testimonio: "Los guardias de Gard Security han demostrado un nivel de profesionalismo excepcional, adaptándose perfectamente a los exigentes protocolos que requiere nuestro sector financiero."
  },
  
  // Guardias de seguridad para centros comerciales
  "guardias-de-seguridad__centros-comerciales": {
    description: "Ofrecemos un servicio integral de guardias de seguridad para centros comerciales que combina protección efectiva con excelente atención al cliente. Nuestro personal está especialmente formado para gestionar grandes flujos de visitantes mientras mantiene un entorno seguro y agradable.",
    desafios: [
      "Gestión de seguridad en espacios con alto tráfico de personas",
      "Prevención de hurtos en múltiples locales comerciales simultáneamente",
      "Control de situaciones de emergencia y evacuaciones"
    ],
    soluciones: [
      "Guardias con formación específica en entornos comerciales de alta concurrencia",
      "Sistemas de vigilancia coordinada con múltiples puntos de control",
      "Protocolos especiales para eventos, periodos de alta afluencia y situaciones de emergencia"
    ],
    casoExito: "Redujimos un 78% los incidentes de seguridad en un centro comercial de 150 locales, mejorando significativamente la experiencia de compra y la percepción de seguridad de los visitantes.",
    testimonio: "El equipo de Gard ha transformado la seguridad de nuestro centro comercial, combinando perfectamente protección efectiva con trato amable hacia nuestros clientes."
  },
  
  // Seguridad electrónica para centros de datos
  "seguridad-electronica__centros-de-datos": {
    description: "Nuestras soluciones de seguridad electrónica para centros de datos combinan tecnología de última generación con protocolos especializados para proteger infraestructuras críticas de TI. Implementamos sistemas de control de acceso biométrico, CCTV avanzado y detección temprana de intrusiones.",
    desafios: [
      "Protección 24/7 de infraestructura crítica de información",
      "Control de acceso con múltiples niveles de autenticación",
      "Detección temprana de intentos de intrusión física"
    ],
    soluciones: [
      "Sistemas de control de acceso biométrico multicapa",
      "Videovigilancia HD con analítica avanzada e IA",
      "Integración con sistemas de alarma y notificación inmediata"
    ],
    casoExito: "Implementamos un sistema integral de seguridad electrónica para un centro de datos Tier III, logrando cumplimiento normativo total y cero incidentes de seguridad física en los últimos 3 años.",
    testimonio: "Las soluciones de seguridad electrónica de Gard nos han permitido cumplir con los exigentes estándares internacionales de protección para centros de datos, garantizando la continuidad de nuestras operaciones."
  },
  
  // Drones para sector energético
  "drones-seguridad__sector-energetico": {
    description: "Nuestro servicio de vigilancia con drones para el sector energético proporciona monitoreo aéreo de alta precisión para plantas solares, eólicas y otras instalaciones energéticas. Ofrecemos inspección de infraestructuras, vigilancia perimetral y detección temprana de amenazas en tiempo real.",
    desafios: [
      "Vigilancia de instalaciones energéticas en áreas extensas y remotas",
      "Inspección regular de infraestructuras de difícil acceso",
      "Detección temprana de intrusiones en perímetros amplios"
    ],
    soluciones: [
      "Drones con cámaras térmicas y de alta resolución para vigilancia diurna y nocturna",
      "Rutas programadas de vigilancia para monitoreo regular perimetral",
      "Transmisión en tiempo real a central de monitoreo con análisis de imágenes"
    ],
    casoExito: "Implementamos un sistema de patrullaje con drones para una planta solar de 100 hectáreas, reduciendo costos de vigilancia en un 40% y detectando eficazmente intentos de intrusión y anomalías en los paneles.",
    testimonio: "La vigilancia con drones ha revolucionado la seguridad de nuestras instalaciones energéticas, permitiéndonos cubrir extensas áreas con una eficiencia que era imposible con métodos tradicionales."
  }
};

/**
 * Función para obtener datos específicos para una combinación de servicio e industria
 * @param servicioSlug Slug del servicio
 * @param industriaSlug Slug de la industria
 * @returns Datos específicos para esta combinación o un objeto vacío si no hay datos
 */
export function getServicioIndustriaData(servicioSlug: string, industriaSlug: string): ServicioIndustriaData {
  const key = `${servicioSlug}__${industriaSlug}`;
  return servicioIndustriaDataMap[key] || {};
} 