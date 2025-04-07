import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { 
  ArrowRight, 
  Smartphone, 
  ClipboardCheck, 
  FileText,
  MessageSquare,
  Database,
  Code,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import CtaFinal from '@/components/ui/shared/CtaFinal';
import TecnologiaLandingClient from './TecnologiaLandingClient';
import GardHero from '@/components/layouts/GardHero';

export default function Page() {
  return (
    <>
      {/* Componente cliente con SEO y Canonical */}
      <TecnologiaLandingClient />
      
      {/* Hero Section */}
      <GardHero 
        title="Innovación en Tecnología para Seguridad Privada"
        subtitle="Inteligencia artificial, videovigilancia avanzada y sistemas de monitoreo en tiempo real."
        ctaTexto="Conocer más"
        ctaHref="/cotizar"
        imageId="678cad4f-9b0d-49e6-3bbd-0d747a2fdc00"
        badge={{
          icon: <Cpu className="h-4 w-4" />,
          text: "Tecnología de Vanguardia"
        }}
        overlay={true}
      />

      {/* Módulo Plataforma */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gradient-to-b dark:from-[hsl(var(--gard-background))] dark:to-[hsl(var(--gard-background)/_0.85)] dark:backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Nuestra Plataforma Tecnológica</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Un ecosistema digital completo para la gestión, control y supervisión de seguridad privada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-card dark:bg-[hsl(var(--gard-card))] dark:border-[1px] dark:border-[hsl(var(--gard-accent)/_0.15)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[hsl(var(--gard-accent)/_0.3)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-transparent dark:bg-[hsl(var(--gard-accent)/_0.1)] dark:backdrop-blur-md">
                  <Smartphone className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">App y panel en tiempo real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Visualiza cada ronda, ingreso y evento desde una plataforma centralizada. Acceda desde cualquier dispositivo, en cualquier momento.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-[hsl(var(--gard-card))] dark:border-[1px] dark:border-[hsl(var(--gard-accent)/_0.15)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[hsl(var(--gard-accent)/_0.3)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-transparent dark:bg-[hsl(var(--gard-accent)/_0.1)] dark:backdrop-blur-md">
                  <ClipboardCheck className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">Control de rondas y asistencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Supervisión en tiempo real de guardias con geolocalización, verificación de rondas y control biométrico de asistencia.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-[hsl(var(--gard-card))] dark:border-[1px] dark:border-[hsl(var(--gard-accent)/_0.15)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[hsl(var(--gard-accent)/_0.3)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-transparent dark:bg-[hsl(var(--gard-accent)/_0.1)] dark:backdrop-blur-md">
                  <FileText className="h-12 w-12 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">Reportes automáticos con IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Reportes generados automáticamente con inteligencia artificial que detecta patrones y previene incidentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección Supervisión Inteligente */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-[#050505] dark:bg-[radial-gradient(circle_at_center,_rgba(15,15,15,0.5)_1px,transparent_1px)] dark:bg-[length:24px_24px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-2 mb-6">Supervisión y Operación Inteligente</h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Implementamos tecnología de punta que permite una supervisión efectiva y en tiempo real de todos los servicios de seguridad.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Trazabilidad completa:</strong> Registro detallado de cada actividad realizada por el personal de seguridad.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Evidencia de cumplimiento:</strong> Verificación digital y fotográfica de cada ronda y actividad programada.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Coordinación remota:</strong> Comunicación inmediata y eficiente entre guardias, supervisores y clientes.</p>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10"></div>
              <CloudflareImage
                imageId="678cad4f-9b0d-49e6-3bbd-0d747a2fdc00"
                alt="Supervisión y operación inteligente en seguridad privada"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Comunicación con Clientes */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-[linear-gradient(180deg,#080808_0%,#0c0c0c_100%)] dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-[linear-gradient(90deg,rgba(20,20,20,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(20,20,20,0.03)_1px,transparent_1px)] dark:before:bg-[size:20px_20px] dark:before:pointer-events-none dark:before:opacity-60">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Comunicación en Tiempo Real</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Canales directos y efectivos entre usted y nuestro equipo de seguridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] p-4 rounded-full">
                  <MessageSquare className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">Canales directos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Comunicación inmediata a través de nuestra app con supervisores y administradores de servicio.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] p-4 rounded-full">
                  <ClipboardCheck className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">Validación de cumplimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Acceda a validaciones en tiempo real del cumplimiento de protocolos y rondas programadas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] p-4 rounded-full">
                  <Database className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <CardTitle className="text-heading-4">Histórico completo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Registro histórico de todas las comunicaciones e incidentes para referencia y auditoría.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección Reportes IA */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-[#070707] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#080808_0%,#0c0c0c_50%,#080808_100%)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-heading-2 mb-6">Reportes y Detección Proactiva con IA</h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Transformamos los datos en insights accionables para mejorar constantemente su seguridad.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-1.5 rounded-full bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] mr-2 shrink-0 mt-0.5">
                    <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <p className="text-body-base"><strong>Análisis de patrones:</strong> Identificación automática de patrones y situaciones de riesgo.</p>
                </li>
                <li className="flex items-start">
                  <div className="p-1.5 rounded-full bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] mr-2 shrink-0 mt-0.5">
                    <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <p className="text-body-base"><strong>Alertas inteligentes:</strong> Notificaciones predictivas basadas en comportamientos históricos.</p>
                </li>
                <li className="flex items-start">
                  <div className="p-1.5 rounded-full bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] mr-2 shrink-0 mt-0.5">
                    <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <p className="text-body-base"><strong>Reportería automatizada:</strong> Informes periódicos generados sin intervención humana.</p>
                </li>
                <li className="flex items-start">
                  <div className="p-1.5 rounded-full bg-primary/5 dark:bg-[hsl(var(--gard-accent)/_0.1)] mr-2 shrink-0 mt-0.5">
                    <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))]" />
                  </div>
                  <p className="text-body-base"><strong>Dashboard personalizado:</strong> Visualización de métricas clave según sus necesidades.</p>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-md order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-bl from-black/40 to-transparent z-10"></div>
              <CloudflareImage
                imageId="d0c7fd28-f94f-4138-d307-da723130fd00"
                alt="Sistema de reportes con inteligencia artificial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Desarrollo a Medida */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-[#0a0a0a] dark:bg-[url('/assets/noise-pattern.png')] dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Desarrollo a Medida para Empresas</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Adaptamos nuestra tecnología a las necesidades específicas de su industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex items-start group">
              <div className="mr-4 bg-primary/10 dark:bg-black/40 dark:border dark:border-[hsl(var(--gard-accent)/_0.2)] p-3 rounded-full group-hover:border-[hsl(var(--gard-accent)/_0.4)] transition-all duration-300">
                <Code className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Conectores e Integraciones</h3>
                <p className="text-body-base text-muted-foreground">
                  Integramos nuestra plataforma con sus sistemas actuales (ERP, CCTV, control de acceso).
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="mr-4 bg-primary/10 dark:bg-black/40 dark:border dark:border-[hsl(var(--gard-accent)/_0.2)] p-3 rounded-full group-hover:border-[hsl(var(--gard-accent)/_0.4)] transition-all duration-300">
                <Database className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">API Personalizada</h3>
                <p className="text-body-base text-muted-foreground">
                  Desarrollamos API a medida para transferencia de datos segura entre sistemas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="mr-4 bg-primary/10 dark:bg-black/40 dark:border dark:border-[hsl(var(--gard-accent)/_0.2)] p-3 rounded-full group-hover:border-[hsl(var(--gard-accent)/_0.4)] transition-all duration-300">
                <ClipboardCheck className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Reportes por Industria</h3>
                <p className="text-body-base text-muted-foreground">
                  Reportería especializada según los requerimientos regulatorios de su sector.
                </p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="mr-4 bg-primary/10 dark:bg-black/40 dark:border dark:border-[hsl(var(--gard-accent)/_0.2)] p-3 rounded-full group-hover:border-[hsl(var(--gard-accent)/_0.4)] transition-all duration-300">
                <Smartphone className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Aplicaciones Móviles Personalizadas</h3>
                <p className="text-body-base text-muted-foreground">
                  Versiones específicas de nuestra aplicación adaptadas a sus procesos internos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title="¿Quieres ver cómo operamos todo en tiempo real?"
        description="Agenda una demostración o solicita un presupuesto personalizado para tu empresa."
        ctaLabel="Agenda una Demo"
        ctaHref="/contacto"
        variant="soft"
      />
    </>
  );
}