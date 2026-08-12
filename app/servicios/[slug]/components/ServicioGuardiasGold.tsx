import Link from 'next/link';
import {
  Shield,
  Building2,
  CheckCircle,
  BarChart3,
  ClipboardList,
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import GuardiasEnAccion from '@/components/secciones/GuardiasEnAccion';
import ConversionHeroCtas from '@/components/conversion/ConversionHeroCtas';
import SocialProofStatsSection from '@/components/conversion/SocialProofStatsSection';
import PricingFactorsSection from '@/components/conversion/PricingFactorsSection';
import ConversionFinalCta from '@/components/conversion/ConversionFinalCta';
import InternalLinksSection from '@/components/conversion/InternalLinksSection';
import { guardiasDeSeguridadNationalCopy } from '@/lib/data/money-page-copy';
import { companyStats } from '@/lib/data/company-stats';

const HERO_IMAGE_ID = '4613e018-4925-4fb0-1fee-ed8ede43cd00';
const CANONICAL_URL = 'https://www.gard.cl/servicios/guardias-de-seguridad';
const SERVICIO_NOMBRE = 'Guardias de Seguridad';

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Servicios', url: 'https://www.gard.cl/servicios' },
  { name: SERVICIO_NOMBRE, url: CANONICAL_URL },
];

const INDUSTRIAS = [
  {
    nombre: 'Logística y centros de distribución',
    descripcion:
      'Control de accesos, carga/descarga y rondas perimetrales en bodegas de alto flujo. Protocolos para reducir mermas y registrar visitantes.',
  },
  {
    nombre: 'Minería e industria extractiva',
    descripcion:
      'Faenas y recintos industriales con rotación de contratistas, credenciales OS10 y coordinación con mandantes en regiones norte y centro.',
  },
  {
    nombre: 'Edificios corporativos y retail',
    descripcion:
      'Recepción, control peatonal y presencia disuasoria en horarios comerciales o 24/7 según evaluación de riesgo del activo.',
  },
] as const;

const KPIS = [
  {
    label: 'Guardias activos',
    value: String(companyStats.activeGuards),
    detail: 'Dotación operativa directa, sin subcontratación de vigilancia',
  },
  {
    label: 'Tiempo de respuesta promedio',
    value: `${companyStats.avgIncidentResponseMinutesSantiago} min`,
    detail: 'Zona urbana Santiago, medido sobre contratos activos',
  },
  {
    label: 'Onboarding de sitio nuevo',
    value: `${companyStats.onboardingBusinessDaysSantiago} días hábiles`,
    detail: 'Desde firma de contrato hasta guardia OS10 activo',
  },
  {
    label: 'Certificación OS10',
    value: `${companyStats.os10CertifiedPct}%`,
    detail: 'Auditoría mensual de credenciales del plantel',
  },
] as const;

/**
 * Plantilla de oro para /servicios/guardias-de-seguridad — money page nacional
 * de contratación comercial. Reutiliza bloques compartidos con CiudadServicioGold.
 */
export default function ServicioGuardiasGold() {
  const copy = guardiasDeSeguridadNationalCopy;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={copy.heroH1}
        description={copy.introParagraph.slice(0, 300)}
        url={CANONICAL_URL}
        serviceType={SERVICIO_NOMBRE}
        category="Seguridad Privada"
        areaServed={[{ type: 'Country', name: 'Chile' }]}
        audience={{ audienceType: 'Empresas B2B en Chile' }}
        aggregateRating={{
          ratingValue: companyStats.gmbRatingValue,
          reviewCount: companyStats.gmbReviewCount,
          bestRating: companyStats.gmbBestRating,
        }}
        offers={{
          availability: 'https://schema.org/InStock',
          priceCurrency: 'CLP',
          priceDescription: 'Cotización personalizada según dimensionamiento del sitio',
          url: 'https://www.gard.cl/cotizar',
        }}
      />

      <section className="gard-hero relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId={HERO_IMAGE_ID}
            alt="Guardias de seguridad para empresas en Chile — Gard Security"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-2 text-sm font-medium text-white mb-6">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span>{copy.heroBadge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-title leading-tight">
            {copy.heroH1}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {copy.introParagraph}
          </p>

          <ConversionHeroCtas
            whatsAppPrefill={copy.whatsAppPrefill}
            secondaryAnchor={copy.heroSecondaryAnchor}
          />
        </div>
      </section>

      <div className="gard-container pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <SocialProofStatsSection
        title={copy.socialProofTitle}
        subtitle={copy.socialProofSubtitle}
      />

      <section id="como-operamos" className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">{copy.procesosTitle}</h2>
              <p className="text-body-lg text-muted-foreground">{copy.procesosSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.procesos.map((paso) => (
              <article
                key={paso.titulo}
                className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 font-title">
                  {paso.titulo}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4 font-title">Industrias que atendemos con guardias</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Protocolos distintos por vertical — no plantillas genéricas importadas de otro rubro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDUSTRIAS.map((industria) => (
              <article
                key={industria.nombre}
                className="bg-background rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 font-title">
                  {industria.nombre}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed flex-grow">
                  {industria.descripcion}
                </p>
              </article>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/industrias" className="text-primary underline hover:no-underline">
              Ver todas las industrias →
            </Link>
          </p>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">Indicadores operativos publicados</h2>
              <p className="text-body-lg text-muted-foreground">
                Métricas agregadas auditables internamente — las contrasta en su cotización.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KPIS.map((kpi) => (
              <article
                key={kpi.label}
                className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-title">
                  {kpi.value}
                </div>
                <div className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  {kpi.label}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{kpi.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GuardiasEnAccion />

      <PricingFactorsSection title={copy.pricingTitle} subtitle={copy.pricingSubtitle} />

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-heading-3 mb-3 font-title">Resultados operativos agregados</h2>
            <p className="text-body-base text-muted-foreground mb-6">
              Publicamos casos con nombre de cliente solo con consentimiento escrito. Estos
              indicadores — medidos sobre contratos activos — respaldan la operación nacional:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {KPIS.map((kpi) => (
                <li key={kpi.label} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle
                    className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{kpi.value}</strong> — {kpi.label.toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              ¿Necesita referencias de su industria?{' '}
              <Link href="/cotizar" className="text-primary underline hover:no-underline">
                Solicite cotización
              </Link>{' '}
              y coordinamos una conversación comercial con datos aplicables a su sector.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas frecuentes sobre guardias de seguridad para empresas"
        description="Respuestas verificables sobre contratación, cobertura y operación Gard en Chile."
        faqs={copy.faq.map((f) => ({ question: f.pregunta, answer: f.respuesta }))}
      />

      <FAQSection
        title="Resolvemos sus dudas antes de cotizar"
        description="Subcontratación, reemplazos, OS10, plazos y cobertura nacional."
        faqs={copy.faqObjeciones.map((f) => ({ question: f.pregunta, answer: f.respuesta }))}
      />

      <InternalLinksSection
        title="Recursos relacionados"
        description="Más información para evaluar y contratar guardias en Chile."
        links={copy.enlacesInternos}
      />

      <ConversionFinalCta
        title={copy.finalCtaTitle}
        description={copy.finalCtaDescription}
        whatsAppPrefill={copy.whatsAppPrefill}
      />

      <FormularioCotizacionSeccion id="cotizar" prefillServicio={SERVICIO_NOMBRE} />
    </>
  );
}
