'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, X } from 'lucide-react';

const HIDDEN_PATHS = [
  '/reclutamiento',
  '/cotizar',
  '/contacto',
];

const HIDDEN_PREFIXES = [
  '/cotizar/',
  '/reclutamiento/',
];

const DISMISS_KEY = 'recruit_fab_dismissed_at';
const DISMISS_DAYS = 7;
const SHOW_AT_SCROLL_RATIO = 0.25;

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return ageDays < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export default function RecruitFloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(isDismissed());
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const ratio = scrollTop / docHeight;
      if (ratio >= SHOW_AT_SCROLL_RATIO) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [dismissed]);

  if (!pathname) return null;
  if (HIDDEN_PATHS.includes(pathname)) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (dismissed || !visible) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setDismissed(true);
  };

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-40 animate-fade-in">
      <Link
        href="/reclutamiento?via=fab&utm_source=fab&utm_medium=floating_cta"
        className="group flex items-center gap-2 pl-4 pr-2 py-3 rounded-full shadow-lg bg-[hsl(var(--gard-accent,222_84%_47%))] text-white text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-transform"
        aria-label="Postula a guardia de seguridad"
      >
        <Briefcase className="h-4 w-4" />
        <span>Trabaja con nosotros</span>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Ocultar"
          className="ml-1 h-6 w-6 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </Link>
    </div>
  );
}
