import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { 
  ArrowRight, 
  Shield, 
  Eye, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  Users,
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

export default function Home() {
  return (
    <>
      {/* Hero principal */}
      <GardHero 
        title="Seguridad de Clase Mundial para Empresas Exigentes"
        subtitle="Protegemos lo que más importa con soluciones integrales diseñadas para los desafíos de seguridad más complejos."
        ctaTexto="Cotizar Ahora"
        ctaHref="#cotizar"
        videoId="ac93b4a10e87873748171425b9f8066d"
        imageId={cloudflareImages.hero.home}
        variant="home"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Expertos en Seguridad Empresarial"
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
                Con más de 15 años de experiencia protegiendo empresas líderes, ofrecemos soluciones de seguridad probadas y personalizadas según sus necesidades específicas.
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
                imageId="2c554c0e-8f87-4f58-1ad5-29cbe6360600"
                alt="Equipo profesional de Gard Security durante reunión de planificación de seguridad con clientes empresariales"
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
              <Users className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">50+</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Clientes satisfechos</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Calendar className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">8+</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Años de experiencia</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Activity className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">99.9%</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Actividad operativa</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-black/5 dark:border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Headphones className="h-14 w-14 mx-auto mb-4 text-primary dark:text-accent" />
              <div className="text-5xl font-bold mb-3 text-foreground dark:text-white">24/7</div>
              <p className="text-body-base text-muted-foreground dark:text-gray-100">Central operativa</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* CTA final - Eliminado porque ya tenemos el formulario */}
    </>
  );
} 