import { Star, Users } from 'lucide-react';
import { companyStats } from '@/lib/data/company-stats';

type SocialProofStatsSectionProps = {
  title: string;
  subtitle: string;
};

/**
 * Métricas verificables de empresa (GMB, OS10, continuidad, experiencia).
 * Sin testimonios inventados ni casos sin consentimiento.
 */
export default function SocialProofStatsSection({
  title,
  subtitle,
}: SocialProofStatsSectionProps) {
  return (
    <section className="gard-section py-12 md:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="gard-container max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-heading-3 mb-2 font-title">{title}</h2>
          <p className="text-body-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <article className="bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-2">
              <Star className="h-5 w-5 fill-primary" aria-hidden="true" />
              <span className="text-2xl font-bold font-title">{companyStats.gmbRatingValue}</span>
              <span className="text-sm text-muted-foreground">/ {companyStats.gmbBestRating}</span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">Google Business</p>
            <p className="text-xs text-muted-foreground mb-2">
              {companyStats.gmbReviewCount} reseñas verificadas
            </p>
            <a
              href={companyStats.gmbShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline hover:no-underline"
            >
              Ver perfil público
            </a>
          </article>
          <article className="bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-primary mb-2 font-title">
              {companyStats.os10CertifiedPct}%
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">OS10 vigente</p>
            <p className="text-xs text-muted-foreground">Auditoría mensual del plantel</p>
          </article>
          <article className="bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-primary mb-2 font-title">
              {companyStats.operationalContinuityPct}%
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">Continuidad</p>
            <p className="text-xs text-muted-foreground">Turnos cubiertos vs contratados</p>
          </article>
          <article className="bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              +{companyStats.leadershipYearsExperience} años
            </p>
            <p className="text-xs text-muted-foreground">
              Experiencia del equipo en seguridad privada B2B
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
