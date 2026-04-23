/**
 * Contenido único por combinación ciudad × servicio para las 80 páginas
 * del sitio. Cada objeto aquí es la "carne" de una página; el layout y los
 * schemas se reciclan desde el componente, pero el texto es 100% único.
 *
 * REGLAS INNEGOCIABLES (validadas por `/scripts/validate-ciudad-content.ts`):
 *   1. `introParagraph` debe tener 150-200 palabras y mencionar el nombre de
 *      la ciudad al menos 2 veces.
 *   2. `introParagraph` debe contener al menos 2 números reales del dataset
 *      (población, tasas de delito, cantidad de proyectos, etc).
 *   3. Overlap de 5-gramas con cualquier otro objeto existente < 40%.
 *   4. 0 frases prohibidas (ver `.cursorrules` y el validador).
 *   5. `industriasRelevantes.length` exactamente 3 (ni 2, ni 4, ni 8).
 *   6. `faq.length` >= 4, cada respuesta con >= 40 palabras, al menos 2
 *      preguntas específicas a la ciudad.
 *   7. `kpisOperativos.length` >= 4 con valor numérico verificable + unidad.
 *
 * Diseño del schema:
 *   - `casoEstudio` es OPCIONAL. Se llena solo si el cliente dio consentimiento
 *     y el caso tiene resultado medible real. Si no hay, se omite y la página
 *     se apoya en `kpisOperativos` (datos agregados internos) + `panoramaSeguridad`
 *     (data pública de SPD/INE).
 *   - `kpisOperativos` reemplaza la narrativa por datos operativos agregados
 *     auditables internamente: tiempo de respuesta, continuidad, onboarding,
 *     dotación local, etc. No hay claims narrativos atribuidos a clientes.
 *
 * Cómo se llena:
 *   - Santiago × guardias-de-seguridad es la "plantilla de oro" que se llena
 *     manualmente con datos reales del negocio + research de fuentes oficiales.
 *   - Las otras 79 combinaciones se generan vía Cowork nightly con el prompt
 *     maestro descrito en `docs/SEO_OVERHAUL_PLAN.md` sección Tarea 2.3.
 *   - Ningún objeto se mergea al array sin pasar el validador automático.
 */

/** Industria relevante localmente con su razón verificable. */
export type IndustriaRelevante = {
  /** Nombre de la industria (Minería, Logística portuaria, Retail, etc). */
  nombre: string;
  /**
   * Por qué esta industria importa ESPECÍFICAMENTE en esta ciudad. No genérico:
   * debe aludir a un dato del dataset (empresa concreta, zona, proyecto).
   */
  porQueImporta: string;
};

/** Zona de cobertura operativa en la ciudad (comuna, sector, polígono). */
export type ZonaCobertura = {
  /** Nombre de la comuna o sector reconocible. */
  nombre: string;
  /** 2-3 líneas explicando el tipo de operación que se hace ahí. */
  descripcion: string;
};

/**
 * KPI operativo agregado y auditable internamente. Reemplaza el caso de
 * estudio narrativo como prueba de desempeño en la página.
 */
export type KpiOperativo = {
  /** Etiqueta corta (ej: "Tiempo de respuesta promedio"). */
  label: string;
  /**
   * Valor numérico. Usar unidad canónica (min, %, días, etc) y que
   * corresponda al campo correcto de `companyStats` cuando sea aplicable.
   */
  value: string;
  /** 1-2 líneas de contexto (ej: "zona urbana, medido sobre contratos activos"). */
  detail: string;
};

/** Caso de estudio real. OPCIONAL: solo se publica con consentimiento escrito. */
export type CasoEstudio = {
  /** Identificación del cliente, aceptable anonimizado (ej: "Minera en Antofagasta"). */
  cliente: string;
  /** Problema operativo concreto que tenía. */
  problema: string;
  /** Qué hizo Gard para resolverlo. */
  solucion: string;
  /** Resultado medible con unidad (%, $, min, horas, etc). */
  resultado: string;
};

