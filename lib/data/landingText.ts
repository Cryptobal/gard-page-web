// Definición de textos dinámicos para landing pages por industria y servicio
// Esta estructura permite personalizar textos específicos para combinaciones de industria/servicio

// Interfaz para el contenido de texto de cada landing
export interface TextContent {
  title: string;
  subtitle: string;
  description: string;
  beneficios: string[];
  features: {
    title: string;
    description: string;
    iconName?: string;
  }[];
  ctaText: string;
  imageId?: string; // ID de Cloudflare Image
  videoId?: string; // ID de video de Cloudflare Stream (opcional)
}

// Textos por industria
type IndustriaTexts = {
  [key: string]: TextContent;
};

// Textos por combinación industria+servicio
type ServicioTexts = {
  [industria: string]: {
    [servicio: string]: TextContent;
  };
};

// Textos genéricos por servicio (cuando no hay específico para una industria)
const serviciosGenericos: { [key: string]: TextContent } = {
  'guardias-privados': {
    title: 'Guardias Privados',
    subtitle: 'Servicio profesional de guardias de seguridad',
    description: 'Nuestros guardias privados están certificados y equipados con la última tecnología para brindar seguridad de primer nivel.',
    beneficios: [
      'Personal certificado OS-10',
      'Supervisión 24/7',
      'Equipamiento de última generación',
      'Respuesta inmediata ante incidentes'
    ],
    features: [
      {
        title: 'Guardias de Seguridad',
        description: 'Control de acceso y vigilancia permanente',
        iconName: 'shield'
      },
      {
        title: 'Monitoreo Constante',
        description: 'Supervisión en tiempo real de todos los puntos críticos',
        iconName: 'eye'
      },
      {
        title: 'Protocolos de Emergencia',
        description: 'Planes de acción específicos para cada tipo de incidente',
        iconName: 'alert-triangle'
      }
    ],
    ctaText: 'Solicitar guardia privado',
    imageId: '5eea1064-8a2d-4e8b-5606-d28775467a00'
  },
  'camaras-seguridad': {
    title: 'Cámaras de Seguridad',
    subtitle: 'Vigilancia profesional con tecnología avanzada',
    description: 'Sistemas de vigilancia con cámaras HD, analítica de video e inteligencia artificial para detectar intrusiones.',
    beneficios: [
      'Grabación en alta definición',
      'Detección de movimiento',
      'Alertas en tiempo real',
      'Acceso remoto 24/7'
    ],
    features: [
      {
        title: 'Analítica de Video',
        description: 'Tecnología que detecta comportamientos sospechosos',
        iconName: 'video'
      },
      {
        title: 'Visión Nocturna',
        description: 'Vigilancia continua incluso en condiciones de poca luz',
        iconName: 'moon'
      },
      {
        title: 'Almacenamiento Seguro',
        description: 'Respaldo confiable de todas las grabaciones',
        iconName: 'hard-drive'
      }
    ],
    ctaText: 'Cotizar cámaras de seguridad',
    imageId: '678cad4f-9b0d-49e6-3bbd-0d747a2fdc00'
  },
  'alarmas': {
    title: 'Sistemas de Alarma',
    subtitle: 'Detección temprana de intrusiones',
    description: 'Sistemas de alarma con sensores de movimiento, contacto magnético y sirenas de alta potencia para disuadir intrusiones.',
    beneficios: [
      'Instalación profesional',
      'Monitoreo centralizado',
      'Respuesta inmediata',
      'Integración con otras soluciones'
    ],
    features: [
      {
        title: 'Sensores Avanzados',
        description: 'Tecnología que minimiza falsas alarmas',
        iconName: 'radio'
      },
      {
        title: 'Notificaciones Instantáneas',
        description: 'Alertas en tiempo real en tu dispositivo móvil',
        iconName: 'bell'
      },
      {
        title: 'Respaldo Energético',
        description: 'Funcionamiento continuo incluso durante cortes de luz',
        iconName: 'battery'
      }
    ],
    ctaText: 'Instalar sistema de alarma',
    imageId: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100'
  }
};

