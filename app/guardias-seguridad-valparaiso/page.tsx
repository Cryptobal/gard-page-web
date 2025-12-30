import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, Shield, Clock, MapPin, Award, Anchor } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { FAQSection } from '@/components/seo/FAQSchema';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad en Valparaíso | Puerto y Patrimonio | Gard Security',
  description: 'Guardias de seguridad en Valparaíso especializados en puertos, zonas patrimoniales y turismo. Protección 24/7 para empresas, edificios y eventos. +15 años de experiencia. Cotice.',
  keywords: ['guardias seguridad valparaíso', 'seguridad puerto valparaíso', 'vigilancia patrimonio', 'empresa seguridad valparaíso', 'guardias 24/7 valparaíso'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/guardias-seguridad-valparaiso' },
  openGraph: {
    title: 'Guardias de Seguridad en Valparaíso | Puerto y Patrimonio | Gard Security',
    description: 'Seguridad especializada para puertos, zonas patrimoniales y turismo en Valparaíso. Respuesta 24/7. Cotice en línea.',
    url: 'https://www.gard.cl/guardias-seguridad-valparaiso',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website'
  }
};

const faqs = [
  { question: '¿Por qué contratar guardias de seguridad en Valparaíso?', answer: 'Valparaíso, como principal puerto de Chile y Patrimonio de la Humanidad UNESCO, requiere seguridad especializada para proteger operaciones portuarias, zonas turísticas patrimoniales y edificios gubernamentales (Congreso Nacional). Nuestros guardias tienen experiencia en protocolos portuarios, vigilancia turística y protección patrimonial.' },
  { question: '¿Qué experiencia tienen en seguridad portuaria?', answer: 'Contamos con más de 15 años protegiendo operaciones portuarias en Valparaíso: terminales de carga, recintos portuarios, bodegas de importación/exportación y zonas de embarque. Nuestros guardias conocen protocolos marítimos, coordinación con Capitanía de Puerto y normativas de seguridad portuaria.' },
  { question: '¿Cuánto cuesta contratar guardias en Valparaíso?', answer: 'Se cotiza según turnos, puestos y riesgo (portuario, patrimonial, corporativo). Enviamos propuesta cerrada en 24h sin cifras genéricas.' },
  { question: '¿Cubren Viña del Mar además de Valparaíso?', answer: 'Sí, cubrimos toda la región de Valparaíso incluyendo Viña del Mar, Con Con, Quilpué y Villa Alemana. Tenemos equipos especializados para zonas turísticas, balnearios, edificios corporativos y centros comerciales en toda el área metropolitana.' }
];

export default function GuardiasValparaisoPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://www.gard.cl' },
    { name: 'Ciudades', url: 'https://www.gard.cl/ciudades' },
    { name: 'Valparaíso', url: 'https://www.gard.cl/guardias-seguridad-valparaiso' }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <ServiceSchema
        name="Guardias de Seguridad en Valparaíso"
        description="Guardias especializados en seguridad portuaria, zonas patrimoniales y turismo en Valparaíso"
        url="https://www.gard.cl/guardias-seguridad-valparaiso"
        areaServed="Valparaíso, Chile"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
        offers={{ priceRange: "$$$", availability: "https://schema.org/InStock" }}
      />

      {/* Hero */}
      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="8a12ef3b-4d91-4c89-e865-d1a2c4567b00"
            alt="Guardias de seguridad en Valparaíso"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary mb-6">
            <Anchor className="h-4 w-4 mr-2" />
            <span>Especialistas en Seguridad Portuaria y Patrimonial</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Guardias de Seguridad en Valparaíso
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Protección especializada para puertos, zonas patrimoniales UNESCO, edificios gubernamentales y turismo con guardias capacitados 24/7
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">15+ Años en Valparaíso</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">Experiencia Portuaria</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-white font-medium">Protección Patrimonial</span>
            </div>
          </div>
          
          <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotizar Seguridad en Valparaíso <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Por qué Gard en Valparaíso */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Líderes en Seguridad en Valparaíso</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Experiencia única protegiendo el principal puerto de Chile y zonas patrimoniales UNESCO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Anchor className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Especialistas Portuarios</h3>
              <p className="text-muted-foreground">
                Guardias capacitados en protocolos portuarios, coordinación con Capitanía de Puerto y normativas marítimas. Experiencia en terminales, bodegas de carga y recintos aduaneros.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Protección Patrimonial</h3>
              <p className="text-muted-foreground">
                Vigilancia especializada para zonas patrimoniales UNESCO (Cerro Alegre, Cerro Concepción). Protocolos discretos que respetan el ambiente histórico y turístico.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cobertura Regional</h3>
              <p className="text-muted-foreground">
                Servicio en Valparaíso, Viña del Mar, Con Con, Quilpué y toda la región. Respuesta rápida en área metropolitana con equipos estratégicamente ubicados.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Congreso Nacional</h3>
              <p className="text-muted-foreground">
                Experiencia protegiendo edificios gubernamentales con protocolos de alta seguridad. Coordinación con autoridades y manejo de visitas oficiales.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Vigilancia Turística</h3>
              <p className="text-muted-foreground">
                Seguridad para hoteles, restaurantes, atracciones turísticas y eventos en zonas patrimoniales. Guardias bilingües disponibles para atención a turistas internacionales.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Monitoreo 24/7</h3>
              <p className="text-muted-foreground">
                Central de monitoreo que supervisa operaciones en Valparaíso y región. Respuesta coordinada con carabineros, bomberos y autoridades portuarias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores que Protegemos */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-12 text-center">Sectores que Protegemos en Valparaíso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Puerto y Logística</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Terminales portuarias y muelles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bodegas de importación/exportación</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Zonas de embarque y desembarque</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Recintos aduaneros y zona primaria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de acceso vehicular y peatonal</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Zona Patrimonial y Turismo</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cerro Alegre y Cerro Concepción (UNESCO)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hoteles y hostales patrimoniales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Restaurantes y bares en zonas turísticas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Museos y atracciones culturales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Eventos y festivales en zonas patrimoniales</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Edificios Gubernamentales</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Congreso Nacional (sede legislativa)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Edificios de servicios públicos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Oficinas regionales gubernamentales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Protocolos de alta seguridad</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Coordinación con autoridades</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Comercio y Corporativo</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Edificios corporativos en Valparaíso y Viña</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Centros comerciales y malls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bancos y entidades financieras</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Supermercados y retail</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control de acceso y recepción</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gard-section py-16 bg-primary text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proteja su Operación en Valparaíso
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Especialistas en seguridad portuaria, patrimonial y turística con +15 años en la región
          </p>
          <a href="#cotizar" className="gard-btn bg-white text-primary hover:bg-white/90 gard-btn-lg inline-flex items-center">
            Solicitar Cotización <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <FAQSection
        title="Preguntas Frecuentes sobre Seguridad en Valparaíso"
        description="Respuestas sobre servicios de seguridad en la ciudad puerto y patrimonio UNESCO"
        faqs={faqs}
      />

      <FormularioCotizacionSeccion 
        id="cotizar"
      />
    </>
  );
}

