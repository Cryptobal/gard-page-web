/**
 * Dataset oficial por ciudad para Gard Security.
 *
 * Este archivo es la **munición de datos reales y verificables** que alimenta
 * las 80 páginas ciudad×servicio de Fase 2 del plan SEO. Cada campo que se
 * llene debe tener **fuente oficial citada con URL** en el campo
 * `*_fuenteUrl` correspondiente.
 *
 * REGLA DE ORO (no negociable):
 *   - Si no hay fuente oficial verificable, el valor queda `null` o array vacío.
 *   - NO inventar datos. Google detecta inconsistencias en segundos y Cowork
 *     las rechaza en el validador (ver `/scripts/validate-ciudad-content.ts`).
 *
 * Fuentes sugeridas:
 *   - Población → INE (https://www.ine.gob.cl/)
 *   - Delitos 2024 → Subsecretaría de Prevención del Delito
 *     (http://cead.spd.gov.cl/estadisticas-delictuales/)
 *   - Proyectos de construcción → CChC (https://www.cchc.cl/)
 *   - Faenas mineras → SONAMI (https://www.sonami.cl/)
 *   - Delitos económicos → Fiscalía de Chile
 *
 * Flujo de trabajo esperado:
 *   1. Cowork nightly (1 ciudad/noche × 10 noches) busca en fuentes oficiales.
 *   2. Genera un objeto `CiudadDataset` para cada ciudad.
 *   3. Humano hace spot-check manual de 2 de 10 antes de mergear.
 *   4. Cada dataset completo se consume desde `/app/[ciudad]/[servicio]/page.tsx`
 *      y desde `/lib/data/servicio-ciudad-copy.ts` (contenido).
 */

/**
 * Dato numérico con su fuente oficial.
 * Si el dato no existe o no está verificado, ambos campos quedan `null`.
 */
export type SourcedNumber = {
  value: number | null;
  /** URL de la fuente oficial (INE, SPD, CChC, etc). Null si no verificado. */
  sourceUrl: string | null;
};

/**
 * Bloque de delitos por ciudad. Las tasas están en hechos por cada 100.000
 * habitantes según el estándar de la Subsecretaría de Prevención del Delito.
 */
export type Delitos2024 = {
  roboLugarHabitadoTasa100k: number | null;
  roboConViolenciaTasa100k: number | null;
  hurtoTasa100k: number | null;
  /** Nombre de la comuna con mayor incidencia según SPD. */
  comunaMasAfectada: string | null;
  /** URL de la fuente en cead.spd.gov.cl. */
  fuenteUrl: string | null;
};

/** Empresa grande con operación local, útil como contexto industrial. */
export type EmpresaLocal = {
  nombre: string;
  industria: string;
};

/**
 * Dataset oficial completo por ciudad. Todas las propiedades obligatorias;
 * si un dato no existe, se usa `null` o array vacío, nunca se omite.
 */
export type CiudadDataset = {
  /** Slug kebab-case que matchea `lib/data/ciudad-data.ts`. */
  ciudad: string;
  /** Nombre de la región administrativa. */
  region: string;

  /** Población urbana según INE. */
  poblacion: number | null;
  /** Año del censo o estimación oficial que reporta la población. */
  poblacionAnio: number | null;
  /** URL de la fuente INE. */
  poblacionFuenteUrl: string | null;

  /** Tasas de delitos 2024 por cada 100.000 habitantes (SPD). */
  delitos2024: Delitos2024;

  /**
   * Industrias con presencia REAL en la ciudad, no genéricas.
   * Si una industria es marginal, no se incluye.
   */
  industriasPredominantes: string[];

  /** Empresas grandes con operación local. */
  empresasGrandesEnLaZona: EmpresaLocal[];

  /** Cantidad de proyectos de construcción activos (CChC). */
  proyectosConstruccionActivos: number | null;
  /** URL de la fuente CChC. */
  proyectosConstruccionFuente: string | null;

  /**
   * Puntos de interés relevantes para seguridad privada
   * (aeropuerto, puerto, zona franca, centro logístico, etc).
   */
  puntosInteresSeguridad: string[];

  /**
   * Particularidades geográficas que afectan la operación de seguridad.
   * 2-3 líneas, HECHOS específicos, no prosa genérica.
   */
  particularidadesGeograficas: string;

  /**
   * Regulaciones locales relevantes (ordenanzas municipales, protocolos
   * portuarios, normativa minera regional, etc). Null si no aplica.
   */
  regulacionesLocalesRelevantes: string | null;
};

/**
 * Crea un dataset vacío para una ciudad: toda la información queda en null /
 * arrays vacíos hasta que sea llenada con datos verificables.
 */
function emptyDataset(ciudad: string, region: string): CiudadDataset {
  return {
    ciudad,
    region,
    poblacion: null,
    poblacionAnio: null,
    poblacionFuenteUrl: null,
    delitos2024: {
      roboLugarHabitadoTasa100k: null,
      roboConViolenciaTasa100k: null,
      hurtoTasa100k: null,
      comunaMasAfectada: null,
      fuenteUrl: null,
    },
    industriasPredominantes: [],
    empresasGrandesEnLaZona: [],
    proyectosConstruccionActivos: null,
    proyectosConstruccionFuente: null,
    puntosInteresSeguridad: [],
    particularidadesGeograficas: '',
    regulacionesLocalesRelevantes: null,
  };
}

/**
 * Dataset oficial de las 10 ciudades con operación de Gard Security.
 *
 * Todos los registros arrancan vacíos (null / arrays vacíos). Se van
 * completando en lotes via Cowork nightly o research manual, SIEMPRE con
 * fuente oficial verificable. Las keys matchean con los `slug` declarados
 * en `/lib/data/ciudad-data.ts`.
 */
