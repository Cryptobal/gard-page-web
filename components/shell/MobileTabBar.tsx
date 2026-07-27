'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Building2, MapPin, MessageCircle, FileText } from 'lucide-react';
import { ciudadesNav } from '@/lib/data/navigation';
import { useGtmEvent } from '@/app/components/EventTracker';
import type { SheetKey } from './MobileNavSheet';

// Slugs de ciudad para detectar rutas ciudad×servicio (`/[ciudad]/[servicio]`).
const CIUDAD_SLUGS = new Set(ciudadesNav.map((c) => c.href.split('/')[1]));

// WhatsApp comercial (línea de ventas, distinta de la NAP y de la de RRHH).
// Número confirmado explícitamente por el usuario para el shell móvil.
const WHATSAPP_COMERCIAL = '56968727644';
const WHATSAPP_MSG = 'Hola, quiero cotizar un servicio de seguridad para mi empresa.';

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

      {/* Slot 3 — Cotizar (acción principal, botón elevado naranja) */}
      <Link
        href="/cotizar"
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

      {/* Slot 5 — WhatsApp comercial (reemplaza a «Llamar»: evita exponer la
          línea telefónica a llamados de postulantes; el texto es filtrable). */}
      <a
        href={`https://wa.me/${WHATSAPP_COMERCIAL}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        onClick={() =>
          pushEvent({
            name: 'click_whatsapp',
            params: { cta_location: 'mobile_tabbar' },
          })
        }
        className={`${SLOT_BASE} text-white/70`}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
