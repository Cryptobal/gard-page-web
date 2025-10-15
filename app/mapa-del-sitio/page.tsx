import { Metadata } from 'next';
import Link from 'next/link';
import { Factory, ShieldCheck, FileText, Home, Users, Phone, Briefcase, Scale } from 'lucide-react';
import { industriesMetadata } from '@/app/industrias/industryMetadata';
import { services } from '@/app/data/services';

export const metadata: Metadata = {
  title: 'Mapa del Sitio | Gard Security',
  description: 'Encuentra rápidamente todas las páginas, servicios, industrias y artículos de Gard Security.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.gard.cl/mapa-del-sitio',
  },
};

// Importar función de blog
import { getAllPosts } from '@/lib/blog';

// Función para obtener los últimos posts del blog
async function getRecentPosts() {
  try {
    // Usar la función directa en lugar de fetch para evitar problemas en build time
    const posts = await getAllPosts();
    return posts.slice(0, 50); // Últimos 50 posts
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}

export default async function MapaDelSitioPage() {
  const recentPosts = await getRecentPosts();

  // Páginas principales
  const mainPages = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros', icon: Users },
    { name: 'Contacto', href: '/contacto', icon: Phone },
    { name: 'Cotizar', href: '/cotizar', icon: Briefcase },
    { name: 'Reclutamiento', href: '/reclutamiento', icon: Users },
  ];

  // Páginas legales
  const legalPages = [
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Términos de Servicio', href: '/terminos' },
    { name: 'Política Ambiental', href: '/politica-ambiental' },
    { name: 'Canal de Denuncias – Ley Karin', href: '/ley-karin' },
    { name: 'Código de Ética y Conducta', href: '/codigo-etica' },
    { name: 'Programa de Cumplimiento y Política Anticorrupción', href: '/programa-cumplimiento' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 dark:from-gray-900 dark:to-gray-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mapa del Sitio
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Encuentra rápidamente todas las páginas, servicios, industrias y artículos de Gard Security
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Páginas Principales */}
          <div>
            <div className="flex items-center mb-6">
              <Home className="h-6 w-6 text-primary dark:text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Páginas Principales</h2>
            </div>
            <ul className="space-y-3 bg-background rounded-xl p-6 shadow-sm border border-border">
              {mainPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="flex items-center text-foreground hover:text-primary dark:hover:text-accent transition-colors group"
                  >
                    <page.icon className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary dark:group-hover:text-accent" />
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Páginas Legales */}
          <div>
            <div className="flex items-center mb-6">
              <Scale className="h-6 w-6 text-primary dark:text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Legal y Cumplimiento</h2>
            </div>
            <ul className="space-y-3 bg-background rounded-xl p-6 shadow-sm border border-border">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-foreground hover:text-primary dark:hover:text-accent transition-colors block"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <div className="flex items-center mb-6">
              <ShieldCheck className="h-6 w-6 text-primary dark:text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Servicios</h2>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <Link
                href="/servicios"
                className="text-primary dark:text-accent font-medium hover:underline mb-4 block"
              >
                Ver todos los servicios →
              </Link>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-foreground hover:text-primary dark:hover:text-accent transition-colors block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Industrias */}
          <div>
            <div className="flex items-center mb-6">
              <Factory className="h-6 w-6 text-primary dark:text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Industrias</h2>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <Link
                href="/industrias"
                className="text-primary dark:text-accent font-medium hover:underline mb-4 block"
              >
                Ver todas las industrias →
              </Link>
              <ul className="space-y-3">
                {industriesMetadata.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industrias/${industry.slug}`}
                      className="text-foreground hover:text-primary dark:hover:text-accent transition-colors block"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Blog - Full Width */}
        {recentPosts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary dark:text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Blog</h2>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <Link
                href="/blog"
                className="text-primary dark:text-accent font-medium hover:underline mb-4 block"
              >
                Ver todos los artículos →
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentPosts.map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="text-sm text-foreground hover:text-primary dark:hover:text-accent transition-colors block p-3 rounded-lg hover:bg-muted"
                  >
                    <span className="font-medium">{post.title}</span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {new Date(post.date).toLocaleDateString('es-CL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

