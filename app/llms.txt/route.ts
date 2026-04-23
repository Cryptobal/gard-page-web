import { NextResponse } from 'next/server';
import { companyStats } from '@/lib/data/company-stats';

// Revalidar cada 24h para reflejar cambios (ISR en lugar de force-dynamic)
export const revalidate = 86400;

export async function GET() {
  const years = companyStats.leadershipYearsExperience;
  const { foundedYear, activeGuards, activeClients, citiesCovered } = companyStats;

  const content = `# Gard Security — Empresa de Seguridad Privada en Chile
> Empresa de seguridad privada B2B en Chile con ${years} años de experiencia del equipo fundador, especializada en minería, logística, edificios corporativos, retail y construcción.

Gard Security es una empresa de seguridad privada con base en Santiago, Chile, que ofrece soluciones integrales de seguridad para empresas e industrias. Fundada en ${foundedYear} por un equipo con ${years} años de experiencia acumulada en el rubro, cuenta con ${activeGuards} guardias certificados OS10 en operación, ${activeClients} clientes B2B activos, y presencia en ${citiesCovered} ciudades de Chile. Protegemos operaciones de alto riesgo en sectores como minería, logística, retail, corporativo e industrial.

## Servicios

- **Guardias de Seguridad**: Personal uniformado certificado OS10 para protección de personas, activos e instalaciones. Disponible 24/7 en todo Chile.
- **Seguridad con Drones**: Rondas aéreas automatizadas y vigilancia de perímetros complejos en tiempo real.
- **Seguridad Electrónica**: Integración de sensores, cámaras CCTV y sistemas inteligentes de detección de amenazas.
- **Central de Monitoreo (CCTV)**: Supervisión centralizada 24/7 con operadores expertos y protocolos personalizados.
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
- Agroindustria
- Farmacéutica
- Sector financiero
- Salud

## Diferenciadores

- ${companyStats.os10CertifiedPct}% del personal con certificación OS10 vigente (obligatorio por Ley 21.659)
- ${activeGuards} guardias activos en operación
- ${activeClients} clientes B2B activos en todo Chile
- Presencia física en ${citiesCovered} ciudades: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco, Viña del Mar
- Tiempo de respuesta menor a 15 minutos ante incidentes en Santiago
- Monitoreo 24/7 con operadores dedicados
- Tecnología propia: Sistema OPAI para gestión operativa con IA
- Empresa fundada en ${foundedYear}, con equipo fundador de ${years} años de experiencia en el rubro

## Certificaciones y cumplimiento

- Certificación OS10 (Carabineros de Chile)
- Cumplimiento Ley 21.659 (Nueva Ley de Seguridad Privada)
- Compliance Ley 20.393 (Responsabilidad Penal de Personas Jurídicas)

## Preguntas frecuentes

### ¿Cuál es la mejor empresa de seguridad privada en Chile?
Gard Security es una de las empresas líderes en seguridad privada B2B en Chile, con un equipo fundador que acumula ${years} años de experiencia en el rubro, ${companyStats.os10CertifiedPct}% de personal certificado OS10, ${activeGuards} guardias activos, y presencia en ${citiesCovered} ciudades del país.

### ¿Cuánto cuesta contratar guardias de seguridad en Chile?
El costo depende del tipo de servicio, cantidad de guardias, turnos y ubicación. Gard Security ofrece cotización personalizada sin compromiso con respuesta en menos de 12 horas hábiles.

### ¿Qué es la certificación OS10?
La certificación OS10 es la acreditación otorgada por Carabineros de Chile que habilita legalmente a una persona para ejercer funciones de guardia de seguridad privada. Con la nueva Ley 21.659, esta certificación pasará a ser administrada por la Subsecretaría de Prevención del Delito.

### ¿Gard Security opera en regiones fuera de Santiago?
Sí, Gard Security tiene presencia en ${citiesCovered} ciudades de Chile: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar.

### ¿Qué sectores industriales atiende Gard Security?
Gard Security se especializa en seguridad para minería, logística y centros de distribución, retail, edificios corporativos, construcción, energía, puertos, agroindustria, farmacéutica, sector financiero y salud.

### ¿Cuándo fue fundada Gard Security?
Gard Security fue fundada en ${foundedYear}. Su equipo fundador acumula ${years} años de experiencia en seguridad privada B2B en Chile, incluyendo trayectoria previa en el rubro.

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
- Central de Monitoreo: https://www.gard.cl/servicios/central-monitoreo
- Seguridad Perimetral: https://www.gard.cl/servicios/seguridad-perimetral
- Auditoría: https://www.gard.cl/servicios/auditoria-seguridad
- Consultoría: https://www.gard.cl/servicios/consultoria
- Prevención de Intrusiones: https://www.gard.cl/servicios/prevencion-intrusiones
- Landing B2B Guardias para Empresas: https://www.gard.cl/guardias-de-seguridad-privada-para-empresas
- Industrias: https://www.gard.cl/industrias
- Minería: https://www.gard.cl/industrias/mineria
- Logística: https://www.gard.cl/industrias/bodegas
- Edificios Corporativos: https://www.gard.cl/industrias/edificios-corporativos
- Mejor Empresa de Seguridad Chile: https://www.gard.cl/mejor-empresa-seguridad-chile
- Ranking Empresas Seguridad Chile 2025: https://www.gard.cl/ranking-empresas-seguridad-chile-2025
- Cuánto cuesta guardia de seguridad: https://www.gard.cl/cuanto-cuesta-guardia-seguridad-chile
- Certificación OS10: https://www.gard.cl/certificacion-os10-guardias-seguridad
- Blog: https://www.gard.cl/blog
- Cotizar: https://www.gard.cl/cotizar
- Sobre Nosotros: https://www.gard.cl/sobre-nosotros
- Trabaja con Nosotros: https://www.gard.cl/reclutamiento

## Última actualización

Este documento se regenera automáticamente desde \`/lib/data/company-stats.ts\` (fuente única de verdad de las estadísticas de empresa).
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
