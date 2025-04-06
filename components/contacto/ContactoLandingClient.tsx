'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Shield, Users, HeadphonesIcon } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './ContactForm';
import SEODevPanel from '@/components/seo/SEODevPanel';

export default function ContactoLandingClient() {
  return (
    <>
      <SEODevPanel />
      <div className="gard-container py-20 pt-32">
        <h1 className="text-heading-2 mb-6">Contacto directo con expertos en seguridad</h1>
        
        <p className="text-body-lg mb-8 max-w-3xl">
          En Gard Security valoramos la comunicación directa y eficiente con nuestros clientes. 
          Nuestro equipo de especialistas está disponible para atender todas sus consultas y 
          brindarle asesoramiento personalizado sobre soluciones de seguridad adaptadas a sus 
          necesidades específicas.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-10">
          <h2 className="text-heading-4 mb-4">Departamentos especializados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-[#F97316] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Servicios de Guardias</h3>
                <p className="text-sm text-muted-foreground">Consultas sobre personal de seguridad, cobertura y servicios especiales.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 text-[#F97316] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Recursos Humanos</h3>
                <p className="text-sm text-muted-foreground">Reclutamiento, capacitación y desarrollo profesional.</p>
              </div>
            </div>
            <div className="flex items-start">
              <HeadphonesIcon className="h-6 w-6 text-[#F97316] mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Atención al Cliente</h3>
                <p className="text-sm text-muted-foreground">Soporte técnico y resolución de incidencias 24/7.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-heading-4 mb-6">Canales de comunicación</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Teléfono directo</h3>
                  <p className="text-muted-foreground mb-1">Respuesta inmediata en horario laboral</p>
                  <a href="tel:+56941137976" className="text-primary hover:underline">+56 9 4113 7976</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Correo electrónico</h3>
                  <p className="text-muted-foreground mb-1">Respuesta en menos de 24 horas</p>
                  <a href="mailto:comercial@gard.cl" className="text-primary hover:underline">comercial@gard.cl</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Oficina central</h3>
                  <p className="text-muted-foreground mb-1">Visítenos previo agendamiento</p>
                  <address className="not-italic">
                    Camino Los Trapenses 2140, Lo Barnechea<br />
                    Santiago, Chile
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#F97316] mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Horario de atención</h3>
                  <p className="text-muted-foreground">Lunes a viernes: 9:00 - 18:00 hrs</p>
                  <p className="text-muted-foreground">Emergencias: 24/7</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-heading-5 mb-4">Para una atención más eficiente</h3>
              <p className="text-muted-foreground mb-4">
                Para ayudarnos a atenderle mejor, le recomendamos tener a mano la siguiente información:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Tipo de servicio que necesita (guardias, monitoreo, etc.)</li>
                <li>Ubicación de su empresa o instalación</li>
                <li>Tamaño aproximado del área a proteger</li>
                <li>Necesidades específicas de seguridad</li>
              </ul>
            </div>
          </div>
          
          <ContactForm />
        </div>
        
        <div className="border-t pt-8">
          <h2 className="text-heading-4 mb-6">Preguntas frecuentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">¿Cuánto tiempo tardarán en responder a mi consulta?</h3>
              <p className="text-muted-foreground">
                Nos comprometemos a responder todas las consultas por correo electrónico en un plazo máximo de 24 horas hábiles.
                Para consultas telefónicas, la atención es inmediata durante nuestro horario laboral.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Ofrecen servicio de cotización sin compromiso?</h3>
              <p className="text-muted-foreground">
                Sí, todas nuestras cotizaciones son gratuitas y sin compromiso. Elaboramos propuestas personalizadas
                según las necesidades específicas de cada cliente, con total transparencia en precios y condiciones.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">¿Atienden emergencias fuera del horario laboral?</h3>
              <p className="text-muted-foreground">
                Disponemos de un servicio de atención de emergencias 24/7 para clientes con contratos activos.
                Este servicio garantiza respuesta inmediata ante cualquier incidente de seguridad.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">¿Cómo se maneja la confidencialidad de mi información?</h3>
              <p className="text-muted-foreground">
                Toda la información proporcionada es tratada con estricta confidencialidad siguiendo protocolos de seguridad informática avanzados. 
                Trabajamos de acuerdo con la normativa vigente de protección de datos y aseguramos que su información solo se utiliza para los fines específicos de su consulta.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-primary/5 p-6 rounded-xl">
            <div className="flex items-start">
              <MessageSquare className="h-8 w-8 text-[#F97316] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">¿Prefiere una comunicación más directa?</h3>
                <p className="mb-4">
                  Si desea una respuesta más rápida o hablar directamente con un asesor de seguridad,
                  le recomendamos utilizar nuestro sistema de cotización online.
                </p>
                <Link 
                  href="/cotizar"
                  className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                >
                  Solicitar cotización rápida
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8">
          <h2 className="text-heading-4 mb-6">Nuestra ubicación</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3137.1231600930986!2d-70.78127958447793!3d-33.357197580810674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c8ce0cb09517%3A0xa05f4ac0dd11a119!2sCamino%20Los%20Trapenses%202140%2C%20Lo%20Barnechea%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1656959262521!5m2!1ses!2scl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de oficinas Gard Security"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
} 