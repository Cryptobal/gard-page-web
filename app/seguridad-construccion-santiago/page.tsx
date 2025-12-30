import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, Shield, Clock, HardHat, AlertTriangle } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Seguridad para Construcción en Santiago | Guardias para Obras | Gard Security',
  description: 'Seguridad especializada para obras de construcción en Santiago. Guardias capacitados, vigilancia 24/7, protección de maquinaria. Evite robos y vandalismo. Cotice ahora.',
  keywords: ['seguridad construcción santiago', 'guardias obras santiago', 'vigilancia construcción', 'protección maquinaria', 'seguridad faenas santiago'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/seguridad-construccion-santiago' },
  openGraph: {
    title: 'Seguridad para Construcción en Santiago | Guardias para Obras | Gard Security',
    description: 'Proteja su obra con guardias especializados. Vigilancia 24/7, control de acceso, protección de materiales. Cotice en línea.',
    url: 'https://www.gard.cl/seguridad-construccion-santiago',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website'
  }
};

const faqs = [
  { question: '¿Por qué necesito seguridad en mi obra de construcción?', answer: 'Los robos de maquinaria, herramientas, materiales y cables de cobre pueden significar pérdidas millonarias y retrasos en plazos de entrega. Además, el vandalismo y acceso de terceros no autorizados generan responsabilidades legales. Nuestro servicio reduce el riesgo de robos en 90% y protege su inversión 24/7.' },
  { question: '¿Qué incluye el servicio de seguridad para construcción?', answer: 'Guardias capacitados en seguridad de obras (1-2 guardias turnos 12h o 24h), control de ingreso de trabajadores y proveedores con registro digital, rondas programadas en zonas críticas, vigilancia de maquinaria pesada y herramientas, protección de materiales (fierros, cables, cementos), y reportes diarios de novedades e incidentes.' },
  { question: '¿Cuánto cuesta la seguridad para una obra en Santiago?', answer: 'Se calcula según turnos, número de puestos, tamaño y riesgo de la obra. Enviamos propuesta cerrada en 24h; no publicamos montos genéricos.' },
  { question: '¿Cuánto tiempo toma implementar el servicio?', answer: 'Podemos desplegar guardias en su obra en 24-48 horas desde la aprobación de la cotización. Realizamos visita de evaluación, diseñamos plan de seguridad específico y coordinamos inicio de servicio según su calendario de obra.' }
];

export default function SeguridadConstruccionPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://www.gard.cl' },
    { name: 'Servicios', url: 'https://www.gard.cl/servicios' },
    { name: 'Seguridad Construcción Santiago', url: 'https://www.gard.cl/seguridad-construccion-santiago' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <ServiceSchema
        name="Seguridad para Construcción en Santiago"
        description="Guardias especializados en seguridad para obras de construcción con protección 24/7"
        url="https://www.gard.cl/seguridad-construccion-santiago"
        areaServed="Santiago, Chile"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
        offers={{ priceRange: "$$", availability: "https://schema.org/InStock" }}
      />

      {/* Hero */}
      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="5b23cd4e-7e45-4f89-b234-8c1a3456ef00"
            alt="Seguridad para construcción en Santiago"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary mb-6">
            <HardHat className="h-4 w-4 mr-2" />
            <span>Reducción 90% en Robos de Obra</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Seguridad para Obras de Construcción en Santiago
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Proteja maquinaria, materiales y herramientas con guardias especializados y vigilancia 24/7. Evite robos, vandalismo y retrasos
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">40+ Obras Protegidas</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">Inicio en 24-48h</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">-90% Robos</span>
            </div>
          </div>
          
          <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotizar Seguridad para mi Obra <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Por qué necesitas seguridad */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Por Qué Necesita Seguridad en su Obra?</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Los robos y vandalismo en construcción generan pérdidas millonarias y retrasos costosos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Robo de Maquinaria</h3>
              <p className="text-muted-foreground">
                Maquinaria pesada, retroexcavadoras, generadores y herramientas eléctricas son objetivo frecuente. Pérdidas promedio: $15-40 millones por incidente.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sustracción de Materiales</h3>
              <p className="text-muted-foreground">
                Fierros, cables de cobre, cementos, cerámicas y materiales de terminación. Robo hormiga nocturno puede significar $5-10 millones mensuales en pérdidas.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Vandalismo y Daños</h3>
              <p className="text-muted-foreground">
                Daño intencional a estructuras, rotura de ventanas, grafitis y sabotaje generan costos de reparación y retrasos en plazos de entrega con multas contractuales.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Acceso No Autorizado</h3>
              <p className="text-muted-foreground">
                Terceros ajenos a la obra (curiosos, indigentes, vándalos) generan riesgos legales si sufren accidentes dentro del predio. Responsabilidad civil del mandante.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Retrasos en Cronograma</h3>
              <p className="text-muted-foreground">
                Cada robo genera paradas de obra mientras se repone maquinaria/materiales. Retrasos pueden significar multas contractuales y pérdida de credibilidad con mandantes.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-900">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Aumento de Seguros</h3>
              <p className="text-muted-foreground">
                Obras con historial de robos enfrentan aumentos en primas de seguros o exclusiones de cobertura. La prevención es más económica que asegurar pérdidas recurrentes.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">Solución Gard Security</h3>
                <p className="text-green-800 dark:text-green-200">
                  Nuestro servicio de seguridad para construcción ha demostrado reducir robos en 90% y eliminar accesos no autorizados. ROI positivo en el primer mes al evitar una sola sustracción de maquinaria. Más de 40 obras actualmente protegidas en Santiago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-12 text-center">¿Qué Incluye Nuestro Servicio?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Guardias Especializados</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>1-2 guardias según tamaño de obra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Turnos 12h diurnos/nocturnos o 24/7</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Capacitación en seguridad de construcción</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Uniformes corporativos y equipamiento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comunicación permanente con supervisión</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Control de Accesos</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Registro digital de trabajadores y proveedores</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de ingreso/salida de vehículos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Verificación de credenciales de visitantes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Revisión de materiales que salen de obra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trazabilidad total de movimientos</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Vigilancia y Rondas</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Rondas programadas en zonas críticas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Vigilancia de maquinaria pesada</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Protección de bodegas de herramientas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de acopios de materiales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Detección temprana de intrusiones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Reportería y Coordinación</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reportes diarios de novedades</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Registro fotográfico de incidentes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Coordinación con jefe de obra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Alertas inmediatas vía WhatsApp/llamada</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Disponibilidad de carabineros si es necesario</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gard-section py-16 bg-primary text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proteja su Inversión Ahora
          </h2>
          <p className="text-xl mb-8 text-white/90">
            El costo de un robo supera en 10x el costo de prevención. Inicio en 24-48 horas
          </p>
          <a href="#cotizar" className="gard-btn bg-white text-primary hover:bg-white/90 gard-btn-lg inline-flex items-center">
            Cotizar Seguridad <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <FAQSection
        title="Preguntas Frecuentes sobre Seguridad para Construcción"
        description="Respuestas sobre protección de obras en Santiago"
        faqs={faqs}
      />

      <FormularioCotizacionSeccion 
        id="cotizar"
        prefillIndustria="Construcción"
      />
    </>
  );
}

