import React from 'react';
import { CheckCircle, ShieldCheck, UserCheck, Clock, ArrowRight } from 'lucide-react';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  benefits: string[];
  serviceName: string;
  serviceSlug: string;
}

export default function ServiceDescription({
  title,
  description,
  benefits,
  serviceName,
  serviceSlug
}: ServiceDescriptionProps) {
  return (
    <section className="gard-section py-16 md:py-24 bg-[#0A0C12] relative">
      <div className="absolute inset-0 bg-[url('/images/textures/noise-pattern.png')] opacity-5"></div>
      <div className="gard-container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-heading-2 mb-6 text-white">{title}</h2>
            <p className="text-body-lg text-gray-300 mb-8">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--gard-accent))] mr-3 mt-0.5" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-[hsl(var(--gard-card))] rounded-2xl p-8 shadow-md border border-gray-700">
              <h3 className="text-heading-4 mb-6 text-white">Beneficios clave</h3>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-[hsl(var(--gard-accent))/10] rounded-full flex items-center justify-center mr-4 shrink-0">
                    <ShieldCheck className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-white">Protección especializada</h4>
                    <p className="text-sm text-gray-300">
                      Servicio diseñado específicamente para las necesidades de cada cliente.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-[hsl(var(--gard-accent))/10] rounded-full flex items-center justify-center mr-4 shrink-0">
                    <UserCheck className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-white">Personal certificado</h4>
                    <p className="text-sm text-gray-300">
                      Equipo de profesionales con capacitación continua y experiencia comprobable.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-[hsl(var(--gard-accent))/10] rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Clock className="h-5 w-5 text-[hsl(var(--gard-accent))]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-white">Respuesta inmediata</h4>
                    <p className="text-sm text-gray-300">
                      Atención 24/7 con tiempos de respuesta garantizados según contrato.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#cotizar"
                  className="gard-btn gard-btn-primary w-full flex items-center justify-center"
                >
                  Solicitar cotización
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 