import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight, CheckCircle, Shield, BarChart3, TrendingUp, LightbulbIcon } from 'lucide-react';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import { servicios } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import { getServicioIndustriaData } from '@/app/data/servicios-por-industria';
import LinkParamsAware from '@/app/components/LinkParamsAware';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';

// Next.js 15: params es ahora una Promise
type PageProps = {
  params: Promise<{
    slug: string;
    industria: string;
  }>;
};

// Función para normalizar nombres a slugs
function normalizeName(name: string): string {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const servicio = servicios.find(s => normalizeName(s.name) === resolvedParams.slug);
  const industry = industries.find(i => normalizeName(i.name) === resolvedParams.industria);
  
  if (!servicio || !industry) {
    return {
      title: 'Servicio no encontrado',
      description: 'La combinación de servicio e industria que busca no está disponible.',
    };
  }
  
  return {
    title: `${servicio.name} para ${industry.name} | Gard Security`,
    description: `Servicio de ${servicio.name.toLowerCase()} especializado para el sector ${industry.name}. Soluciones de seguridad adaptadas a las necesidades específicas de esta industria.`,
    keywords: [
      `${servicio.name.toLowerCase()} para ${industry.name}`,
      `seguridad en ${industry.name}`,
      `${servicio.name.toLowerCase()} ${resolvedParams.industria}`,
      'seguridad especializada',
      'servicios de protección',
      `empresa de seguridad para ${industry.name}`
    ]
  };
}