// Textos específicos por industria
const industriasEspecificas: IndustriaTexts = {
  'retail': {
    title: 'Seguridad para Retail',
    subtitle: 'Protección especializada para el sector comercial',
    description: 'Soluciones de seguridad diseñadas específicamente para negocios retail, combatiendo el hurto y protegiendo a clientes y empleados.',
    beneficios: [
      'Reducción de pérdidas por hurto',
      'Mejora de la experiencia del cliente',
      'Protección de mercadería',
      'Análisis de patrones sospechosos'
    ],
    features: [
      {
        title: 'Prevención de Pérdidas',
        description: 'Estrategias efectivas contra el hurto en tiendas',
        iconName: 'shield'
      },
      {
        title: 'Monitoreo de Inventario',
        description: 'Control integral de existencias y seguridad',
        iconName: 'package'
      },
      {
        title: 'Protección de Puntos de Venta',
        description: 'Seguridad específica para cajas y áreas de pago',
        iconName: 'credit-card'
      }
    ],
    ctaText: 'Protege tu negocio retail',
    imageId: 'eeaf472c-ab11-448b-f5e2-d18415147800'
  },
  'industrial': {
    title: 'Seguridad Industrial',
    subtitle: 'Protección robusta para instalaciones industriales',
    description: 'Protegemos plantas industriales, bodegas y centros de distribución con soluciones de seguridad de alto rendimiento.',
    beneficios: [
      'Cumplimiento normativo',
      'Protección de activos críticos',
      'Control de perímetros extensos',
      'Seguridad para personal y visitantes'
    ],
    features: [
      {
        title: 'Control Perimetral',
        description: 'Vigilancia avanzada de perímetros extensos',
        iconName: 'fence'
      },
      {
        title: 'Protección de Activos',
        description: 'Seguridad para maquinaria e instalaciones críticas',
        iconName: 'cog'
      },
      {
        title: 'Seguridad para el Personal',
        description: 'Protocolos específicos para empleados y contratistas',
        iconName: 'user-check'
      }
    ],
    ctaText: 'Asegura tu planta industrial',
    imageId: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00'
  },
  'corporativo': {
    title: 'Seguridad Corporativa',
    subtitle: 'Protección integral para oficinas y empresas',
    description: 'Soluciones de seguridad diseñadas para proteger oficinas corporativas, empleados y propiedad intelectual.',
    beneficios: [
      'Control de acceso inteligente',
      'Protección de información sensible',
      'Ambiente seguro para colaboradores',
      'Cumplimiento normativo'
    ],
    features: [
      {
        title: 'Control de Acceso',
        description: 'Sistemas avanzados de identificación y autorización',
        iconName: 'key'
      },
      {
        title: 'Seguridad Ejecutiva',
        description: 'Protección especial para directivos y VIPs',
        iconName: 'user-check'
      },
      {
        title: 'Protección de Datos',
        description: 'Seguridad física para infraestructura tecnológica',
        iconName: 'database'
      }
    ],
    ctaText: 'Protege tu entorno corporativo',
    imageId: '428c1028-8f6b-455a-e110-38421eeb5700'
  },
  // Nuevas industrias
  'sector-financiero': {
    title: 'Seguridad para Sector Financiero',
    subtitle: 'Protección de máxima confianza para instituciones bancarias',
    description: 'Soluciones de seguridad integral diseñadas específicamente para bancos, cajas de ahorro y entidades financieras con los más altos estándares.',
    beneficios: [
      'Prevención de robos y atracos',
      'Protección de áreas críticas y bóvedas',
      'Control de acceso multinivel',
      'Cumplimiento de normativas financieras'
    ],
    features: [
      {
        title: 'Seguridad para Sucursales',
        description: 'Protección integral para oficinas bancarias y cajeros',
        iconName: 'building'
      },
      {
        title: 'Control de Acceso Avanzado',
        description: 'Sistemas biométricos y verificación multinivel',
        iconName: 'fingerprint'
      },
      {
        title: 'Monitoreo 24/7',
        description: 'Vigilancia constante con respuesta inmediata',
        iconName: 'shield-alert'
      }
    ],
    ctaText: 'Asegura tu entidad financiera',
    imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
  },
  'agroindustria': {
    title: 'Seguridad para Agroindustria',
    subtitle: 'Protección especializada para el sector agrícola y ganadero',
    description: 'Soluciones de seguridad diseñadas para proteger cultivos, ganado, maquinaria e instalaciones agroindustriales en áreas extensas.',
    beneficios: [
      'Vigilancia de terrenos extensos',
      'Prevención de robos de maquinaria',
      'Protección de cultivos y ganado',
      'Control perimetral en zonas rurales'
    ],
    features: [
      {
        title: 'Vigilancia Rural',
        description: 'Cobertura especializada para terrenos agrícolas extensos',
        iconName: 'mountain'
      },
      {
        title: 'Protección de Activos',
        description: 'Seguridad para maquinaria, ganado y cosechas',
        iconName: 'truck'
      },
      {
        title: 'Monitoreo Remoto',
        description: 'Vigilancia electrónica en áreas rurales aisladas',
        iconName: 'video'
      }
    ],
    ctaText: 'Protege tu producción agrícola',
    imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
  },
  'centros-comerciales': {
    title: 'Seguridad para Centros Comerciales',
    subtitle: 'Protección integral para malls y grandes superficies comerciales',
    description: 'Soluciones de seguridad completas para proteger malls, tiendas, visitantes y personal en entornos comerciales de gran escala.',
    beneficios: [
      'Control de accesos y flujos de visitantes',
      'Prevención de hurtos en múltiples locales',
      'Gestión de situaciones de emergencia',
      'Mejora de la experiencia del cliente'
    ],
    features: [
      {
        title: 'Vigilancia Discreta',
        description: 'Protección efectiva sin afectar la experiencia de compra',
        iconName: 'eye'
      },
      {
        title: 'Control de Multitudes',
        description: 'Gestión profesional de grandes flujos de personas',
        iconName: 'users'
      },
      {
        title: 'Respuesta Coordinada',
        description: 'Protocolos específicos para emergencias en centros comerciales',
        iconName: 'alert-circle'
      }
    ],
    ctaText: 'Asegura tu centro comercial',
    imageId: 'eeaf472c-ab11-448b-f5e2-d18415147800'
  },
  'centros-de-datos': {
    title: 'Seguridad para Centros de Datos',
    subtitle: 'Protección crítica para infraestructura tecnológica',
    description: 'Soluciones de seguridad avanzadas diseñadas específicamente para proteger centros de datos, servidores y activos digitales críticos.',
    beneficios: [
      'Protección multicapa 24/7',
      'Control de acceso biométrico',
      'Cumplimiento de estándares internacionales',
      'Prevención de intrusiones físicas'
    ],
    features: [
      {
        title: 'Acceso Controlado',
        description: 'Sistemas biométricos y verificación multinivel',
        iconName: 'fingerprint'
      },
      {
        title: 'Vigilancia Permanente',
        description: 'Monitoreo constante de áreas críticas',
        iconName: 'video'
      },
      {
        title: 'Respuesta Inmediata',
        description: 'Protocolos especializados para infraestructura crítica',
        iconName: 'zap'
      }
    ],
    ctaText: 'Protege tu infraestructura tecnológica',
    imageId: '428c1028-8f6b-455a-e110-38421eeb5700'
  },
  'sector-energetico': {
    title: 'Seguridad para Sector Energético',
    subtitle: 'Protección especializada para instalaciones energéticas',
    description: 'Soluciones de seguridad robustas para plantas de energía, instalaciones solares, eólicas y otras infraestructuras energéticas críticas.',
    beneficios: [
      'Vigilancia de instalaciones extensas',
      'Prevención de sabotajes',
      'Inspecciones periódicas aéreas',
      'Cumplimiento normativo del sector'
    ],
    features: [
      {
        title: 'Control Perimetral',
        description: 'Vigilancia avanzada de perímetros extensos',
        iconName: 'fence'
      },
      {
        title: 'Inspección Aérea',
        description: 'Monitoreo con drones para áreas de difícil acceso',
        iconName: 'plane'
      },
      {
        title: 'Detección Temprana',
        description: 'Sistemas de alerta anticipada ante amenazas',
        iconName: 'bell'
      }
    ],
    ctaText: 'Asegura tus instalaciones energéticas',
    imageId: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00'
  }
};

