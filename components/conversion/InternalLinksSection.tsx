import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { EnlaceInterno } from '@/lib/data/money-page-copy';

type InternalLinksSectionProps = {
  title: string;
  description: string;
  links: EnlaceInterno[];
};

export default function InternalLinksSection({
  title,
  description,
  links,
}: InternalLinksSectionProps) {
  if (links.length === 0) return null;

  return (
    <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="gard-container max-w-6xl mx-auto px-4">
        <div className="flex items-start gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-heading-2 mb-2 font-title">{title}</h2>
            <p className="text-body-lg text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="group bg-background rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary mb-2 font-title flex items-center gap-2">
                {enlace.titulo}
                <ArrowRight
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{enlace.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
