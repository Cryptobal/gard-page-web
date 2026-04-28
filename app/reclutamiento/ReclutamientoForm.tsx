'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Loader2, Send, CheckCircle, MessageCircle, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { API_URLS } from '@/app/config/api';
import { trackFormSubmission } from '@/lib/analytics/formTracking';
import {
  completeRutWithDv,
  formatRutForInput,
  isChileanRutFormat,
  isValidChileanRut,
  normalizeMobileNineDigits,
  normalizeRut,
} from '@/lib/postulacion-data';

const POSTULACION_TOKEN = 'opai-postulacion-2026';
const WHATSAPP_NUMBER = '56956062246';
const WHATSAPP_PREFILL = encodeURIComponent(
  'Hola, postulé a guardia por la web y quiero saber el estado.'
);

type SourceDetails = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  via?: string;
  ref?: string;
  referrer?: string;
  landingPath?: string;
  gclid?: string;
  fbclid?: string;
};

function deriveSource(d: SourceDetails): string {
  if (d.via === 'wa' || d.utmSource === 'whatsapp') return 'whatsapp';
  if (d.ref && d.ref.startsWith('adm_')) return 'whatsapp';
  if (d.ref && d.ref.startsWith('g_')) return 'referido_guardia';
  if (d.gclid || (d.utmSource === 'google' && d.utmMedium === 'cpc')) return 'google_ads';
  if (d.fbclid || d.utmSource === 'facebook' || d.utmSource === 'instagram') return 'meta_ads';
  if (d.referrer && /instagram\.com/i.test(d.referrer)) return 'instagram';
  if (d.referrer && /facebook\.com/i.test(d.referrer)) return 'facebook';
  if (d.referrer && /(google|bing|duckduckgo)\./i.test(d.referrer)) return 'web_organico';
  if (!d.referrer) return 'web_directo';
  return 'web_organico';
}