// Combinaciones específicas industria+servicio
const combinacionesEspecificas: ServicioTexts = {
  'retail': {
    'guardias-privados': {
      title: 'Guardias de Seguridad para Retail',
      subtitle: 'Protección especializada para tiendas y centros comerciales',
      description: 'Guardias capacitados en prevención de pérdidas, control de multitudes y protección en entornos comerciales.',
      beneficios: [
        'Personal entrenado en prevención de hurto',
        'Atención al cliente como parte del servicio',
        'Protocolos específicos para retail',
        'Uniformados o de civil según necesidad'
      ],
      features: [
        {
          title: 'Prevención de Pérdidas',
          description: 'Guardias especializados en detectar y prevenir hurtos',
          iconName: 'eye'
        },
        {
          title: 'Control de Accesos',
          description: 'Gestión profesional de entradas y salidas',
          iconName: 'door'
        },
        {
          title: 'Respuesta a Emergencias',
          description: 'Protocolos específicos para incidentes en retail',
          iconName: 'alert-circle'
        }
      ],
      ctaText: 'Contrata guardias para tu negocio',
      imageId: 'eeaf472c-ab11-448b-f5e2-d18415147800'
    }
  },
  'sector-financiero': {
    'guardias-de-seguridad': {
      title: 'Guardias de Seguridad para Entidades Financieras',
      subtitle: 'Protección especializada para bancos y sucursales financieras',
      description: 'Guardias altamente capacitados en seguridad bancaria, prevención de atracos y protección de valores, con certificaciones específicas para el sector financiero.',
      beneficios: [
        'Personal con capacitación específica en seguridad bancaria',
        'Procedimientos anti-atraco y manejo de emergencias',
        'Uniformados y armados según normativa',
        'Coordinación con servicios de custodia de valores'
      ],
      features: [
        {
          title: 'Vigilancia de Sucursales',
          description: 'Protección especializada para oficinas bancarias',
          iconName: 'building'
        },
        {
          title: 'Control de Acceso',
          description: 'Verificación de identidad y gestión de visitantes',
          iconName: 'user-check'
        },
        {
          title: 'Procedimientos de Emergencia',
          description: 'Protocolos específicos para incidentes en entornos financieros',
          iconName: 'alert-triangle'
        }
      ],
      ctaText: 'Asegura tu entidad financiera',
      imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
    },
    'seguridad-electronica': {
      title: 'Seguridad Electrónica para Sector Bancario',
      subtitle: 'Tecnología avanzada para la protección de entidades financieras',
      description: 'Sistemas de seguridad electrónica de alta gama diseñados específicamente para bancos y entidades financieras, cumpliendo con los estándares más exigentes del sector.',
      beneficios: [
        'Vigilancia CCTV con analítica avanzada',
        'Control de acceso biométrico multinivel',
        'Integración con alarmas y centrales de monitoreo',
        'Cumplimiento de normativas bancarias'
      ],
      features: [
        {
          title: 'Videovigilancia Avanzada',
          description: 'Cámaras HD con reconocimiento facial y análisis de comportamiento',
          iconName: 'video'
        },
        {
          title: 'Control de Acceso Biométrico',
          description: 'Sistemas multicapa de verificación de identidad',
          iconName: 'fingerprint'
        },
        {
          title: 'Alarmas Inteligentes',
          description: 'Detección temprana con botones de pánico y sensores',
          iconName: 'bell'
        }
      ],
      ctaText: 'Implementa tecnología bancaria segura',
      imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
    }
  },
  'centros-de-datos': {
    'seguridad-electronica': {
      title: 'Seguridad Electrónica para Centros de Datos',
      subtitle: 'Tecnología avanzada para infraestructura crítica de TI',
      description: 'Sistemas de seguridad electrónica de última generación diseñados para proteger centros de procesamiento de datos, racks de servidores y equipamiento crítico de TI.',
      beneficios: [
        'Control de acceso biométrico multinivel',
        'Detección temprana de intrusiones',
        'Monitoreo ambiental integrado',
        'Cumplimiento de estándares TIER III/IV'
      ],
      features: [
        {
          title: 'Control de Acceso Avanzado',
          description: 'Sistemas biométricos con verificación multifactor',
          iconName: 'key'
        },
        {
          title: 'Videovigilancia HD',
          description: 'Cámaras con analítica de video y detección de movimiento',
          iconName: 'video'
        },
        {
          title: 'Monitoreo Centralizado',
          description: 'Integración con sistemas de gestión de instalaciones',
          iconName: 'activity'
        }
      ],
      ctaText: 'Protege tu infraestructura crítica de TI',
      imageId: '428c1028-8f6b-455a-e110-38421eeb5700'
    }
  },
  'sector-energetico': {
    'drones-seguridad': {
      title: 'Drones de Seguridad para Sector Energético',
      subtitle: 'Vigilancia aérea avanzada para instalaciones energéticas',
      description: 'Servicio de vigilancia e inspección mediante drones equipados con tecnología avanzada para monitorear plantas solares, eólicas y otras instalaciones energéticas en áreas extensas.',
      beneficios: [
        'Cobertura de grandes extensiones de terreno',
        'Inspección de infraestructuras de difícil acceso',
        'Detección temprana de anomalías y amenazas',
        'Reducción de costos operativos de seguridad'
      ],
      features: [
        {
          title: 'Patrullaje Aéreo',
          description: 'Rutas programadas de vigilancia perimetral',
          iconName: 'plane'
        },
        {
          title: 'Cámaras Térmicas',
          description: 'Detección de intrusos día y noche en cualquier condición',
          iconName: 'thermometer'
        },
        {
          title: 'Transmisión en Tiempo Real',
          description: 'Monitoreo instantáneo con respuesta coordinada',
          iconName: 'cast'
        }
      ],
      ctaText: 'Implementa vigilancia aérea avanzada',
      imageId: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00'
    },
    'seguridad-perimetral': {
      title: 'Seguridad Perimetral para Instalaciones Energéticas',
      subtitle: 'Protección integral de perímetros en plantas de energía',
      description: 'Sistemas avanzados de protección perimetral diseñados específicamente para asegurar plantas de generación, subestaciones y otras infraestructuras energéticas críticas.',
      beneficios: [
        'Detección temprana de intrusiones',
        'Vigilancia de perímetros extensos',
        'Reducción de falsas alarmas',
        'Integración con otros sistemas de seguridad'
      ],
      features: [
        {
          title: 'Cercos Inteligentes',
          description: 'Barreras físicas con sensores de detección',
          iconName: 'fence'
        },
        {
          title: 'Analítica de Video',
          description: 'Cámaras con IA para detectar comportamientos sospechosos',
          iconName: 'video'
        },
        {
          title: 'Iluminación Estratégica',
          description: 'Sistemas de iluminación activados por movimiento',
          iconName: 'sun'
        }
      ],
      ctaText: 'Protege el perímetro de tus instalaciones',
      imageId: '8534db25-0748-4339-68d9-9cc19023ec00'
    }
  }
};

