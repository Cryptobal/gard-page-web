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
 *   7. `casoEstudio.resultado` contiene un número con unidad (%, $, horas, etc).
 *
 * Cómo se llena:
 *   - Santiago × guardias-de-seguridad es la "plantilla de oro" que se llena
 *     manualmente con datos reales del negocio + research de fuentes oficiales.
 *   - Las otras 79 combinaciones se generan vía Cowork nightly con el prompt
 *     maestro descrito en `docs/SEO_OVERHAUL_PLAN.md` sección Tarea 2.3.
 *   - Ningún objeto se mergea al array sin pasar el validador automático.
 *
 * Este archivo arranca vacío. No hay fallback silencioso; si falta el copy
 * para una combinación, la página debe renderizar el template anterior o
 * redirigir a la página general del servicio.
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

/** Caso de estudio real (anonimizado si hace falta). */
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

  /** Un caso de estudio real (anonimizado), con resultado medible. */
  casoEstudio: CasoEstudio;

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
  // Vacío por ahora. Ver `docs/SEO_OVERHAUL_PLAN.md` § Tarea 2.2 y 2.3.
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
