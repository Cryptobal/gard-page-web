'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import {
  serviciosNav,
  industriasNav,
  ciudadesNav,
  type NavItem,
} from '@/lib/data/navigation';
import { useGtmEvent } from '@/app/components/EventTracker';

export type SheetKey = 'servicios' | 'industrias' | 'cobertura' | 'menu';

// Menú general (botón "menú" de la top bar). Cifras verificables: 8 servicios
// (serviceMetadata) y 10 ciudades (companyStats.citiesCovered). Sin rama laboral.
const menuNav: NavItem[] = [
  { title: 'Servicios', href: '/servicios', desc: '8 servicios de seguridad para empresas.' },
  { title: 'Industrias', href: '/industrias', desc: 'Soluciones por sector.' },
  { title: 'Tecnología · OPAI', href: '/tecnologia-seguridad', desc: 'ERP propio de Gard Security.' },
  { title: 'Cobertura', href: '/ciudades', desc: '10 ciudades con cobertura operativa.' },
  { title: 'Sobre nosotros', href: '/sobre-nosotros', desc: 'Quiénes somos y cómo operamos.' },
  { title: 'Blog', href: '/blog', desc: 'Guías, análisis y novedades.' },
  { title: 'Contacto', href: '/contacto', desc: 'Hablemos de tu operación.' },
];

const SHEETS: Record<SheetKey, { title: string; items: NavItem[] }> = {
  servicios: { title: 'Servicios', items: serviciosNav },
  industrias: { title: 'Industrias', items: industriasNav },
  cobertura: { title: 'Cobertura', items: ciudadesNav },
  menu: { title: 'Menú', items: menuNav },
};

const FOCUSABLE =
  'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

interface MobileNavSheetProps {
  openKey: SheetKey | null;
  onClose: () => void;
  pathname: string;
}

export default function MobileNavSheet({
  openKey,
  onClose,
  pathname,
}: MobileNavSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { pushEvent } = useGtmEvent();

  // Foco atrapado, cierre por Escape y bloqueo de scroll del cuerpo.
  useEffect(() => {
    if (!openKey) return;
    const panel = panelRef.current;
    if (!panel) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );

    // Enfocar el primer elemento accionable del panel.
    const initial = getFocusables()[0];
    initial?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openKey, onClose]);

  if (!openKey) return null;

  const { title, items } = SHEETS[openKey];

  return (
    <div
      className="fixed inset-0 z-[60] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gard-sheet-title"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="gard-sheet-panel gard-glass absolute inset-x-0 bottom-0 flex max-h-[80vh] flex-col rounded-t-2xl pb-[env(safe-area-inset-bottom,0px)] text-white"
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <h2 id="gard-sheet-title" className="text-lg font-extrabold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="overflow-y-auto overscroll-contain px-2 pb-4">
          {items.map((item) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  onClick={() => {
                    pushEvent({
                      name: 'click_nav_sheet_item',
                      params: { sheet: openKey, href: item.href },
                    });
                    onClose();
                  }}
                  className={`flex flex-col gap-0.5 rounded-xl px-3 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    current ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-[15px] font-semibold leading-tight">
                    {item.title}
                  </span>
                  <span className="text-xs leading-snug text-white/60">
                    {item.desc}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {openKey === 'menu' && (
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
            <span className="text-sm text-white/70">Tema claro / oscuro</span>
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );
}