// Función para obtener textos según industria y servicio
export const getLandingText = (industria: string, servicio: string): TextContent => {
  // Primero buscar si existe una combinación específica
  if (
    combinacionesEspecificas[industria] && 
    combinacionesEspecificas[industria][servicio]
  ) {
    return combinacionesEspecificas[industria][servicio];
  }
  
  // Si no hay combinación específica, buscar por servicio genérico
  if (serviciosGenericos[servicio]) {
    // Crear una versión modificada del servicio genérico adaptada a la industria
    const servicioGenerico = {...serviciosGenericos[servicio]};
    const industriaInfo = industriasEspecificas[industria];
    
    if (industriaInfo) {
      // Personalizar título y CTA con la industria si existe
      servicioGenerico.title = `${servicioGenerico.title} para ${industriaInfo.title.replace('Seguridad para ', '')}`;
      servicioGenerico.ctaText = `${servicioGenerico.ctaText} para ${industriaInfo.title.replace('Seguridad para ', '')}`;
    }
    
    return servicioGenerico;
  }
  
  // Si no existe ni servicio ni combinación, usar texto genérico
  return {
    title: `Servicios de Seguridad para ${industria}`,
    subtitle: 'Soluciones adaptadas a tus necesidades',
    description: 'En Gard Security ofrecemos servicios de seguridad personalizados para cada industria y necesidad específica.',
    beneficios: [
      'Personal altamente capacitado',
      'Tecnología de vanguardia',
      'Servicio personalizado',
      'Respuesta inmediata'
    ],
    features: [
      {
        title: 'Seguridad Integral',
        description: 'Soluciones completas que cubren todas tus necesidades',
        iconName: 'shield'
      },
      {
        title: 'Tecnología Avanzada',
        description: 'Equipamiento de última generación para mayor protección',
        iconName: 'cpu'
      },
      {
        title: 'Servicio 24/7',
        description: 'Disponibilidad permanente para tu tranquilidad',
        iconName: 'clock'
      }
    ],
    ctaText: 'Solicitar información',
    imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
  };
};

export default getLandingText; 