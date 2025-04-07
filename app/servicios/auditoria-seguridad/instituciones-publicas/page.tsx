import { Metadata } from 'next';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';

// Metadatos de la página
export const metadata: Metadata = {
  title: 'Auditoría de Seguridad para Instituciones Públicas | Gard Security',
  description: 'Auditorías de seguridad especializadas para entidades gubernamentales y servicios públicos. Verificación normativa, análisis de protocolos de emergencia y evaluación de seguridad documental clasificada.',
  keywords: 'auditoría de seguridad, instituciones públicas, evaluación de riesgos, cumplimiento normativo, seguridad gubernamental',
  alternates: {
    canonical: 'https://www.gard.cl/servicios/auditoria-seguridad/instituciones-publicas',
  },
  openGraph: {
    title: 'Auditoría de Seguridad para Instituciones Públicas | Gard Security',
    description: 'Auditorías de seguridad especializadas para entidades gubernamentales y servicios públicos. Verificación normativa, análisis de protocolos de emergencia y evaluación de seguridad documental clasificada.',
    url: 'https://www.gard.cl/servicios/auditoria-seguridad/instituciones-publicas',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function AuditoriaInstitucionesPublicasPage() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container py-16 md:py-24">
          <h1 className="text-heading-2 mb-6">Auditoría de Seguridad para Instituciones Públicas</h1>
          <p className="text-body-lg mb-8">
            Nuestros servicios de auditoría para instituciones públicas proporcionan una 
            evaluación exhaustiva de sus sistemas de seguridad, identificando vulnerabilidades, 
            verificando el cumplimiento normativo y desarrollando recomendaciones específicas 
            para el entorno institucional.
          </p>
          {/* Contenido adicional se agregará aquí cuando esté disponible */}
        </div>
      </section>
    </main>
  );
} 