import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Briefcase } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { companyStats } from '@/lib/data/company-stats';

const OG_IMAGE_URL = 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/4824f8b9-abb0-4e77-c654-efe920697b00/public';

const yearsOfExperience = companyStats.leadershipYearsExperience;

const HOME_DESCRIPTION = `Empresa de guardias de seguridad para empresas: certificados OS10, monitoreo 24/7 y tecnología propia. ${yearsOfExperience}+ años protegiendo operaciones en todo Chile. Cotiza en 12 horas.`;

export const metadata: Metadata = {
  title: 'Empresa de Guardias de Seguridad Privada en Chile | Gard Security',
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: 'https://www.gard.cl',
    languages: {
      'es-CL': 'https://www.gard.cl',
      'x-default': 'https://www.gard.cl',
    },
  },
  openGraph: {
    title: 'Empresa de Guardias de Seguridad Privada en Chile | Gard Security',
    description: HOME_DESCRIPTION,
    url: 'https://www.gard.cl',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Gard Security — Empresa de Seguridad Privada en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empresa de Guardias de Seguridad Privada en Chile | Gard Security',
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};
import { 
  ArrowRight, 
  Shield, 
  Eye, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  Star,
  Calendar,
  Activity,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Componentes críticos (above the fold) - importación directa
import GardHero from '@/components/layouts/GardHero';
import OurServices from '@/app/components/OurServices';

// Componentes lazy loaded (below the fold) - optimización de performance
// Next.js 15: Removido ssr: false, los dynamic imports funcionan correctamente en Server Components
const FaqSection = dynamic(() => import('@/components/FaqSection/FaqSection'), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

const ClientCarousel = dynamic(() => import('@/app/components/home/ClientCarousel'), {
  loading: () => <div className="h-32 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

const IndustriasGridPage = dynamic(() => import('./components/IndustriasGridPage'), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

const ServiciosBuscador = dynamic(() => import('./components/home/ServiciosBuscador'), {
  loading: () => <div className="h-64 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

const FormularioCotizacionSeccion = dynamic(() => import('./components/FormularioCotizacionSeccion'), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

const OpaiHomepageSection = dynamic(() => import('@/components/landing/OpaiHomepageSection'), {
  loading: () => <div className="h-[500px] bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl" />
});

export default function Home() {
  return (
    <>
      {/* Hero principal */}
      <GardHero
        title="Empresa de Guardias de Seguridad Privada en Chile · OS10 y Cobertura Nacional 24/7"
        subtitle="Protegemos empresas en todo Chile con guardias certificados OS10, monitoreo 24/7 y tecnología propia."
        ctaTexto="Cotizar Ahora"
        ctaHref="#cotizar"
        videoId="ac93b4a10e87873748171425b9f8066d"
        imageId={cloudflareImages.hero.home}
        variant="home"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Guardias de Seguridad Certificados OS10"
        }}
      />

      {/* Buscador de servicios */}
      <ServiciosBuscador />

      {/* Servicios destacados */}
      <OurServices />

      {/* Clientes que confían en nosotros */}
      <ClientCarousel />

      {/* Información corporativa */}
      <section className="gard-section-md bg-[hsl(var(--gard-background))] text-foreground dark:text-white">
        <div className="gard-container">
          <div className="gard-grid-2 items-center gap-12">
            <div>
              <h2 className="text-heading-2 mb-6">Por qué elegir Gard Security</h2>
              <p className="text-body-lg mb-8">
                Con más de {yearsOfExperience} años de experiencia protegiendo empresas líderes en Chile, ofrecemos soluciones de seguridad probadas y personalizadas según sus necesidades específicas.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Equipo de expertos</h3>
                    <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">
                      Profesionales certificados con amplia experiencia en seguridad empresarial.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Tecnología avanzada</h3>
                    <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">
                      Utilizamos las últimas innovaciones en seguridad física y digital.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Soporte 24/7</h3>
                    <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">
                      Asistencia continua y tiempo de respuesta garantizado ante incidentes.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Button asChild variant="default" size="lg">
                  <Link href="/sobre-nosotros">
                    Conocer más sobre nosotros
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <CloudflareImage
                imageId="57d32c87-0757-48e9-747f-2f7e66737100"
                alt="Equipo de guardias de seguridad Gard Security certificados OS10 en edificio corporativo en Santiago, Chile"
                fill
                objectFit="cover"
                className="shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]"
              />
              <div className="absolute inset-0 bg-black/15 z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="gard-section bg-[radial-gradient(circle_at_center,hsl(var(--gard-background)),hsl(var(--gard-card)))] text-foreground dark:text-white relative overflow-hidden" aria-label="Estadísticas de la empresa">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-5 gard-pattern-dots"></div>
        
        <div className="gard-container text-center relative z-10">
          <h2 className="text-heading-2 mb-12">Nuestro impacto en números</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Star className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">{companyStats.gmbRatingValue}</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Rating en Google · {companyStats.gmbReviewCount} reseñas</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Calendar className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">{yearsOfExperience}</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Años de experiencia del equipo</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Activity className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">{companyStats.activeGuards}</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Guardias activos certificados OS10</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Headphones className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">24/7</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Central operativa</p>
            </div>
          </div>
        </div>
      </section>

      {/* OPAI · ERP propio de Gard Security */}
      <OpaiHomepageSection />

      {/* Industrias que protegemos */}
      <section className="gard-section">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-8">Industrias que protegemos</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Ofrecemos soluciones de seguridad personalizadas para diversos sectores económicos.
          </p>
          
          <IndustriasGridPage />
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <FaqSection />

      {/* Formulario de cotización */}
      <FormularioCotizacionSeccion />

      {/* CTA dirigido a postulantes guardia (captación) — prominente en mobile, sutil en desktop */}
      <section
        id="trabaja-con-nosotros-home"
        aria-labelledby="trabaja-cta-home-title"
        className="py-10 md:py-14 bg-gradient-to-b from-[hsl(var(--gard-card))] to-[hsl(var(--gard-background))] border-t border-[hsl(var(--gard-border))]"
      >
        <div className="gard-container">
          <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(var(--gard-accent))] mb-3">
            Para postulantes guardia
          </p>

          <Link
            href="/reclutamiento?via=home_cta&utm_source=home&utm_medium=cta_footer"
            className="block max-w-3xl mx-auto group"
          >
            <div className="rounded-2xl bg-gradient-to-br from-[hsl(var(--gard-accent))]/25 via-[hsl(var(--gard-accent))]/15 to-[hsl(var(--gard-accent))]/5 md:from-[hsl(var(--gard-accent))]/15 md:via-[hsl(var(--gard-accent))]/8 md:to-transparent border-2 border-[hsl(var(--gard-accent))]/40 md:border md:border-[hsl(var(--gard-accent))]/20 shadow-lg md:shadow-md p-6 md:p-7 flex flex-col md:flex-row items-center gap-5 md:gap-6 transition-all group-hover:shadow-xl group-hover:border-[hsl(var(--gard-accent))]/60 group-hover:scale-[1.01]">
              <div className="flex items-center justify-center w-20 h-20 md:w-16 md:h-16 rounded-full bg-[hsl(var(--gard-accent))] text-white flex-shrink-0 shadow-md">
                <Briefcase className="h-10 w-10 md:h-7 md:w-7" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2
                  id="trabaja-cta-home-title"
                  className="text-2xl md:text-xl font-bold mb-2 md:mb-1"
                >
                  ¿Buscas trabajo como guardia?
                </h2>
                <p className="text-base md:text-base text-[hsl(var(--gard-foreground))]/80 leading-snug">
                  Postula en menos de un minuto. Te llamamos por WhatsApp.
                </p>
              </div>
              <span className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-14 md:h-12 px-8 md:px-6 rounded-full bg-[hsl(var(--gard-accent))] text-white text-base md:text-sm font-bold whitespace-nowrap shadow-lg group-hover:bg-[hsl(var(--gard-accent))]/90">
                Postula aquí
                <ArrowRight className="h-5 w-5 md:h-4 md:w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
} 