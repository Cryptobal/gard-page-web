import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Verifica si una URL devuelve un código de estado 200 o es canónica
 * @param url La URL a verificar
 * @returns Un objeto con información sobre la validez de la URL y su destino final si hay redirección
 */
export async function isValidUrl(url: string): Promise<{isValid: boolean; finalUrl?: string; isRedirect?: boolean}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
    
    // Primera comprobación - con redirección manual para detectar redirects
    const manualResponse = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual', // No seguir redirecciones automáticamente
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Si la URL devuelve 200, es válida
    if (manualResponse.status === 200) {
      return { isValid: true };
    }
    
    // Si es una redirección (301, 302, 307, 308)
    if (manualResponse.status >= 300 && manualResponse.status < 400) {
      const redirectUrl = manualResponse.headers.get('location');
      
      if (redirectUrl) {
        // Crear una URL absoluta si el destino es relativo
        const finalUrl = redirectUrl.startsWith('http') 
          ? redirectUrl 
          : new URL(redirectUrl, url).toString();
          
        return { isValid: false, finalUrl, isRedirect: true };
      }
    }
    
    return { isValid: false };
  } catch (error) {
    // Manejo específico para diferentes tipos de errores
    if (error instanceof TypeError) {
      console.error(`Error de red al verificar URL ${url}: ${error.message}`);
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`Timeout al verificar URL ${url}`);
    } else {
      console.error(`Error desconocido al verificar URL ${url}:`, error);
    }
    return { isValid: false };
  }
} 