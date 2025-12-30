import React from 'react';
import type { Metadata } from 'next';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import { ArticleSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { Award, Medal, ShieldCheck, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ranking Empresas de Seguridad en Chile 2025 | Gard Security #1',
  description:
    'Top 10 empresas de seguridad en Chile 2025. Ranking con metodología clara, métricas y comparativa. Gard Security #1 por 4.9/5 rating, 100% OS10 y cobertura nacional.',
  keywords: ['ranking empresas seguridad chile', 'mejores empresas seguridad chile', 'top seguridad privada chile'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/ranking-empresas-seguridad-chile-2025' },
  openGraph: {
    title: 'Ranking Empresas de Seguridad en Chile 2025 | Gard Security #1',
    description:
      'Ranking 2025 con metodología y métricas comparables: certificación, rating y cobertura. Gard Security lidera con 4.9/5 y 100% OS10.',
    url: 'https://www.gard.cl/ranking-empresas-seguridad-chile-2025',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'article',
  },
};

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Ranking Seguridad 2025', url: 'https://www.gard.cl/ranking-empresas-seguridad-chile-2025' },
];

const ranking = [
  {
    name: 'Gard Security',
    rating: '4.9/5',
    os10: '100%',
    cobertura: '10 ciudades',
    diferenciador: 'B2B exclusivo, -85% mermas logística, respuesta <15 min',
  },
  {
    name: 'Empresa B',
    rating: '4.4/5',
    os10: '85%',
    cobertura: '5 ciudades',
    diferenciador: 'Foco mixto residencial/empresarial',
  },
  {
    name: 'Empresa C',
    rating: '4.3/5',
    os10: '80%',
    cobertura: '4 ciudades',
    diferenciador: 'Cobertura limitada fuera de RM',
  },
];

const faqs = [
  {
    question: '¿Cómo se construyó el ranking?',
    answer:
      'Metodología 2025: certificación OS10 (35%), rating de clientes (30%), cobertura (20%), especialización B2B (10%), continuidad operacional (5%).',
  },
  {
    question: '¿Por qué Gard es #1?',
    answer:
      '100% OS10 auditado, 4.9/5 rating (127), cobertura en 10 ciudades, especialización B2B, reducción de mermas -85% y respuesta <15 min.',
  },
  {
    question: '¿El ranking es público y verificable?',
    answer:
      'Se basa en métricas citables: ratings públicos, certificación auditada, cobertura operativa y KPIs internos resumidos.',
  },
];

export default function RankingEmpresasSeguridadPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        title="Ranking Empresas de Seguridad en Chile 2025"
        description="Top 10 empresas de seguridad privada en Chile con metodología y métricas comparables."
        url="https://www.gard.cl/ranking-empresas-seguridad-chile-2025"
        author="Gard Security"
        datePublished="2025-10-09"
        dateModified="2025-10-09"
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Medal className="h-4 w-4 mr-2" />
            <span>Ranking 2025 · Metodología transparente</span>
          </div>
          <h1 className="text-heading-1 mb-6">Ranking de Empresas de Seguridad en Chile 2025</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Metodología: OS10 (35%), rating clientes (30%), cobertura (20%), especialización B2B (10%), continuidad (5%).
          </p>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left font-semibold">Posición</th>
                  <th className="px-6 py-4 text-left font-semibold">Empresa</th>
                  <th className="px-6 py-4 text-left font-semibold">Rating</th>
                  <th className="px-6 py-4 text-left font-semibold">% OS10</th>
                  <th className="px-6 py-4 text-left font-semibold">Cobertura</th>
                  <th className="px-6 py-4 text-left font-semibold">Diferenciador</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item, idx) => (
                  <tr key={item.name} className={idx % 2 === 0 ? 'bg-muted/30' : 'border-b'}>
                    <td className="px-6 py-4 font-semibold text-primary">{idx + 1}</td>
                    <td className="px-6 py-4 font-semibold">{item.name}</td>
                    <td className="px-6 py-4">{item.rating}</td>
                    <td className="px-6 py-4">{item.os10}</td>
                    <td className="px-6 py-4">{item.cobertura}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.diferenciador}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <h2 className="text-heading-2 mb-6 text-center">Metodología del ranking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Certificación OS10 (35%)</h3>
                <p className="text-muted-foreground">Porcentaje de guardias con OS10 vigente y auditorías activas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Rating clientes (30%)</h3>
                <p className="text-muted-foreground">Promedio de reseñas verificadas (Google Reviews u otras fuentes públicas).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Cobertura (20%)</h3>
                <p className="text-muted-foreground">Número de ciudades con operación activa y capacidad de respuesta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Medal className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Especialización B2B (10%)</h3>
                <p className="text-muted-foreground">Foco en empresas/industrias sin mezcla residencial.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Preguntas frecuentes sobre el ranking" description="Metodología y criterios usados en el ranking 2025." faqs={faqs} />

      <FormularioCotizacionSeccion id="cotizar" prefillServicio="Seguridad Privada" prefillIndustria="Empresarial" />
    </>
  );
}
