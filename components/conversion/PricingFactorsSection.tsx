import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import { companyStats } from '@/lib/data/company-stats';

const PRICING_FACTORS = [
  {
    title: 'Puestos y turnos',
    body: 'Cantidad de guardias, esquema 12h o 24h y cobertura fines de semana o feriados.',
  },
  {
    title: 'Nivel de riesgo',
    body: 'Tipo de activo, flujo de personas, carga/descarga y protocolos del sitio.',
  },
  {
    title: 'Comuna y zona',
    body: 'Desplazamiento de supervisores, pool de reemplazos y tiempos de respuesta en su sector.',
  },
  {
    title: 'Supervisión y tecnología',
    body: 'Rondas GPS, central 24/7, reportes OPAI y equipamiento adicional si lo requiere.',
  },
] as const;

type PricingFactorsSectionProps = {
  title: string;
  subtitle: string;
};

/** Factores de cotización sin montos CLP inventados. */
export default function PricingFactorsSection({ title, subtitle }: PricingFactorsSectionProps) {
  return (
    <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="gard-container max-w-6xl mx-auto px-4">
        <div className="flex items-start gap-4 mb-10">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-heading-2 mb-2 font-title">{title}</h2>
            <p className="text-body-lg text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {PRICING_FACTORS.map((factor) => (
            <article
              key={factor.title}
              className="bg-background rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 font-title">
                {factor.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{factor.body}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Solicitar cotización cerrada
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/cuanto-cuesta-guardia-seguridad-chile"
            className="gard-btn gard-btn-secondary gard-btn-lg inline-flex items-center"
          >
            Guía de factores de costo
          </Link>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Propuesta comercial en {companyStats.commercialResponseSla}, sin montos de referencia que
          no apliquen a su operación.
        </p>
      </div>
    </section>
  );
}