export default async function ServicioIndustriaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const servicio = servicios.find(s => normalizeName(s.name) === resolvedParams.slug);
  const industry = industries.find(i => normalizeName(i.name) === resolvedParams.industria);
  
  if (!servicio || !industry) {
    return (
      <div className="gard-container py-24 text-center">
        <h1 className="text-heading-2 mb-6">Servicio no encontrado</h1>
        <p className="text-body-lg mb-8">La combinación de servicio e industria que busca no está disponible.</p>
        <Link href="/servicios" className="gard-btn gard-btn-primary">
          Ver todos los servicios
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }
  
  // Obtener datos específicos para esta combinación de servicio e industria
  const servicioIndustriaData = getServicioIndustriaData(resolvedParams.slug, resolvedParams.industria);
  
  // Obtener slugs normalizados para pasar a los componentes
  const servicioSlug = normalizeName(servicio.name);
  const industriaSlug = normalizeName(industry.name);
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId={industry.imageId}
            alt={`${servicio.name} para ${industry.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            {servicio.name} para {industry.name}
          </h1>
          <p className="text-white text-xl max-w-2xl mb-8">
            Soluciones de {servicio.name.toLowerCase()} especializadas para el sector {industry.name}
          </p>
          <LinkParamsAware 
            href="/cotizar" 
            className="gard-btn gard-btn-primary gard-btn-lg"
            serviceName={servicio.name}
            serviceSlug={servicioSlug}
            industryName={industry.name}
            industrySlug={industriaSlug}
          >
            Solicitar cotización
            <ArrowRight className="ml-2 h-5 w-5" />
          </LinkParamsAware>
        </div>
      </section>

      {/* Sección de descripción específica */}
      <section className="gard-section bg-[#0A0C12] relative">
        <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-10"></div>
        <div className="gard-container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-heading-2 mb-6 text-white">{servicio.name} especializado para {industry.name}</h2>
            <p className="text-body-lg text-gray-300 mb-12">
              {servicioIndustriaData.description || `Nuestro servicio de ${servicio.name.toLowerCase()} para el sector ${industry.name} combina nuestra experiencia en seguridad con un profundo conocimiento de los desafíos específicos de esta industria.`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2 text-white">Especialización sectorial</h3>
                    <p className="text-gray-300">
                      Nuestro personal cuenta con capacitación específica sobre los protocolos y procesos 
                      de seguridad propios del sector {industry.name}, garantizando un servicio adaptado a 
                      sus necesidades particulares.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2 text-white">Cumplimiento normativo</h3>
                    <p className="text-gray-300">
                      Aseguramos el cumplimiento de todas las regulaciones y estándares específicos del 
                      sector {industry.name}, manteniendo su operación conforme y segura en todo momento.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2 text-white">Respuesta personalizada</h3>
                    <p className="text-gray-300">
                      Diseñamos protocolos de {servicio.name.toLowerCase()} específicos para los riesgos 
                      y vulnerabilidades habituales en {industry.name}, garantizando una cobertura integral 
                      y eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-heading-4 mb-4 text-white">Soluciones que ofrecemos</h3>
              
              <div className="bg-[hsl(var(--gard-card))] p-6 rounded-xl flex-grow border border-gray-700">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-gray-300">
                      {servicioIndustriaData.soluciones?.[0] || `Personal especializado con capacitación específica en los procesos y riesgos del sector ${industry.name}.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-gray-300">
                      {servicioIndustriaData.soluciones?.[1] || `Tecnologías y procedimientos diseñados específicamente para abordar los desafíos de seguridad en ${industry.name}.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-gray-300">
                      {servicioIndustriaData.soluciones?.[2] || `Evaluaciones continuas y planes de mejora adaptados a la evolución de las amenazas en el sector ${industry.name}.`}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios principales */}
      <section className="gard-section bg-[#0A0C12]">
        <div className="gard-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <h2 className="text-heading-2 mb-6 text-white">Beneficios para su empresa</h2>
              
              <div className="space-y-4">
                {servicioIndustriaData.beneficios ? 
                  servicioIndustriaData.beneficios.map((beneficio: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3">
                        <ArrowRight className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                      </div>
                      <p className="text-gray-300">{beneficio}</p>
                    </div>
                  )) : (
                    <>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <ArrowRight className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                        </div>
                        <p className="text-gray-300">Reducción significativa de incidentes de seguridad específicos del sector {industry.name}.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <ArrowRight className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                        </div>
                        <p className="text-gray-300">Cumplimiento garantizado de normativas y regulaciones sectoriales.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <ArrowRight className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                        </div>
                        <p className="text-gray-300">Optimización de costos al adaptar los servicios exactamente a sus necesidades.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <ArrowRight className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                        </div>
                        <p className="text-gray-300">Mayor tranquilidad para su equipo, clientes y stakeholders.</p>
                      </div>
                    </>
                  )}
              </div>
              
              <div className="mt-8">
                <a 
                  href="#cotizar"
                  className="gard-btn gard-btn-primary inline-flex items-center"
                >
                  Solicitar información <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <CloudflareImage
                  imageId={servicioIndustriaData.featuredImageId || industry.imageId}
                  alt={`${servicio.name} para ${industry.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="gard-section bg-[#0A0C12] relative">
        <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-10"></div>
        <div className="gard-container relative z-10">
          <h2 className="text-heading-2 mb-6 text-center text-white">Experiencia comprobada en {industry.name}</h2>
          <p className="text-body-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Empresas líderes en el sector {industry.name} confían en nuestras soluciones de {servicio.name.toLowerCase()}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--gard-card))] p-6 rounded-xl shadow-sm border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-300 text-xl font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-heading-5 text-white">Caso de estudio: Protección integral</h3>
                  <p className="text-sm text-gray-400">Empresa líder en {industry.name}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                {servicioIndustriaData.casoExito || `Implementamos un sistema completo de ${servicio.name.toLowerCase()} para una empresa líder del sector ${industry.name}, logrando reducir los incidentes de seguridad en un 65% y optimizando los costos operativos relacionados con la seguridad.`}
              </p>
              <div className="flex justify-end">
                <Link href="/contacto" className="text-[hsl(var(--gard-accent))] hover:underline text-sm flex items-center">
                  Solicitar información detallada
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-[hsl(var(--gard-card))] p-6 rounded-xl shadow-sm border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-300 text-xl font-bold">T</span>
                </div>
                <div>
                  <h3 className="text-heading-5 text-white">Testimonios de clientes</h3>
                  <p className="text-sm text-gray-400">La opinión de quienes confían en nosotros</p>
                </div>
              </div>
              
              <blockquote className="border-l-4 border-[hsl(var(--gard-accent))] pl-4 italic mb-4">
                <p className="text-gray-300 mb-2">
                  {servicioIndustriaData.testimonio || `"El servicio de ${servicio.name.toLowerCase()} que Gard Security ha implementado en nuestras instalaciones ha superado todas nuestras expectativas. Su conocimiento del sector ${industry.name} fue clave para adaptar perfectamente la solución a nuestras necesidades específicas."`}
                </p>
                <footer className="text-sm text-gray-400">
                  - Director de Operaciones, empresa líder en {industry.name}
                </footer>
              </blockquote>
              
              <div className="flex justify-end">
                <Link href="/testimonios" className="text-[hsl(var(--gard-accent))] hover:underline text-sm flex items-center">
                  Ver más testimonios
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Preguntas frecuentes */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Preguntas frecuentes</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Cómo se adapta este servicio específicamente al sector {industry.name}?</h3>
              <p className="text-muted-foreground">
                Nuestro enfoque comienza con una evaluación exhaustiva de las necesidades, riesgos y 
                requisitos específicos de su operación en el sector {industry.name}. A partir de este 
                análisis, diseñamos una solución de {servicio.name.toLowerCase()} que se integra 
                perfectamente con sus procesos existentes y aborda los desafíos particulares de su industria. 
                Esto incluye personal capacitado específicamente en el sector, tecnologías adaptadas y 
                procedimientos alineados con las mejores prácticas de {industry.name}.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Qué formación específica tiene su personal para el sector {industry.name}?</h3>
              <p className="text-muted-foreground">
                Todo nuestro personal asignado a servicios de {servicio.name.toLowerCase()} en el sector 
                {industry.name} recibe capacitación especializada que incluye: conocimiento profundo de los 
                procesos operativos de la industria, familiarización con los requisitos regulatorios específicos, 
                entrenamiento en protocolos de seguridad propios del sector, y formación en gestión de 
                riesgos particulares de {industry.name}. Además, realizamos actualizaciones periódicas para 
                mantenerlos al día con la evolución del sector.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Cuál es el tiempo de implementación para este servicio?</h3>
              <p className="text-muted-foreground">
                El tiempo de implementación de nuestro servicio de {servicio.name.toLowerCase()} para el sector 
                {industry.name} varía según la complejidad y escala de su operación. Típicamente, podemos 
                completar una implementación básica en 2-4 semanas, mientras que soluciones más complejas pueden 
                requerir 4-8 semanas. Nuestro enfoque incluye una fase de transición gradual para minimizar 
                cualquier interrupción en sus operaciones cotidianas, garantizando una integración fluida de 
                nuestros servicios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <CtaFinal 
        title={`Proteja su operación de ${industry.name} con nuestro servicio especializado`}
        description={`Solicite hoy mismo una evaluación personalizada de sus necesidades de ${servicio.name.toLowerCase()} para el sector ${industry.name}.`}
        ctaLabel="Solicitar cotización"
        ctaHref="#cotizar"
        variant="soft"
      />
      
      {/* Formulario de cotización */}
      <FormularioCotizacionSeccion 
        prefillServicio={servicio.name}
        prefillIndustria={industry.name}
        className="bg-[#0A0C12]"
      />
    </main>
  );
} 