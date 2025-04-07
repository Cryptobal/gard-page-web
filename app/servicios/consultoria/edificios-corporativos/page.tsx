import { Metadata } from 'next';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

// Metadatos de la página
export const metadata: Metadata = {
  title: 'Consultoría de Seguridad para Edificios Corporativos | Gard Security',
  description: 'Asesoría especializada en seguridad integral para edificios corporativos. Desarrollamos planes estratégicos, evaluación de sistemas existentes y optimización de protocolos de seguridad.',
  keywords: 'consultoría de seguridad, edificios corporativos, evaluación de riesgos, planificación de seguridad, control de acceso',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/consultoria/edificios-corporativos',
  },
  openGraph: {
    title: 'Consultoría de Seguridad para Edificios Corporativos | Gard Security',
    description: 'Asesoría especializada en seguridad integral para edificios corporativos. Desarrollamos planes estratégicos, evaluación de sistemas existentes y optimización de protocolos de seguridad.',
    url: 'https://www.gard.cl/servicios/consultoria/edificios-corporativos',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function ConsultoriaEdificiosCorporativosPage() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24">
          <h1 className="text-heading-2 mb-6">Consultoría de Seguridad para Edificios Corporativos</h1>
          <p className="text-body-lg mb-8">
            Nuestros servicios de consultoría para edificios corporativos ofrecen análisis 
            completos de vulnerabilidades, diseño de protocolos de seguridad y recomendaciones 
            personalizadas para optimizar la protección de su inmueble y sus ocupantes.
          </p>
          {/* Contenido adicional se agregará aquí cuando esté disponible */}
        </div>
      </section>
    </main>
  );
} 