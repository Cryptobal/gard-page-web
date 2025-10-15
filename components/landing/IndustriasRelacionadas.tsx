'use client';

import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { industries } from '@/app/data/industries';
import { ArrowRight, Factory } from 'lucide-react';

interface IndustriasRelacionadasProps {
  /** Slug de la industria actual a excluir de los resultados */
  excludeSlug?: string;
  /** Número de industrias a mostrar (por defecto 4) */
  limit?: number;
  /** Título de la sección (opcional) */
  title?: string;
  /** Descripción de la sección (opcional) */
  description?: string;
  /** Clase CSS personalizada para el contenedor */
  className?: string;
}

export default function IndustriasRelacionadas({
  excludeSlug,
  limit = 4,
  title = 'Explora Otras Industrias',
  description = 'Descubre cómo protegemos diferentes sectores empresariales en Chile',
  className = ''
}: IndustriasRelacionadasProps) {
  // Filtrar la industria actual y limitar resultados
  const industriasParaMostrar = industries
    .filter((industry) => {
      // Convertir nombre a slug para comparar
      const industrySlug = industry.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
      return industrySlug !== excludeSlug;
    })
    .slice(0, limit);

  if (industriasParaMostrar.length === 0) {
    return null;
  }

  return (
    <section className={`gard-section py-16 md:py-20 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="gard-container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:text-accent mb-4">
            <Factory className="h-4 w-4 mr-2" />
            <span>Soluciones por Industria</span>
          </div>
          <h2 className="text-heading-2 mb-4">{title}</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriasParaMostrar.map((industry) => {
            // Convertir nombre a slug para el enlace
            const industrySlug = industry.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/\s+/g, '-');

            return (
              <Link
                key={industry.name}
                href={`/industrias/${industrySlug}`}
                className="group gard-card bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Imagen */}
                <div className="relative h-48 overflow-hidden">
                  <CloudflareImage
                    imageId={industry.imageId}
                    alt={`Seguridad para ${industry.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Nombre en overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {industry.name}
                    </h3>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-4 flex items-center justify-between bg-background border-t border-border">
                  <span className="text-sm font-medium text-primary dark:text-accent group-hover:text-primary transition-colors">
                    Ver soluciones
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary dark:text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Enlace a ver todas las industrias */}
        <div className="text-center mt-10">
          <Link
            href="/industrias"
            className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline"
          >
            Ver todas las industrias
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

