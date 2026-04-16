import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const BASE_URL = 'https://www.gard.cl';
const PAGE_URL = `${BASE_URL}/vs`;

export const metadata: Metadata = {
  title: 'Comparativas de Empresas de Seguridad Privada en Chile | Gard Security',
  description:
    'Evalúa alternativas B2B en seguridad privada en Chile. Comparativas factuales de Gard Security frente a Prosegur, G4S y Securitas. Criterios verificables para decidir mejor.',
  alternates: {
    canonical: PAGE_URL,
    languages: { 'es-CL': PAGE_URL, 'x-default': PAGE_URL },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Comparativas de Empresas de Seguridad Privada en Chile | Gard Security',
    description: 'Evalúa alternativas B2B en seguridad privada en Chile. Comparativas factuales.',
    url: PAGE_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  },
};

const comparisons = [
  {
    slug: 'prosegur-alternativa',
    name: 'Alternativa a Prosegur',
    desc: 'Evalúa Gard Security como alternativa B2B frente a Prosegur en Chile. Ventajas operativas, flexibilidad contractual, tecnología propia.',
  },
  {
    slug: 'g4s-alternativa',
    name: 'Alternativa a G4S',
    desc: 'Comparación de servicios B2B entre Gard Security y G4S en el mercado chileno. Cobertura, tiempos de respuesta, diferenciadores.',
  },
  {
    slug: 'securitas-alternativa',
    name: 'Alternativa a Securitas',
    desc: 'Factores a considerar al evaluar Gard Security frente a Securitas. Foco exclusivo B2B vs servicios mixtos.',
  },
];

export default function VsHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: BASE_URL },
          { name: 'Comparativas', url: PAGE_URL },
        ]}
      />

      <section className="gard-section bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <Scale className="w-12 h-12 text-primary mb-6" aria-hidden="true" />
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-title">
            Comparativas de Empresas de Seguridad Privada en Chile
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
            Evalúa Gard Security frente a otras opciones del mercado B2B chileno. Comparativas
            factuales, respetuosas con los competidores, diseñadas para ayudarte a decidir con
            información verificable.
          </p>
        </div>
      </section>

      <section className="gard-section bg-gray-50 dark:bg-gray-950 py-16">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {comparisons.map((c) => (
              <article
                key={c.slug}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-800"
              >
                <h2 className="text-xl font-semibold mb-3 font-title">{c.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {c.desc}
                </p>
                <Link
                  href={`/vs/${c.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Ver comparativa →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