export default function ReclutamientoForm() {
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [rutError, setRutError] = useState<string | null>(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const sourceDetailsRef = useRef<SourceDetails>({});
  const referredByAdminIdRef = useRef<string | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    rut: '',
    phoneMobile: '',
    email: '',
    commune: '',
    tieneOs10: '' as '' | 'si' | 'no' | 'en_tramite',
  });

  // Capturar tracking de origen al montar
  useEffect(() => {
    const get = (k: string) => searchParams?.get(k) ?? undefined;
    const details: SourceDetails = {
      utmSource: get('utm_source'),
      utmMedium: get('utm_medium'),
      utmCampaign: get('utm_campaign'),
      utmContent: get('utm_content'),
      utmTerm: get('utm_term'),
      via: get('via'),
      ref: get('ref'),
      gclid: get('gclid'),
      fbclid: get('fbclid'),
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      landingPath:
        typeof sessionStorage !== 'undefined'
          ? sessionStorage.getItem('landing_path') ||
            (typeof window !== 'undefined' ? window.location.pathname : undefined)
          : undefined,
    };
    // Persistir landingPath en la sesión para que sobreviva navegación interna
    if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('landing_path') && typeof window !== 'undefined') {
      sessionStorage.setItem('landing_path', window.location.pathname);
    }
    sourceDetailsRef.current = details;
    // ref=adm_xxx significa que llegó por link WhatsApp de un reclutador
    if (details.ref && details.ref.startsWith('adm_')) {
      referredByAdminIdRef.current = details.ref.slice(4);
    }
  }, [searchParams]);

  const canSubmit = useMemo(() => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.rut.trim() &&
      form.phoneMobile.trim().length === 9 &&
      form.commune.trim() &&
      !rutError &&
      !saving
    );
  }, [form, rutError, saving]);

  const handleSubmit = async () => {
    setSubmitSuccess(null);
    setSubmitError(null);

    if (!form.firstName.trim() || !form.lastName.trim() || !form.commune.trim()) {
      setSubmitError('Completa nombre, apellido y comuna.');
      return;
    }
    if (form.phoneMobile.trim().length !== 9) {
      setSubmitError('El celular debe tener 9 dígitos.');
      return;
    }

    const completedRut = completeRutWithDv(form.rut);
    if (!isChileanRutFormat(completedRut) || !isValidChileanRut(completedRut)) {
      setRutError('RUT inválido. Verifica guión y dígito verificador.');
      setSubmitError('Corrige el RUT antes de enviar.');
      return;
    }
    setRutError(null);

    setSaving(true);
    try {
      const details = sourceDetailsRef.current;
      const source = deriveSource(details);

      const response = await fetch(API_URLS.POSTULACION_EXPRESS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: POSTULACION_TOKEN,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          rut: normalizeRut(completedRut),
          phoneMobile: normalizeMobileNineDigits(form.phoneMobile),
          email: form.email.trim() || null,
          commune: form.commune.trim(),
          tieneOs10: form.tieneOs10 || null,
          source,
          sourceDetails: details,
          referredByAdminId: referredByAdminIdRef.current,
        }),
      });
      const payload = await response.json();

      if (response.status === 409 || payload?.error === 'RUT_DUPLICADO') {
        setShowDuplicateModal(true);
        setSaving(false);
        return;
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'No se pudo enviar la postulación');
      }

      trackFormSubmission({ formType: 'reclutamiento' });
      setSubmitSuccess(
        'Recibimos tu postulación. Te contactaremos pronto por WhatsApp o teléfono.'
      );
      setForm({
        firstName: '',
        lastName: '',
        rut: '',
        phoneMobile: '',
        email: '',
        commune: '',
        tieneOs10: '',
      });
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          document
            .getElementById('postulacion-success')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } catch (error) {
      const msg = (error as Error)?.message || 'No se pudo enviar la postulación';
      if (/rut|root/i.test(msg)) {
        setShowDuplicateModal(true);
      } else {
        setSubmitError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        id="postulacion-success"
        className="bg-[hsl(var(--gard-card))] rounded-2xl p-8 shadow-lg border border-green-500/30 text-center space-y-4"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold">¡Postulación enviada!</h3>
        <p className="text-[hsl(var(--gard-muted-foreground))] max-w-md mx-auto">
          {submitSuccess}
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILL}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Hablar con RRHH por WhatsApp
        </a>
      </div>
    );
  }

  const inputClass =
    'w-full h-12 rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] px-3 text-base focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all';
  const labelClass =
    'block text-sm font-medium text-[hsl(var(--gard-muted-foreground))] mb-1.5';

  return (
    <>
      <div className="bg-[hsl(var(--gard-card))] rounded-2xl p-6 md:p-8 shadow-sm border border-[hsl(var(--gard-border))]">
        <h2 className="text-xl font-bold mb-1">Postula en menos de un minuto</h2>
        <p className="text-sm text-[hsl(var(--gard-muted-foreground))] mb-6">
          Solo necesitamos lo básico para empezar. El resto lo conversamos contigo cuando te
          llamemos.
        </p>

        {submitError && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 p-3 rounded-lg text-sm">
            {submitError}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input
                className={inputClass}
                placeholder="Tu nombre"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Apellido *</label>
              <input
                className={inputClass}
                placeholder="Tu apellido"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>RUT *</label>
              <input
                className={`${inputClass} ${rutError ? 'border-red-500 ring-red-500' : ''}`}
                placeholder="12345678-9"
                inputMode="text"
                value={form.rut}
                onChange={(e) =>
                  setForm((p) => ({ ...p, rut: formatRutForInput(e.target.value) }))
                }
                onBlur={() => {
                  const completed = completeRutWithDv(form.rut);
                  setForm((p) => ({ ...p, rut: completed }));
                  if (
                    completed &&
                    (!isChileanRutFormat(completed) || !isValidChileanRut(completed))
                  ) {
                    setRutError('RUT inválido.');
                  } else {
                    setRutError(null);
                  }
                }}
              />
              {rutError && <p className="text-xs text-red-500 mt-1">{rutError}</p>}
            </div>
            <div>
              <label className={labelClass}>Celular / WhatsApp * (9 dígitos)</label>
              <input
                className={inputClass}
                placeholder="912345678"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={9}
                value={form.phoneMobile}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    phoneMobile: normalizeMobileNineDigits(e.target.value).slice(0, 9),
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>Email (opcional)</label>
              <input
                className={inputClass}
                type="email"
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Comuna donde vives *</label>
              <input
                className={inputClass}
                placeholder="Ej: Maipú, Antofagasta…"
                autoComplete="address-level2"
                value={form.commune}
                onChange={(e) => setForm((p) => ({ ...p, commune: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>¿Tienes Certificado OS-10?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'si', label: 'Sí, vigente' },
                { value: 'en_tramite', label: 'En trámite' },
                { value: 'no', label: 'No tengo' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      tieneOs10: p.tieneOs10 === opt.value ? '' : (opt.value as typeof p.tieneOs10),
                    }))
                  }
                  className={`h-12 rounded-lg border text-sm font-medium transition-all ${
                    form.tieneOs10 === opt.value
                      ? 'border-[hsl(var(--gard-accent))] bg-[hsl(var(--gard-accent))]/10 text-[hsl(var(--gard-accent))]'
                      : 'border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] hover:border-[hsl(var(--gard-accent))]/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[hsl(var(--gard-muted-foreground))] mt-1.5">
              Es opcional — si no tienes OS-10 igual puedes postular.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full md:w-auto bg-[hsl(var(--gard-accent))] text-white h-12 px-8 rounded-xl font-semibold hover:bg-[hsl(var(--gard-accent))]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              {saving ? 'Enviando…' : 'Enviar postulación'}
            </button>
            <p className="text-xs text-[hsl(var(--gard-muted-foreground))] mt-3">
              Al enviar aceptas que te contactemos por WhatsApp, llamada o email para coordinar la
              entrevista.
            </p>
          </div>
        </div>
      </div>

      {showDuplicateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowDuplicateModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white dark:bg-[hsl(var(--gard-card))] rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
              onClick={() => setShowDuplicateModal(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="h-9 w-9 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Ya estás en nuestro sistema 👋</h3>
            <p className="text-sm text-[hsl(var(--gard-muted-foreground))] text-center mb-6">
              Tu RUT ya está registrado. Nuestro equipo de Recursos Humanos se pondrá en contacto
              contigo pronto. Si necesitas ayuda urgente, escríbenos por WhatsApp.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILL}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar con RRHH por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="h-11 rounded-lg border border-[hsl(var(--gard-border))] text-sm font-medium hover:bg-[hsl(var(--gard-accent))]/10"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
