'use client';

import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight, CheckCircle, Clock, Zap, Shield, Users, Cpu, MonitorSmartphone, HeartHandshake, BookOpen, Bell, Clock4, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import CanonicalUrl from '@/components/seo/CanonicalUrl';
import SEODevPanel from '@/components/seo/SEODevPanel';
import GardHero from '@/components/layouts/GardHero';
import ReviewSchema from '@/components/seo/ReviewSchema';

export default function SobreNosotrosClient() {
  return (
    <>
      {/* Componentes SEO */}
      <CanonicalUrl />
      <SEODevPanel />
      <ReviewSchema
        itemReviewed={{
          name: 'Gard Security - Empresa de Seguridad Privada B2B',
          url: 'https://www.gard.cl/sobre-nosotros',
          type: 'Organization',
          image: 'https://www.gard.cl/logos/gard.svg',
          description: 'Líder B2B en seguridad privada en Chile con 4.9/5 rating y 100% guardias OS10.',
        }}
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127, bestRating: 5, worstRating: 1 }}
        reviews={[
          {
            author: { name: 'Cliente Corporativo', type: 'Person' },
            datePublished: '2025-05-01',
            ratingValue: 5,
            reviewBody: 'Servicio confiable, respuesta <15 minutos y guardias OS10 auditados. Reportes claros y equipos profesionales.',
            name: 'Resultados corporativos',
          },
          {
            author: { name: 'Gerente de Logística', type: 'Person' },
            datePublished: '2025-04-18',
            ratingValue: 5,
            reviewBody: 'Reducción de mermas -85% con control de accesos y supervisión 24/7. Excelente visibilidad operacional.',
            name: 'Logística optimizada',
          },
        ]}
      />
      
      {/* Hero Section */}
      <GardHero 
        title="Somos Gard Security: tu socio en protección empresarial"
        subtitle="Equipo profesional resguardando instalaciones críticas, con tecnología avanzada y equipos altamente capacitados."
        imageId="7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Líderes en Seguridad"
        }}
        overlay={true}
        showCallButton={false}
      />

      {/* Números clave y certificaciones */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-sm text-muted-foreground">127 reseñas verificadas</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <div className="text-4xl font-bold text-primary mb-2">120+</div>
            <p className="text-sm text-muted-foreground">Empresas protegidas</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <div className="text-4xl font-bold text-primary mb-2">10</div>
            <p className="text-sm text-muted-foreground">Ciudades con operación</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">Guardias OS10 auditados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <h3 className="text-heading-4 mb-4">Certificaciones vigentes</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ OS10 (Carabineros de Chile) 100% del personal</li>
              <li>✅ ISO 9001:2015 Gestión de Calidad</li>
              <li>✅ Licencia OS Superintendencia</li>
              <li>✅ Programa Compliance Ley 20.393</li>
              <li>✅ Primeros Auxilios en todo el personal operativo</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <h3 className="text-heading-4 mb-4">Datos operativos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Continuidad operacional: 99.9%</li>
              <li>• Tiempo de respuesta: &lt;15 minutos zonas urbanas</li>
              <li>• Reducción de mermas en logística: hasta -85%</li>
              <li>• Cobertura: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco, Viña del Mar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historia y trayectoria */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-white dark:bg-gradient-to-b dark:from-[hsl(var(--gard-background))] dark:to-[hsl(var(--gard-background)/_0.85)] dark:backdrop-blur-sm">
        <div className="max-w-content-xl">
          <h2 className="text-heading-2 mb-8">Historia y trayectoria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-body-lg mb-6">
                Gard Security nace desde la experiencia real de empresarios del rubro, que entendieron que la seguridad no se trata solo de presencia física, sino de estrategia, eficiencia y tecnología.
              </p>
              <p className="text-body-base mb-6">
                Con más de dos décadas operando en sectores como minería, infraestructura crítica y retail, desarrollamos un modelo operativo robusto, flexible y escalable.
              </p>
              <p className="text-body-base">
                Nuestra historia es la de cientos de empresas que confiaron en nosotros para proteger su negocio y su gente.
              </p>
            </div>
            
            <div className="relative h-[300px] md:h-full rounded-xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10"></div>
              <CloudflareImage
                imageId="7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00"
                alt="Trayectoria de Gard Security"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Timeline de la empresa */}
          <div className="mt-16">
            <h3 className="text-heading-3 mb-8">Nuestra trayectoria</h3>
            <div className="relative border-l-2 border-primary/20 dark:border-[hsl(var(--gard-accent)/_0.3)] pl-8 pb-4 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary dark:bg-[hsl(var(--gard-accent))] rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2018</span>
                  <h4 className="text-heading-4">Fundación</h4>
                </div>
                <p className="text-body-base">Nacimiento de Gard Security como respuesta a la necesidad de seguridad especializada para empresas.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary dark:bg-[hsl(var(--gard-accent))] rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2019</span>
                  <h4 className="text-heading-4">Expansión nacional</h4>
                </div>
                <p className="text-body-base">Ampliación de operaciones a todo el territorio nacional, con foco en industrias críticas.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary dark:bg-[hsl(var(--gard-accent))] rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2020</span>
                  <h4 className="text-heading-4">Integración tecnológica</h4>
                </div>
                <p className="text-body-base">Implementación de plataformas propias de gestión y control de operaciones de seguridad.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary dark:bg-[hsl(var(--gard-accent))] rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2023</span>
                  <h4 className="text-heading-4">Innovación continua</h4>
                </div>
                <p className="text-body-base">Lanzamiento de soluciones de seguridad inteligente con IA y análisis predictivo.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nuestro Compromiso */}
      <section className="bg-gray-50 dark:bg-[#050505] dark:bg-[radial-gradient(circle_at_center,_rgba(15,15,15,0.5)_1px,transparent_1px)] dark:bg-[length:24px_24px] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-content-xl">
            <h2 className="text-heading-2 mb-8">Nuestro compromiso</h2>
            
            <div className="text-xl md:text-2xl font-semibold italic text-primary dark:text-[hsl(var(--gard-accent))] border-l-4 border-primary dark:border-[hsl(var(--gard-accent))] pl-6 py-2 mb-8">
              Creemos que la seguridad es confianza, y la confianza se construye con profesionalismo, tecnología y resultados.
            </div>
            
            <p className="text-body-lg mb-8">
              Nos comprometemos con cada cliente a entregar una solución adaptada a sus riesgos reales, con personal entrenado, supervisión constante y herramientas digitales para control y gestión en tiempo real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
                  <div className="p-2 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)]">
                    <Users className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-heading-4 mb-2">Personal capacitado</h4>
                    <p className="text-body-base text-muted-foreground">
                      Nuestros equipos reciben formación continua, específica para cada sector y cliente.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
                  <div className="p-2 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)]">
                    <Shield className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-heading-4 mb-2">Protección integral</h4>
                    <p className="text-body-base text-muted-foreground">
                      Análisis, prevención y acción coordinada para cada nivel de riesgo.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
                  <div className="p-2 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)]">
                    <Clock className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-heading-4 mb-2">Disponibilidad 24/7</h4>
                    <p className="text-body-base text-muted-foreground">
                      Centro de monitoreo activo las 24 horas, todos los días del año.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
                  <div className="p-2 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)]">
                    <Zap className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-heading-4 mb-2">Respuesta inmediata</h4>
                    <p className="text-body-base text-muted-foreground">
                      Protocolos de acción rápida ante incidentes o situaciones de riesgo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lo que nos diferencia */}
      <section className="py-16 md:py-24 bg-white dark:bg-[linear-gradient(180deg,#080808_0%,#0c0c0c_100%)] dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-[linear-gradient(90deg,rgba(20,20,20,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(20,20,20,0.03)_1px,transparent_1px)] dark:before:bg-[size:20px_20px] dark:before:pointer-events-none dark:before:opacity-60">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-content-xl">
            <h2 className="text-heading-2 mb-10">Lo que nos diferencia</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Conocemos el terreno</h3>
                  <p className="text-muted-foreground">
                    Fuimos operadores antes que empresarios, entendemos los desafíos reales de la seguridad.
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <Bell className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Entendemos urgencias</h3>
                  <p className="text-muted-foreground">
                    Entendemos las urgencias del cliente, porque las vivimos en primera persona.
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <Cpu className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Integramos tecnología</h3>
                  <p className="text-muted-foreground">
                    Integramos tecnología en cada proceso operativo y administrativo para mayor eficiencia.
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Formamos guardias</h3>
                  <p className="text-muted-foreground">
                    Formamos a nuestros guardias con foco en prevención, comunicación y reacción efectiva.
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <Clock4 className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Monitoreo 24/7</h3>
                  <p className="text-muted-foreground">
                    Nuestro centro de control monitorea, responde y audita las 24 horas del día, los 7 días de la semana.
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                    <HeartHandshake className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">Atención personalizada</h3>
                  <p className="text-muted-foreground">
                    Brindamos atención dedicada a cada cliente, adaptando nuestros servicios a sus necesidades específicas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <CtaFinal 
        title="¿Buscas una empresa de seguridad que combine experiencia en terreno con tecnología aplicada?"
        description="Contáctanos hoy para una evaluación personalizada de tus necesidades de seguridad empresarial."
        ctaLabel="Solicita una reunión"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 