/** Pregunta-respuesta del FAQ, ≥2 deben ser específicas a la ciudad. */
export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

/** Copy único de una combinación ciudad × servicio. */
export type ServicioCiudadCopy = {
  /** Slug de ciudad (debe existir en `ciudad-data.ts` y `ciudades-dataset.ts`). */
  ciudad: string;
  /** Slug de servicio (debe existir en `app/servicios/serviceMetadata.ts`). */
  servicio: string;

  /** H1 único que incluye keyword principal + ciudad. */
  heroH1: string;

  /** Párrafo intro de 150-200 palabras con datos reales del dataset. */
  introParagraph: string;

  /**
   * Panorama de seguridad específico a la ciudad, citando cifras del SPD
   * (tasas por 100k) y mencionando la comuna más afectada si aplica.
   */
  panoramaSeguridad: string;

  /** Exactamente 3 industrias reales (no 2, no 8). */
  industriasRelevantes: IndustriaRelevante[];

  /** Zonas donde se opera hoy, mínimo 3. */
  zonasCobertura: ZonaCobertura[];

  /** KPIs operativos agregados (mínimo 4). */
  kpisOperativos: KpiOperativo[];

  /**
   * Caso de estudio real. Opcional: solo con consentimiento escrito del
   * cliente y resultado medible verificable. En ausencia, la página se
   * apoya en kpisOperativos + panoramaSeguridad.
   */
  casoEstudio?: CasoEstudio;

  /** FAQ mínimo 4 items; ≥2 específicas a la ciudad. */
  faq: FaqItem[];
};

/**
 * Array de todas las combinaciones ciudad×servicio con copy único aprobado.
 *
 * Arranca vacío. Se llena con el orden indicado por Tarea 2.4 del plan:
 *   1. Santiago × 8 servicios (plantilla de oro, manual + validación humana).
 *   2. Antofagasta, Valparaíso, Concepción × 8 c/u (semana 4 del plan).
 *   3. Viña, Iquique, Puerto Montt × 8 c/u (semana 5).
 *   4. Rancagua, Chillán, Temuco × 8 c/u (semana 6).
 */
