'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './ContactForm';
import CanonicalUrl from '@/components/seo/CanonicalUrl';
import SEODevPanel from '@/components/seo/SEODevPanel';

export default function ContactoLandingClient() {
  return (
    <>
      <CanonicalUrl />
      <SEODevPanel />
      <div className="py-20 pt-32 bg-[hsl(var(--gard-background))]">
        <div className="gard-container">
          <h1 className="text-heading-2 mb-6">Contacto directo con expertos en seguridad</h1>
          
          <p className="text-body-lg mb-8 max-w-3xl text-[hsl(var(--gard-muted-foreground))]">
            En Gard Security valoramos la comunicación directa y eficiente con nuestros clientes. 
            Nuestro equipo de especialistas está disponible para atender todas sus consultas y 
            brindarle asesoramiento personalizado sobre soluciones de seguridad adaptadas a sus 
            necesidades específicas.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-heading-4 mb-6">Canales de comunicación</h2>
              
              <div className="space-y-6">
                <div className="flex items-start bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                  <Phone className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Consultas Comerciales</h3>
                    <p className="text-[hsl(var(--gard-muted-foreground))] mb-1">Respuesta inmediata en horario laboral</p>
                    <a href="tel:+56941137976" className="text-[hsl(var(--gard-accent))] hover:underline">+56 9 4113 7976</a>
                  </div>
                </div>
                
                <div className="flex items-start bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                  <Phone className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Trabaja con nosotros</h3>
                    <p className="text-[hsl(var(--gard-muted-foreground))] mb-1">Oportunidades laborales para guardias de seguridad</p>
                    <a href="tel:+56956062246" className="text-[hsl(var(--gard-accent))] hover:underline">+56 9 5606 2246</a>
                  </div>
                </div>
                
                <div className="flex items-start bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                  <Mail className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Correo electrónico</h3>
                    <p className="text-[hsl(var(--gard-muted-foreground))] mb-1">Respuesta en menos de 24 horas</p>
                    <a href="mailto:comercial@gard.cl" className="text-[hsl(var(--gard-accent))] hover:underline">comercial@gard.cl</a>
                  </div>
                </div>
                
                <div className="flex items-start bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                  <MapPin className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Oficina central</h3>
                    <p className="text-[hsl(var(--gard-muted-foreground))] mb-1">Visítenos previo agendamiento</p>
                    <address className="not-italic">
                      Camino Los Trapenses 2140, Lo Barnechea<br />
                      Santiago, Chile
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                  <Clock className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Horario de atención</h3>
                    <p className="text-[hsl(var(--gard-muted-foreground))]">Lunes a viernes: 9:00 - 18:00 hrs</p>
                    <p className="text-[hsl(var(--gard-muted-foreground))]">Emergencias: 24/7</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-[hsl(var(--gard-muted))] p-6 rounded-xl">
                <h3 className="text-heading-5 mb-4">Para una atención más eficiente</h3>
                <p className="text-[hsl(var(--gard-muted-foreground))] mb-4">
                  Para ayudarnos a atenderle mejor, le recomendamos tener a mano la siguiente información:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[hsl(var(--gard-muted-foreground))]">
                  <li>Tipo de servicio que necesita (guardias, monitoreo, etc.)</li>
                  <li>Ubicación de su empresa o instalación</li>
                  <li>Tamaño aproximado del área a proteger</li>
                  <li>Necesidades específicas de seguridad</li>
                </ul>
              </div>
            </div>
            
            <ContactForm />
          </div>
          
          <div className="mt-16">
            <h2 className="text-heading-4 mb-8">Preguntas frecuentes</h2>
            
            <div className="space-y-4">
              <div className="bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                <h3 className="font-semibold mb-3 flex items-center">
                  <span className="flex-shrink-0 mr-3 text-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))/10] w-8 h-8 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  ¿Cuánto tiempo tardarán en responder a mi consulta?
                </h3>
                <p className="text-[hsl(var(--gard-muted-foreground))] ml-11">
                  Nos comprometemos a responder todas las consultas por correo electrónico en un plazo máximo de 24 horas hábiles.
                  Para consultas telefónicas, la atención es inmediata durante nuestro horario laboral.
                </p>
              </div>
              
              <div className="bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                <h3 className="font-semibold mb-3 flex items-center">
                  <span className="flex-shrink-0 mr-3 text-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))/10] w-8 h-8 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  ¿Ofrecen servicio de cotización sin compromiso?
                </h3>
                <p className="text-[hsl(var(--gard-muted-foreground))] ml-11">
                  Sí, todas nuestras cotizaciones son gratuitas y sin compromiso. Elaboramos propuestas personalizadas
                  según las necesidades específicas de cada cliente, con total transparencia en precios y condiciones.
                </p>
              </div>
              
              <div className="bg-[hsl(var(--gard-card))] p-5 rounded-xl shadow-sm border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
                <h3 className="font-semibold mb-3 flex items-center">
                  <span className="flex-shrink-0 mr-3 text-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))/10] w-8 h-8 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  ¿Atienden emergencias fuera del horario laboral?
                </h3>
                <p className="text-[hsl(var(--gard-muted-foreground))] ml-11">
                  Disponemos de un servicio de atención de emergencias 24/7 para clientes con contratos activos.
                  Este servicio garantiza respuesta inmediata ante cualquier incidente de seguridad.
                </p>
              </div>
            </div>
            
            <div className="mt-10 bg-[hsl(var(--gard-muted))] p-6 rounded-xl border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-2">¿Prefiere una respuesta inmediata?</h3>
                  <p className="text-[hsl(var(--gard-muted-foreground))] mb-4 md:mb-0">
                    Solicite una cotización online y obtenga una respuesta personalizada en menos de 24 horas.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link 
                    href="/cotizador-inteligente" 
                    className="inline-flex items-center justify-center bg-[hsl(var(--gard-accent))] hover:bg-[hsl(var(--gard-accent))/90] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Solicitar cotización rápida
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 