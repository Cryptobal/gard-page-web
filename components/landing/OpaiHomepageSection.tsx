import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import CloudflareImage from "@/components/CloudflareImage";
import { Button } from "@/components/ui/button";
import { OPAI_IMAGES } from "@/lib/data/opai-images";

/**
 * Sección "OPAI — ERP de seguridad privada" para la homepage.
 *
 * Muestra el dashboard del Portal Cliente como prueba visual del ERP propio
 * que usamos en Gard (desarrollado junto a LX3.ai), con link a la landing
 * `/tecnologia-seguridad` para mayor profundidad.
 */
export default function OpaiHomepageSection() {
  return (
    <section className="gard-section py-20 md:py-28 bg-gray-50 dark:bg-[hsl(var(--gard-background-darker))]">
      <div className="gard-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-[hsl(var(--gard-accent)/_0.15)] dark:text-[hsl(var(--gard-accent))] text-xs font-semibold mb-4">
              <Cpu className="h-3.5 w-3.5" />
              Tecnología propia · OPAI ERP
            </span>
            <h2 className="text-heading-2 mb-6">
              Cada cliente de Gard ve su operación en vivo, 24/7.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-6">
              OPAI es el ERP de seguridad privada que desarrollamos para nuestra
              propia operación y hoy ponemos a disposición de cada cliente.
              Cumplimiento diario, rondas GPS, Trust Score y actividad del
              equipo asignado — sin llamadas, sin Excel, sin sorpresas a fin
              de mes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-1" />
                <p className="text-body-base">
                  <strong>Visibilidad 24/7:</strong> dashboard propio con KPIs, cumplimiento y equipo en sitio.
                </p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-1" />
                <p className="text-body-base">
                  <strong>Rondas GPS verificadas:</strong> checkpoints con foto, timeline y Trust Score auditable.
                </p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary dark:text-[hsl(var(--gard-accent))] mr-2 shrink-0 mt-1" />
                <p className="text-body-base">
                  <strong>ERP completo:</strong> operaciones, personas, payroll, finanzas y cumplimiento conectados.
                </p>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/tecnologia-seguridad">
                  Conocer OPAI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link href="/control-rondas-gps">Ver rondas GPS</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-[hsl(var(--gard-background-darkest))]">
            <CloudflareImage
              imageId={OPAI_IMAGES.portalCliente.id}
              alt={OPAI_IMAGES.portalCliente.alt}
              width={OPAI_IMAGES.portalCliente.width}
              height={OPAI_IMAGES.portalCliente.height}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