export const servicioCiudadCopy: ServicioCiudadCopy[] = [
  {
    ciudad: 'santiago',
    servicio: 'guardias-de-seguridad',
    heroH1:
      'Guardias de Seguridad en Santiago · Certificados OS10 con Cobertura 24/7 en las 52 Comunas',
    introParagraph:
      'Santiago concentra el 40% de la población de Chile: 7,4 millones de personas distribuidas en 52 comunas del Gran Santiago según el Censo 2024 del INE. En ese territorio, la ENUSC 2024 reporta que el 43,1% de los hogares de la Región Metropolitana fue víctima de al menos un delito durante el último año, 22,1% sufrió algún tipo de robo y 11% padeció un delito violento. Ese es el terreno operativo de Gard Security en Santiago: trabajamos con una dotación de 190 guardias asignados a sitios de la región, todos certificados OS10 y auditados mensualmente sin subcontratación. Nuestro servicio de guardias para empresas en Santiago está diseñado alrededor de indicadores medibles: tiempo de respuesta promedio de 30 minutos en zona urbana, continuidad operacional del 99,9% de turnos cubiertos y onboarding de sitios nuevos en 5 días hábiles. Cobertura en las 52 comunas: edificios corporativos en el eje Apoquindo-Las Condes-Vitacura, centros logísticos del cinturón poniente (Pudahuel, Quilicura, Renca), faenas de construcción —la RM concentra el 50% de los proyectos activos del país según la CChC 2024— y recintos comerciales en Ñuñoa y Santiago Centro.',
    panoramaSeguridad:
      'La Región Metropolitana convive con la mayor presión delictual urbana del país. Los datos oficiales de la ENUSC 2024 (INE + Subsecretaría de Prevención del Delito) muestran que el 22,1% de los hogares de la RM fue víctima de algún tipo de robo en los últimos doce meses, con 11% afectado por delitos violentos. El 86,9% de las personas residentes percibe un aumento de la delincuencia en el país, y 72% se siente inseguro caminando solo por su barrio de noche. Para empresas, la combinación de alta rotación, tráfico vehicular en horas punta y concentración de activos en zonas identificables (centros logísticos de Pudahuel-Quilicura, edificios corporativos del eje Apoquindo, recintos bancarios) exige protocolos operacionales distintos a los de otras regiones. Nuestra operación en Santiago se estructura alrededor de estos datos, con despliegue ajustado por nivel de riesgo real del sitio y no por plantilla genérica.',
    industriasRelevantes: [
      {
        nombre: 'Edificios corporativos y servicios financieros',
        porQueImporta:
          'La RM concentra los principales centros de comercio, transporte y servicios personales del país según el PIB regional 2024 del Banco Central. Eje Apoquindo, Nueva Las Condes y Vitacura agrupan headquarters con necesidades de recepción ejecutiva, control de acceso biométrico y protocolos de evacuación que el guardia OS10 estándar no cubre.',
      },
      {
        nombre: 'Logística y centros de distribución',
        porQueImporta:
          'Pudahuel, Quilicura y San Bernardo concentran los CD de retail, e-commerce y alimentación que abastecen al 40% del consumo nacional. Los protocolos aquí priorizan control de carga/descarga, CCTV con analítica para mermas y coordinación con transportistas en ventanas horarias comprimidas.',
      },
      {
        nombre: 'Construcción e infraestructura',
        porQueImporta:
          'La RM concentró el 50% de los proyectos activos de construcción de Chile durante 2024 según la CChC. Faenas en altura, bodegaje de materiales y rotación de subcontratistas generan riesgos específicos de intrusión y robo de activos que requieren protocolos anti-intrusión coordinados con policía local.',
      },
    ],
    zonasCobertura: [
      {
        nombre: 'Las Condes, Providencia y Vitacura',
        descripcion:
          'Eje corporativo clase A: recepción ejecutiva, guardias con presentación profesional y control de acceso inteligente para edificios con alto flujo de ejecutivos, proveedores y visitantes.',
      },
      {
        nombre: 'Santiago Centro y Ñuñoa',
        descripcion:
          'Zonas mixtas con alta densidad comercial y residencial. Protocolos adaptados a centros educativos, edificios históricos, locales comerciales y oficinas medianas con tráfico peatonal constante.',
      },
      {
        nombre: 'Pudahuel, Quilicura y San Bernardo',
        descripcion:
          'Cinturón logístico e industrial: centros de distribución, bodegas de alto valor y parques industriales. Control de carga/descarga, vigilancia perimetral con CCTV analítica y coordinación con transportistas 24/7.',
      },
      {
        nombre: 'Resto del Gran Santiago (52 comunas)',
        descripcion:
          'Cobertura operativa en toda la región: dotación asignada según riesgo real del sitio (no plantilla genérica), con supervisión desde central propia y reemplazos garantizados por pool de guardias OS10 disponibles.',
      },
    ],
    kpisOperativos: [
      {
        label: 'Tiempo de respuesta promedio',
        value: '30 min',
        detail: 'Zona urbana Santiago, medido sobre contratos activos en 2025',
      },
      {
        label: 'Continuidad operacional',
        value: '99.9%',
        detail: 'Porcentaje de turnos cubiertos vs contratados, medido trimestralmente',
      },
      {
        label: 'Certificación OS10 vigente',
        value: '100%',
        detail: 'Auditoría mensual de credenciales del plantel, sin excepciones',
      },
      {
        label: 'Onboarding de sitio nuevo',
        value: '5 días hábiles',
        detail: 'Desde firma de contrato hasta guardia OS10 asignado y activo',
      },
      {
        label: 'Dotación local en Santiago',
        value: '190 guardias',
        detail: 'Asignados a sitios del Gran Santiago, sin subcontratación',
      },
    ],
    faq: [
      {
        pregunta:
          '¿Cuánto cuesta contratar un guardia de seguridad en Santiago?',
        respuesta:
          'El costo depende del tipo de turno (12 o 24 horas), cantidad de puestos, comuna específica y nivel de riesgo del sitio. Entregamos cotización cerrada sin compromiso en 24 horas hábiles, con precio mensual todo incluido (uniforme, equipamiento, reemplazos por ausencia y supervisión). Solicitá la cotización para tu sitio específico y recibís un presupuesto en línea con el mercado de Santiago.',
      },
      {
        pregunta:
          '¿En qué comunas de Santiago tienen operaciones activas hoy?',
        respuesta:
          'Tenemos cobertura operativa en las 52 comunas del Gran Santiago, desde edificios corporativos en Las Condes, Providencia y Vitacura hasta centros logísticos en Pudahuel, Quilicura y San Bernardo, pasando por zonas residenciales y comerciales de Ñuñoa, Santiago Centro, La Florida y periferia. Nuestra central propia en RM coordina despliegues y reemplazos en toda la región sin subcontratación ni dependencia de terceros.',
      },
      {
        pregunta:
          '¿Cuál es el tiempo real de respuesta ante un incidente en Santiago?',
        respuesta:
          'El tiempo de respuesta promedio en zona urbana de Santiago es de 30 minutos, medido sobre contratos activos en 2025. Los guardias en el sitio activan alertas en menos de 2 minutos; el tiempo de 30 minutos corresponde a refuerzos móviles desde nuestra central de monitoreo 24/7. El promedio de la industria en RM oscila entre 30 y 45 minutos según informes del sector, por lo que nuestro desempeño está en el rango bajo del mercado sin inflar la cifra.',
      },
      {
        pregunta:
          '¿Cómo se adapta el servicio a las particularidades de seguridad de Santiago?',
        respuesta:
          'Operamos con protocolos específicos por tipo de sitio y zona: edificios corporativos del eje Apoquindo exigen recepción ejecutiva y control biométrico, los CD de Pudahuel-Quilicura priorizan control de carga y CCTV analítica para mermas, y las faenas de construcción (50% de las del país están en RM según CChC 2024) requieren vigilancia perimetral y coordinación con subcontratistas. El 100% del plantel tiene OS10 vigente con auditoría mensual y capacitación continua sin excepciones.',
      },
      {
        pregunta:
          '¿Qué tan rápido pueden iniciar el servicio en un sitio nuevo en Santiago?',
        respuesta:
          'Onboarding estándar en 5 días hábiles: día 1 visita técnica y diseño de protocolo, día 2 selección y capacitación específica del guardia asignado, días 3-4 validación de credenciales OS10 y cobertura de ausencias, día 5 inicio con supervisión reforzada. Para contingencias urgentes activamos modalidad express con personal OS10 de contingencia dentro de 48 horas, aunque la puesta completa con protocolos a medida requiere los 5 días hábiles.',
      },
    ],
  },
];

/** Busca el copy de una combinación ciudad + servicio. `null` si no existe. */
export function getServicioCiudadCopy(
  ciudad: string,
  servicio: string,
): ServicioCiudadCopy | null {
  return (
    servicioCiudadCopy.find(
      (c) => c.ciudad === ciudad && c.servicio === servicio,
    ) ?? null
  );
}

/**
 * Indica si una combinación tiene copy único aprobado y listo para consumir
 * en la nueva plantilla de página. Si retorna `false`, la página debe caer
 * al render anterior (genérico) hasta que el copy sea aprobado.
 */
export function hasVerifiedCopy(ciudad: string, servicio: string): boolean {
  return getServicioCiudadCopy(ciudad, servicio) !== null;
}
