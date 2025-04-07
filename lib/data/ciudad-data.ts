export interface CiudadData {
  slug: string;
  nombre: string;
  region: string;
  poblacion: number;
  descripcion: string;
  zonasCriticas: string[];
  barriosImportantes: string[];
  geografia: string;
  necesidadesSeguridad: string[];
  industriasClave: string[];
}

export const ciudades: CiudadData[] = [
  {
    slug: 'santiago',
    nombre: 'Santiago',
    region: 'Metropolitana',
    poblacion: 5250000,
    descripcion: 'Capital de Chile y centro económico del país, Santiago alberga las principales instituciones gubernamentales y financieras. Su crecimiento urbano acelerado ha creado desafíos únicos en seguridad.',
    zonasCriticas: ['Estación Central', 'La Pintana', 'Cerro Navia', 'Pudahuel Sur', 'El Bosque'],
    barriosImportantes: ['Las Condes', 'Providencia', 'Vitacura', 'Santiago Centro', 'Ñuñoa', 'La Florida'],
    geografia: 'Ubicada en un valle rodeado por la Cordillera de los Andes y la Cordillera de la Costa, con el río Mapocho atravesando la ciudad.',
    necesidadesSeguridad: ['Control de multitudes', 'Prevención de robos en comercio', 'Seguridad en transporte público', 'Protección de edificios corporativos', 'Vigilancia en eventos masivos'],
    industriasClave: ['Servicios financieros', 'Comercio minorista', 'Tecnología', 'Construcción', 'Servicios profesionales']
  },
  {
    slug: 'valparaiso',
    nombre: 'Valparaíso',
    region: 'Valparaíso',
    poblacion: 295000,
    descripcion: 'Ciudad portuaria y sede del Congreso Nacional, Valparaíso es Patrimonio de la Humanidad por su arquitectura y sistema de funiculares. Su actividad portuaria requiere medidas de seguridad especializadas.',
    zonasCriticas: ['Cerro La Cruz', 'Cerro Cordillera', 'Cerro Barón', 'Sector Puerto', 'Plaza Echaurren'],
    barriosImportantes: ['Cerro Alegre', 'Cerro Concepción', 'Plan de Valparaíso', 'Playa Ancha', 'Almendral'],
    geografia: 'Ciudad costera construida sobre 42 cerros que descienden hacia el Océano Pacífico, con un estrecho plan (centro).',
    necesidadesSeguridad: ['Seguridad portuaria', 'Protección patrimonial', 'Vigilancia turística', 'Control de acceso en cerros', 'Monitoreo en zonas comerciales'],
    industriasClave: ['Actividad portuaria', 'Turismo', 'Servicios gubernamentales', 'Educación superior', 'Comercio']
  },
  {
    slug: 'concepcion',
    nombre: 'Concepción',
    region: 'Biobío',
    poblacion: 224000,
    descripcion: 'Capital de la Región del Biobío y centro industrial del sur de Chile. Su área metropolitana (Gran Concepción) incluye importantes zonas industriales y el puerto de Talcahuano.',
    zonasCriticas: ['Lorenzo Arenas', 'Barrio Norte', 'Sector Pedro de Valdivia Bajo', 'Palomares', 'Nonguén'],
    barriosImportantes: ['Centro de Concepción', 'Barrio Universitario', 'Pedro de Valdivia Alto', 'Lomas de San Andrés', 'Hualpén'],
    geografia: 'Ubicada en la confluencia del río Biobío y el Océano Pacífico, con colinas circundantes y la cordillera de Nahuelbuta en las cercanías.',
    necesidadesSeguridad: ['Protección industrial', 'Seguridad universitaria', 'Vigilancia portuaria', 'Protección ante desastres naturales', 'Control en zonas residenciales'],
    industriasClave: ['Industria forestal', 'Petroquímica', 'Educación superior', 'Pesca', 'Siderurgia']
  },
  {
    slug: 'antofagasta',
    nombre: 'Antofagasta',
    region: 'Antofagasta',
    poblacion: 361000,
    descripcion: 'Principal ciudad minera de Chile, conocida como "la capital minera". Su economía gira en torno a la extracción de cobre y otros minerales, con un importante puerto comercial.',
    zonasCriticas: ['La Chimba', 'Centro Norte', 'Sector Industrial', 'Caleta Coloso', 'Coviefi'],
    barriosImportantes: ['Gran Vía', 'Centro', 'Parque Brasil', 'Playa Blanca', 'Jardines del Sur'],
    geografia: 'Ciudad costera que se extiende linealmente entre el Océano Pacífico y el cerro Moreno, con clima desértico.',
    necesidadesSeguridad: ['Seguridad minera', 'Protección portuaria', 'Vigilancia de transportes de valores', 'Control en zonas industriales', 'Seguridad residencial para expatriados'],
    industriasClave: ['Minería', 'Logística portuaria', 'Comercio', 'Energía', 'Construcción']
  },
  {
    slug: 'vina-del-mar',
    nombre: 'Viña del Mar',
    region: 'Valparaíso',
    poblacion: 330000,
    descripcion: 'Principal balneario de Chile y ciudad turística, conocida como "Ciudad Jardín". Sede del Festival Internacional de la Canción y destino vacacional con intenso flujo turístico estacional.',
    zonasCriticas: ['Forestal Alto', 'Achupallas', 'Glorias Navales', 'Reñaca Bajo', 'Gómez Carreño'],
    barriosImportantes: ['Plan de Viña', 'Reñaca', 'Agua Santa', 'Miraflores', 'Sporting', 'Recreo'],
    geografia: 'Ciudad costera con playas, esteros, quebradas y cerros urbanizados, ubicada junto a Valparaíso.',
    necesidadesSeguridad: ['Seguridad turística', 'Vigilancia en eventos masivos', 'Protección de segundas viviendas', 'Control en centros comerciales', 'Monitoreo de playas'],
    industriasClave: ['Turismo', 'Servicios hoteleros', 'Comercio', 'Entretenimiento', 'Construcción inmobiliaria']
  },
  {
    slug: 'temuco',
    nombre: 'Temuco',
    region: 'La Araucanía',
    poblacion: 282000,
    descripcion: 'Capital de La Araucanía y centro de servicios para la actividad agrícola y forestal de la región. Ciudad con importante presencia indígena mapuche e historia intercultural.',
    zonasCriticas: ['Santa Rosa', 'Pueblo Nuevo', 'Amanecer', 'Labranza', 'Pedro de Valdivia'],
    barriosImportantes: ['Centro', 'Avenida Alemania', 'Sector Poniente', 'Barros Arana', 'Portal Araucanía'],
    geografia: 'Ubicada en el valle central, junto al río Cautín, con el cerro Ñielol como elemento paisajístico característico.',
    necesidadesSeguridad: ['Protección agroindustrial', 'Seguridad comercial', 'Vigilancia en zonas rurales cercanas', 'Control en centros educativos', 'Monitoreo de transporte de productos forestales'],
    industriasClave: ['Agroindustria', 'Forestal', 'Comercio', 'Servicios financieros', 'Educación superior']
  },
  {
    slug: 'iquique',
    nombre: 'Iquique',
    region: 'Tarapacá',
    poblacion: 191000,
    descripcion: 'Ciudad portuaria y zona franca del norte de Chile. Centro económico y turístico conocido por sus playas, patrimonio histórico y comercio duty free en ZOFRI.',
    zonasCriticas: ['Alto Hospicio', 'La Negra', 'El Colorado', 'El Morro', 'Huantajaya'],
    barriosImportantes: ['Península de Cavancha', 'Playa Brava', 'Centro Histórico', 'Bajo Molle', 'Huayquique'],
    geografia: 'Ciudad costera ubicada entre el Océano Pacífico y el farellón costero, en medio del desierto de Atacama.',
    necesidadesSeguridad: ['Control fronterizo', 'Seguridad en zona franca', 'Vigilancia portuaria', 'Protección hotelera', 'Monitoreo comercial'],
    industriasClave: ['Comercio zona franca', 'Turismo', 'Minería', 'Servicios portuarios', 'Pesca industrial']
  },
  {
    slug: 'puerto-montt',
    nombre: 'Puerto Montt',
    region: 'Los Lagos',
    poblacion: 245000,
    descripcion: 'Capital de la Región de Los Lagos y puerta de entrada a la Patagonia chilena. Centro logístico para la acuicultura, pesca y turismo del sur del país.',
    zonasCriticas: ['Alerce', 'Mirasol', 'Chinquihue', 'Valle Volcanes', 'Padre Hurtado'],
    barriosImportantes: ['Centro', 'Puerto Angelmo', 'Pelluco', 'Chamiza', 'Cardonal'],
    geografia: 'Ciudad costera ubicada frente al Seno de Reloncaví, con geografía irregular de cerros y bahías, con volcanes visibles en el horizonte.',
    necesidadesSeguridad: ['Seguridad acuícola', 'Protección en terminales de transporte', 'Vigilancia portuaria', 'Control en centros de procesamiento de alimentos', 'Monitoreo turístico'],
    industriasClave: ['Acuicultura', 'Logística', 'Turismo', 'Comercio', 'Transporte marítimo']
  },
  {
    slug: 'rancagua',
    nombre: 'Rancagua',
    region: "O'Higgins",
    poblacion: 241000,
    descripcion: 'Capital de la Región de O\'Higgins y centro agrícola e industrial. Su economía está ligada a la minería (El Teniente), agroindustria y servicios para el Valle Central.',
    zonasCriticas: ['Población Rancagua Sur', 'Villa Triana', 'Sector Estación', 'Dintrans', 'Vicuña Mackenna'],
    barriosImportantes: ['Centro Histórico', 'Santa Cruz', 'Manzanal', 'El Trébol', 'Machalí'],
    geografia: 'Ubicada en el valle central chileno, con una topografía plana rodeada por la Cordillera de los Andes y la Cordillera de la Costa.',
    necesidadesSeguridad: ['Protección minera', 'Seguridad agroindustrial', 'Vigilancia comercial', 'Control en zonas residenciales', 'Monitoreo de transportes mineros'],
    industriasClave: ['Minería', 'Agroindustria', 'Comercio', 'Servicios financieros', 'Construcción']
  },
  {
    slug: 'chillan',
    nombre: 'Chillán',
    region: 'Ñuble',
    poblacion: 180000,
    descripcion: 'Capital de la Región de Ñuble, centro agrícola y comercial. Ciudad histórica con rico patrimonio cultural, cuna de Bernardo O\'Higgins, Arturo Prat y Claudio Arrau.',
    zonasCriticas: ['Los Volcanes', 'Vicente Pérez Rosales', 'Población Purén', 'El Roble', 'Sector Ultra Estación'],
    barriosImportantes: ['Centro Histórico', 'Santa Elvira', 'Sector Ultraestación', 'Villa San Rafael', 'Chillán Viejo'],
    geografia: 'Ubicada en el valle central entre los ríos Ñuble y Chillán, con la cordillera de los Andes visible al oriente.',
    necesidadesSeguridad: ['Seguridad agroindustrial', 'Protección comercial', 'Vigilancia en centros educativos', 'Control en terminales de transporte', 'Monitoreo de eventos masivos'],
    industriasClave: ['Agroindustria', 'Comercio', 'Educación', 'Turismo termal', 'Ganadería']
  }
];

/**
 * Obtiene los datos de una ciudad por su slug
 * @param slug El slug de la ciudad a buscar
 * @returns Los datos de la ciudad o undefined si no se encuentra
 */
export function getCiudadBySlug(slug: string): CiudadData | undefined {
  return ciudades.find(ciudad => ciudad.slug === slug);
}

/**
 * Obtiene todas las ciudades disponibles
 * @returns Lista de todas las ciudades
 */
export function getAllCiudades(): CiudadData[] {
  return ciudades;
}

/**
 * Agrupa ciudades por región
 * @returns Un objeto con las ciudades agrupadas por región
 */
export function getCiudadesByRegion(): Record<string, CiudadData[]> {
  const ciudadesPorRegion: Record<string, CiudadData[]> = {};
  
  ciudades.forEach(ciudad => {
    if (!ciudadesPorRegion[ciudad.region]) {
      ciudadesPorRegion[ciudad.region] = [];
    }
    ciudadesPorRegion[ciudad.region].push(ciudad);
  });
  
  return ciudadesPorRegion;
}

export default {
  ciudades,
  getCiudadBySlug,
  getAllCiudades,
  getCiudadesByRegion
}; 