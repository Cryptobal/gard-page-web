"use client";

// Exit-intent popup — Sprint 2.
// Detecta cuando el cursor sale por arriba del viewport (intent de cerrar
// pestaña / ir atrás) en páginas de servicios/ciudades/industrias y ofrece
// recuperar al usuario hacia /cotizar?v=multistep.
//
// Reglas:
// - Solo desktop (>= 768px).
// - Una vez por sesión (sessionStorage).
// - Solo después de 15s en la página (evita falsos positivos al entrar).
// - No se muestra en /cotizar, /cotizador-inteligente, /portal-cliente,
//   /reclutamiento, /admin (paths donde el usuario ya está en flujo de
//   conversión o no es target).

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SESSION_KEY = 'gard_exit_popup_shown';
const MIN_TIME_ON_PAGE_MS = 15_000;
const NEVER_SHOW_PREFIXES = ['/cotizar', '/cotizador-inteligente', '/portal-cliente', '/reclutamiento', '/admin'];

function shouldShowOnPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return !NEVER_SHOW_PREFIXES.some((p) => pathname.startsWith(p));
}

function track(event: string, pathname: string | null) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, page_path: pathname || '' });
  } catch {
    // tracking no debe romper el render
  }
}

export default function ExitIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const eligible = shouldShowOnPath(pathname);

  useEffect(() => {
    if (!eligible) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;

    const startedAt = Date.now();

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return;
      if (Date.now() - startedAt < MIN_TIME_ON_PAGE_MS) return;
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
      sessionStorage.setItem(SESSION_KEY, '1');
      setOpen(true);
      track('exit_intent_shown', pathname);
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [eligible, pathname]);

  const dismiss = () => {
    setOpen(false);
    track('exit_intent_dismissed', pathname);
  };

  const convert = () => {
    setOpen(false);
    track('exit_intent_converted', pathname);
  };

  if (!eligible) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />
          <motion.div
            key="exit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md bg-card text-card-foreground rounded-2xl shadow-2xl border border-border p-6 md:p-8"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-3 right-3 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 id="exit-intent-title" className="text-xl md:text-2xl font-bold mb-2 pr-6">
              ¿Te gustaría una cotización personalizada en 60 segundos?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5">
              Completa 3 preguntas rápidas y un especialista te contacta hoy.
            </p>

            <div className="flex flex-col gap-2 mb-5">
              <Link
                href="/cotizar?v=multistep&utm_source=exit_intent"
                onClick={convert}
                className="inline-flex items-center justify-center w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 text-base transition-colors"
              >
                Cotizar ahora
              </Link>
              <Button type="button" variant="ghost" onClick={dismiss} className="rounded-xl">
                No, gracias
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4 text-xs text-muted-foreground border-t border-border/50">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>OS-10 Certificados</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Respuesta en menos de 1 hora</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-blue-600" />
                <span>Sin compromiso</span>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
