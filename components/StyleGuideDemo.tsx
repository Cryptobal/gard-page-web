"use client";

import React from 'react';
import { 
  Shield, 
  CheckCircle, 
  BarChart4, 
  ArrowRight, 
  Users, 
  Clock,
  Award,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export default function StyleGuideDemo() {
  return (
    <div className="min-h-screen bg-[hsl(var(--gard-background))] text-[hsl(var(--gard-foreground))]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 bg-[hsl(var(--gard-background))]">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gard-background))] to-[hsl(var(--gard-background-darker))]"></div>
        
        <div className="relative z-20 text-white px-4 w-full max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[hsl(var(--gard-accent))]/10 border border-[hsl(var(--gard-accent))]/20 text-[hsl(var(--gard-accent))] text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Nuevo Estilo Visual lx3.ai
            </div>
            
            <h1 className="text-heading-1 mb-6 text-white">
              Seguridad de Clase Mundial
            </h1>
            
            <p className="text-body-lg mb-8 max-w-3xl mx-auto text-gray-300">
              Protegemos lo que más importa con soluciones integrales diseñadas para los desafíos de seguridad más complejos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#cotizar" 
                className="gard-btn gard-btn-primary gard-btn-lg"
              >
                Cotizar Ahora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <Link 
                href="/sobre-nosotros" 
                className="gard-btn gard-btn-secondary gard-btn-lg"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paleta de Colores */}
      <section className="gard-section py-16">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-12 text-center">Nueva Paleta de Colores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gard-card p-6">
              <div className="w-full h-20 bg-[#1a1a1a] rounded-lg mb-4 border border-[hsl(var(--gard-border))]"></div>
              <h3 className="text-heading-5 mb-2">Fondo Principal</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">#1a1a1a - Gris oscuro</p>
            </div>
            
            <div className="gard-card p-6">
              <div className="w-full h-20 bg-[#ffffff] rounded-lg mb-4 border border-[hsl(var(--gard-border))]"></div>
              <h3 className="text-heading-5 mb-2">Texto Principal</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">#ffffff - Blanco puro</p>
            </div>
            
            <div className="gard-card p-6">
              <div className="w-full h-20 bg-[#e63946] rounded-lg mb-4 border border-[hsl(var(--gard-border))]"></div>
              <h3 className="text-heading-5 mb-2">Acento</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))]">#e63946 - Rojo-anaranjado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Componentes */}
      <section className="gard-section py-16 bg-[hsl(var(--gard-muted))]">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-12 text-center">Componentes Actualizados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Botones */}
            <div className="gard-card p-6">
              <h3 className="text-heading-5 mb-4">Botones</h3>
              <div className="space-y-4">
                <button className="gard-btn gard-btn-primary w-full">
                  Botón Primario
                </button>
                <button className="gard-btn gard-btn-secondary w-full">
                  Botón Secundario
                </button>
                <button className="gard-btn gard-btn-outline w-full">
                  Botón Outline
                </button>
              </div>
            </div>
            
            {/* Iconos */}
            <div className="gard-card p-6">
              <h3 className="text-heading-5 mb-4">Iconografía</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Shield</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Check</span>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart4 className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Chart</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Users</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Clock</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="h-8 w-8 text-[hsl(var(--gard-accent))] mb-2" />
                  <span className="text-xs text-[hsl(var(--gard-muted-foreground))]">Award</span>
                </div>
              </div>
            </div>
            
            {/* Tipografía */}
            <div className="gard-card p-6">
              <h3 className="text-heading-5 mb-4">Tipografía</h3>
              <div className="space-y-3">
                <h1 className="text-heading-1">H1 Título</h1>
                <h2 className="text-heading-2">H2 Subtítulo</h2>
                <h3 className="text-heading-3">H3 Sección</h3>
                <p className="text-body-base">Texto de cuerpo principal</p>
                <p className="text-body-sm text-[hsl(var(--gard-muted-foreground))]">Texto secundario</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="gard-section py-16 bg-[radial-gradient(circle_at_center,hsl(var(--gard-background)),hsl(var(--gard-card)))]">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-12 text-white">Nuestro Impacto en Números</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <BarChart4 className="h-14 w-14 mx-auto mb-4 text-[hsl(var(--gard-accent))]" />
              <div className="text-5xl font-bold mb-3 text-white">50+</div>
              <p className="text-body-base text-gray-100">Clientes satisfechos</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Users className="h-14 w-14 mx-auto mb-4 text-[hsl(var(--gard-accent))]" />
              <div className="text-5xl font-bold mb-3 text-white">8+</div>
              <p className="text-body-base text-gray-100">Años de experiencia</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Award className="h-14 w-14 mx-auto mb-4 text-[hsl(var(--gard-accent))]" />
              <div className="text-5xl font-bold mb-3 text-white">99.9%</div>
              <p className="text-body-base text-gray-100">Actividad operativa</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <Clock className="h-14 w-14 mx-auto mb-4 text-[hsl(var(--gard-accent))]" />
              <div className="text-5xl font-bold mb-3 text-white">24/7</div>
              <p className="text-body-base text-gray-100">Central operativa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="gard-section py-16">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-12 text-center">Servicios Destacados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gard-card p-6 hover:scale-105 transition duration-300">
              <Shield className="h-12 w-12 text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-5 mb-3">Seguridad Física</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))] mb-4">
                Protección integral con guardias profesionales y sistemas de vigilancia avanzados.
              </p>
              <Link href="/servicios" className="inline-flex items-center text-[hsl(var(--gard-accent))] font-medium hover:underline">
                Conocer más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <div className="gard-card p-6 hover:scale-105 transition duration-300">
              <Smartphone className="h-12 w-12 text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-5 mb-3">Tecnología Avanzada</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))] mb-4">
                Sistemas de monitoreo inteligente y control de acceso biométrico.
              </p>
              <Link href="/tecnologia" className="inline-flex items-center text-[hsl(var(--gard-accent))] font-medium hover:underline">
                Conocer más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <div className="gard-card p-6 hover:scale-105 transition duration-300">
              <CheckCircle className="h-12 w-12 text-[hsl(var(--gard-accent))] mb-4" />
              <h3 className="text-heading-5 mb-3">Consultoría</h3>
              <p className="text-body-base text-[hsl(var(--gard-muted-foreground))] mb-4">
                Asesoramiento experto para optimizar sus protocolos de seguridad.
              </p>
              <Link href="/consultoria" className="inline-flex items-center text-[hsl(var(--gard-accent))] font-medium hover:underline">
                Conocer más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="gard-section py-16 bg-[hsl(var(--gard-accent))] text-white">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-6">¿Listo para proteger su empresa?</h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            Contáctenos hoy mismo para una evaluación personalizada de sus necesidades de seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto" 
              className="gard-btn bg-white text-[hsl(var(--gard-accent))] gard-btn-lg hover:bg-gray-100"
            >
              Contactar Ahora
            </Link>
            <Link 
              href="/cotizar" 
              className="gard-btn gard-btn-outline border-white text-white gard-btn-lg hover:bg-white hover:text-[hsl(var(--gard-accent))]"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}