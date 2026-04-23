import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Shield, CheckCircle } from "lucide-react";
import CloudflareImage from "@/components/CloudflareImage";
import GardHero from "@/components/layouts/GardHero";
import BreadcrumbSchema, {
  Breadcrumbs,
} from "@/components/seo/BreadcrumbSchema";
import FormularioCotizacionSeccion from "@/app/components/FormularioCotizacionSeccion";
import { Button } from "@/components/ui/button";
import { OPAI_IMAGES } from "@/lib/data/opai-images";

export const metadata: Metadata = {
  title:
    "Control de Rondas GPS para Guardias | OPAI ERP de Gard Security",
  description:
    "Control de rondas GPS con verificación de checkpoints, timeline de marcaciones y Trust Score auditable. OPAI ERP con tecnología propia operando sobre la operación real de Gard Security en Chile.",
  keywords: [
    "control de rondas gps",
    "rondas gps guardias",
    "control de guardias online",
    "sistema de rondas para guardias",
    "OPAI ERP seguridad privada",
    "Trust Score guardias",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.gard.cl/control-rondas-gps",
  },
  openGraph: {
    title:
      "Control de Rondas GPS para Guardias | OPAI ERP de Gard Security",
    description:
      "Verificación GPS de cada checkpoint, timeline de marcaciones y Trust Score auditable en tiempo real. Tecnología propia operando sobre la operación de Gard.",
    url: "https://www.gard.cl/control-rondas-gps",
    siteName: "Gard Security",
    locale: "es_CL",
    type: "article",
  },
};

const breadcrumbs = [
  { name: "Inicio", url: "https://www.gard.cl" },
  { name: "Tecnología", url: "https://www.gard.cl/tecnologia-seguridad" },
  {
    name: "Control de Rondas GPS",
    url: "https://www.gard.cl/control-rondas-gps",
  },
];

const caracteristicas = [
  {
    icon: MapPin,
    title: "Checkpoints verificados por GPS",
    desc: "Cada guardia marca cada punto de ronda con su celular; OPAI verifica coordenadas, hora y foto de evidencia. Sin marcaciones falsas.",
  },
  {
    icon: Clock,
    title: "Timeline de marcaciones en vivo",
    desc: "Supervisión ve en tiempo real qué ronda se está ejecutando, qué checkpoints quedan y cuántos se cumplieron ok vs. fuera de tiempo.",
  },
  {
    icon: Shield,
    title: "Trust Score auditable",
    desc: "Cada guardia y cada turno tiene un Trust Score entre 0 y 100 basado en puntualidad, cumplimiento de ronda y calidad de evidencia. Reportable a auditoría.",
  },
];

export default function ControlRondasGpsPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <GardHero
        title="Control de Rondas GPS para Guardias de Seguridad"
        subtitle="Verificación en vivo de cada checkpoint, Trust Score auditable y timeline de marcaciones. Tecnología propia operando hoy sobre la operación real de Gard."
        ctaTexto="Solicitar demo"
        ctaHref="#cotizar"
        imageId={OPAI_IMAGES.mapaRondas.id}
        badge={{ icon: <MapPin className="h-4 w-4" />, text: "OPAI · Rondas GPS" }}
        overlay
      />

      <div className="gard-container pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="gard-section py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-heading-2 mb-4">
              Operación en vivo, sin llamadas ni Excel
            </h2>
            <p className="text-body-lg text-muted-foreground">
              El supervisor ve desde cualquier dispositivo la posición GPS de
              cada guardia, el avance de rondas por puesto y alertas de
              desviación — todo desde OPAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {caracteristicas.map(({ icon: Icon, title, desc }) => (
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
              imageId={OPAI_IMAGES.mapaRondas.id}
              alt={OPAI_IMAGES.mapaRondas.alt}
              width={OPAI_IMAGES.mapaRondas.width}
              height={OPAI_IMAGES.mapaRondas.height}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-[hsl(var(--gard-background-darker))]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-heading-2 mb-6">
            ¿Por qué control de rondas GPS propio y no un software externo?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Porque OPAI no es un add-on que contratamos. Es el ERP que
            desarrollamos junto a LX3.ai para operar Gard Security, y cada
            mejora se prueba primero en nuestra propia operación antes de
            llegar a tus instalaciones.
          </p>
          <ul className="text-left max-w-2xl mx-auto space-y-4 mb-10">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-0.5 shrink-0" />
              <p className="text-body-base">
                <strong>Integrado con pauta, payroll y cumplimiento:</strong>{" "}
                no duplicas datos entre sistemas.
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-0.5 shrink-0" />
              <p className="text-body-base">
                <strong>Acceso para el cliente:</strong> tu equipo ve las
                rondas en su propio portal, no en el nuestro.
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-[hsl(var(--gard-accent))] mr-3 mt-0.5 shrink-0" />
              <p className="text-body-base">
                <strong>Evidencia exportable:</strong> PDF, Excel o API para
                auditoría y compliance.
              </p>
            </li>
          </ul>
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
