// Definición de textos dinámicos para landing pages por ciudad y servicio
// Esta estructura permite personalizar textos específicos para combinaciones de ciudad/servicio

import { TextContent } from './landingText';
import { CiudadData } from './ciudad-data';

// Interfaz para el contenido específico de ciudad-servicio
export interface CiudadServicioContent extends TextContent {
  estadisticas?: {
    // Estadísticas específicas de seguridad para esta ciudad
    indiceDelincuencia?: number; // 1-100, donde 100 es el más alto
    tipoDelincuenciaPrincipal?: string;
    incidenciaRobos?: number; // Tasa por 1000 habitantes
  };
  
  // Casos de éxito específicos en esta ciudad
  casosExito?: {
    cliente: string;
    descripcion: string;
    resultado: string;
    imageId?: string;
  }[];
  
  // Testimonios locales
  testimonios?: {
    nombre: string;
    cargo: string;
    empresa: string;
    texto: string;
    imageId?: string;
  }[];
  
  // Referencias geográficas específicas (para SEO y localización)
  referenciasLocales?: {
    barrios: string[];
    zonasComerciales: string[];
    puntosReferencia: string[];
  };
}

// Tipo para el diccionario de ciudad-servicio
type CiudadServicioTexts = {
  [ciudad: string]: {
    [servicio: string]: CiudadServicioContent;
  };
};

// Textos específicos que se han creado manualmente para ciertas combinaciones ciudad-servicio
const combinacionesEspecificas: CiudadServicioTexts = {
  'santiago': {
    'guardias-de-seguridad': {
      title: 'Guardias de Seguridad en Santiago',
      subtitle: 'Servicio profesional de vigilancia para la capital de Chile',
      description: 'Protegemos tu empresa, residencia o evento en Santiago con guardias certificados y capacitados para las necesidades específicas de la capital.',
      beneficios: [
        'Personal certificado por Carabineros con curso OS-10',
        'Vigilancia 24/7 adaptada a zonas de alta incidencia delictual',
        'Rápido tiempo de respuesta en toda la Región Metropolitana',
        'Coordinación con Carabineros y servicios de emergencia locales'
      ],
      features: [
        {
          title: 'Guardias Capacitados',
          description: 'Personal con experiencia en el contexto urbano de Santiago',
          iconName: 'shield'
        },
        {
          title: 'Cobertura Total',
          description: 'Servicio en todas las comunas de Santiago y alrededores',
          iconName: 'map'
        },
        {
          title: 'Adaptación Local',
          description: 'Protocolos específicos para las diversas realidades de la capital',
          iconName: 'home'
        }
      ],
      ctaText: 'Solicita guardias para Santiago',
      imageId: '5eea1064-8a2d-4e8b-5606-d28775467a00',
      estadisticas: {
        indiceDelincuencia: 78,
        tipoDelincuenciaPrincipal: 'Robo con intimidación',
        incidenciaRobos: 42.5
      },
      referenciasLocales: {
        barrios: ['Providencia', 'Las Condes', 'Santiago Centro', 'Ñuñoa', 'La Florida'],
        zonasComerciales: ['Costanera Center', 'Apumanque', 'Mall Plaza Vespucio', 'Parque Arauco', 'Paseo Ahumada'],
        puntosReferencia: ['Plaza de Armas', 'Parque O\'Higgins', 'Cerro San Cristóbal', 'Estación Central', 'Aeropuerto Internacional']
      },
      casosExito: [
        {
          cliente: 'Centro Comercial Plaza Santiago',
          descripcion: 'Implementación de equipo de guardias en uno de los principales centros comerciales de Santiago Centro',
          resultado: 'Reducción del 45% en incidentes de hurto y mejora en la percepción de seguridad de visitantes',
          imageId: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100'
        }
      ],
      testimonios: [
        {
          nombre: 'Carolina Méndez',
          cargo: 'Gerente de Operaciones',
          empresa: 'Retail Store Santiago',
          texto: 'Desde que contratamos los guardias de Gard Security, los incidentes han disminuido significativamente en nuestra tienda del centro de Santiago.',
          imageId: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100'
        }
      ]
    },
    'camaras-de-seguridad': {
      title: 'Cámaras de Seguridad en Santiago',
      subtitle: 'Videovigilancia profesional para la capital de Chile',
      description: 'Sistemas de cámaras de seguridad HD con analítica inteligente adaptados a las necesidades específicas de Santiago.',
      beneficios: [
        'Monitoreo 24/7 desde nuestra central en Santiago',
        'Tecnología de reconocimiento facial y análisis de comportamiento',
        'Soluciones adaptadas a zonas de alta incidencia delictual',
        'Conexión con central de monitoreo y respuesta inmediata'
      ],
      features: [
        {
          title: 'Alta Definición',
          description: 'Cámaras HD que capturan detalles cruciales para identificación',
          iconName: 'video'
        },
        {
          title: 'Analítica Inteligente',
          description: 'Detección automática de situaciones sospechosas',
          iconName: 'cpu'
        },
        {
          title: 'Monitoreo 24/7',
          description: 'Vigilancia constante desde nuestra central en Santiago',
          iconName: 'eye'
        }
      ],
      ctaText: 'Solicitar cámaras para Santiago',
      imageId: '678cad4f-9b0d-49e6-3bbd-0d747a2fdc00',
      estadisticas: {
        indiceDelincuencia: 78,
        tipoDelincuenciaPrincipal: 'Robo con sorpresa',
        incidenciaRobos: 42.5
      },
      referenciasLocales: {
        barrios: ['Providencia', 'Las Condes', 'Santiago Centro', 'Ñuñoa', 'La Florida'],
        zonasComerciales: ['Costanera Center', 'Apumanque', 'Mall Plaza Vespucio', 'Parque Arauco', 'Paseo Ahumada'],
        puntosReferencia: ['Plaza de Armas', 'Parque O\'Higgins', 'Cerro San Cristóbal', 'Estación Central', 'Aeropuerto Internacional']
      }
    }
  },
  'valparaiso': {
    'guardias-de-seguridad': {
      title: 'Guardias de Seguridad en Valparaíso',
      subtitle: 'Vigilancia profesional para la ciudad patrimonio',
      description: 'Servicio de guardias de seguridad adaptado a las particularidades geográficas y patrimoniales de Valparaíso.',
      beneficios: [
        'Personal con conocimiento del trazado irregular de la ciudad',
        'Experiencia en protección de edificios patrimoniales',
        'Protocolos específicos para zonas turísticas y portuarias',
        'Coordinación con autoridades locales y Armada de Chile'
      ],
      features: [
        {
          title: 'Especialización Portuaria',
          description: 'Guardias capacitados en seguridad portuaria y comercial',
          iconName: 'anchor'
        },
        {
          title: 'Conocimiento Local',
          description: 'Personal familiarizado con los cerros y el plan de Valparaíso',
          iconName: 'map'
        },
        {
          title: 'Protección Patrimonial',
          description: 'Experiencia en resguardo de edificios históricos',
          iconName: 'landmark'
        }
      ],
      ctaText: 'Solicitar guardias para Valparaíso',
      imageId: '5eea1064-8a2d-4e8b-5606-d28775467a00',
      estadisticas: {
        indiceDelincuencia: 65,
        tipoDelincuenciaPrincipal: 'Robo a turistas',
        incidenciaRobos: 38.2
      },
      referenciasLocales: {
        barrios: ['Plan de Valparaíso', 'Cerro Alegre', 'Cerro Concepción', 'Playa Ancha', 'Barrio Puerto'],
        zonasComerciales: ['Muelle Prat', 'Calle Condell', 'Mercado Cardonal', 'Boulevard Pedro Montt'],
        puntosReferencia: ['Plaza Sotomayor', 'Congreso Nacional', 'Ascensores', 'Terminal Portuario']
      }
    }
  }
  // Agregar más combinaciones ciudad-servicio según se vayan desarrollando
};

