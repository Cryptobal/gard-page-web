import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { esCombinacionValida } from '@/app/data/servicios-por-industria';

// ── A/B test cotizar form (Sprint 3) ──
const AB_COOKIE_NAME = 'gard_ab_cotizar_form';
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 días
const AB_PATHS = [
  '/cotizar',
  '/ciudades',
  '/industrias',
  '/servicios',
  '/empresa-seguridad-privada-chile',
  '/guardias-de-seguridad-privada-para-empresas',
];

function isAbTestPath(pathname: string): boolean {
  return AB_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

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
//
// Nota: la redirección canónica gard.cl → www.gard.cl ahora vive en
// next.config.js > redirects() con `permanent: true` (308 garantizado).
// Antes estaba acá pero Vercel la servía como 307 a nivel platform y
// generaba señales débiles de canónica para Googlebot.
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const { pathname } = url;
  
  // NO limpiar pathname - esto causaba problemas
  const segments = pathname.split('/').filter(Boolean);
  
  // Manejar URLs antiguas de landing-dinamico SOLAMENTE
  if (segments[0] === 'landing-dinamico' && segments.length === 3) {
    const [_, industria, servicio] = segments;

    if (INDUSTRIAS_VALIDAS.includes(industria)) {
      url.pathname = `/servicios-por-industria/${servicio}/${industria}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // ── A/B test: asignar cookie 50/50 en primera visita a paths relevantes ──
  const response = NextResponse.next();
  if (isAbTestPath(pathname)) {
    const existing = request.cookies.get(AB_COOKIE_NAME)?.value;
    if (existing !== 'control' && existing !== 'multistep') {
      const variant: 'control' | 'multistep' = Math.random() < 0.5 ? 'control' : 'multistep';
      response.cookies.set({
        name: AB_COOKIE_NAME,
        value: variant,
        maxAge: AB_COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }
  }
  return response;
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