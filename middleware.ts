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
  const segments = pathname.split('/').filter(Boolean);
  
  console.log(`Segmentos detectados: ${segments.join(', ')} (${segments.length})`);

  // Manejar rutas de servicios por industria
  if (segments.length === 3 && segments[0] === 'servicios-por-industria') {
    const servicio = segments[1];
    const industria = segments[2];
    
    // Verificar si son segmentos válidos
    if (SERVICIOS_VALIDOS.includes(servicio) && INDUSTRIAS_VALIDAS.includes(industria)) {
      // Permitir todas las combinaciones válidas
      // No verificamos esCombinacionValida ya que ahora todas las combinaciones son válidas
      return NextResponse.next();
      
      /*
      // Código original comentado:
      // Verificar si la combinación es válida según nuestro mapa de configuración
      if (!esCombinacionValida(servicio, industria)) {
        console.log(`Combinación no válida: ${servicio}/${industria}, redirigiendo a /servicios/${servicio}`);
        // Si la combinación no es válida, redirigir a la página del servicio
        url.pathname = `/servicios/${servicio}`;
        return NextResponse.redirect(url, 302); // Redirección temporal
      }
      
      // Si la combinación es válida, continuar normalmente
      return NextResponse.next();
      */
    }
  }
  
  // Manejar URLs antiguas de landing-dinamico
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
  
  // Primero verificamos para rutas de 3 segmentos (servicios/[slug]/[industria])
  if (segments.length === 3) {
    console.log(`Procesando ruta de 3 segmentos: ${segments.join('/')}`);
    
    if (segments[0] === 'servicios' && 
        SERVICIOS_VALIDOS.includes(segments[1]) && 
        INDUSTRIAS_VALIDAS.includes(segments[2])) {
      
      console.log(`Redirigiendo /servicios/${segments[1]}/${segments[2]} a /servicios-por-industria/`);
      
      // Redirigir a la nueva estructura de URL
      url.pathname = `/servicios-por-industria/${segments[1]}/${segments[2]}`;
      return NextResponse.redirect(url, 301); // Redirección permanente (301)
    }
  }
  
  // Luego procesamos las rutas de 2 segmentos
  if (segments.length === 2) {
    const [primerSegmento, segundoSegmento] = segments;
    
    console.log(`Analizando ruta de 2 segmentos: /${primerSegmento}/${segundoSegmento}`);
    
    // Verificar si es una ruta ciudad/servicio
    if (CIUDADES_VALIDAS.includes(primerSegmento) && SERVICIOS_VALIDOS.includes(segundoSegmento)) {
      console.log(`Se identificó como ciudad/servicio: ${primerSegmento}/${segundoSegmento}`);
      // Es una ruta ciudad/servicio, continuar normalmente
      return NextResponse.next();
    }
    
    // Verificar si es una ruta servicio/industria
    if (SERVICIOS_VALIDOS.includes(primerSegmento) && INDUSTRIAS_VALIDAS.includes(segundoSegmento)) {
      console.log(`Se identificó como servicio/industria: ${primerSegmento}/${segundoSegmento}`);
      // Es una ruta servicio/industria, redirigir a servicios-por-industria
      url.pathname = `/servicios-por-industria/${primerSegmento}/${segundoSegmento}`;
      return NextResponse.redirect(url);
    }
    
    console.log(`No se identificó ningún patrón conocido para: ${primerSegmento}/${segundoSegmento}`);
  }
  
  // Si no coincide con ninguno de los patrones, continuar normalmente
  return NextResponse.next();
}

// Configurar el middleware para que se ejecute en TODAS las rutas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 