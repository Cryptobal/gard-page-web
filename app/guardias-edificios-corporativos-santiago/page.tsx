import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Building2, Phone, Users, Shield, Smartphone } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import BreadcrumbSchema, { Breadcrumbs } from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import { FAQSection } from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'Guardias para Edificios Corporativos Santiago | Recepción 24/7',
  description: 'Seguridad profesional para edificios de oficinas en Santiago. Control de acceso inteligente, recepción ejecutiva 24/7 y protocolo corporativo. +50 edificios protegidos. Cotice: +56 2 2987 2380',
  keywords: ['guardias edificios corporativos santiago', 'seguridad oficinas las condes', 'control acceso edificios', 'recepción corporativa 24/7'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gard.cl/guardias-edificios-corporativos-santiago' },
  openGraph: {
    title: 'Guardias para Edificios Corporativos Santiago | Recepción Ejecutiva 24/7',
    description: 'Seguridad profesional y recepción corporativa. Control de acceso inteligente, protocolo ejecutivo.',
    url: 'https://www.gard.cl/guardias-edificios-corporativos-santiago',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/86f9c63c-0372-46c8-9f30-19631ac2e100/public', width: 1200, height: 630, alt: 'Guardias para edificios corporativos Santiago' }]
  }
};

const faqs = [
  { question: '¿Cuánto cuesta el servicio de seguridad para un edificio corporativo en Santiago?', answer: 'Para un edificio de 10-15 pisos con recepción 24/7, el servicio con 2-3 guardias rotativos cuesta entre $3.500.000 - $6.000.000 mensuales. Incluye control de acceso corporativo, recepción ejecutiva, rondas por áreas comunes, gestión de visitas con sistema digital, y respuesta a emergencias. Cotice al +56 2 2987 2380.' },
  { question: '¿Sus guardias pueden hacer funciones de recepción corporativa?', answer: 'Sí, nuestros guardias para edificios corporativos están capacitados en protocolo ejecutivo: atención profesional de visitas, gestión de credenciales temporales, manejo de paquetería y correspondencia, coordinación con empresas arrendatarias, y uso de sistemas de control de acceso.' },
  { question: '¿Cómo manejan el control de acceso fuera del horario de oficina?', answer: 'Implementamos sistema diferenciado: durante horario laboral, acceso fluido con validación en recepción; fuera de horario, acceso solo con tarjeta/código + validación de identidad con guardia. Mantenemos bitácora digital de todas las entradas.' },
  { question: '¿Están capacitados para evacuaciones de emergencia?', answer: 'Sí, todos nuestros guardias están certificados en evacuación de edificios corporativos: conocen plan de evacuación específico, coordinan con brigadistas internos, guían personas hacia zonas seguras, y coordinan con Bomberos.' },
  { question: '¿Pueden integrarse con el sistema de control de acceso existente?', answer: 'Absolutamente. Trabajamos con los principales sistemas corporativos: HID Global, Honeywell, Gallagher, Siemens, Schneider Electric. Nuestros guardias están capacitados en uso y administración básica de estos sistemas.' }
];

const breadcrumbs = [
  { name: 'Inicio', url: 'https://www.gard.cl' },
  { name: 'Guardias Edificios Corporativos Santiago', url: 'https://www.gard.cl/guardias-edificios-corporativos-santiago' }
];

export default function GuardiasEdificiosPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Guardias de Seguridad para Edificios Corporativos en Santiago"
        description="Servicio profesional de seguridad para edificios de oficinas. Control de acceso, recepción ejecutiva 24/7 y protocolo corporativo."
        url="https://www.gard.cl/guardias-edificios-corporativos-santiago"
        areaServed="Santiago, Chile"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 127 }}
        offers={{ priceRange: "$$$" }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section className="gard-hero min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage imageId="86f9c63c-0372-46c8-9f30-19631ac2e100" alt="Guardias para edificios corporativos Santiago" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="gard-hero-content text-center relative z-10 px-4 py-20 max-w-5xl">
          <div className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-white mb-6 border border-primary/30">
            <Building2 className="h-4 w-4 mr-2" />
            <span>+50 Edificios Corporativos Protegidos en Santiago</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Guardias para Edificios Corporativos en Santiago
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed">
            Seguridad profesional y <strong>recepción ejecutiva</strong>. Control de acceso inteligente, protocolo corporativo y respuesta certificada ante emergencias.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
              Cotizar Mi Edificio Ahora <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="tel:+56229872380" className="gard-btn gard-btn-secondary gard-btn-lg inline-flex items-center">
              <Phone className="mr-2 h-5 w-5" /> +56 2 2987 2380
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <Users className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Protocolo Ejecutivo</h3>
              <p className="text-white/80 text-sm">Atención profesional de visitas y manejo de correspondencia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <Shield className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Cobertura 24/7/365</h3>
              <p className="text-white/80 text-sm">Guardias en turnos rotativos sin interrupción del servicio</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <Smartphone className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Control Digital</h3>
              <p className="text-white/80 text-sm">Integración con HID, Honeywell y principales sistemas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">¿Por Qué Elegir a Gard para su Edificio?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Guardias con Protocolo Corporativo</h3>
                <p className="text-muted-foreground">Personal seleccionado por presentación impecable, trato profesional y capacidad de representar la imagen de su edificio.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Experiencia en Edificios Premium</h3>
                <p className="text-muted-foreground">Más de 50 edificios clase A protegidos en Las Condes, Providencia y Vitacura.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Integración Tecnológica</h3>
                <p className="text-muted-foreground">Trabajamos con todos los sistemas de control de acceso: HID, Honeywell, Gallagher, Siemens.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Continuidad Garantizada</h3>
                <p className="text-muted-foreground">Equipo de guardias suplentes disponible 24/7. Índice de continuidad: 99.9%.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Preguntas Frecuentes sobre Seguridad para Edificios" description="Resolvemos las dudas más comunes sobre servicios de seguridad corporativa" faqs={faqs} />

      <section id="cotizar" className="gard-section py-16 md:py-24 bg-[#0A0C12] text-white">
        <div className="gard-container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-heading-2 mb-4">Mejore la Seguridad de su Edificio</h2>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Complete el formulario y un ejecutivo especializado lo contactará con una propuesta personalizada.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="email" placeholder="Email *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="tel" placeholder="Teléfono *" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" required />
                <input type="text" placeholder="Cargo/Empresa" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" />
                <input type="text" placeholder="Dirección del edificio" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400" />
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white">
                  <option value="">N° de pisos del edificio</option>
                  <option value="1-5">1-5 pisos</option>
                  <option value="6-10">6-10 pisos</option>
                  <option value="11-20">11-20 pisos</option>
                  <option value="20+">Más de 20 pisos</option>
                </select>
              </div>
              <textarea placeholder="Necesidades específicas de seguridad o servicios adicionales que requiere..." className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 h-32"></textarea>
              <button type="submit" className="gard-btn gard-btn-primary gard-btn-lg w-full sm:w-auto">
                Solicitar Cotización Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            * Al enviar acepta nuestros <Link href="/terminos" className="text-primary hover:underline">términos</Link> y <Link href="/privacidad" className="text-primary hover:underline">política de privacidad</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
