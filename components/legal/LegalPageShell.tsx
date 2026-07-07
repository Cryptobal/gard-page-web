import React from 'react';

type LegalPageShellProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

/**
 * Contenedor estándar para páginas legales.
 * Compensa el header fijo (incl. safe-area en iOS) y evita scroll horizontal en móvil.
 */
export function LegalPageShell({
  children,
  className = 'bg-gray-50 dark:bg-gray-900',
  containerClassName = 'max-w-4xl',
}: LegalPageShellProps) {
  return (
    <article
      className={`legal-page-shell min-h-screen pb-16 md:pb-24 overflow-x-hidden touch-pan-y ${className}`}
    >
      <div className={`gard-container ${containerClassName} mx-auto px-4 overflow-x-hidden break-words`}>
        {children}
      </div>
    </article>
  );
}

type LegalPageTitleProps = {
  title: string;
  subtitle?: React.ReactNode;
};

export function LegalPageTitle({ title, subtitle }: LegalPageTitleProps) {
  return (
    <header className="legal-page-title mb-8 md:mb-10 text-center">
      <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 text-primary dark:text-accent font-title break-words px-1">
        {title}
      </h1>
      {subtitle ? <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 break-words">{subtitle}</div> : null}
    </header>
  );
}
