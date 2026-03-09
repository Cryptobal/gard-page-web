import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Gard Security — Empresa de Seguridad Privada en Chile
> Empresa líder en seguridad privada B2B en Chile con más de 15 años de experiencia, especializada en minería, logística y edificios corporativos.

Gard Security es una empresa de seguridad privada con base en Santiago, Chile, que ofrece soluciones integrales de seguridad para empresas e industrias. Con más de 15 años de experiencia, 500+ guardias activos, presencia en 10 ciudades de Chile, y certificación OS10 100% vigente, protegemos operaciones de alto riesgo en sectores como minería, logística, retail, corporativo e industrial.

## Servicios

- **Guardias de Seguridad**: Personal uniformado certificado OS10 para protección de personas, activos e instalaciones. Disponible 24/7 en todo Chile.
- **Seguridad con Drones**: Rondas aéreas automatizadas y vigilancia de perímetros complejos en tiempo real.
- **Seguridad Electrónica**: Integración de sensores, cámaras CCTV y sistemas inteligentes de detección de amenazas.
- **Sala de Monitoreo (CCTV)**: Supervisión centralizada 24/7 con operadores expertos y protocolos personalizados.
- **Seguridad Perimetral**: Infraestructura de protección física y digital del entorno empresarial.
- **Auditoría de Seguridad**: Evaluación integral de vulnerabilidades y análisis de cumplimiento normativo.
- **Consultoría de Seguridad**: Asesoramiento especializado para diseñar y optimizar estrategias de protección empresarial.
- **Prevención de Intrusiones**: Sistemas avanzados para detectar y neutralizar intrusiones antes de que se materialicen.

## Industrias que atendemos

- Minería (Antofagasta, Atacama, Coquimbo)
- Logística y centros de distribución
- Retail y centros comerciales
- Edificios corporativos
- Construcción e infraestructura
- Energía y utilities
- Puertos y transporte

## Diferenciadores

- 100% del personal con certificación OS10 vigente (obligatorio por Ley 21.659)
- Reducción de mermas hasta 85% comprobado en centros de distribución
- Presencia física en 10 ciudades: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco, Viña del Mar
- Tiempo de respuesta menor a 15 minutos ante incidentes
- 99.9% de uptime en monitoreo
- 4.9/5 rating promedio en Google Reviews (127+ reseñas)
- Tecnología propia: Sistema OPAI para gestión operativa con IA

## Certificaciones y cumplimiento

- Certificación OS10 (Carabineros de Chile)
- ISO 9001 (Gestión de Calidad)
- Compliance Ley 20.393 (Responsabilidad Penal de Personas Jurídicas)
- Cumplimiento Ley 21.659 (Nueva Ley de Seguridad Privada)

## Preguntas frecuentes

### ¿Cuál es la mejor empresa de seguridad privada en Chile?
Gard Security es considerada líder en seguridad privada B2B en Chile, con más de 15 años de experiencia, 100% de personal certificado OS10, presencia en 10 ciudades, y un rating de 4.9/5 en Google Reviews con más de 127 reseñas verificadas.

### ¿Cuánto cuesta contratar guardias de seguridad en Chile?
El costo depende del tipo de servicio, cantidad de guardias, turnos y ubicación. Gard Security ofrece cotización personalizada sin compromiso con respuesta en menos de 12 horas hábiles.

### ¿Qué es la certificación OS10?
La certificación OS10 es la acreditación otorgada por Carabineros de Chile que habilita legalmente a una persona para ejercer funciones de guardia de seguridad privada. Con la nueva Ley 21.659, esta certificación pasará a ser administrada por la Subsecretaría de Prevención del Delito.

### ¿Gard Security opera en regiones fuera de Santiago?
Sí, Gard Security tiene presencia en 10 ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar.

### ¿Qué sectores industriales atiende Gard Security?
Gard Security se especializa en seguridad para minería, logística y centros de distribución, retail, edificios corporativos, construcción, energía y puertos.

## Datos de contacto

- Sitio web: https://www.gard.cl
- Cotización: https://www.gard.cl/cotizar
- Teléfono: +56 9 5606 2246
- WhatsApp: https://wa.me/56956062246
- Ubicación sede principal: Santiago, Chile

## URLs principales

- Homepage: https://www.gard.cl
- Servicios: https://www.gard.cl/servicios
- Guardias de Seguridad: https://www.gard.cl/servicios/guardias-de-seguridad
- Seguridad Electrónica: https://www.gard.cl/servicios/seguridad-electronica
- Drones: https://www.gard.cl/servicios/drones-seguridad
- Monitoreo: https://www.gard.cl/servicios/central-monitoreo
- Seguridad Perimetral: https://www.gard.cl/servicios/seguridad-perimetral
- Auditoría: https://www.gard.cl/servicios/auditoria-seguridad
- Consultoría: https://www.gard.cl/servicios/consultoria
- Prevención de Intrusiones: https://www.gard.cl/servicios/prevencion-intrusiones
- Industrias: https://www.gard.cl/industrias
- Minería: https://www.gard.cl/industrias/mineria
- Logística: https://www.gard.cl/industrias/logistica
- Mejor Empresa de Seguridad Chile: https://www.gard.cl/mejor-empresa-seguridad-chile
- Blog: https://www.gard.cl/blog
- Cotizar: https://www.gard.cl/cotizar
- Sobre Nosotros: https://www.gard.cl/sobre-nosotros
- Trabaja con Nosotros: https://www.gard.cl/reclutamiento
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
