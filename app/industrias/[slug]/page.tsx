import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, ArrowUpRight, ShieldCheck, Shield, Eye, Factory } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { industriesMetadata } from '../industryMetadata';
import GardHero from '@/components/layouts/GardHero';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

// Interfaces para tipado
interface Challenge {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

interface Client {
  name: string;
  logoId: string;
}

interface Service {
  name: string;
  slug: string;
  description: string;
}

interface Industry {
  slug: string;
  title: string;
  description: string;
  name: string;
  imageId: string;
  videoId?: string;
  subtitle?: string;
  descriptionTitle?: string;
  descriptionParagraphs: string[];
  descriptionImageId?: string;
  challengesDescription?: string;
  challenges: Challenge[];
  statsDescription?: string;
  stats?: Stat[];
  recommendedServices?: Service[];
  clients?: Client[];
}

// Datos de industrias
export async function generateStaticParams() {
  return industriesMetadata.map((industry) => ({
    slug: industry.slug,
  }));
}

// Obtener la industria por slug
const getIndustryBySlug = (slug: string): any => {
  // Buscar por slug en industriesMetadata
  return industriesMetadata.find((industry) => industry.slug === slug);
};

// Formatear número con separador de miles
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
    return {} as Metadata;
  }

  const canonical = `https://www.gard.cl/industrias/${industry.slug}`;

  return {
    title: industry.title,
    description: industry.description,
    robots: 'index, follow',
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: industry.title,
      description: industry.description,
      url: canonical,
      siteName: 'Gard Security',
      type: 'article',
      locale: 'es_CL',
    },
  };
}

