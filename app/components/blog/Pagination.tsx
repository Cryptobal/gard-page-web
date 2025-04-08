'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;
  
  // Función para generar la ruta de paginación
  const getPageHref = (pageNum: number): string => {
    if (pageNum === 1) return basePath;
    return `${basePath}/page/${pageNum}`;
  };
  
  // Calcular rango de páginas a mostrar
  const getPages = () => {
    const pages = [];
    const rangeStart = Math.max(1, currentPage - 2);
    const rangeEnd = Math.min(totalPages, currentPage + 2);
    
    // Comienzo (siempre mostrar página 1)
    if (rangeStart > 1) {
      pages.push(1);
      if (rangeStart > 2) pages.push('ellipsis-start');
    }
    
    // Páginas centrales
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Final (siempre mostrar la última página)
    if (rangeEnd < totalPages) {
      if (rangeEnd < totalPages - 1) pages.push('ellipsis-end');
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pages = getPages();
  
  return (
    <nav className="mt-12 flex justify-center" aria-label="Paginación">
      <ul className="inline-flex items-center gap-1 md:gap-2">
        {/* Botón Anterior */}
        <li>
          {currentPage > 1 ? (
            <Link 
              href={getPageHref(currentPage - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[rgba(15,15,15,0.7)] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/50 dark:bg-[rgba(15,15,15,0.3)] text-gray-400 dark:text-gray-600 cursor-not-allowed"
              aria-disabled="true"
            >
              <ChevronLeft className="h-5 w-5" />
            </span>
          )}
        </li>
        
        {/* Números de página */}
        {pages.map((page, index) => {
          // Renderizar puntos suspensivos
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="inline-flex h-10 w-10 items-center justify-center text-gray-500 dark:text-gray-400">
                  <MoreHorizontal className="h-5 w-5" />
                </span>
              </li>
            );
          }
          
          // Renderizar número de página
          const isCurrentPage = page === currentPage;
          
          return (
            <li key={`page-${page}`}>
              {isCurrentPage ? (
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.15)] text-primary dark:text-[hsl(var(--gard-accent))] font-semibold border border-primary/20 dark:border-[hsl(var(--gard-accent)/_0.3)]"
                  aria-current="page"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={getPageHref(page as number)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[rgba(15,15,15,0.7)] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors"
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}
        
        {/* Botón Siguiente */}
        <li>
          {currentPage < totalPages ? (
            <Link 
              href={getPageHref(currentPage + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[rgba(15,15,15,0.7)] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100/50 dark:bg-[rgba(15,15,15,0.3)] text-gray-400 dark:text-gray-600 cursor-not-allowed"
              aria-disabled="true"
            >
              <ChevronRight className="h-5 w-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
} 