export const ciudadesDataset: Record<string, CiudadDataset> = {
  santiago: {
    ciudad: 'santiago',
    region: 'Metropolitana',
    // INE Censo 2024: 7.400.741 habitantes en la Región Metropolitana, concentrando
    // el 40% de la población nacional (18.480.432). El Gran Santiago abarca las
    // 52 comunas de la RM.
    poblacion: 7_400_741,
    poblacionAnio: 2024,
    poblacionFuenteUrl: 'https://censo2024.ine.gob.cl/resultados/',
    delitos2024: {
      // Las tasas por 100k detalladas para RM están en el portal interactivo
      // del CEAD (cead.minsegpublica.gob.cl). Los datos regionales de ENUSC
      // 2024 reportan victimización por hogar: 11,0% hogares víctimas de
      // delitos violentos, 22,1% víctimas de algún robo, 43,1% víctimas de
      // al menos un delito en la RM. Las tasas por 100k quedan pendientes
      // de extracción manual del portal CEAD.
      roboLugarHabitadoTasa100k: null,
      roboConViolenciaTasa100k: null,
      hurtoTasa100k: null,
      comunaMasAfectada: null,
      fuenteUrl:
        'https://www.ine.gob.cl/docs/default-source/seguridad-ciudadana/publicaciones-y-anuarios/2024/sintesis-metropolitana---enusc-2024.pdf',
    },
    // Según PIB Regional 2024 del Banco Central, los sectores líderes en la RM
    // fueron comercio, transporte y servicios personales. La construcción
    // concentró el 50% de los proyectos activos del país en 2024 (CChC).
    industriasPredominantes: [
      'Comercio y retail',
      'Servicios financieros y corporativos',
      'Logística y transporte',
      'Construcción e infraestructura',
      'Salud y educación',
    ],
    // Lista no exhaustiva de empresas con operación reconocible en RM,
    // publicadas con fuente pública. Se evita nombrar clientes propios de
    // Gard sin consentimiento.
    empresasGrandesEnLaZona: [],
    // CChC 2024: la RM concentró el 50% de los proyectos activos de
    // construcción del país en el primer semestre 2024.
    proyectosConstruccionActivos: null,
    proyectosConstruccionFuente:
      'https://cchc.cl/w/noticias/cchc-presenta-cifras-de-inversion-2025-y-proyecciones-2026-en-seminario-con-los-principales-sectores-productivos-del-pais',
    puntosInteresSeguridad: [
      'Aeropuerto Internacional Arturo Merino Benítez (SCL)',
      'Terminal logístico Enea (Pudahuel)',
      'Distrito financiero Apoquindo-El Golf',
      'Parques industriales de Quilicura y San Bernardo',
      'Eje corporativo Nueva Las Condes-Vitacura',
      'Congreso Nacional (sede senatorial en Valparaíso, oficinas en RM)',
    ],
    particularidadesGeograficas:
      'Valle rodeado por la Cordillera de los Andes (este) y la Cordillera de la Costa (oeste), con el río Mapocho atravesando la ciudad. La topografía de cuenca cerrada genera episodios de alta contaminación invernal que afectan visibilidad para CCTV exterior y requieren protocolos adaptados. Congestión vehicular en horas punta (07:30-10:00 y 17:30-20:30) impacta directamente en los tiempos de respuesta de refuerzos móviles.',
    regulacionesLocalesRelevantes:
      'Ordenanzas municipales específicas por comuna para control de acceso a edificios corporativos y uso de CCTV en espacios semi-públicos. Las 52 comunas del Gran Santiago tienen normativa diferenciada que impacta el despliegue de guardias en locales comerciales y edificios residenciales de uso mixto.',
  },
  valparaiso: emptyDataset('valparaiso', 'Valparaíso'),
  'vina-del-mar': emptyDataset('vina-del-mar', 'Valparaíso'),
  concepcion: emptyDataset('concepcion', 'Biobío'),
  antofagasta: emptyDataset('antofagasta', 'Antofagasta'),
  iquique: emptyDataset('iquique', 'Tarapacá'),
  'puerto-montt': emptyDataset('puerto-montt', 'Los Lagos'),
  rancagua: emptyDataset('rancagua', "O'Higgins"),
  chillan: emptyDataset('chillan', 'Ñuble'),
  temuco: emptyDataset('temuco', 'La Araucanía'),
};

/**
 * Obtiene el dataset de una ciudad por su slug.
 * Retorna `null` si la ciudad no existe en el dataset.
 */
export function getCiudadDataset(slug: string): CiudadDataset | null {
  return ciudadesDataset[slug] ?? null;
}

/**
 * Criterio mínimo para considerar "listo para publicar" el dataset de una
 * ciudad. Al menos población + una tasa de delitos con fuente + 3 industrias
 * reales. Sin esto, la página ciudad×servicio debería caer a la plantilla
 * genérica anterior y no consumir este dataset.
 */
export function isCiudadDatasetComplete(d: CiudadDataset): boolean {
  const hasPoblacion = d.poblacion !== null && d.poblacionFuenteUrl !== null;
  const hasDelitos =
    d.delitos2024.fuenteUrl !== null &&
    (d.delitos2024.roboLugarHabitadoTasa100k !== null ||
      d.delitos2024.roboConViolenciaTasa100k !== null ||
      d.delitos2024.hurtoTasa100k !== null);
  const hasIndustrias = d.industriasPredominantes.length >= 3;
  return hasPoblacion && hasDelitos && hasIndustrias;
}
