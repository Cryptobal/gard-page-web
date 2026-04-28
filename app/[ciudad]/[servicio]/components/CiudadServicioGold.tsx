import Link from 'next/link';
import {
  Shield,
  MapPin,
  Building2,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { servicesMetadata } from '@/app/servicios/serviceMetadata';
import { getCiudadBySlug } from '@/lib/data/ciudad-data';
import { getCiudadDataset } from '@/lib/data/ciudades-dataset';
import type { ServicioCiudadCopy } from '@/lib/data/servicio-ciudad-copy';
import { companyStats } from '@/lib/data/company-stats';

const HERO_IMAGE_ID = '77e4d99e-a497-44ad-6c70-88cc1d7f2e00';

type CiudadServicioGoldProps = {
  copy: ServicioCiudadCopy;
};

/**
 * Render de la "plantilla de oro" para una combinación ciudad × servicio con
 * copy verificado. Consume `servicio-ciudad-copy.ts`, `ciudades-dataset.ts` y
 * `companyStats` — todos validados por `pnpm run validate-ciudad` antes de
 * merge. Se renderiza como server component (zero JS en cliente más allá de
 * los necesarios para CotizacionForm e interacciones específicas).
 *
 * Reemplaza el template doorway genérico para combinaciones donde
 * `hasVerifiedCopy(ciudad, servicio)` retorna true.
 */
export default function CiudadServicioGold({ copy }: CiudadServicioGoldProps) {
  const ciudadData = getCiudadBySlug(copy.ciudad);
  const dataset = getCiudadDataset(copy.ciudad);
  const servicio = servicesMetadata.find((s) => s.slug === copy.servicio);
  const ciudadNombre = ciudadData?.nombre ?? copy.ciudad;
  const servicioNombre = servicio?.title.split('|')[0].trim() ?? copy.servicio;
  const canonicalUrl = `https://www.gard.cl/${copy.ciudad}/${copy.servicio}`;

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://www.gard.cl' },
    { name: 'Ciudades', url: 'https://www.gard.cl/ciudades' },
    { name: ciudadNombre, url: `https://www.gard.cl/${copy.ciudad}` },
    { name: servicioNombre, url: canonicalUrl },
  ];

  const serviceSchemaDescription = copy.introParagraph.slice(0, 300);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={copy.heroH1}
        description={serviceSchemaDescription}
        url={canonicalUrl}
        serviceType={servicioNombre}
        category="Seguridad Privada"
        areaServed={[
          { type: 'City', name: ciudadNombre },
          { type: 'Country', name: 'Chile' },
        ]}
        audience={{ audienceType: 'Empresas B2B en Chile' }}
        aggregateRating={{ ratingValue: companyStats.gmbRatingValue, reviewCount: companyStats.gmbReviewCount, bestRating: companyStats.gmbBestRating }}
        offers={{
          availability: 'https://schema.org/InStock',
          priceCurrency: 'CLP',
          priceDescription: 'Cotización personalizada según dimensionamiento del sitio',
          url: 'https://www.gard.cl/cotizar',
        }}
      />

      {/* Hero */}
      <section className="gard-hero relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId={HERO_IMAGE_ID}
            alt={`${servicioNombre} en ${ciudadNombre}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-2 text-sm font-medium text-white mb-6">
            <Shield className="h-4 w-4" aria-hidden="true" />
            <span>100% Guardias Certificados OS10 · Cobertura {companyStats.citiesCovered} ciudades</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-title leading-tight">
            {copy.heroH1}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {copy.introParagraph}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#cotizar"
              className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center"
            >
              Cotizar {servicioNombre} en {ciudadNombre}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#panorama"
              className="gard-btn bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20 gard-btn-lg inline-flex items-center"
            >
              Ver panorama de seguridad
            </Link>
          </div>
        </div>
      </section>

      {/* Panorama de seguridad */}
      <section id="panorama" className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-5xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">
                Panorama de seguridad en {ciudadNombre}
              </h2>
              <p className="text-sm text-muted-foreground">
                Datos oficiales de la ENUSC 2024 (INE + Subsecretaría de Prevención del Delito).
              </p>
            </div>
          </div>

          <p className="text-body-lg text-foreground/90 leading-relaxed mb-6">
            {copy.panoramaSeguridad}
          </p>

          {dataset?.delitos2024.fuenteUrl && (
            <p className="text-sm text-muted-foreground">
              Fuente:{' '}
              <a
                href={dataset.delitos2024.fuenteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline text-primary"
              >
                Síntesis ENUSC {ciudadData?.region ?? 'regional'} 2024 · INE
              </a>
              {dataset.poblacionFuenteUrl && (
                <>
                  {' '}·{' '}
                  <a
                    href={dataset.poblacionFuenteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline text-primary"
                  >
                    Censo 2024 · INE
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </section>

      {/* Industrias relevantes */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4 font-title">
              Industrias donde operamos en {ciudadNombre}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Las tres verticales con presencia real, cada una con protocolos operacionales
              específicos y no plantillas genéricas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.industriasRelevantes.map((industria) => (
              <article
                key={industria.nombre}
                className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 font-title">
                  {industria.nombre}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed flex-grow">
                  {industria.porQueImporta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas de cobertura */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">
                Zonas de cobertura en {ciudadNombre}
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Despliegue ajustado por tipo de sitio y riesgo real, no plantilla.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.zonasCobertura.map((zona) => (
              <article
                key={zona.nombre}
                className="bg-background rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground font-title">
                    {zona.nombre}
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {zona.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs operativos */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">
                Indicadores operativos en {ciudadNombre}
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Métricas agregadas auditables internamente sobre contratos activos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {copy.kpisOperativos.map((kpi) => (
              <article
                key={kpi.label}
                className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-start"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-title">
                  {kpi.value}
                </div>
                <div className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  {kpi.label}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {kpi.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Caso de estudio (solo si existe) */}
      {copy.casoEstudio && (
        <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="gard-container max-w-5xl mx-auto px-4">
            <div className="flex items-start gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-heading-2 mb-2 font-title">
                  Caso de estudio verificado
                </h2>
                <p className="text-sm text-muted-foreground">
                  Cliente: {copy.casoEstudio.cliente}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-background rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Problema
                </h3>
                <p className="text-base text-foreground leading-relaxed">
                  {copy.casoEstudio.problema}
                </p>
              </article>
              <article className="bg-background rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Solución
                </h3>
                <p className="text-base text-foreground leading-relaxed">
                  {copy.casoEstudio.solucion}
                </p>
              </article>
              <article className="bg-primary/5 border-primary/20 rounded-2xl p-6 shadow-sm border">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
                  Resultado
                </h3>
                <p className="text-base text-foreground leading-relaxed font-medium">
                  {copy.casoEstudio.resultado}
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* FAQ con schema */}
      <FAQSection
        title={`Preguntas frecuentes sobre ${servicioNombre.toLowerCase()} en ${ciudadNombre}`}
        description={`Respuestas verificables sobre cómo opera Gard Security en ${ciudadNombre}.`}
        faqs={copy.faq.map((f) => ({ question: f.pregunta, answer: f.respuesta }))}
      />

      {/* CTA · Cotización */}
      <section className="gard-section py-16 bg-primary text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium mb-6">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>Cotización en menos de 24 horas hábiles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">
            Proteja su operación en {ciudadNombre}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Dotación real de {companyStats.activeGuards} guardias certificados OS10, central de
            monitoreo propia y {companyStats.citiesCovered} ciudades operativas. Cotización cerrada
            sin compromiso.
          </p>
          <Link
            href="#cotizar"
            className="gard-btn bg-white text-primary hover:bg-white/90 gard-btn-lg inline-flex items-center"
          >
            Solicitar cotización <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <FormularioCotizacionSeccion
        id="cotizar"
        prefillServicio={servicioNombre}
      />
    </>
  );
}
