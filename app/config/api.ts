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

// URLs de API
export const API_URLS = {
  CONTACTO: 'https://gardsecurity.app.n8n.cloud/webhook/90de2a50-84bb-4964-9feb-34b6007aca67',
  
  COTIZACION: 'https://gardsecurity.app.n8n.cloud/webhook/90de2a50-84bb-4964-9feb-34b6007aca67',
  
  COTIZACION_INTELIGENTE: 'https://gardsecurity.app.n8n.cloud/webhook/90de2a50-84bb-4964-9feb-34b6007aca67',
  
  RECLUTAMIENTO: esProduccion() 
    ? 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4'
    : 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4',
  
  LANDING_DINAMICO: 'https://gardsecurity.app.n8n.cloud/webhook/90de2a50-84bb-4964-9feb-34b6007aca67',
  
  LEGAL_DENUNCIAS: esProduccion() 
    ? 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2'
    : 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2',
};

export default API_URLS; 