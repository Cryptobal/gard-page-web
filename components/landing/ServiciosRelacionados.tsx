'use client';

import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { services } from '@/app/data/services';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiciosRelacionadosProps {
  /** Slug del servicio actual a excluir de los resultados */
  excludeSlug?: string;
  /** Número de servicios a mostrar (por defecto 4) */
  limit?: number;
  /** Título de la sección (opcional) */
  title?: string;
  /** Descripción de la sección (opcional) */
  description?: string;
  /** Clase CSS personalizada para el contenedor */
  className?: string;
  /** Servicios específicos a mostrar (basado en recommendedServices de industrias) */
  recommendedServices?: Array<{ name: string; slug: string; description: string }>;
}

export default function ServiciosRelacionados({
  excludeSlug,
  limit = 4,
  title = 'Nuestros Servicios',
  description = 'Soluciones de seguridad adaptadas a las necesidades de tu empresa',
  className = '',
  recommendedServices
}: ServiciosRelacionadosProps) {
  let serviciosParaMostrar;

  if (recommendedServices && recommendedServices.length > 0) {
    // Si se proporcionan servicios recomendados, usarlos
    serviciosParaMostrar = recommendedServices.slice(0, limit).map(recService => {
      // Buscar el servicio completo en services para obtener la imagen
      const fullService = services.find(s => s.href.includes(recService.slug));
      return {
        name: recService.name,
        description: recService.description,
        href: `/servicios/${recService.slug}`,
        imageId: fullService?.imageId || services[0].imageId // fallback a la primera imagen
      };
    });
  } else {
    // Si no, usar los servicios generales excluyendo el actual
    serviciosParaMostrar = services
      .filter((service) => {
        if (!excludeSlug) return true;
        return !service.href.includes(excludeSlug);
      })
      .slice(0, limit);
  }

  if (serviciosParaMostrar.length === 0) {
    return null;
  }

  return (
    <section className={`gard-section py-16 md:py-20 bg-white dark:bg-gray-950 ${className}`}>
      <div className="gard-container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:text-accent mb-4">
            <ShieldCheck className="h-4 w-4 mr-2" />
            <span>Servicios de Seguridad</span>
          </div>
          <h2 className="text-heading-2 mb-4">{title}</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviciosParaMostrar.map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="group gard-card bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <CloudflareImage
                  imageId={service.imageId}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Nombre en overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* Descripción y CTA */}
              <div className="p-5 flex flex-col flex-grow bg-background">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <span className="text-sm font-medium text-primary dark:text-accent group-hover:text-primary transition-colors">
                    Ver detalles
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary dark:text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enlace a ver todos los servicios */}
        <div className="text-center mt-10">
          <Link
            href="/servicios"
            className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline"
          >
            Ver todos los servicios
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

