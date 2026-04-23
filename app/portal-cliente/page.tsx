import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Users, BarChart3, CheckCircle } from "lucide-react";
import CloudflareImage from "@/components/CloudflareImage";
import GardHero from "@/components/layouts/GardHero";
import BreadcrumbSchema, { Breadcrumbs } from "@/components/seo/BreadcrumbSchema";
import FormularioCotizacionSeccion from "@/app/components/FormularioCotizacionSeccion";
import { Button } from "@/components/ui/button";
import { OPAI_IMAGES } from "@/lib/data/opai-images";

export const metadata: Metadata = {
  title: "Portal Cliente OPAI · Visibilidad 24/7 de tu Servicio de Seguridad | Gard",
  description:
    "Portal Cliente de OPAI con KPIs en vivo, cumplimiento de rondas, Trust Score, actividad del equipo asignado y control de acceso. Cada cliente de Gard Security tiene su propio dashboard.",
  keywords: [
    "portal cliente seguridad",
    "dashboard guardias",
    "OPAI portal cliente",
    "visibilidad servicio seguridad",
    "KPIs guardias de seguridad",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.gard.cl/portal-cliente" },
  openGraph: {
    title: "Portal Cliente OPAI · Visibilidad 24/7 de tu Servicio de Seguridad",
    description:
      "Dashboard con KPIs operativos, cumplimiento diario, Trust Score del equipo y control de acceso en tiempo real.",
    url: "https://www.gard.cl/portal-cliente",
    siteName: "Gard Security",
    locale: "es_CL",
    type: "article",
  },
};

const breadcrumbs = [
  { name: "Inicio", url: "https://www.gard.cl" },
  { name: "Tecnología", url: "https://www.gard.cl/tecnologia-seguridad" },
  { name: "Portal Cliente", url: "https://www.gard.cl/portal-cliente" },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard ejecutivo en vivo",
    desc: "Cumplimiento mensual, rondas completadas del día, Trust Score del equipo y últimas novedades — todo en la primera pantalla.",
  },
  {
    icon: Users,
    title: "Equipo asignado con estado",
    desc: "Visualiza cuántos guardias están en sitio ahora, cuáles completaron su OS10, cuáles tienen licencia y alertas de cobertura.",
  },
  {
    icon: BarChart3,
    title: "Analítica diaria exportable",
    desc: "Gráficos de últimos 7, 14 y 30 días de cumplimiento por instalación, con export a PDF y Excel para reportes internos.",
  },
];

export default function PortalClientePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <GardHero
        title="Portal Cliente: tu servicio de seguridad en tiempo real"
        subtitle="Acceso 24/7 a KPIs operativos, rondas GPS, Trust Score y control de acceso de tu operación. Sin llamadas, sin planillas, sin sorpresas."
        ctaTexto="Solicitar demo"
        ctaHref="#cotizar"
        imageId={OPAI_IMAGES.portalCliente.id}
        badge={{
          icon: <LayoutDashboard className="h-4 w-4" />,
          text: "OPAI · Portal Cliente",
        }}
        overlay
      />

      <div className="gard-container pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="gard-section py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-heading-2 mb-4">
              Ver, controlar y auditar tu servicio sin depender de reportes manuales
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Cada cliente de Gard entra con sus propios usuarios al Portal
              Cliente de OPAI y accede a todo lo que importa de su servicio de
              seguridad — sin descargar nada, desde cualquier navegador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)] w-fit">
                  <Icon className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-heading-4 mb-2">{title}</h3>
                <p className="text-body-base text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl">
            <CloudflareImage
              imageId={OPAI_IMAGES.portalCliente.id}
              alt={OPAI_IMAGES.portalCliente.alt}
              width={OPAI_IMAGES.portalCliente.width}
              height={OPAI_IMAGES.portalCliente.height}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Sección Control de Acceso */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-[hsl(var(--gard-background-darker))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-2 mb-6">
                Control de Acceso digital conectado al Portal
              </h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Las recepciones de tus instalaciones registran cada visita en
                OPAI — y tú ves desde tu Portal Cliente quién está en sitio,
                cuántas entradas hubo hoy y el histórico completo para
                auditoría o compliance interno.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--gard-accent))] mr-2 mt-1 shrink-0" />
                  <p className="text-body-base">
                    Registro digital sin planillas físicas — cumple Ley Nº 19.628.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--gard-accent))] mr-2 mt-1 shrink-0" />
                  <p className="text-body-base">
                    KPIs en vivo: en sitio ahora, entradas del día, promedio de registro.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[hsl(var(--gard-accent))] mr-2 mt-1 shrink-0" />
                  <p className="text-body-base">
                    Exportable a Excel/PDF con filtros por fecha, empresa o visitante.
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-md">
              <CloudflareImage
                imageId={OPAI_IMAGES.portalControlAcceso.id}
                alt={OPAI_IMAGES.portalControlAcceso.alt}
                width={OPAI_IMAGES.portalControlAcceso.width}
                height={OPAI_IMAGES.portalControlAcceso.height}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-heading-2 mb-6">
            OPAI no es solo un portal. Es el ERP completo detrás.
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Lo que ves en tu Portal Cliente es el frontend de un ERP completo
            que cubre operaciones, personas, payroll, finanzas, documentos y
            cumplimiento — operando hoy sobre toda la operación real de Gard
            Security.
          </p>
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/tecnologia-seguridad">
              Ver OPAI completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <FormularioCotizacionSeccion />
    </>
  );
}
