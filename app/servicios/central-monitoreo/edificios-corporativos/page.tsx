import { Metadata } from 'next';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

// Metadatos de la página
export const metadata: Metadata = {
  title: 'Central de Monitoreo - Edificios | Gard Security',
  description: 'Central de monitoreo con tecnología avanzada exclusiva para edificios corporativos. Supervisión continua por operadores certificados, integración con sistemas existentes y alertas en tiempo real.',
  keywords: 'central de monitoreo, edificios corporativos, seguridad 24/7, vigilancia remota, respuesta a incidentes',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/central-monitoreo/edificios-corporativos',
  },
  openGraph: {
    title: 'Central de Monitoreo para Edificios Corporativos | Gard Security',
    description: 'Central de monitoreo con tecnología avanzada exclusiva para edificios corporativos. Supervisión continua por operadores certificados, integración con sistemas existentes y alertas en tiempo real.',
    url: 'https://www.gard.cl/servicios/central-monitoreo/edificios-corporativos',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function CentralMonitoreoEdificiosCorporativosPage() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24">
          <h1 className="text-heading-2 mb-6">Central de Monitoreo para Edificios Corporativos</h1>
          <p className="text-body-lg mb-8">
            Nuestras soluciones de monitoreo están diseñadas específicamente para las necesidades 
            de seguridad de edificios corporativos, ofreciendo vigilancia continua y respuesta 
            inmediata ante cualquier incidente.
          </p>
          {/* Contenido adicional se agregará aquí cuando esté disponible */}
        </div>
      </section>
    </main>
  );
} 