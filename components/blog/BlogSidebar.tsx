'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { industries } from '@/app/data/industries';
import { services } from '@/app/data/services';
import { TrendingUp, Factory, ShieldCheck, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  imageId?: string;
}

interface BlogSidebarProps {
  /** Slug del post actual para excluirlo de posts populares */
  currentSlug?: string;
  /** Tags del post actual para mostrar relacionados */
  currentTags?: string[];
}

export default function BlogSidebar({ currentSlug, currentTags = [] }: BlogSidebarProps) {
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Error al cargar posts');
        
        const { posts } = await response.json();
        
        // Filtrar el post actual y tomar los 5 más recientes
        const filteredPosts = posts
          .filter((post: BlogPost) => post.slug !== currentSlug)
          .slice(0, 5);
        
        setPopularPosts(filteredPosts);

        // Extraer todos los tags únicos
        const tagsSet = new Set<string>();
        posts.forEach((post: BlogPost) => {
          post.tags?.forEach(tag => tagsSet.add(tag));
        });
        setAllTags(Array.from(tagsSet).slice(0, 10)); // Limitar a 10 tags
        
      } catch (error) {
        console.error('Error cargando posts para sidebar:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [currentSlug]);

  // Seleccionar 3 industrias aleatorias
  const industriasAleatorias = industries
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Seleccionar 3 servicios aleatorios
  const serviciosAleatorios = services
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (loading) {
    return (
      <aside className="space-y-8">
        {/* Skeleton loader */}
        <div className="bg-background rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Posts Populares */}
      {popularPosts.length > 0 && (
        <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-primary dark:text-accent mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Artículos Recientes</h3>
          </div>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex gap-3">
                  {post.imageId && (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <CloudflareImage
                        imageId={post.imageId}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(post.date).toLocaleDateString('es-CL', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-block mt-4 text-sm font-medium text-primary dark:text-accent hover:underline"
          >
            Ver todos los artículos →
          </Link>
        </div>
      )}

      {/* Industrias */}
      <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center mb-4">
          <Factory className="h-5 w-5 text-primary dark:text-accent mr-2" />
          <h3 className="text-lg font-semibold text-foreground">Explora por Industria</h3>
        </div>
        <div className="space-y-2">
          {industriasAleatorias.map((industry) => {
            const industrySlug = industry.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/\s+/g, '-');

            return (
              <Link
                key={industry.name}
                href={`/industrias/${industrySlug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                  <CloudflareImage
                    imageId={industry.imageId}
                    alt={industry.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors">
                  {industry.name}
                </span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/industrias"
          className="inline-block mt-4 text-sm font-medium text-primary dark:text-accent hover:underline"
        >
          Ver todas las industrias →
        </Link>
      </div>

      {/* Servicios */}
      <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center mb-4">
          <ShieldCheck className="h-5 w-5 text-primary dark:text-accent mr-2" />
          <h3 className="text-lg font-semibold text-foreground">Nuestros Servicios</h3>
        </div>
        <div className="space-y-2">
          {serviciosAleatorios.map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="block p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors mb-1">
                {service.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/servicios"
          className="inline-block mt-4 text-sm font-medium text-primary dark:text-accent hover:underline"
        >
          Ver todos los servicios →
        </Link>
      </div>

      {/* Tags Populares */}
      {allTags.length > 0 && (
        <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center mb-4">
            <Tag className="h-5 w-5 text-primary dark:text-accent mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Temas Populares</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="inline-block px-3 py-1 text-xs font-medium bg-muted text-foreground rounded-full hover:bg-primary hover:text-white dark:hover:bg-accent transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

