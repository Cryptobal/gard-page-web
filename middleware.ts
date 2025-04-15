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
  
  // Limpiar la ruta de cualquier prefijo no deseado
  const cleanPathname = pathname.replace(/^\/https?:\/\/(www\.)?gard\.cl/, '');
  const segments = cleanPathname.split('/').filter(Boolean);
  
  // Si la ruta es válida, permitir sin redirección
  if (isValidRoute(segments)) {
    return NextResponse.next();
  }
  
  // Manejar URLs antiguas de landing-dinamico
  if (segments[0] === 'landing-dinamico' && segments.length === 3) {
    const [_, industria, servicio] = segments;
    
    if (INDUSTRIAS_VALIDAS.includes(industria)) {
      url.pathname = `/servicios-por-industria/${servicio}/${industria}/`;
      return NextResponse.redirect(url, 301);
    }
  }
  
  // Si la ruta no es válida, redirigir a la página principal
  return NextResponse.next();
}

function isValidRoute(segments: string[]): boolean {
  if (segments.length === 0) return true;
  
  // Rutas válidas de primer nivel
  if (segments.length === 1) {
    return ['blog', 'servicios', 'industrias', 'contacto', 'sobre-nosotros', 'tecnologia-seguridad'].includes(segments[0]);
  }
  
  // Rutas ciudad/servicio
  if (segments.length === 2) {
    const [first, second] = segments;
    return (
      (CIUDADES_VALIDAS.includes(first) && SERVICIOS_VALIDOS.includes(second)) ||
      (SERVICIOS_VALIDOS.includes(first) && INDUSTRIAS_VALIDAS.includes(second)) ||
      (first === 'blog' && second.startsWith('tag'))
    );
  }
  
  // Rutas servicios-por-industria
  if (segments.length === 3 && segments[0] === 'servicios-por-industria') {
    const [_, servicio, industria] = segments;
    return SERVICIOS_VALIDOS.includes(servicio) && INDUSTRIAS_VALIDAS.includes(industria);
  }
  
  return false;
}

// Configurar el matcher para las rutas que necesitan procesamiento
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 