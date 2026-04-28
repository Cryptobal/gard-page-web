import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

// Mapeo de slugs antiguos (URLs WordPress/Elementor) a slugs nuevos.
// Usado por la redirección de /landing-dinamico/{industria}/{servicio}
// hacia /servicios-por-industria/{servicio}/{industria}.
const MAPEO_SERVICIOS_ANTIGUOS: Record<string, string> = {
  'guardias-privados': 'guardias-de-seguridad',
  'camaras-seguridad': 'seguridad-electronica',
  'alarmas': 'seguridad-electronica',
  'control-acceso': 'seguridad-electronica',
  'monitoreo-remoto': 'central-monitoreo',
};

const MAPEO_INDUSTRIAS_ANTIGUAS: Record<string, string> = {
  'hospitales': 'salud',
  'corporativo': 'edificios-corporativos',
  'logistica': 'transporte-y-logistica',
  'oficinas': 'edificios-corporativos',
  'colegios': 'educacion',
  'universidades': 'educacion',
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
  
  // Manejar URLs antiguas de landing-dinamico, normalizando tanto slugs
  // antiguos de industria (hospitales→salud, corporativo→edificios-corporativos…)
  // como de servicio (guardias-privados→guardias-de-seguridad, control-acceso→
  // seguridad-electronica…). Antes solo aceptaba industrias ya en el slug
  // nuevo, lo que dejaba 404 finales que GSC reportaba como Soft 404.
  if (segments[0] === 'landing-dinamico' && segments.length === 3) {
    const [, industriaRaw, servicioRaw] = segments;
    const industria = MAPEO_INDUSTRIAS_ANTIGUAS[industriaRaw] ?? industriaRaw;
    const servicio = MAPEO_SERVICIOS_ANTIGUOS[servicioRaw] ?? servicioRaw;

    if (INDUSTRIAS_VALIDAS.includes(industria) && SERVICIOS_VALIDOS.includes(servicio)) {
      url.pathname = `/servicios-por-industria/${servicio}/${industria}`;
      return NextResponse.redirect(url, 308);
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

// Configurar el matcher para las rutas que necesitan procesamiento
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 