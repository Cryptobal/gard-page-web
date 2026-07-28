'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';

const SCROLL_THRESHOLD = 18;

const ICON_BTN =
  'flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

interface MobileTopBarProps {
  onOpenMenu: (trigger: HTMLElement | null) => void;
}

export default function MobileTopBar({ onOpenMenu }: MobileTopBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`gard-shell-topbar flex items-center justify-between gap-2 px-3 ${
        scrolled ? 'gard-glass' : 'gard-shell-topbar--float'
      }`}
    >
      <Link
        href="/"
        aria-label="Gard Security — Ir al inicio"
        className="flex items-center rounded px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <CloudflareImage
          imageId={cloudflareImages.logo.nav.night}
          alt="Gard Security"
          width={116}
          height={33}
          priority
        />
      </Link>

      <div className="flex items-center">
        <Link href="/blog" aria-label="Buscar en el blog" className={ICON_BTN}>
          <Search className="h-5 w-5" />
        </Link>
        <button
          type="button"
          aria-label="Abrir menú"
          aria-haspopup="dialog"
          className={ICON_BTN}
          onClick={(e) => onOpenMenu(e.currentTarget)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
