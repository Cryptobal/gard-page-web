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
  CONTACTO: esProduccion() 
    ? 'https://hook.us1.make.com/b742nwic3qci4y21hg5ol1equ2t9rerj'
    : 'https://hook.us1.make.com/b742nwic3qci4y21hg5ol1equ2t9rerj',
  
  COTIZACION: esProduccion() 
    ? 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a'
    : 'https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a',
  
  COTIZACION_INTELIGENTE: esProduccion() 
    ? 'https://hook.us1.make.com/c99tyreyliv9ss27qfpn5rpwoonj7s5j'
    : 'https://hook.us1.make.com/c99tyreyliv9ss27qfpn5rpwoonj7s5j',
  
  RECLUTAMIENTO: esProduccion() 
    ? 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4'
    : 'https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4',
  
  LANDING_DINAMICO: esProduccion() 
    ? 'https://hook.us1.make.com/krnppgeej8agx68cizu4zmj8colpsupd'
    : 'https://hook.us1.make.com/krnppgeej8agx68cizu4zmj8colpsupd',
  
  LEGAL_DENUNCIAS: esProduccion() 
    ? 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2'
    : 'https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2',
};

export default API_URLS; 