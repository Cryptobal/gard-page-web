/**
 * Configuración de endpoints de API según el entorno
 */

// Determinar URL base según el entorno
const getApiBaseUrl = (): string => {
  // En producción
  if (typeof window !== 'undefined' && window.location.hostname === 'gard.cl') {
    return 'https://api.gard.cl'; // URL del backend en producción
  }

  // En staging/preview
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://api.gard.cl'; // También usamos la API de producción para previews
  }

  // En desarrollo local, ya no necesitamos el backend
  return '';
};

// Función auxiliar para determinar si estamos en producción/staging
const esProduccion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'gard.cl' || window.location.hostname.includes('vercel.app');
};

// OPAI API URL (for direct lead integration)
const OPAI_URL = process.env.NEXT_PUBLIC_OPAI_API_URL || 'https://opai.gard.cl';

// URLs de API
export const API_URLS = {
  CONTACTO: 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a',
  
  // Cotización ahora va directo a OPAI (crea lead + notificación + email)
  COTIZACION: `${OPAI_URL}/api/public/leads`,
  
  // Fallback: si OPAI falla, enviar a Make para que mande email (configurar Make para envío de email)
  COTIZACION_FALLBACK: 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a',
  
  COTIZACION_INTELIGENTE: 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a',
  
  RECLUTAMIENTO: esProduccion() 
    ? 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4'
    : 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4',
  
  LANDING_DINAMICO: 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a',
  
  LEGAL_DENUNCIAS: esProduccion() 
    ? 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2'
    : 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2',
};

export default API_URLS; 