import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Radio, Eye, Users, CheckCircle } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';

const CANONICAL = 'https://www.gard.cl/servicios/prevencion-intrusiones/parques-industriales';

export const metadata: Metadata = {
  title: 'Prevención de Intrusiones para Parques Industriales | Gard Security',
  description: 'Sistemas de detección perimetral anti-intrusión para parques industriales en Chile. Cercos virtuales, analítica de video con IA, sensores y respuesta inmediata 24/7. Cotiza hoy.',
  keywords: 'prevención de intrusiones, parques industriales, seguridad perimetral, detección temprana, control de acceso',
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'Prevención de Intrusiones para Parques Industriales | Gard Security',
    description: 'Sistemas de detección perimetral anti-intrusión para complejos industriales. Cercos virtuales, analítica de video inteligente y guardias coordinados para protección integral.',
    url: CANONICAL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function PrevencionIntrusionesParquesIndustrialesPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://www.gard.cl' },
    { name: 'Servicios', url: 'https://www.gard.cl/servicios' },
    { name: 'Prevención de Intrusiones', url: 'https://www.gard.cl/servicios/prevencion-intrusiones' },
    { name: 'Parques Industriales', url: CANONICAL },
  ];

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        name="Prevención de Intrusiones para Parques Industriales"
        description="Servicio integral de prevención de intrusiones para parques industriales: cercos virtuales, sensores perimetrales, analítica de video con IA y guardias certificados OS10 coordinados con central de monitoreo 24/7."
        serviceType="Seguridad Perimetral"
        category="Seguridad Privada"
        url={CANONICAL}
        areaServed={[{ type: 'Country', name: 'Chile' }]}
      />

      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24 max-w-4xl">
          <h1 className="text-heading-2 mb-6 font-title">
            Prevención de Intrusiones para Parques Industriales
          </h1>

          <p className="text-body-lg mb-8 text-muted-foreground">
            Los parques industriales son entornos de alto valor con perímetros extensos, múltiples accesos,
            zonas de carga activas durante la noche y circulación permanente de contratistas. Proteger estas
            instalaciones exige una estrategia que combine detección electrónica temprana, analítica inteligente
            y personal entrenado para actuar antes de que una intrusión genere daños o pérdidas operacionales.
          </p>

          <p className="text-body-base mb-6">
            En Gard Security diseñamos e implementamos sistemas de prevención de intrusiones integrados,
            adaptados a las particularidades topográficas y operativas de cada parque industrial en Chile.
            Nuestra propuesta articula tecnología avanzada con un equipo de guardias certificados
            OS-10 y una central de monitoreo activa 24/7, lista para coordinar respuesta con policía o
            seguridad local ante cualquier alarma verificada.
          </p>

          <h2 className="text-heading-3 mt-12 mb-6 font-title">
            Tecnologías que implementamos
          </h2>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <Radio className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="text-foreground">Cercos virtuales y sensores perimetrales:</strong>
                <span className="text-muted-foreground"> detección por microondas, infrarrojo activo y
                  fibra óptica en cierres perimetrales extensos.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="text-foreground">Analítica de video con inteligencia artificial:</strong>
                <span className="text-muted-foreground"> detección de cruce de línea, merodeo, vehículos
                  detenidos y conteo de personas, reduciendo falsas alarmas hasta en un 85%.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="text-foreground">Control de accesos integrado:</strong>
                <span className="text-muted-foreground"> barreras vehiculares, torniquetes, lectores LPR,
                  enrolamiento de contratistas y bitácora digital de visitas.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <strong className="text-foreground">Guardias de respuesta y rondas inteligentes:</strong>
                <span className="text-muted-foreground"> personal con certificación OS-10, rondas con
                  geolocalización y tiempos de respuesta auditables.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-heading-3 mt-12 mb-6 font-title">
            Beneficios para su parque industrial
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              'Detección temprana de intentos de intrusión, incluso en perímetros de varios kilómetros',
              'Reducción drástica de falsas alarmas mediante verificación por video y analítica',
              'Disuasión activa con iluminación, audios y contacto directo desde la central',
              'Trazabilidad completa de eventos, accesos y respuestas para auditoría',
              'Integración con sistemas existentes: CCTV, BMS, SCADA y ERP de control de accesos',
              'Cobertura nacional y respuesta coordinada con nuestras 10 ciudades operativas',
            ].map((beneficio, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-body-base text-foreground">{beneficio}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-heading-3 mt-12 mb-6 font-title">
            Industrias que protegemos
          </h2>
          <p className="text-body-base mb-8 text-muted-foreground">
            Trabajamos con operadores de parques logísticos, centros de distribución, complejos
            manufactureros, parques tecnológicos y zonas francas en las principales regiones mineras
            y productivas de Chile. Cada implementación parte de un levantamiento de riesgos específico
            y un diseño de seguridad que cumple con normativa OS-10 y estándares internacionales como
            ISO 31000 e ISO 22301.
          </p>

          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-heading-4 mb-3 font-title">
              ¿Necesita evaluar la seguridad perimetral de su parque industrial?
            </h2>
            <p className="text-body-base text-muted-foreground mb-5">
              Coordinamos un levantamiento técnico sin costo y entregamos una propuesta con matriz de
              riesgos, tecnología recomendada y dotación operativa en menos de 12 horas hábiles.
            </p>
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
