import { Metadata } from 'next';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

// Metadatos de la página
export const metadata: Metadata = {
  title: 'Prevención de Intrusiones para Parques Industriales | Gard Security',
  description: 'Sistemas de detección perimetral anti-intrusión para complejos industriales. Implementación de cercos virtuales, análisis de video inteligente y coordinación con guardias de seguridad para protección integral.',
  keywords: 'prevención de intrusiones, parques industriales, seguridad perimetral, detección temprana, control de acceso',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/prevencion-intrusiones/parques-industriales',
  },
  openGraph: {
    title: 'Prevención de Intrusiones para Parques Industriales | Gard Security',
    description: 'Sistemas de detección perimetral anti-intrusión para complejos industriales. Implementación de cercos virtuales, análisis de video inteligente y coordinación con guardias de seguridad para protección integral.',
    url: 'https://www.gard.cl/servicios/prevencion-intrusiones/parques-industriales',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function PrevencionIntrusionesParquesIndustrialesPage() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24">
          <h1 className="text-heading-2 mb-6">Prevención de Intrusiones para Parques Industriales</h1>
          <p className="text-body-lg mb-8">
            Nuestros sistemas de prevención de intrusiones están diseñados para proteger 
            eficazmente parques industriales, con tecnología de vanguardia que garantiza 
            detección temprana y respuesta inmediata ante amenazas.
          </p>
          {/* Contenido adicional se agregará aquí cuando esté disponible */}
        </div>
      </section>
    </main>
  );
} 