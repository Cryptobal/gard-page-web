/**
 * Este archivo proporciona contenido personalizado para combinaciones específicas de ciudades y servicios
 * Redirige a la implementación en getCiudadServicioContent.ts 
 */

import { getCiudadServicioContent as getContent } from './getCiudadServicioContent';
import { CiudadData } from './ciudad-data';

/**
 * Función adaptadora que maneja diferentes firmas de función.
 * La página actual llama con 4 parámetros, pero la implementación real espera 2.
 * 
 * @param ciudadSlug - El slug de la ciudad
 * @param servicioSlug - El slug del servicio
 * @param ciudad - Los datos de la ciudad (opcional, no usado)
 * @param servicioGenerico - Los datos genéricos del servicio (opcional, no usado)
 * @returns El contenido para la combinación ciudad-servicio
 */
export const getCiudadServicioContent = (
  ciudadSlug: string, 
  servicioSlug: string,
  ciudad?: CiudadData, 
  servicioGenerico?: any
) => {
  // Solo pasamos los parámetros necesarios a la implementación real
  return getContent(ciudadSlug, servicioSlug);
};

// Reexportar también como default para compatibilidad
export default getCiudadServicioContent; 