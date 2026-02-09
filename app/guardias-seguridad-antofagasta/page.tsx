import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, Shield, Clock, MapPin, Award } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad en Antofagasta | Certificados OS10 | Gard Security',
  description: 'Guardias de seguridad certificados OS10 en Antofagasta. Especializados en minería, puertos y zonas industriales. Respuesta inmediata 24/7. +15 años de experiencia. Cotice ahora.',
  keywords: ['guardias seguridad antofagasta', 'seguridad minera antofagasta', 'guardias certificados os10 antofagasta', 'empresa seguridad antofagasta', 'vigilancia 24/7 antofagasta'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/guardias-seguridad-antofagasta' },
  openGraph: {
    title: 'Guardias de Seguridad en Antofagasta | Certificados OS10 | Gard Security',
    description: 'Líder en seguridad privada en Antofagasta. Personal 100% certificado OS10, especialistas en minería. Respuesta 24/7. Cotice en línea.',
    url: 'https://www.gard.cl/guardias-seguridad-antofagasta',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website'
  }
};

const faqs = [
  { question: '¿Por qué contratar guardias de seguridad en Antofagasta?', answer: 'Antofagasta, como capital minera de Chile, requiere seguridad especializada para proteger faenas mineras, puertos y zonas industriales. Nuestros guardias están 100% certificados OS10 por SERNAGEOMIN y tienen experiencia comprobada en operaciones de alto riesgo en zonas remotas del norte de Chile.' },
  { question: '¿Qué certificación OS10 tienen sus guardias en Antofagasta?', answer: 'El 100% de nuestros guardias cuenta con certificación OS10 vigente de SERNAGEOMIN, como exige el Decreto Supremo N°132 para todos los guardias de seguridad en Chile. Nuestro diferencial es que además del OS10 obligatorio, nuestros guardias en minería tienen capacitación especializada en protocolos mineros, primeros auxilios en altura y emergencias en zonas remotas.' },
  { question: '¿Cuánto cuesta contratar guardias de seguridad en Antofagasta?', answer: 'Depende de puestos, turnos y logística en zonas remotas. Enviamos propuesta cerrada en 24h con personal OS10 y supervisión 24/7.' },
  { question: '¿Cuál es el tiempo de respuesta en Antofagasta?', answer: 'En Antofagasta ciudad tenemos tiempo de respuesta promedio de 15 minutos. Para faenas mineras en zonas remotas (María Elena, Sierra Gorda, etc.) contamos con guardias residentes en la faena y comunicación satelital con nuestra central de monitoreo 24/7.' }
];

export default function GuardiasAntofagastaPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://www.gard.cl' },
    { name: 'Ciudades', url: 'https://www.gard.cl/ciudades' },
    { name: 'Antofagasta', url: 'https://www.gard.cl/guardias-seguridad-antofagasta' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <ServiceSchema
        name="Guardias de Seguridad en Antofagasta"
        description="Guardias certificados OS10 especializados en minería, puertos y zonas industriales en Antofagasta"
        url="https://www.gard.cl/guardias-seguridad-antofagasta"
        areaServed="Antofagasta, Chile"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
        offers={{ priceRange: "$$$", availability: "https://schema.org/InStock" }}
      />

      {/* Hero */}
      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="a8f97e4d-3c02-4e12-c4b6-24c1da8ddb00"
            alt="Guardias de seguridad en Antofagasta"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary mb-6">
            <Award className="h-4 w-4 mr-2" />
            <span>100% Certificados OS10 SERNAGEOMIN</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Guardias de Seguridad en Antofagasta
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Protección especializada para minería, puertos y zonas industriales con personal certificado OS10 y respuesta 24/7
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">15+ Años en Antofagasta</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">15+ Faenas Protegidas</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">Respuesta &lt;15 Min</span>
            </div>
          </div>
          
          <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotizar Seguridad para mi Operación <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Por qué Gard en Antofagasta */}
      <section className="gard-section-md bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Por Qué Somos #1 en Seguridad en Antofagasta?</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Más de 15 años protegiendo operaciones mineras, puertos y zonas industriales en Antofagasta y la región
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">100% Certificación OS10</h3>
              <p className="text-muted-foreground">
                Como exige la ley, el 100% de nuestro personal cuenta con certificación OS10 vigente de SERNAGEOMIN. Además, guardias en minería tienen capacitación especializada adicional en protocolos mineros.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Experiencia en Zonas Remotas</h3>
              <p className="text-muted-foreground">
                Operamos en faenas alejadas de Antofagasta (Sierra Gorda, María Elena, Tocopilla) con comunicación satelital y guardias residentes capacitados para condiciones extremas.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Monitoreo 24/7 Especializado</h3>
              <p className="text-muted-foreground">
                Central de monitoreo con protocolos específicos para minería. Respuesta coordinada ante emergencias con comunicación satelital en zonas sin cobertura.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">15+ Faenas Mineras</h3>
              <p className="text-muted-foreground">
                Protegemos más de 15 operaciones mineras en Antofagasta y alrededores: cobre, litio, oro y otros minerales. Experiencia comprobada en minería a gran escala.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Seguridad Portuaria</h3>
              <p className="text-muted-foreground">
                Experiencia en puertos de Antofagasta con control de acceso, vigilancia de carga y protocolos marítimos. Coordinación con autoridades portuarias.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Respuesta Inmediata</h3>
              <p className="text-muted-foreground">
                Tiempo de respuesta promedio de 15 minutos en Antofagasta ciudad. Para faenas remotas: guardias residentes en sitio con supervisión remota continua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores que Protegemos en Antofagasta */}
      <section className="gard-section-md bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-12 text-center">Sectores que Protegemos en Antofagasta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Minería</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Faenas de cobre, litio, oro y otros minerales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Minería a cielo abierto y subterránea</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Plantas de procesamiento y refinación</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Campamentos mineros en zonas remotas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de acceso con biometría</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Puertos y Logística</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Puerto de Antofagasta y terminales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bodegas de importación/exportación</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Centros de distribución logística</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de carga y mercancía</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Vigilancia de contenedores</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Zonas Industriales</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Parques industriales de Antofagasta</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Plantas de procesamiento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Instalaciones de energía y agua</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bodegas de suministros industriales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Vigilancia perimetral con drones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Edificios Corporativos</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Oficinas de empresas mineras</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Edificios corporativos centro Antofagasta</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Recepción ejecutiva 24/7</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de acceso inteligente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Estacionamientos corporativos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gard-section-sm bg-primary text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Necesita Seguridad en Antofagasta?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Más de 15 años protegiendo operaciones mineras e industriales en la capital del cobre de Chile
          </p>
          <a href="#cotizar" className="gard-btn bg-white text-primary hover:bg-white/90 gard-btn-lg inline-flex items-center">
            Solicitar Cotización Ahora <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <FAQSection
        title="Preguntas Frecuentes sobre Guardias de Seguridad en Antofagasta"
        description="Respondemos las dudas más comunes sobre servicios de seguridad en la capital minera de Chile"
        faqs={faqs}
      />

      <FormularioCotizacionSeccion 
        id="cotizar"
      />
    </>
  );
}

