import { Metadata } from 'next';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

// Metadatos de la página
export const metadata: Metadata = {
  title: 'Drones de Seguridad para Minería | Gard Security',
  description: 'Patrullaje con drones especializados para yacimientos mineros. Monitoreo térmico de zonas críticas, detección de intrusos en perímetros extensos y supervisión de operaciones en entornos de difícil acceso.',
  keywords: 'drones de seguridad, minería, vigilancia aérea, monitoreo remoto, inspecciones industriales',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/drones-seguridad/mineria',
  },
  openGraph: {
    title: 'Drones de Seguridad para Minería | Gard Security',
    description: 'Patrullaje con drones especializados para yacimientos mineros. Monitoreo térmico de zonas críticas, detección de intrusos en perímetros extensos y supervisión de operaciones en entornos de difícil acceso.',
    url: 'https://www.gard.cl/servicios/drones-seguridad/mineria',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function DronesMineriaSeguridadPage() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24">
          <h1 className="text-heading-2 mb-6">Drones de Seguridad para Minería</h1>
          <p className="text-body-lg mb-8">
            Nuestros servicios de drones de seguridad para minería ofrecen vigilancia aérea 
            avanzada, inspecciones de infraestructura y monitoreo de operaciones en tiempo real, 
            maximizando la seguridad de instalaciones y personal en entornos mineros.
          </p>
          {/* Contenido adicional se agregará aquí cuando esté disponible */}
        </div>
      </section>
    </main>
  );
} 