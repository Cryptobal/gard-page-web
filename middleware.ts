import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { esCombinacionValida } from '@/app/data/servicios-por-industria';

// Lista de ciudades válidas para comparar
const CIUDADES_VALIDAS = [
  'santiago', 'valparaiso', 'concepcion', 'vina-del-mar', 'temuco', 'antofagasta',
  'iquique', 'puerto-montt', 'rancagua', 'chillan'
];

// Lista de servicios válidos
const SERVICIOS_VALIDOS = [
  'guardias-de-seguridad', 'seguridad-electronica', 'central-monitoreo',
  'drones-seguridad', 'seguridad-perimetral', 'auditoria-seguridad',
  'consultoria', 'prevencion-intrusiones'
];

// Lista de industrias válidas
const INDUSTRIAS_VALIDAS = [
  'retail', 'bodegas', 'construccion', 'mineria', 'salud', 'educacion',
  'eventos-y-espectaculos', 'edificios-corporativos', 'transporte-y-logistica',
  'parques-industriales', 'instituciones-publicas', 'hoteleria-y-turismo',
  'sector-financiero', 'agroindustria', 'centros-comerciales', 'manufactura',
  'condominios-residenciales', 'centros-de-datos', 'puertos-terminales',
  'sector-energetico', 'farmaceutica', 'instalaciones-deportivas'
];

// Mapeo de servicios antiguos a nuevos
const MAPEO_SERVICIOS_ANTIGUOS = {
  'guardias-privados': 'guardias-de-seguridad',
  'camaras-seguridad': 'seguridad-electronica',
  'alarmas': 'seguridad-electronica',
  'control-acceso': 'seguridad-electronica',
  'monitoreo-remoto': 'central-monitoreo'
};

// Middleware para gestionar las diferentes rutas dinámicas
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  console.log(`Middleware procesando: ${pathname}`);
  
  // Obtener los segmentos de la ruta
  // Eliminar cualquier prefijo https: o www. que pueda estar en la ruta
  const cleanPathname = pathname.replace(/^\/https?:\/\/(www\.)?gard\.cl/, '');
  const segments = cleanPathname.split('/').filter(Boolean);
  
  console.log(`Segmentos detectados: ${segments.join(', ')} (${segments.length})`);

  // MODIFICACIÓN SEO: Permitir todas las rutas de servicios-por-industria
  if (segments.length === 3 && segments[0] === 'servicios-por-industria') {
    return NextResponse.next();
  }
  
  // Manejar URLs antiguas de landing-dinamico - mantener este caso para preservar SEO histórico
  if (segments.length === 3 && segments[0] === 'landing-dinamico') {
    console.log(`Detectada URL antigua de landing dinámico: ${pathname}`);
    
    const industria = segments[1];
    const servicioAntiguo = segments[2];
    
    // Verificar si hay un mapeo para el servicio antiguo
    const servicioNuevo = servicioAntiguo in MAPEO_SERVICIOS_ANTIGUOS 
      ? MAPEO_SERVICIOS_ANTIGUOS[servicioAntiguo as keyof typeof MAPEO_SERVICIOS_ANTIGUOS] 
      : 'guardias-de-seguridad';
    
    // Si la industria está en la lista de industrias válidas, redirigir a la nueva estructura
    if (INDUSTRIAS_VALIDAS.includes(industria)) {
      url.pathname = `/servicios-por-industria/${servicioNuevo}/${industria}`;
      console.log(`Redirigiendo a nueva estructura: ${url.pathname}`);
      return NextResponse.redirect(url, 301); // Redirección permanente
    } else {
      // Si la industria no es válida, redirigir a servicios
      url.pathname = '/servicios';
      console.log(`Industria no válida, redirigiendo a: ${url.pathname}`);
      return NextResponse.redirect(url, 301);
    }
  }
  
  // MODIFICACIÓN SEO: No redirigir URLs de servicios/[slug]/[industria]
  // Estas rutas ahora se permitirán directamente para mejor SEO
  
  // MODIFICACIÓN SEO: Permitir rutas de ciudad/servicio y servicio/industria directamente
  if (segments.length === 2) {
    const [primerSegmento, segundoSegmento] = segments;
    
    // Verificar si es una ruta ciudad/servicio o servicio/industria - permitir ambos casos
    if ((CIUDADES_VALIDAS.includes(primerSegmento) && SERVICIOS_VALIDOS.includes(segundoSegmento)) ||
        (SERVICIOS_VALIDOS.includes(primerSegmento) && INDUSTRIAS_VALIDAS.includes(segundoSegmento))) {
      return NextResponse.next();
    }
  }
  
  // Si no coincide con ninguno de los patrones, continuar normalmente
  return NextResponse.next();
}

// MODIFICACIÓN SEO: Reducir el ámbito del middleware para mejor rendimiento
// Solo ejecutar en las rutas que realmente necesitan procesamiento
export const config = {
  matcher: [
    '/landing-dinamico/:path*',
    '/servicios-por-industria/:path*',
    '/servicios/:path*',
    '/:city/:service',
    '/:service/:industry'
  ]
}; 