export default function IndustriaPage({ params }: { params: { slug: string } }) {
  // Buscar la industria correspondiente por slug
  const industryData = getIndustryBySlug(params.slug);
  
  // Si no existe la industria, mostrar 404
  if (!industryData) {
    return notFound();
  }

  // Extraer propiedades con valores por defecto
  const industry = {
    // Propiedades básicas de SEO que siempre existen
    slug: industryData.slug,
    title: industryData.title,
    description: industryData.description,
    
    // Propiedades para la página que pueden no existir
    name: industryData.name || industryData.title.split('|')[0].trim(),
    imageId: industryData.imageId || '',
    videoId: industryData.videoId,
    subtitle: industryData.subtitle,
    descriptionTitle: industryData.descriptionTitle,
    descriptionParagraphs: industryData.descriptionParagraphs || [],
    descriptionImageId: industryData.descriptionImageId,
    challengesDescription: industryData.challengesDescription,
    challenges: industryData.challenges || [],
    statsDescription: industryData.statsDescription,
    stats: industryData.stats || [],
    recommendedServices: industryData.recommendedServices || [],
    clients: industryData.clients || []
  };

  // Crear un Schema.org JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `Seguridad para ${industry.name}`,
    'description': industry.description,
    'provider': {
      '@type': 'Organization',
      'name': 'Gard Security',
      'url': 'https://www.gard.cl'
    },
    'serviceType': 'Security',
    'audience': {
      '@type': 'BusinessAudience',
      'audienceType': industry.name
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <GardHero 
        title={`Seguridad para ${industry.name}`}
        subtitle={industry.subtitle || `Soluciones de seguridad especializadas para el sector ${industry.name}`}
        ctaTexto="Cotizar para mi empresa"
        ctaHref="#cotizar"
        videoId={industry.videoId}
        imageId={industry.imageId}
        badge={{
          icon: <Factory className="h-4 w-4" />,
          text: `Soluciones para ${industry.name}`
        }}
        overlay={true}
      />

      {/* Descripción de la industria */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-heading-2 mb-6">{industry.descriptionTitle || `Protección para el sector ${industry.name}`}</h2>
              
              <div className="space-y-4 text-body-lg">
                {(industry.descriptionParagraphs || []).map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8">
                <a 
                  href="#cotizar"
                  className="gard-btn gard-btn-primary inline-flex items-center"
                >
                  Solicitar cotización <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <CloudflareImage
                  imageId={industry.descriptionImageId || industry.imageId}
                  alt={`Seguridad para ${industry.name}`}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desafíos de seguridad para esta industria */}
      <section className="gard-section py-16 md:py-24 bg-[#0A0C12] relative">
        <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-10"></div>
        <div className="gard-container max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-heading-2 mb-8 text-center text-white">Desafíos de seguridad en {industry.name}</h2>
          <p className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
            {industry.challengesDescription || `Las empresas del sector ${industry.name} enfrentan riesgos específicos que requieren soluciones de seguridad adaptadas.`}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(industry.challenges || []).map((challenge: Challenge, index: number) => (
              <div 
                key={index} 
                className="bg-[hsl(var(--gard-card))] rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  {challenge.icon === 'ShieldCheck' && <ShieldCheck className="h-10 w-10 text-[hsl(var(--gard-accent))]" />}
                  {challenge.icon === 'Shield' && <Shield className="h-10 w-10 text-[hsl(var(--gard-accent))]" />}
                  {challenge.icon === 'Eye' && <Eye className="h-10 w-10 text-[hsl(var(--gard-accent))]" />}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{challenge.title}</h3>
                <p className="text-gray-300">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas del sector */}
      {industry.stats && industry.stats.length > 0 && (
        <section className="gard-section py-16 md:py-24 bg-[#0A0C12]">
          <div className="gard-container max-w-7xl mx-auto px-4">
            <h2 className="text-heading-2 mb-8 text-center text-white">El sector {industry.name} en cifras</h2>
            <p className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
              {industry.statsDescription || `Entendemos la magnitud e importancia del sector ${industry.name} en la economía chilena.`}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(industry.stats || []).map((stat: Stat, index: number) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-[hsl(var(--gard-card))] rounded-xl border border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[hsl(var(--gard-accent))] mb-2">
                    {stat.prefix || ''}{formatNumber(stat.value)}{stat.suffix || ''}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Servicios recomendados para esta industria */}
      <section className="gard-section py-16 md:py-24 bg-[#0A0C12] relative">
        <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-10"></div>
        <div className="gard-container max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-heading-2 mb-6 text-center text-white">Servicios recomendados para {industry.name}</h2>
          <p className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
            Nuestras soluciones están adaptadas a los desafíos específicos de su industria
          </p>
          
          {/* Lista de servicios recomendados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(industry.recommendedServices || []).map((servicio: Service, index: number) => (
              <Link 
                key={index}
                href={`/servicios/${servicio.slug}`}
                className="bg-[hsl(var(--gard-card))] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-[hsl(var(--gard-accent))] mr-3" />
                  <h3 className="text-xl font-semibold text-white">{servicio.name}</h3>
                </div>
                <p className="text-body-base text-gray-300 mb-4 flex-grow">
                  {servicio.description}
                </p>
                <div className="flex justify-end mt-auto">
                  <span className="inline-flex items-center text-[hsl(var(--gard-accent))] font-medium">
                    Ver servicio <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Clientes de esta industria */}
      {industry.clients && industry.clients.length > 0 && (
        <section className="gard-section py-16 md:py-24 bg-[#0A0C12]">
          <div className="gard-container max-w-7xl mx-auto px-4">
            <h2 className="text-heading-2 mb-8 text-center text-white">Empresas que confían en nosotros</h2>
            <p className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
              Estas son algunas de las organizaciones del sector {industry.name} que protegemos
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {(industry.clients || []).map((client: Client, index: number) => (
                <div key={index} className="flex justify-center p-4">
                  <div className="relative h-20 w-full grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                    <CloudflareImage
                      imageId={client.logoId}
                      alt={client.name}
                      fill
                      objectFit="contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulario de cotización */}
      <FormularioCotizacionSeccion 
        prefillIndustria={industry.name} 
        className="bg-[#0A0C12]"
      />
    </>
  );
} 