'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { industries } from '@/app/data/industries';
import { services } from '@/app/data/services';
import { Factory, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

interface ExplorarMasProps {
  /** Título personalizado de la sección */
  title?: string;
  /** Descripción personalizada de la sección */
  description?: string;
  /** Mostrar columna de industrias */
  showIndustrias?: boolean;
  /** Mostrar columna de servicios */
  showServicios?: boolean;
  /** Mostrar columna de blog */
  showBlog?: boolean;
  /** Número de elementos a mostrar por columna */
  limit?: number;
  /** Clase CSS personalizada */
  className?: string;
}

export default function ExplorarMas({
  title = 'Explora Más Contenido',
  description = 'Descubre nuestros servicios, industrias y artículos sobre seguridad privada',
  showIndustrias = true,
  showServicios = true,
  showBlog = true,
  limit = 5,
  className = ''
}: ExplorarMasProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showBlog) {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/blog/posts');
          if (!response.ok) throw new Error('Error al cargar posts');
          
          const { posts } = await response.json();
          setBlogPosts(posts.slice(0, limit));
        } catch (error) {
          console.error('Error cargando posts:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [showBlog, limit]);

  // Seleccionar industrias y servicios según el límite
  const industriasParaMostrar = industries.slice(0, limit);
  const serviciosParaMostrar = services.slice(0, limit);

  // Calcular número de columnas activas
  const activeColumns = [showIndustrias, showServicios, showBlog].filter(Boolean).length;
  const gridClass = activeColumns === 3 
    ? 'lg:grid-cols-3' 
    : activeColumns === 2 
    ? 'lg:grid-cols-2' 
    : 'lg:grid-cols-1';

  if (loading && showBlog) {
    return (
      <section className={`gard-section-sm bg-gray-50 dark:bg-gray-900 ${className}`}>
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`gard-section py-16 md:py-20 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="gard-container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4">{title}</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Grid de columnas */}
        <div className={`grid grid-cols-1 md:grid-cols-${activeColumns > 1 ? '2' : '1'} ${gridClass} gap-8`}>
          {/* Columna Industrias */}
          {showIndustrias && (
            <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center mb-6">
                <Factory className="h-6 w-6 text-primary dark:text-accent mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Industrias</h3>
              </div>
              <ul className="space-y-3">
                {industriasParaMostrar.map((industry) => {
                  const industrySlug = industry.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-');

                  return (
                    <li key={industry.name}>
                      <Link
                        href={`/industrias/${industrySlug}`}
                        className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors">
                          {industry.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary dark:group-hover:text-accent transition-all group-hover:translate-x-1" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/industrias"
                className="inline-flex items-center mt-6 text-primary dark:text-accent font-medium hover:underline"
              >
                Ver todas las industrias
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Columna Servicios */}
          {showServicios && (
            <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center mb-6">
                <ShieldCheck className="h-6 w-6 text-primary dark:text-accent mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Servicios</h3>
              </div>
              <ul className="space-y-3">
                {serviciosParaMostrar.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors">
                        {service.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary dark:group-hover:text-accent transition-all group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/servicios"
                className="inline-flex items-center mt-6 text-primary dark:text-accent font-medium hover:underline"
              >
                Ver todos los servicios
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Columna Blog */}
          {showBlog && blogPosts.length > 0 && (
            <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-primary dark:text-accent mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Blog</h3>
              </div>
              <ul className="space-y-3">
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary dark:group-hover:text-accent transition-all group-hover:translate-x-1 flex-shrink-0 ml-2" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/blog"
                className="inline-flex items-center mt-6 text-primary dark:text-accent font-medium hover:underline"
              >
                Ver todos los artículos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