/**
 * Obtiene el contenido para una combinación específica de ciudad y servicio
 * Si no existe contenido específico, genera uno basado en información genérica
 */
export const getCiudadServicioContent = (
  ciudadSlug: string, 
  servicioSlug: string, 
  ciudadData?: CiudadData, 
  servicioGenerico?: TextContent
): CiudadServicioContent => {
  // Primero buscar si existe una combinación específica
  if (
    combinacionesEspecificas[ciudadSlug] && 
    combinacionesEspecificas[ciudadSlug][servicioSlug]
  ) {
    return combinacionesEspecificas[ciudadSlug][servicioSlug];
  }
  
  // Si no hay combinación específica pero tenemos datos de la ciudad y servicio genérico
  if (ciudadData && servicioGenerico) {
    // Crear una versión personalizada basada en el servicio genérico y datos de la ciudad
    const contenidoPersonalizado: CiudadServicioContent = {
      ...servicioGenerico,
      title: `${servicioGenerico.title} en ${ciudadData.nombre}`,
      subtitle: `${servicioGenerico.subtitle} para ${ciudadData.nombre}`,
      description: `${servicioGenerico.description.replace('Nuestros', `Nuestros servicios de ${servicioSlug.replace(/-/g, ' ')} en ${ciudadData.nombre} están`)}`,
      ctaText: `${servicioGenerico.ctaText} en ${ciudadData.nombre}`,
      
      // Añadir referencias locales basadas en los datos de la ciudad
      referenciasLocales: {
        barrios: [], // Se completaría con información real
        zonasComerciales: [], // Se completaría con información real
        puntosReferencia: [] // Se completaría con información real
      }
    };
    
    return contenidoPersonalizado;
  }
  
  // Si no existe información suficiente, devolver un contenido genérico
  return {
    title: `Servicios de seguridad en ${ciudadSlug.replace(/-/g, ' ')}`,
    subtitle: `Soluciones profesionales adaptadas a ${ciudadSlug.replace(/-/g, ' ')}`,
    description: `Ofrecemos servicios de seguridad personalizados para las necesidades específicas de ${ciudadSlug.replace(/-/g, ' ')}, garantizando la protección de tu negocio, hogar o evento.`,
    beneficios: [
      'Personal certificado y capacitado',
      'Servicio disponible 24/7',
      'Adaptado a las necesidades locales',
      'Respuesta rápida garantizada'
    ],
    features: [
      {
        title: 'Servicio Personalizado',
        description: `Adaptado a las particularidades de ${ciudadSlug.replace(/-/g, ' ')}`,
        iconName: 'shield'
      },
      {
        title: 'Experiencia Local',
        description: 'Conocimiento detallado de la zona y sus necesidades',
        iconName: 'map-pin'
      },
      {
        title: 'Tecnología Avanzada',
        description: 'Equipamiento de última generación para mayor seguridad',
        iconName: 'cpu'
      }
    ],
    ctaText: `Solicitar información para ${ciudadSlug.replace(/-/g, ' ')}`,
    imageId: '4824f8b9-abb0-4e77-c654-efe920697b00'
  };
};

export default getCiudadServicioContent; 