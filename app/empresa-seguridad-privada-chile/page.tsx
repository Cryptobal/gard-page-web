import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Building2, MapPin, Scale } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import ConversionHeroCtas from '@/components/conversion/ConversionHeroCtas';
import SocialProofStatsSection from '@/components/conversion/SocialProofStatsSection';
import PricingFactorsSection from '@/components/conversion/PricingFactorsSection';
import ConversionFinalCta from '@/components/conversion/ConversionFinalCta';
import InternalLinksSection from '@/components/conversion/InternalLinksSection';
import { empresaSeguridadPrivadaChileCopy } from '@/lib/data/money-page-copy';
import { companyStats } from '@/lib/data/company-stats';

const CANONICAL_URL = 'https://www.gard.cl/empresa-seguridad-privada-chile';

export const metadata: Metadata = {
  title: 'Empresa de Seguridad Privada en Chile para Empresas | Gard Security',
  description: `Empresa de seguridad privada B2B en Chile: ${companyStats.os10CertifiedPct}% guardias OS10, cobertura en ${companyStats.citiesCovered} ciudades, central 24/7 y cotización en ${companyStats.commercialResponseSla}. Sin rankings inventados — datos verificables.`,
  keywords: [
    'empresa de seguridad privada',
    'seguridad privada chile',
    'guardias certificados OS10',
    'seguridad empresas',
    'empresa de seguridad corporativa',
    'contratar empresa de seguridad chile',
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      'es-CL': CANONICAL_URL,
      'x-default': CANONICAL_URL,
    },
  },
  openGraph: {
    title: 'Empresa de Seguridad Privada en Chile para Empresas | Gard Security',
    description: `Seguridad privada B2B: OS10 auditado, ${companyStats.citiesCovered} ciudades, central 24/7. Cotización en ${companyStats.commercialResponseSla}.`,
    url: CANONICAL_URL,
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'article',
    images: [
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/2c554c0e-8f87-4f58-1ad5-29cbe6360600/public',
        width: 1200,
        height: 630,
        alt: 'Equipo de seguridad privada de Gard Security en operación',
      },
    ],
  },
};

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Empresa de Seguridad Privada', url: CANONICAL_URL },
];

const CIUDADES = [
  { nombre: 'Santiago', href: '/santiago/guardias-de-seguridad' },
  { nombre: 'Antofagasta', href: '/antofagasta/guardias-de-seguridad' },
  { nombre: 'Valparaíso', href: '/valparaiso/guardias-de-seguridad' },
  { nombre: 'Concepción', href: '/concepcion/guardias-de-seguridad' },
] as const;

export default function EmpresaSeguridadPrivadaPage() {
  const copy = empresaSeguridadPrivadaChileCopy;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Empresa de Seguridad Privada para Empresas en Chile"
        description={copy.introParagraph.slice(0, 300)}
        url={CANONICAL_URL}
        areaServed="Chile"
        aggregateRating={{
          ratingValue: companyStats.gmbRatingValue,
          reviewCount: companyStats.gmbReviewCount,
        }}
        offers={{
          availability: 'https://schema.org/InStock',
          priceCurrency: 'CLP',
          priceDescription: 'Cotización personalizada según dimensionamiento del sitio',
          url: 'https://www.gard.cl/cotizar',
        }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-hero relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="4613e018-4925-4fb0-1fee-ed8ede43cd00"
            alt="Empresa de seguridad privada Gard Security — guardias certificados OS10 en Chile"
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

      <SocialProofStatsSection
        title={copy.socialProofTitle}
        subtitle={copy.socialProofSubtitle}
      />

      <section id="por-que-gard" className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">{copy.procesosTitle}</h2>
              <p className="text-body-lg text-muted-foreground">{copy.procesosSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.procesos.map((item) => (
              <article
                key={item.titulo}
                className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 font-title">
                  {item.titulo}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-heading-2 mb-2 font-title">
                Cobertura en {companyStats.citiesCovered} ciudades de Chile
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Operación regional con páginas locales verificadas donde hay copy operativo
                detallado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {CIUDADES.map((ciudad) => (
              <Link
                key={ciudad.href}
                href={ciudad.href}
                className="bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all text-center"
              >
                <Building2 className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
                <span className="font-semibold text-foreground">{ciudad.nombre}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            También operamos en Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar.{' '}
            <Link href="/ciudades" className="text-primary underline hover:no-underline">
              Ver mapa de ciudades
            </Link>
          </p>
        </div>
      </section>

      <PricingFactorsSection title={copy.pricingTitle} subtitle={copy.pricingSubtitle} />

      <FAQSection
        title="Preguntas frecuentes sobre empresas de seguridad privada en Chile"
        description="Criterios de contratación, cobertura y servicios Gard — sin claims de ranking."
        faqs={copy.faq.map((f) => ({ question: f.pregunta, answer: f.respuesta }))}
      />

      <FAQSection
        title="Resolvemos sus dudas antes de cotizar"
        description="Comparación con grandes proveedores, subcontratación, contacto comercial y precios."
        faqs={copy.faqObjeciones.map((f) => ({ question: f.pregunta, answer: f.respuesta }))}
      />

      <InternalLinksSection
        title="Recursos relacionados"
        description="Servicios, ciudades, cotización y guía de costos para evaluar a Gard."
        links={copy.enlacesInternos}
      />

      <ConversionFinalCta
        title={copy.finalCtaTitle}
        description={copy.finalCtaDescription}
        whatsAppPrefill={copy.whatsAppPrefill}
      />

      <FormularioCotizacionSeccion
        id="cotizar"
        prefillServicio="Seguridad Privada"
        prefillIndustria="Empresarial"
      />
    </>
  );
}
