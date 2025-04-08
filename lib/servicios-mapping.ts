/**
 * Mapeo de slugs de servicios usados en URLs a slugs usados en los datos
 * Esto permite que los slugs de URL sean más amigables para SEO mientras
 * que internamente se pueden usar otros identificadores
 */

type ServicioMapping = {
  [urlSlug: string]: string;
}

// Mapeo de slugs en URL a slugs usados en los datos
const servicioMapping: ServicioMapping = {
  'guardias-de-seguridad': 'guardias',
  'vigilantes-de-seguridad': 'vigilantes',
  'camaras-de-seguridad': 'camaras',
  'alarmas-de-seguridad': 'alarmas',
  'seguridad-electronica': 'electronica',
  'control-de-acceso': 'control-acceso',
  'monitoreo-de-alarmas': 'monitoreo',
  'sistemas-de-seguridad': 'sistemas',
  'rondas-de-vigilancia': 'rondas',
  'seguridad-para-eventos': 'eventos',
  'proteccion-ejecutiva': 'proteccion',
  'respuesta-de-alarmas': 'respuesta-alarmas',
  'seguridad-informatica': 'informatica',
  'consultoria-de-seguridad': 'consultoria'
};

/**
 * Función para traducir un slug de la URL al slug usado en los datos
 * @param urlSlug Slug usado en la URL
 * @returns Slug usado en los datos o el mismo slug si no hay mapeo
 */
export function traducirSlugServicio(urlSlug: string): string {
  return servicioMapping[urlSlug] || urlSlug;
}

/**
 * Función para traducir un slug de datos al slug usado en la URL
 * @param dataSlug Slug usado en los datos
 * @returns Slug usado en la URL o el mismo slug si no hay mapeo
 */
export function traducirSlugAURL(dataSlug: string): string {
  const entries = Object.entries(servicioMapping);
  for (const [urlSlug, mappedDataSlug] of entries) {
    if (mappedDataSlug === dataSlug) {
      return urlSlug;
    }
  }
  return dataSlug;
}

export default servicioMapping; 