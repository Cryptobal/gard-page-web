'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Building2, MapPin, Briefcase, FileText } from 'lucide-react';
import { ciudadesNav } from '@/lib/data/navigation';
import { useGtmEvent } from '@/app/components/EventTracker';
import type { SheetKey } from './MobileNavSheet';

// Slugs de ciudad para detectar rutas ciudad×servicio (`/[ciudad]/[servicio]`).
const CIUDAD_SLUGS = new Set(ciudadesNav.map((c) => c.href.split('/')[1]));

function isCoberturaActive(pathname: string): boolean {
  if (pathname === '/ciudades' || pathname.startsWith('/ciudades/')) return true;
  const firstSegment = pathname.split('/')[1] ?? '';
  return CIUDAD_SLUGS.has(firstSegment);
}

const SLOT_BASE =
  'relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70';

interface MobileTabBarProps {
  pathname: string;
  activeSheet: SheetKey | null;
  onOpenSheet: (key: SheetKey, trigger: HTMLElement | null) => void;
}

export default function MobileTabBar({
  pathname,
  activeSheet,
  onOpenSheet,
}: MobileTabBarProps) {
  const { pushEvent } = useGtmEvent();

  const serviciosActive = pathname.startsWith('/servicios');
  const industriasActive = pathname.startsWith('/industrias');
  const cotizarActive =
    pathname === '/cotizar' || pathname.startsWith('/cotizar/');
  const coberturaActive = isCoberturaActive(pathname);
  const trabajoActive =
    pathname === '/reclutamiento' || pathname.startsWith('/reclutamiento/');

  const sheetSlot = (
    key: Exclude<SheetKey, 'menu'>,
    label: string,
    Icon: LucideIcon,
    active: boolean,
  ) => (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={activeSheet === key}
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        onOpenSheet(key, e.currentTarget);
        pushEvent({ name: 'open_nav_sheet', params: { sheet: key } });
      }}
      className={`${SLOT_BASE} ${active ? 'text-white' : 'text-white/70'}`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );

  return (
    <nav
      aria-label="Navegación principal"
      className="gard-shell-tabbar gard-glass flex items-stretch justify-around"
    >
      {sheetSlot('servicios', 'Servicios', ShieldCheck, serviciosActive)}
      {sheetSlot('industrias', 'Industrias', Building2, industriasActive)}

      {/* Slot 3 — Cotizar (acción principal, botón elevado naranja).
          Enlaza directo al formulario para minimizar la navegación. */}
      <Link
        href="/cotizar#formulario-cotizacion"
        aria-current={cotizarActive ? 'page' : undefined}
        onClick={() =>
          pushEvent({
            name: 'click_cta_primary',
            params: { cta_text: 'Cotizar', cta_location: 'mobile_tabbar' },
          })
        }
        className={`${SLOT_BASE} text-white`}
      >
        <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--gard-accent-bright))] text-white shadow-lg shadow-black/40 ring-4 ring-[hsl(var(--gard-glass-tint))]">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="-mt-1">Cotizar</span>
      </Link>

      {sheetSlot('cobertura', 'Cobertura', MapPin, coberturaActive)}

      {/* Slot 5 — Trabajo: desvía postulantes al formulario de reclutamiento
          (evita que escriban al canal comercial por WhatsApp). */}
      <Link
        href="/reclutamiento"
        rel="nofollow"
        aria-current={trabajoActive ? 'page' : undefined}
        aria-label="Postular como guardia de seguridad"
        onClick={() =>
          pushEvent({
            name: 'click_cta_secondary',
            params: {
              cta_text: 'Trabajo',
              cta_location: 'mobile_tabbar',
            },
          })
        }
        className={`${SLOT_BASE} ${trabajoActive ? 'text-white' : 'text-white/70'}`}
      >
        <Briefcase className="h-5 w-5" aria-hidden="true" />
        <span>Trabajo</span>
      </Link>
    </nav>
  );
}
