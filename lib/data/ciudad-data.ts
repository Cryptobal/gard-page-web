// Datos de las 100 ciudades más importantes de Chile
// Estructura para usar en páginas dinámicas ciudad+servicio

// Interfaz para los datos de ciudad
export interface CiudadData {
  id: number;
  nombre: string;
  slug: string;
  region: string;
  poblacion: number;
  descripcion: string;
  industrias: string[];
  caracteristicas: string[];
  imageId?: string;
}

// Lista de las 100 ciudades principales de Chile
export const ciudades: CiudadData[] = [
  {
    id: 1,
    nombre: "Santiago",
    slug: "santiago",
    region: "Metropolitana",
    poblacion: 5614000,
    descripcion: "Capital nacional y principal centro económico, político y cultural de Chile.",
    industrias: ["retail", "corporativo", "industrial", "logistica", "centros-comerciales", "sector-financiero"],
    caracteristicas: ["Gran concentración poblacional", "Principal centro económico", "Alta densidad de empresas", "Nivel alto de delincuencia"]
  },
  {
    id: 2,
    nombre: "Valparaíso",
    slug: "valparaiso",
    region: "Valparaíso",
    poblacion: 296000,
    descripcion: "Principal puerto de Chile y Patrimonio de la Humanidad por UNESCO.",
    industrias: ["logistica", "industrial", "sector-energetico"],
    caracteristicas: ["Ciudad portuaria histórica", "Alto flujo turístico", "Infraestructura portuaria crítica", "Zonas con alta incidencia delictual"]
  },
  {
    id: 3,
    nombre: "Concepción",
    slug: "concepcion",
    region: "Biobío",
    poblacion: 221000,
    descripcion: "Centro urbano del sur de Chile y polo universitario importante.",
    industrias: ["industrial", "corporativo", "sector-energetico"],
    caracteristicas: ["Polo industrial importante", "Centro universitario", "Infraestructura crítica", "Cercanía a zonas forestales"]
  },
  {
    id: 4,
    nombre: "Antofagasta",
    slug: "antofagasta",
    region: "Antofagasta",
    poblacion: 361000,
    descripcion: "Principal centro minero del norte y capital económica del norte de Chile.",
    industrias: ["mineria", "industrial", "logistica", "sector-energetico"],
    caracteristicas: ["Centro minero estratégico", "Puerto industrial importante", "Alto flujo de trabajadores", "Zonas industriales extensas"]
  },
  {
    id: 5,
    nombre: "Viña del Mar",
    slug: "vina-del-mar",
    region: "Valparaíso",
    poblacion: 311000,
    descripcion: "Principal ciudad turística y balneario de Chile.",
    industrias: ["retail", "corporativo", "centros-comerciales"],
    caracteristicas: ["Alta actividad turística", "Grandes eventos masivos", "Zonas residenciales exclusivas", "Flujo estacional de visitantes"]
  },
  {
    id: 6,
    nombre: "Temuco",
    slug: "temuco",
    region: "La Araucanía",
    poblacion: 282000,
    descripcion: "Centro comercial y cultural de La Araucanía.",
    industrias: ["retail", "agroindustria", "corporativo"],
    caracteristicas: ["Centro urbano del sur", "Importante presencia indígena", "Polo comercial regional", "Entorno rural próximo"]
  },
  {
    id: 7,
    nombre: "Rancagua",
    slug: "rancagua",
    region: "O'Higgins",
    poblacion: 232000,
    descripcion: "Centro agrícola y minero importante de la zona central.",
    industrias: ["mineria", "agroindustria", "industrial"],
    caracteristicas: ["Cercana a la mina El Teniente", "Centro agrícola", "Crecimiento urbano acelerado", "Actividad comercial importante"]
  },
  {
    id: 8,
    nombre: "Talca",
    slug: "talca",
    region: "Maule",
    poblacion: 220000,
    descripcion: "Capital regional del Maule y centro agrícola y vitivinícola.",
    industrias: ["agroindustria", "retail", "industrial"],
    caracteristicas: ["Centro agrícola importante", "Polo educativo regional", "Zona vitivinícola", "Riesgo sísmico elevado"]
  },
  {
    id: 9,
    nombre: "Arica",
    slug: "arica",
    region: "Arica y Parinacota",
    poblacion: 222000,
    descripcion: "Ciudad fronteriza del extremo norte y puerto libre.",
    industrias: ["logistica", "industrial", "sector-financiero"],
    caracteristicas: ["Ciudad fronteriza", "Puerto estratégico", "Zona franca", "Alto flujo transfronterizo"]
  },
  {
    id: 10,
    nombre: "Iquique",
    slug: "iquique",
    region: "Tarapacá",
    poblacion: 191000,
    descripcion: "Centro comercial del norte y zona franca importante.",
    industrias: ["retail", "logistica", "mineria", "sector-financiero"],
    caracteristicas: ["Zona franca ZOFRI", "Ciudad portuaria", "Actividad minera", "Turismo comercial"]
  },
  // Siguientes ciudades
  {
    id: 11,
    nombre: "Puerto Montt",
    slug: "puerto-montt",
    region: "Los Lagos",
    poblacion: 245000,
    descripcion: "Puerta de entrada a la Patagonia y centro de la industria acuícola.",
    industrias: ["logistica", "agroindustria", "sector-energetico"],
    caracteristicas: ["Puerto importante", "Centro acuícola", "Turismo patagónico", "Crecimiento urbano reciente"]
  },
  {
    id: 12,
    nombre: "Calama",
    slug: "calama",
    region: "Antofagasta",
    poblacion: 165000,
    descripcion: "Centro minero clave, cercano a la mina Chuquicamata.",
    industrias: ["mineria", "industrial", "logistica"],
    caracteristicas: ["Centro minero estratégico", "Alto flujo de trabajadores", "Clima extremo", "Infraestructura crítica minera"]
  },
  {
    id: 13,
    nombre: "Copiapó",
    slug: "copiapo",
    region: "Atacama",
    poblacion: 153000,
    descripcion: "Capital de Atacama y centro minero del norte chico.",
    industrias: ["mineria", "industrial", "agroindustria"],
    caracteristicas: ["Centro minero importante", "Zonas de agricultura de exportación", "Riesgo de aluviones", "Ciudad oasis"]
  },
  {
    id: 14,
    nombre: "Chillán",
    slug: "chillan",
    region: "Ñuble",
    poblacion: 175000,
    descripcion: "Centro agrícola y ganadero de la zona centro-sur.",
    industrias: ["agroindustria", "retail", "corporativo"],
    caracteristicas: ["Centro agrícola importante", "Polo comercial regional", "Turismo termal", "Entorno rural circundante"]
  },
  {
    id: 15,
    nombre: "Osorno",
    slug: "osorno",
    region: "Los Lagos",
    poblacion: 161000,
    descripcion: "Centro ganadero y lechero del sur de Chile.",
    industrias: ["agroindustria", "industrial", "retail"],
    caracteristicas: ["Polo ganadero importante", "Industria lechera", "Comercio regional", "Clima lluvioso frecuente"]
  },
  {
    id: 16,
    nombre: "La Serena",
    slug: "la-serena",
    region: "Coquimbo",
    poblacion: 221000,
    descripcion: "Ciudad turística e histórica del norte chico.",
    industrias: ["retail", "corporativo", "centros-comerciales"],
    caracteristicas: ["Alto flujo turístico", "Centro histórico colonial", "Proximidad a observatorios astronómicos", "Ciudad universitaria"]
  },
  {
    id: 17,
    nombre: "Coquimbo",
    slug: "coquimbo",
    region: "Coquimbo",
    poblacion: 227000,
    descripcion: "Puerto pesquero y centro turístico del norte chico.",
    industrias: ["logistica", "sector-energetico", "retail"],
    caracteristicas: ["Puerto importante", "Zona comercial activa", "Barrio inglés histórico", "Turismo de playa"]
  },
  {
    id: 18,
    nombre: "Valdivia",
    slug: "valdivia",
    region: "Los Ríos",
    poblacion: 166000,
    descripcion: "Ciudad fluvial del sur con importante actividad universitaria y cultural.",
    industrias: ["corporativo", "agroindustria", "centros-comerciales"],
    caracteristicas: ["Ciudad fluvial", "Polo universitario importante", "Arquitectura alemana", "Alto nivel cultural"]
  },
  {
    id: 19,
    nombre: "Punta Arenas",
    slug: "punta-arenas",
    region: "Magallanes",
    poblacion: 131000,
    descripcion: "Principal ciudad de la Patagonia chilena y centro logístico austral.",
    industrias: ["logistica", "sector-energetico", "agroindustria"],
    caracteristicas: ["Ciudad más austral de Chile", "Centro de operaciones antárticas", "Fuerte viento", "Turismo patagónico"]
  },
  {
    id: 20,
    nombre: "Los Ángeles",
    slug: "los-angeles",
    region: "Biobío",
    poblacion: 202000,
    descripcion: "Centro agrícola, ganadero y forestal del Biobío interior.",
    industrias: ["agroindustria", "industrial", "retail"],
    caracteristicas: ["Zona forestal", "Agricultura extensiva", "Comercio regional", "Crecimiento urbano"]
  },
  {
    id: 21,
    nombre: "Curicó",
    slug: "curico",
    region: "Maule",
    poblacion: 149000,
    descripcion: "Centro agrícola y vitivinícola del Valle Central.",
    industrias: ["agroindustria", "retail", "industrial"],
    caracteristicas: ["Capital frutícola", "Producción vinícola", "Fiesta de la vendimia", "Comercio agrícola"]
  },
  {
    id: 22,
    nombre: "Quilpué",
    slug: "quilpue",
    region: "Valparaíso",
    poblacion: 151000,
    descripcion: "Ciudad dormitorio de Valparaíso y Viña del Mar.",
    industrias: ["retail", "corporativo"],
    caracteristicas: ["Ciudad dormitorio", "Crecimiento residencial", "Buen clima", "Ciudad del sol"]
  },
  {
    id: 23,
    nombre: "Villa Alemana",
    slug: "villa-alemana",
    region: "Valparaíso",
    poblacion: 126000,
    descripcion: "Ciudad residencial cercana a Valparaíso.",
    industrias: ["retail", "corporativo"],
    caracteristicas: ["Ciudad residencial", "Clima templado", "Crecimiento urbano", "Tranquilidad"]
  },
  {
    id: 24,
    nombre: "San Antonio",
    slug: "san-antonio",
    region: "Valparaíso",
    poblacion: 91000,
    descripcion: "Principal puerto de la zona central de Chile.",
    industrias: ["logistica", "industrial", "sector-energetico"],
    caracteristicas: ["Gran puerto de carga", "Actividad pesquera", "Turismo costero", "Logística portuaria"]
  },
  {
    id: 25,
    nombre: "Linares",
    slug: "linares",
    region: "Maule",
    poblacion: 93000,
    descripcion: "Centro agrícola y comercial del Maule sur.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Centro agrícola", "Comercio regional", "Cercanía cordillera", "Tradiciones huasas"]
  },
  {
    id: 26,
    nombre: "Quillota",
    slug: "quillota",
    region: "Valparaíso",
    poblacion: 90000,
    descripcion: "Centro agrícola del Valle del Aconcagua.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Valle fértil", "Producción de palta y chirimoya", "Ciudad histórica", "Clima privilegiado"]
  },
  {
    id: 27,
    nombre: "Ovalle",
    slug: "ovalle",
    region: "Coquimbo",
    poblacion: 111000,
    descripcion: "Centro económico del Valle del Limarí.",
    industrias: ["agroindustria", "mineria", "retail"],
    caracteristicas: ["Centro agrícola importante", "Producción de pisco", "Valle del Limarí", "Mercado modelo"]
  },
  {
    id: 28,
    nombre: "Melipilla",
    slug: "melipilla",
    region: "Metropolitana",
    poblacion: 123000,
    descripcion: "Centro agrícola e industrial al suroeste de Santiago.",
    industrias: ["agroindustria", "industrial", "retail"],
    caracteristicas: ["Centro agrícola regional", "Cercanía a Santiago", "Tradición campesina", "Comercio rural"]
  },
  {
    id: 29,
    nombre: "San Felipe",
    slug: "san-felipe",
    region: "Valparaíso",
    poblacion: 76000,
    descripcion: "Capital provincial del Valle de Aconcagua.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Centro agrícola", "Valle fértil", "Producción frutícola", "Ciudad histórica"]
  },
  {
    id: 30,
    nombre: "Los Andes",
    slug: "los-andes",
    region: "Valparaíso",
    poblacion: 66000,
    descripcion: "Ciudad fronteriza con Argentina, paso Los Libertadores.",
    industrias: ["logistica", "industrial", "mineria"],
    caracteristicas: ["Paso fronterizo", "Aduana internacional", "Industria cuprífera", "Clima cordillerano"]
  },
  {
    id: 31,
    nombre: "Castro",
    slug: "castro",
    region: "Los Lagos",
    poblacion: 43000,
    descripcion: "Principal ciudad del archipiélago de Chiloé.",
    industrias: ["logistica", "agroindustria"],
    caracteristicas: ["Palafitos tradicionales", "Puerto comercial", "Iglesias patrimoniales", "Cultura chilota"]
  },
  {
    id: 32,
    nombre: "Angol",
    slug: "angol",
    region: "La Araucanía",
    poblacion: 53000,
    descripcion: "Centro agrícola y forestal de Malleco.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Zona forestal", "Comercio agrícola", "Entrada occidental a Nahuelbuta", "Ciudad histórica"]
  },
  {
    id: 33,
    nombre: "Constitución",
    slug: "constitucion",
    region: "Maule",
    poblacion: 46000,
    descripcion: "Ciudad costera y forestal del Maule.",
    industrias: ["industrial", "logistica"],
    caracteristicas: ["Centro forestal", "Puerto", "Balneario", "Celulosa"]
  },
  {
    id: 34,
    nombre: "San Fernando",
    slug: "san-fernando",
    region: "O'Higgins",
    poblacion: 73000,
    descripcion: "Centro agrícola de Colchagua.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Zona vinícola", "Centro agrícola", "Tradiciones campesinas", "Valle de Colchagua"]
  },
  {
    id: 35,
    nombre: "Ancud",
    slug: "ancud",
    region: "Los Lagos",
    poblacion: 39000,
    descripcion: "Ciudad histórica y puerto de Chiloé norte.",
    industrias: ["logistica", "agroindustria"],
    caracteristicas: ["Puerto histórico", "Fuertes españoles", "Cultura chilota", "Turismo cultural"]
  },
  {
    id: 36,
    nombre: "Coyhaique",
    slug: "coyhaique",
    region: "Aysén",
    poblacion: 57000,
    descripcion: "Capital de la región de Aysén en la Patagonia Norte.",
    industrias: ["agroindustria", "sector-energetico", "corporativo"],
    caracteristicas: ["Centro administrativo patagónico", "Ganadería", "Turismo de naturaleza", "Clima frío"]
  },
  {
    id: 37,
    nombre: "Buin",
    slug: "buin",
    region: "Metropolitana",
    poblacion: 96000,
    descripcion: "Ciudad agrícola al sur de Santiago.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Producción frutícola", "Cercanía a Santiago", "Crecimiento urbano", "Tradición rural"]
  },
  {
    id: 38,
    nombre: "San Vicente de Tagua Tagua",
    slug: "san-vicente-tagua-tagua",
    region: "O'Higgins",
    poblacion: 46000,
    descripcion: "Centro agrícola con importante patrimonio arqueológico.",
    industrias: ["agroindustria"],
    caracteristicas: ["Centro agrícola", "Laguna de Tagua Tagua", "Sitio arqueológico", "Tradición campesina"]
  },
  {
    id: 39,
    nombre: "Talagante",
    slug: "talagante",
    region: "Metropolitana",
    poblacion: 74000,
    descripcion: "Ciudad satélite de Santiago con tradición alfarera.",
    industrias: ["industrial", "retail", "agroindustria"],
    caracteristicas: ["Ciudad satélite", "Tradición alfarera", "Crecimiento urbano", "Producción de chicha"]
  },
  {
    id: 40,
    nombre: "Peñaflor",
    slug: "penaflor",
    region: "Metropolitana",
    poblacion: 90000,
    descripcion: "Ciudad satélite de Santiago con entorno natural.",
    industrias: ["retail", "industrial"],
    caracteristicas: ["Ciudad dormitorio", "Río Mapocho", "Crecimiento urbano", "Parque El Trapiche"]
  },
  {
    id: 41,
    nombre: "Puerto Varas",
    slug: "puerto-varas",
    region: "Los Lagos",
    poblacion: 44000,
    descripcion: "Centro turístico junto al lago Llanquihue.",
    industrias: ["retail", "corporativo"],
    caracteristicas: ["Arquitectura alemana", "Turismo lacustre", "Vista al volcán Osorno", "Gastronomía"]
  },
  {
    id: 42,
    nombre: "Concón",
    slug: "concon",
    region: "Valparaíso",
    poblacion: 42000,
    descripcion: "Balneario y centro gastronómico cerca de Viña del Mar.",
    industrias: ["retail", "industrial"],
    caracteristicas: ["Gastronomía marina", "Dunas", "Refinería de petróleo", "Caletas pesqueras"]
  },
  {
    id: 43,
    nombre: "San Carlos",
    slug: "san-carlos",
    region: "Ñuble",
    poblacion: 53000,
    descripcion: "Centro agrícola del valle central de Ñuble.",
    industrias: ["agroindustria"],
    caracteristicas: ["Agricultura de riego", "Comercio agrícola", "Tranquilidad provincial", "Cercanía a Chillán"]
  },
  {
    id: 44,
    nombre: "Tomé",
    slug: "tome",
    region: "Biobío",
    poblacion: 55000,
    descripcion: "Ciudad costera con pasado industrial textil.",
    industrias: ["industrial", "logistica"],
    caracteristicas: ["Ex centro textil", "Playas", "Caletas pesqueras", "Cerros habitados"]
  },
  {
    id: 45,
    nombre: "Coronel",
    slug: "coronel",
    region: "Biobío",
    poblacion: 116000,
    descripcion: "Ciudad industrial y portuaria cercana a Concepción.",
    industrias: ["industrial", "logistica", "sector-energetico"],
    caracteristicas: ["Zona industrial", "Minería del carbón histórica", "Puerto", "Centrales termoeléctricas"]
  },
  {
    id: 46,
    nombre: "San Javier",
    slug: "san-javier",
    region: "Maule",
    poblacion: 45000,
    descripcion: "Centro agrícola y vitivinícola del Maule.",
    industrias: ["agroindustria"],
    caracteristicas: ["Producción vinícola", "Agricultura tradicional", "Tranquilidad provincial", "Comercio agrícola"]
  },
  {
    id: 47,
    nombre: "Padre Las Casas",
    slug: "padre-las-casas",
    region: "La Araucanía",
    poblacion: 58000,
    descripcion: "Ciudad satélite de Temuco, con importante población mapuche.",
    industrias: ["retail", "agroindustria"],
    caracteristicas: ["Ciudad dormitorio", "Presencia mapuche", "Crecimiento urbano", "Río Cautín"]
  },
  {
    id: 48,
    nombre: "Victoria",
    slug: "victoria",
    region: "La Araucanía",
    poblacion: 33000,
    descripcion: "Ciudad histórica del sur con tradición agrícola y forestal.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Centro agrícola", "Colonización europea", "Comercio regional", "Arquitectura histórica"]
  },
  {
    id: 49,
    nombre: "Rengo",
    slug: "rengo",
    region: "O'Higgins",
    poblacion: 58000,
    descripcion: "Centro frutícola y vitivinícola de O'Higgins.",
    industrias: ["agroindustria"],
    caracteristicas: ["Centro frutícola", "Producción vinícola", "Agroindustria", "Crecimiento urbano"]
  },
  {
    id: 50,
    nombre: "Illapel",
    slug: "illapel",
    region: "Coquimbo",
    poblacion: 30000,
    descripcion: "Centro minero y agrícola del norte chico.",
    industrias: ["mineria", "agroindustria"],
    caracteristicas: ["Minería de pequeña escala", "Agricultura de valle", "Río Illapel", "Ciudad histórica"]
  },
  {
    id: 51,
    nombre: "Cauquenes",
    slug: "cauquenes",
    region: "Maule",
    poblacion: 41000,
    descripcion: "Centro vitivinícola tradicional del secano interior.",
    industrias: ["agroindustria"],
    caracteristicas: ["Vino País", "Secano interior", "Tradición campesina", "Centro histórico"]
  },
  {
    id: 52,
    nombre: "Lebu",
    slug: "lebu",
    region: "Biobío",
    poblacion: 25000,
    descripcion: "Capital provincial costera con tradición minera y pesquera.",
    industrias: ["logistica", "industrial"],
    caracteristicas: ["Ex zona carbonífera", "Puerto pesquero", "Capital de Arauco", "Turismo costero"]
  },
  {
    id: 53,
    nombre: "Limache",
    slug: "limache",
    region: "Valparaíso",
    poblacion: 46000,
    descripcion: "Ciudad agrícola cercana a Valparaíso.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Producción de chirimoyas", "Valle interior", "Tranvía histórico", "Clima templado"]
  },
  {
    id: 54,
    nombre: "Lota",
    slug: "lota",
    region: "Biobío",
    poblacion: 43000,
    descripcion: "Ciudad minera histórica en reconversión.",
    industrias: ["logistica", "industrial"],
    caracteristicas: ["Ex zona carbonífera", "Mina Chiflón del Diablo", "Parque Lota", "Tradición minera"]
  },
  {
    id: 55,
    nombre: "Parral",
    slug: "parral",
    region: "Maule",
    poblacion: 41000,
    descripcion: "Centro agrícola del Maule sur.",
    industrias: ["agroindustria"],
    caracteristicas: ["Agricultura tradicional", "Comercio provincial", "Cuna de Pablo Neruda", "Producción vitivinícola"]
  },
  {
    id: 56,
    nombre: "Mulchén",
    slug: "mulchen",
    region: "Biobío",
    poblacion: 30000,
    descripcion: "Centro agrícola y forestal del Biobío interior.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Actividad forestal", "Agricultura tradicional", "Río Mulchén", "Comercio local"]
  },
  {
    id: 57,
    nombre: "Nueva Imperial",
    slug: "nueva-imperial",
    region: "La Araucanía",
    poblacion: 33000,
    descripcion: "Ciudad histórica con importante presencia mapuche.",
    industrias: ["agroindustria"],
    caracteristicas: ["Presencia mapuche", "Comercio agrícola", "Río Cautín", "Turismo rural"]
  },
  {
    id: 58,
    nombre: "Cañete",
    slug: "canete",
    region: "Biobío",
    poblacion: 31000,
    descripcion: "Centro histórico y cultural mapuche.",
    industrias: ["agroindustria"],
    caracteristicas: ["Historia mapuche", "Museo mapuche", "Agricultura tradicional", "Comercio provincial"]
  },
  {
    id: 59,
    nombre: "Villarrica",
    slug: "villarrica",
    region: "La Araucanía",
    poblacion: 55000,
    descripcion: "Centro turístico lacustre de la Araucanía.",
    industrias: ["retail", "corporativo"],
    caracteristicas: ["Turismo lacustre", "Volcán activo", "Deportes acuáticos", "Gastronomía"]
  },
  {
    id: 60,
    nombre: "Pucón",
    slug: "pucon",
    region: "La Araucanía",
    poblacion: 28000,
    descripcion: "Principal balneario lacustre del sur de Chile.",
    industrias: ["retail", "corporativo"],
    caracteristicas: ["Turismo de montaña", "Deportes de aventura", "Termas", "Volcán Villarrica"]
  },
  {
    id: 61,
    nombre: "Frutillar",
    slug: "frutillar",
    region: "Los Lagos",
    poblacion: 18000,
    descripcion: "Centro turístico y cultural del lago Llanquihue.",
    industrias: ["retail"],
    caracteristicas: ["Semanas musicales", "Arquitectura alemana", "Gastronomía", "Teatro del Lago"]
  },
  {
    id: 62,
    nombre: "La Unión",
    slug: "la-union",
    region: "Los Ríos",
    poblacion: 39000,
    descripcion: "Centro agrícola y ganadero del sur.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Ganadería", "Industria láctea", "Colonización alemana", "Comercio provincial"]
  },
  {
    id: 63,
    nombre: "La Ligua",
    slug: "la-ligua",
    region: "Valparaíso",
    poblacion: 35000,
    descripcion: "Centro textil tradicional.",
    industrias: ["industrial", "retail"],
    caracteristicas: ["Tejidos artesanales", "Dulces típicos", "Valle interior", "Textilería"]
  },
  {
    id: 64,
    nombre: "Lautaro",
    slug: "lautaro",
    region: "La Araucanía",
    poblacion: 40000,
    descripcion: "Centro agrícola de La Araucanía.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Agroganadería", "Termas", "Río Cautín", "Comercio local"]
  },
  {
    id: 65,
    nombre: "Río Bueno",
    slug: "rio-bueno",
    region: "Los Ríos",
    poblacion: 32000,
    descripcion: "Centro ganadero del sur.",
    industrias: ["agroindustria"],
    caracteristicas: ["Ganadería", "Industria láctea", "Río Bueno", "Comercio agrícola"]
  },
  {
    id: 66,
    nombre: "Arauco",
    slug: "arauco",
    region: "Biobío",
    poblacion: 36000,
    descripcion: "Ciudad costera histórica con industria forestal.",
    industrias: ["industrial", "logistica"],
    caracteristicas: ["Industria forestal", "Planta celulosa", "Golfo de Arauco", "Historia mapuche"]
  },
  {
    id: 67,
    nombre: "Nacimiento",
    slug: "nacimiento",
    region: "Biobío",
    poblacion: 27000,
    descripcion: "Ciudad histórica del Biobío con industria forestal.",
    industrias: ["industrial", "agroindustria"],
    caracteristicas: ["Fuerte histórico", "Industria forestal", "Confluencia de ríos", "Ciudad histórica"]
  },
  {
    id: 68,
    nombre: "Andacollo",
    slug: "andacollo",
    region: "Coquimbo",
    poblacion: 11000,
    descripcion: "Centro minero tradicional y religioso.",
    industrias: ["mineria"],
    caracteristicas: ["Minería artesanal", "Fiesta religiosa", "Santuario", "Tradición minera"]
  },
  {
    id: 69,
    nombre: "Loncoche",
    slug: "loncoche",
    region: "La Araucanía",
    poblacion: 23000,
    descripcion: "Nudo ferroviario del sur.",
    industrias: ["agroindustria"],
    caracteristicas: ["Agricultura tradicional", "Nudo ferroviario", "Comercio agrícola", "Entrada a la cordillera"]
  },
  {
    id: 70,
    nombre: "Purranque",
    slug: "purranque",
    region: "Los Lagos",
    poblacion: 21000,
    descripcion: "Centro agrícola y maderero.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Agricultura tradicional", "Industria maderera", "Colonización alemana", "Comercio local"]
  },
  {
    id: 71,
    nombre: "Chanco",
    slug: "chanco",
    region: "Maule",
    poblacion: 9000,
    descripcion: "Centro agrícola tradicional del secano costero.",
    industrias: ["agroindustria"],
    caracteristicas: ["Queso chanco", "Reserva Federico Albert", "Tradición campesina", "Secano costero"]
  },
  {
    id: 72,
    nombre: "Puerto Natales",
    slug: "puerto-natales",
    region: "Magallanes",
    poblacion: 19000,
    descripcion: "Puerta de entrada a Torres del Paine.",
    industrias: ["logistica"],
    caracteristicas: ["Turismo patagónico", "Puerto", "Torres del Paine", "Clima extremo"]
  },
  {
    id: 73,
    nombre: "Freirina",
    slug: "freirina",
    region: "Atacama",
    poblacion: 7000,
    descripcion: "Centro histórico de Atacama.",
    industrias: ["mineria", "agroindustria"],
    caracteristicas: ["Patrimonio arquitectónico", "Valle del Huasco", "Olivos centenarios", "Tradición rural"]
  },
  {
    id: 74,
    nombre: "Tocopilla",
    slug: "tocopilla",
    region: "Antofagasta",
    poblacion: 24000,
    descripcion: "Puerto minero del norte.",
    industrias: ["mineria", "logistica", "sector-energetico"],
    caracteristicas: ["Puerto minero", "Centrales termoeléctricas", "Pesca artesanal", "Clima desértico"]
  },
  {
    id: 75,
    nombre: "Pozo Almonte",
    slug: "pozo-almonte",
    region: "Tarapacá",
    poblacion: 15000,
    descripcion: "Centro minero del norte.",
    industrias: ["mineria"],
    caracteristicas: ["Ex oficinas salitreras", "Pampa del Tamarugal", "Administración provincial", "Mina Cerro Colorado"]
  },
  {
    id: 76,
    nombre: "Taltal",
    slug: "taltal",
    region: "Antofagasta",
    poblacion: 10000,
    descripcion: "Puerto histórico del norte.",
    industrias: ["mineria", "logistica"],
    caracteristicas: ["Puerto minero", "Ex salitreras", "Pesca artesanal", "Caleta histórica"]
  },
  {
    id: 77,
    nombre: "Mejillones",
    slug: "mejillones",
    region: "Antofagasta",
    poblacion: 13000,
    descripcion: "Puerto industrial del norte.",
    industrias: ["logistica", "industrial", "sector-energetico"],
    caracteristicas: ["Puerto industrial", "Terminales de combustible", "Bahía protegida", "Centrales termoeléctricas"]
  },
  {
    id: 78,
    nombre: "Huasco",
    slug: "huasco",
    region: "Atacama",
    poblacion: 10000,
    descripcion: "Puerto minero de Atacama.",
    industrias: ["mineria", "logistica", "sector-energetico"],
    caracteristicas: ["Puerto minero", "Central termoeléctrica", "Valle del Huasco", "Planta de pellets"]
  },
  {
    id: 79,
    nombre: "Los Vilos",
    slug: "los-vilos",
    region: "Coquimbo",
    poblacion: 21000,
    descripcion: "Balneario y puerto pesquero.",
    industrias: ["logistica"],
    caracteristicas: ["Balneario costero", "Puerto pesquero", "Turismo de playa", "Gastronomía marina"]
  },
  {
    id: 80,
    nombre: "Salamanca",
    slug: "salamanca",
    region: "Coquimbo",
    poblacion: 29000,
    descripcion: "Centro agrícola del norte chico.",
    industrias: ["agroindustria", "mineria"],
    caracteristicas: ["Producción de paltas", "Valle del Choapa", "Minería El Teniente", "Agricultura de riego"]
  },
  {
    id: 81,
    nombre: "Vicuña",
    slug: "vicuna",
    region: "Coquimbo",
    poblacion: 27000,
    descripcion: "Centro astronómico y pisquero del Valle del Elqui.",
    industrias: ["agroindustria"],
    caracteristicas: ["Valle del Elqui", "Observatorios astronómicos", "Producción de pisco", "Turismo rural"]
  },
  {
    id: 82,
    nombre: "Combarbalá",
    slug: "combarbala",
    region: "Coquimbo",
    poblacion: 13000,
    descripcion: "Centro minero tradicional de lapislázuli.",
    industrias: ["mineria", "agroindustria"],
    caracteristicas: ["Lapislázuli", "Artesanía en piedra", "Observatorio Cruz del Sur", "Secano interior"]
  },
  {
    id: 83,
    nombre: "Paihuano",
    slug: "paihuano",
    region: "Coquimbo",
    poblacion: 4000,
    descripcion: "Centro turístico del Valle del Elqui.",
    industrias: ["agroindustria"],
    caracteristicas: ["Valle del Elqui", "Producción de pisco", "Turismo rural", "Cielos limpios"]
  },
  {
    id: 84,
    nombre: "Monte Patria",
    slug: "monte-patria",
    region: "Coquimbo",
    poblacion: 30000,
    descripcion: "Centro agrícola de los valles interiores.",
    industrias: ["agroindustria"],
    caracteristicas: ["Cinco valles", "Producción de uva", "Embalses", "Agricultura de exportación"]
  },
  {
    id: 85,
    nombre: "Quintero",
    slug: "quintero",
    region: "Valparaíso",
    poblacion: 31000,
    descripcion: "Centro portuario e industrial.",
    industrias: ["logistica", "industrial", "sector-energetico"],
    caracteristicas: ["Terminal de gas", "Bahía industrial", "Zona de sacrificio", "Balneario histórico"]
  },
  {
    id: 86,
    nombre: "Casablanca",
    slug: "casablanca",
    region: "Valparaíso",
    poblacion: 26000,
    descripcion: "Centro vitivinícola.",
    industrias: ["agroindustria"],
    caracteristicas: ["Valle vitivinícola", "Ruta del vino", "Clima fresco", "Vinos blancos"]
  },
  {
    id: 87,
    nombre: "El Quisco",
    slug: "el-quisco",
    region: "Valparaíso",
    poblacion: 15000,
    descripcion: "Balneario central.",
    industrias: ["retail"],
    caracteristicas: ["Balneario tradicional", "Casa de Pablo Neruda", "Playa principal", "Turismo estival"]
  },
  {
    id: 88,
    nombre: "Cartagena",
    slug: "cartagena",
    region: "Valparaíso",
    poblacion: 22000,
    descripcion: "Balneario histórico.",
    industrias: ["retail"],
    caracteristicas: ["Balneario popular", "Playas urbanas", "Historia balnearia", "Turismo accesible"]
  },
  {
    id: 89,
    nombre: "Santo Domingo",
    slug: "santo-domingo",
    region: "Valparaíso",
    poblacion: 10000,
    descripcion: "Balneario exclusivo.",
    industrias: ["retail"],
    caracteristicas: ["Balneario exclusivo", "Condominios cerrados", "Club de golf", "Humedales"]
  },
  {
    id: 90,
    nombre: "Pichilemu",
    slug: "pichilemu",
    region: "O'Higgins",
    poblacion: 16000,
    descripcion: "Capital del surf chileno.",
    industrias: ["retail"],
    caracteristicas: ["Surf internacional", "Punta de Lobos", "Bosque de pinos", "Salinas históricas"]
  },
  {
    id: 91,
    nombre: "Santa Cruz",
    slug: "santa-cruz",
    region: "O'Higgins",
    poblacion: 37000,
    descripcion: "Centro vitivinícola y turístico.",
    industrias: ["agroindustria", "retail"],
    caracteristicas: ["Valle de Colchagua", "Museo local", "Ruta del vino", "Patrimonio colonial"]
  },
  {
    id: 92,
    nombre: "Chimbarongo",
    slug: "chimbarongo",
    region: "O'Higgins",
    poblacion: 35000,
    descripcion: "Centro de artesanía en mimbre.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Capital del mimbre", "Artesanía tradicional", "Agricultura", "Embalse Convento Viejo"]
  },
  {
    id: 93,
    nombre: "Molina",
    slug: "molina",
    region: "Maule",
    poblacion: 45000,
    descripcion: "Centro vitivinícola.",
    industrias: ["agroindustria"],
    caracteristicas: ["Producción vinícola", "Valle del Río Claro", "Agroindustria", "Comercio provincial"]
  },
  {
    id: 94,
    nombre: "Longaví",
    slug: "longavi",
    region: "Maule",
    poblacion: 30000,
    descripcion: "Centro agrícola.",
    industrias: ["agroindustria"],
    caracteristicas: ["Agricultura tradicional", "Precordillera", "Comercio agrícola", "Cercanía al Nevado de Longaví"]
  },
  {
    id: 95,
    nombre: "Cabrero",
    slug: "cabrero",
    region: "Biobío",
    poblacion: 29000,
    descripcion: "Centro forestal y agrícola.",
    industrias: ["industrial", "agroindustria"],
    caracteristicas: ["Industria forestal", "Ganadería", "Ruta 5 Sur", "Comercio local"]
  },
  {
    id: 96,
    nombre: "Laja",
    slug: "laja",
    region: "Biobío",
    poblacion: 22000,
    descripcion: "Centro industrial papelero.",
    industrias: ["industrial"],
    caracteristicas: ["Planta de celulosa", "Confluencia de ríos", "Ex central hidroeléctrica", "Industria papelera"]
  },
  {
    id: 97,
    nombre: "Yumbel",
    slug: "yumbel",
    region: "Biobío",
    poblacion: 21000,
    descripcion: "Centro de peregrinación religiosa.",
    industrias: ["agroindustria"],
    caracteristicas: ["Santuario San Sebastián", "Tradición religiosa", "Agricultura tradicional", "Fiesta costumbrista"]
  },
  {
    id: 98,
    nombre: "Traiguén",
    slug: "traiguen",
    region: "La Araucanía",
    poblacion: 19000,
    descripcion: "Centro agrícola tradicional.",
    industrias: ["agroindustria"],
    caracteristicas: ["Colonización europea", "Molinos históricos", "Agricultura cerealera", "Arquitectura clásica"]
  },
  {
    id: 99,
    nombre: "Collipulli",
    slug: "collipulli",
    region: "La Araucanía",
    poblacion: 24000,
    descripcion: "Ciudad histórica del sur.",
    industrias: ["agroindustria", "industrial"],
    caracteristicas: ["Viaducto del Malleco", "Zona forestal", "Agricultura tradicional", "Río Malleco"]
  },
  {
    id: 100,
    nombre: "Puerto Aysén",
    slug: "puerto-aysen",
    region: "Aysén",
    poblacion: 23000,
    descripcion: "Centro pesquero y forestal de la Patagonia.",
    industrias: ["logistica", "agroindustria"],
    caracteristicas: ["Puerto pesquero", "Fiordos patagónicos", "Río Aysén", "Cercanía a Coyhaique"]
  }
]

/**
 * Obtiene la información de una ciudad por su slug
 */
export function getCiudadBySlug(slug: string): CiudadData | undefined {
  return ciudades.find(ciudad => ciudad.slug === slug);
}

/**
 * Obtiene la lista completa de ciudades
 */
export function getCiudades(): CiudadData[] {
  return ciudades;
}

/**
 * Obtiene las ciudades más importantes (top N)
 */
export function getCiudadesTop(limit: number): CiudadData[] {
  return ciudades.slice(0, limit);
}

/**
 * Obtiene las ciudades por región
 */
export function getCiudadesByRegion(region: string): CiudadData[] {
  return ciudades.filter(ciudad => ciudad.region === region);
}

export default ciudades; 