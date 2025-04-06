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