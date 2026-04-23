/**
 * Fuente única de verdad de las estadísticas de empresa para Gard Security.
 *
 * NUNCA hardcodear años de experiencia, guardias activos, clientes o año de
 * fundación en componentes o copy. Importar siempre desde este archivo.
 *
 * Cómo razonar sobre los campos:
 *
 *  • `foundedYear` es la fundación legal de Gard Security SpA. Es un hecho
 *    verificable (SII, CBR) y no se mueve. Úsalo solo en contextos donde
 *    hables explícitamente de la empresa como entidad ("fundada en 2022",
 *    "operamos desde 2022", schema JSON-LD `foundingDate`).
 *
 *  • `leadershipYearsExperience` es la experiencia acumulada del equipo
 *    fundador en el rubro de seguridad privada, incluyendo trayectoria previa
 *    a Gard Security. Es el número que se usa en casi todo el copy de marketing
 *    ("más de 9 años de experiencia protegiendo empresas"). Cuando pase el
 *    tiempo, actualizalo manualmente cada año.
 *
 *  • Para calcular dinámicamente la edad legal de la empresa, usar el helper
 *    `getCompanyAgeYears()`. No lo uses en copy general: la narrativa pública
 *    está construida alrededor de `leadershipYearsExperience`.
 *
 *  • `activeGuards`, `activeClients`, `citiesCovered` y `os10CertifiedPct` se
 *    actualizan manualmente cuando las cifras reales cambien. Si dudás del
 *    valor, usá el menor número que sea verdad. No se inventa.
 */
export const companyStats = {
  /** Año de fundación legal de Gard Security SpA. */
  foundedYear: 2022,

  /**
   * Experiencia acumulada del equipo fundador en seguridad privada en Chile.
   * Incluye trayectoria previa a Gard Security. Actualizar manualmente.
   */
  leadershipYearsExperience: 9,

  /** Guardias activos en dotación operativa actual. */
  activeGuards: 250,

  /** Clientes B2B con contrato vigente hoy (no históricos). */
  activeClients: 23,

  /** Ciudades principales de Chile con cobertura operativa. */
  citiesCovered: 10,

  /** Porcentaje del plantel con certificación OS10 vigente. */
  os10CertifiedPct: 100,

  /** Central de monitoreo operando 24/7. */
  monitoringCenter247: true,

  /**
   * URLs verificables del perfil público para cross-validación por Google
   * (evita clasificación de AggregateRating como "self-serving reviews").
   */
  gmbShortUrl: 'https://maps.app.goo.gl/ywW2rQEWu4g4xxxy8',
  gmbCanonicalUrl:
    'https://www.google.com/maps/place/Gard+Security/data=!4m2!3m1!1s0x0:0x3fcad00015b6e4bd',
} as const;

export type CompanyStats = typeof companyStats;

/**
 * Edad de Gard Security como entidad legal, calculada dinámicamente.
 *
 * No usar en copy general de experiencia; para eso existe
 * `companyStats.leadershipYearsExperience`. Este helper sirve para frases
 * explícitas sobre la empresa como entidad, por ejemplo:
 *   `Gard Security, fundada hace ${getCompanyAgeYears()} años...`
 */
export function getCompanyAgeYears(
  currentYear: number = new Date().getFullYear(),
): number {
  return currentYear - companyStats.foundedYear;
}
