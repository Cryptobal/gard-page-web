/**
 * Mapeo entre los slugs de servicios utilizados en las rutas de la aplicación
 * y los slugs utilizados en los archivos de datos de servicios
 */
export const servicioSlugMapping: Record<string, string> = {
  // Rutas URL -> Slugs en landingText.ts
  'guardias-de-seguridad': 'guardias-privados',
  'seguridad-electronica': 'camaras-seguridad',
  'central-monitoreo': 'monitoreo',
  'drones-seguridad': 'drones',
  'seguridad-perimetral': 'perimetral',
  'auditoria-seguridad': 'auditoria',
  'consultoria': 'consultoria',
  'prevencion-intrusiones': 'alarmas'
};

/**
 * Traduce un slug de servicio de la URL al slug correspondiente en los datos
 * Si no existe un mapeo específico, devuelve el mismo slug
 */
export function traducirSlugServicio(slugUrl: string): string {
  return servicioSlugMapping[slugUrl] || slugUrl;
}

export default servicioSlugMapping; 