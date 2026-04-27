"use client";

// Variante multi-step del CotizacionForm — sprint 1B.
// Reusa schema/helpers/onSubmit del CotizacionForm pero presenta el flujo
// como 4 pasos secuenciales de micro-commitment incremental.
//
// TODO(refactor): cuando una de las dos variantes gane el A/B, extraer
// el schema, helpers y onSubmit a un módulo compartido para evitar
// duplicación. Hoy es duplicación intencional para mantener
// CotizacionForm.tsx intacto durante el experimento.

import React, { useState, useEffect, useRef, RefCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ShieldCheck,
  Zap,
  Lock,
  ArrowLeft,
  Building2,
  Package,
  HardHat,
  ShoppingCart,
  Home,
  HelpCircle,
  Clock,
  Sun,
  Moon,
  Calendar,
  Users,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@googlemaps/js-api-loader';
import {
  buildDotacion,
  createDefaultQuickPuesto,
  type QuickPuesto,
  type DotacionApiItem,
} from './DotacionQuickBuilder';
import API_URLS from '@/app/config/api';
import { getPaginaWebFromEmail } from '@/lib/opaiPayload';
import { trackFormSubmission } from '@/lib/analytics/formTracking';
import { getABVariantClient } from '@/lib/ab-testing-client';

declare global {
  interface Window {
    google: any;
  }
}

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(2, { message: 'El apellido es obligatorio' }),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos numéricos' }),
  empresa: z.string().min(2, { message: 'La empresa es obligatoria' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria' }),
  comuna: z.string().optional(),
  ciudad: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  tipoIndustria: z.string().min(1, { message: 'Selecciona un tipo de industria' }),
  servicioRequerido: z.string().min(1),
  cotizacion: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  landing_page: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const OPAI_URL = process.env.NEXT_PUBLIC_OPAI_API_URL || 'https://opai.gard.cl';

// ─────────── Captura progresiva (partial_lead en localStorage) ───────────

const PARTIAL_LEAD_KEY = 'gard_partial_lead_v1';
const PARTIAL_LEAD_TTL_MS = 24 * 60 * 60 * 1000;

type PartialLeadSelections = {
  industriaId: string;
  industriaValue: string;
  cobertura: string;
  cantidadId: string;
  cantidad: number;
  needsHelpCantidad: boolean;
};

type PartialLead = {
  selections: PartialLeadSelections;
  timestamp: number;
};

function savePartialLead(selections: PartialLeadSelections) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PARTIAL_LEAD_KEY, JSON.stringify({ selections, timestamp: Date.now() }));
  } catch {
    // localStorage puede estar bloqueado (modo incógnito + cookies bloqueadas) — ignorar
  }
}

function getPartialLead(): PartialLead | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PARTIAL_LEAD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PartialLead;
    if (!parsed?.selections || typeof parsed.timestamp !== 'number') return null;
    if (Date.now() - parsed.timestamp > PARTIAL_LEAD_TTL_MS) {
      localStorage.removeItem(PARTIAL_LEAD_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function clearPartialLead() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PARTIAL_LEAD_KEY);
  } catch {
    // ignorar
  }
}

function buildWhatsAppCotizacionMessage(nombre: string, apellido: string, empresa: string, detalle?: string): string {
  const base = `Hola, ${nombre}. Soy ${nombre} ${apellido} de ${empresa}. Te envío una cotización y el detalle de la cotización.`;
  return detalle?.trim() ? `${base}\n\n${detalle.trim()}` : base;
}

type IndustriaChoice = {
  id: string;
  label: string;
  description: string;
  industriaValue: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const INDUSTRIA_CHOICES: IndustriaChoice[] = [
  { id: 'oficina', label: 'Oficina o edificio', description: 'Recepción, control de acceso, rondas internas', industriaValue: 'Corporativo y Oficinas', Icon: Building2 },
  { id: 'bodega', label: 'Bodega o logística', description: 'Centros de distribución, patios, perímetro', industriaValue: 'Transporte y Logística', Icon: Package },
  { id: 'faena', label: 'Faena o construcción', description: 'Obra, faena minera, instalaciones temporales', industriaValue: 'Minería y Energía', Icon: HardHat },
  { id: 'retail', label: 'Retail o comercio', description: 'Tienda, mall, centros comerciales', industriaValue: 'Retail y Centros Comerciales', Icon: ShoppingCart },
  { id: 'condominio', label: 'Condominio o residencia', description: 'Edificios residenciales, casas, comunidades', industriaValue: 'Condominios y Residencias', Icon: Home },
  { id: 'otro', label: 'Otro', description: 'Cuéntanos en el último paso', industriaValue: 'Otra', Icon: HelpCircle },
];

type CoberturaId = '24_7' | 'dia' | 'noche' | 'fin_semana' | 'no_seguro';

type CoberturaChoice = {
  id: CoberturaId;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
};

const COBERTURA_CHOICES: CoberturaChoice[] = [
  { id: '24_7', label: '24/7 — todo el día, todos los días', description: 'Cobertura permanente sin interrupciones', Icon: Clock },
  { id: 'dia', label: 'Solo de día', description: '08:00 a 20:00', Icon: Sun },
  { id: 'noche', label: 'Solo de noche', description: '20:00 a 08:00', Icon: Moon },
  { id: 'fin_semana', label: 'Fines de semana', description: 'Sábado y domingo, horario diurno', Icon: Calendar },
  { id: 'no_seguro', label: 'No estoy seguro — ayúdame a definir', description: 'Un especialista te asesora', Icon: HelpCircle, highlight: true },
];

type CantidadChoice = {
  id: string;
  label: string;
  description: string;
  cantidad: number;
  needsHelp?: boolean;
  highlight?: boolean;
};

const CANTIDAD_CHOICES: CantidadChoice[] = [
  { id: '1', label: '1 guardia', description: 'Cobertura puntual', cantidad: 1 },
  { id: '2-3', label: '2 a 3 guardias', description: 'Operación pequeña', cantidad: 2 },
  { id: '4-6', label: '4 a 6 guardias', description: 'Operación mediana', cantidad: 4 },
  { id: '7+', label: '7 o más guardias', description: 'Operación grande', cantidad: 7 },
  { id: 'help', label: 'Ayúdame a calcular', description: 'Un especialista evalúa la dotación contigo', cantidad: 0, needsHelp: true, highlight: true },
];

const STEP_LABELS = [
  '¿Qué necesitas proteger?',
  '¿Qué cobertura necesitas?',
  '¿Cuántos guardias aproximadamente?',
  'Último paso — datos de contacto',
];

function trackStep(step: number, action: 'completed' | 'exposure' | 'submit', extra?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action === 'completed' ? 'cotiz_step_completed' : action === 'exposure' ? 'cotiz_step_exposure' : 'cotiz_submit',
      step_number: step,
      variant: 'multistep',
      ...extra,
    });
  } catch {
    // tracking debe ser no-bloqueante
  }
}

function buildQuickPuestoFromCobertura(cobertura: CoberturaId, cantidad: number): QuickPuesto[] {
  if (cobertura === 'no_seguro' || cantidad <= 0) return [];
  const base = createDefaultQuickPuesto();
  switch (cobertura) {
    case '24_7':
      return [{ ...base, dias: 'toda_semana', jornada: '24h', turno: 'dia', cantidad }];
    case 'dia':
      return [{ ...base, dias: 'toda_semana', jornada: '12h', turno: 'dia', cantidad }];
    case 'noche':
      return [{ ...base, dias: 'toda_semana', jornada: '12h', turno: 'noche', cantidad }];
    case 'fin_semana':
      return [{ ...base, dias: 'fin_semana', jornada: '12h', turno: 'dia', cantidad }];
    default:
      return [];
  }
}

// ─────────── Sub-components ───────────

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        {Array.from({ length: total }).map((_, i) => {
          const done = i + 1 <= current;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                done ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-muted'
              }`}
            />
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Paso {current} de {total} · {label}
      </p>
    </div>
  );
}

function ChoiceCard({
  Icon,
  label,
  description,
  onClick,
  selected,
  highlight,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left rounded-xl border-2 p-4 md:p-5 transition-all flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 ${
        selected
          ? 'border-teal-500 bg-teal-500/5'
          : highlight
            ? 'border-amber-300/60 bg-amber-50/40 hover:border-amber-400 dark:bg-amber-900/10'
            : 'border-border hover:border-teal-500/60'
      }`}
    >
      <span
        className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
          selected
            ? 'bg-teal-500 text-white'
            : highlight
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-300'
              : 'bg-muted text-foreground group-hover:bg-teal-500/10 group-hover:text-teal-600'
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-base font-semibold text-foreground">{label}</span>
        <span className="block text-sm text-muted-foreground mt-0.5">{description}</span>
      </span>
    </button>
  );
}

function StepNav({ onBack }: { onBack: () => void }) {
  return (
    <div className="pt-4 mt-6 border-t border-border/50">
      <Button type="button" variant="ghost" onClick={onBack} className="rounded-xl">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Atrás
      </Button>
    </div>
  );
}

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

// ─────────── Main component ───────────

interface CotizacionFormMultiStepProps {
  prefillServicio?: string;
  prefillIndustria?: string;
}

export default function CotizacionFormMultiStep({ prefillServicio, prefillIndustria }: CotizacionFormMultiStepProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<{
    industriaId: string;
    industriaValue: string;
    cobertura: CoberturaId | '';
    cantidadId: string;
    cantidad: number;
    needsHelpCantidad: boolean;
  }>({
    industriaId: '',
    industriaValue: '',
    cobertura: '',
    cantidadId: '',
    cantidad: 0,
    needsHelpCantidad: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [lastSuccessData, setLastSuccessData] = useState<{ nombre: string; apellido: string; empresa: string; cotizacion: string } | null>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [partialLead, setPartialLead] = useState<PartialLead | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      empresa: '',
      direccion: '',
      comuna: '',
      ciudad: '',
      latitude: undefined,
      longitude: undefined,
      tipoIndustria: '',
      servicioRequerido: 'guardias_seguridad',
      cotizacion: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      landing_page: '',
    },
  });

  const { setValue } = form;

  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // UTM + landing capture (replicado de CotizacionForm)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedIndustry = prefillIndustria || sessionStorage.getItem('user_industry') || '';
    if (savedIndustry) setValue('tipoIndustria', savedIndustry);

    if (prefillServicio) {
      const cotizacionInicial = `Estoy interesado en contratar servicios de ${prefillServicio}`;
      setValue('cotizacion', cotizacionInicial);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    trackingParams.forEach((param) => {
      const value = urlParams.get(param) || localStorage.getItem(param) || sessionStorage.getItem(param) || '';
      if (value) {
        setValue(param as keyof FormValues, value);
        localStorage.setItem(param, value);
        sessionStorage.setItem(param, value);
      }
    });

    const landing = window.location.pathname;
    setValue('landing_page', landing);
    localStorage.setItem('landing_page', landing);
    sessionStorage.setItem('landing_page', landing);
  }, [setValue, prefillServicio, prefillIndustria]);

  // Step exposure tracking
  useEffect(() => {
    trackStep(currentStep, 'exposure');
  }, [currentStep]);

  // Detectar partial lead pendiente al montar
  useEffect(() => {
    const pending = getPartialLead();
    if (pending) {
      setPartialLead(pending);
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'cotiz_partial_lead_detected', variant: 'multistep' });
      }
    }
  }, []);

  // Persistir selecciones al llegar al paso 4 (antes de capturar datos personales)
  useEffect(() => {
    if (currentStep !== 4) return;
    if (!selections.industriaValue) return;
    savePartialLead(selections);
  }, [currentStep, selections]);

  // A/B test exposure (Sprint 3) — emite una vez al montar el componente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cotizar_exposure',
      ab_variant: getABVariantClient(),
      variant_rendered: 'multistep',
    });
  }, []);

  // Google Maps loader (solo cuando se llega a step 4)
  useEffect(() => {
    if (currentStep !== 4) return;
    if (mapLoaded) return;
    const loader = new Loader({
      apiKey: 'AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY',
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => setMapLoaded(true)).catch((error) => {
      console.error('Error cargando Google Maps API:', error);
    });
  }, [currentStep, mapLoaded]);

  // Google Maps autocomplete
  useEffect(() => {
    if (!mapLoaded || !autocompleteInputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'cl' },
    });
    autocomplete.setOptions({ fields: ['formatted_address', 'geometry', 'address_components'] });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;
      setValue('direccion', place.formatted_address || '');
      let comuna = '';
      let ciudad = '';
      let region = '';
      place.address_components.forEach((component: any) => {
        const types = component.types;
        if (types.includes('locality')) ciudad = component.long_name;
        if (types.includes('administrative_area_level_1')) region = component.long_name;
        if (
          types.includes('administrative_area_level_3') ||
          types.includes('sublocality_level_1') ||
          types.includes('sublocality')
        ) {
          comuna = component.long_name;
        }
      });
      if (region && (region.includes('Metropolitana') || region.includes('Santiago'))) {
        ciudad = 'Santiago';
      }
      setValue('comuna', comuna);
      setValue('ciudad', ciudad);
      if (place.geometry && place.geometry.location) {
        setValue('latitude', place.geometry.location.lat());
        setValue('longitude', place.geometry.location.lng());
      }
    });
  }, [mapLoaded, setValue]);

  const goToStep = (next: number) => {
    setDirection(next > currentStep ? 1 : -1);
    setCurrentStep(next);
  };

  const handleIndustria = (choice: IndustriaChoice) => {
    setSelections((s) => ({ ...s, industriaId: choice.id, industriaValue: choice.industriaValue }));
    setValue('tipoIndustria', choice.industriaValue);
    trackStep(1, 'completed', { industria: choice.industriaValue });
    setTimeout(() => goToStep(2), 220);
  };

  const handleCobertura = (choice: CoberturaChoice) => {
    setSelections((s) => ({ ...s, cobertura: choice.id }));
    trackStep(2, 'completed', { cobertura: choice.id });
    setTimeout(() => goToStep(3), 220);
  };

  const handleCantidad = (choice: CantidadChoice) => {
    setSelections((s) => ({
      ...s,
      cantidadId: choice.id,
      cantidad: choice.cantidad,
      needsHelpCantidad: !!choice.needsHelp,
    }));
    trackStep(3, 'completed', { cantidad_bucket: choice.id });
    setTimeout(() => goToStep(4), 220);
  };

  const onSubmit = async (data: FormValues) => {
    if (honeypot) {
      setFormStatus('success');
      return;
    }

    try {
      setIsSubmitting(true);

      // Construir detalle automático con las elecciones de pasos 1-3
      const coberturaLabel = COBERTURA_CHOICES.find((c) => c.id === selections.cobertura)?.label || '';
      const cantidadLabel = CANTIDAD_CHOICES.find((c) => c.id === selections.cantidadId)?.label || '';
      const detalleParts = [
        data.cotizacion?.trim(),
        coberturaLabel ? `Cobertura: ${coberturaLabel}` : '',
        cantidadLabel ? `Dotación: ${cantidadLabel}` : '',
        selections.cobertura === 'no_seguro' ? 'Solicita asesoría para definir cobertura.' : '',
        selections.needsHelpCantidad ? 'Solicita asesoría para definir cantidad de guardias.' : '',
      ].filter(Boolean);
      const detalleBase = detalleParts.join(' · ');
      const detalleCompleto =
        detalleBase + (data.utm_source ? `\n\n[UTM: ${data.utm_source}/${data.utm_medium}/${data.utm_campaign}]` : '');
      const detalleTruncado = detalleCompleto.length > 5000 ? detalleCompleto.slice(0, 4997) + '...' : detalleCompleto;

      const quickPuestos = buildQuickPuestoFromCobertura(selections.cobertura as CoberturaId, selections.cantidad);
      let dotacionOpai: DotacionApiItem[] | undefined;
      if (quickPuestos.length > 0) {
        dotacionOpai = buildDotacion(quickPuestos);
      }

      const opaiPayload = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        celular: data.telefono,
        empresa: data.empresa,
        direccion: data.direccion,
        comuna: data.comuna || '',
        ciudad: data.ciudad || '',
        lat: data.latitude != null ? data.latitude : undefined,
        lng: data.longitude != null ? data.longitude : undefined,
        pagina_web: getPaginaWebFromEmail(data.email),
        industria: data.tipoIndustria,
        servicio: data.servicioRequerido,
        detalle: detalleTruncado,
        dotacion: dotacionOpai,
        source: 'web_cotizador' as const,
      };

      const MAX_RETRIES = 2;
      let lastError: unknown = null;
      let success = false;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          if (attempt > 0) await new Promise((r) => setTimeout(r, 1500 * attempt));
          const response = await fetch(API_URLS.COTIZACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opaiPayload),
          });
          if (response.ok) {
            success = true;
            setLastSuccessData({
              nombre: data.nombre,
              apellido: data.apellido,
              empresa: data.empresa,
              cotizacion: detalleBase,
            });
            setFormStatus('success');
            form.reset();
            clearPartialLead();
            setPartialLead(null);
            sessionStorage.removeItem('user_service');
            sessionStorage.removeItem('user_industry');
            const abVariant = getABVariantClient();
            trackFormSubmission({
              formType: 'cotizacion',
              additionalData: {
                tipo_industria: data.tipoIndustria,
                servicio_requerido: data.servicioRequerido,
                pagina_origen: window.location.pathname,
                form_variant: 'multistep',
                cobertura_seleccionada: selections.cobertura,
                cantidad_bucket: selections.cantidadId,
                ab_variant: abVariant,
              },
            });
            trackStep(4, 'submit', { industria: data.tipoIndustria, cobertura: selections.cobertura, ab_variant: abVariant });
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'cotizacion_submit',
              ab_variant: abVariant,
              form_variant: 'multistep',
            });
            break;
          }
          const errBody = await response.text().catch(() => '');
          lastError = new Error(`OPAI ${response.status}: ${errBody}`);
        } catch (err) {
          lastError = err;
        }
      }

      if (!success) {
        setFormStatus('error');
        setLastSuccessData(null);
        console.error('Error al enviar cotización a OPAI después de reintentos:', lastError);
      }
    } catch (error) {
      setFormStatus('error');
      setLastSuccessData(null);
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const restart = () => {
    setLastSuccessData(null);
    setFormStatus('idle');
    setSelections({
      industriaId: '',
      industriaValue: '',
      cobertura: '',
      cantidadId: '',
      cantidad: 0,
      needsHelpCantidad: false,
    });
    form.reset();
    setCurrentStep(1);
    setDirection(1);
  };

  const resumePartialLead = () => {
    if (!partialLead) return;
    const s = partialLead.selections;
    setSelections({
      industriaId: s.industriaId,
      industriaValue: s.industriaValue,
      cobertura: (s.cobertura as CoberturaId) || '',
      cantidadId: s.cantidadId,
      cantidad: s.cantidad,
      needsHelpCantidad: s.needsHelpCantidad,
    });
    setValue('tipoIndustria', s.industriaValue);
    setPartialLead(null);
    setDirection(1);
    setCurrentStep(4);
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'cotiz_partial_lead_resumed', variant: 'multistep' });
    }
  };

  const dismissPartialLead = () => {
    clearPartialLead();
    setPartialLead(null);
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'cotiz_partial_lead_dismissed', variant: 'multistep' });
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="bg-card rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-heading-4 text-primary mb-4">¡Tu solicitud ha sido enviada!</h2>
          <p className="text-body-base mb-6">Te contactaremos en menos de 1 hora en horario hábil.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-2">
            <a
              href={`https://wa.me/56982307771?text=${encodeURIComponent(
                lastSuccessData
                  ? buildWhatsAppCotizacionMessage(lastSuccessData.nombre, lastSuccessData.apellido, lastSuccessData.empresa, lastSuccessData.cotizacion)
                  : 'Hola. Te envío una cotización y el detalle de la cotización.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 gard-btn gard-btn-primary gard-btn-lg rounded-2xl hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="h-5 w-5 text-primary dark:text-accent" aria-hidden />
              Contactar por WhatsApp
            </a>
            <Button onClick={restart} variant="secondary" className="rounded-2xl">
              Enviar otra cotización
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <AnimatePresence>
        {partialLead && (
          <motion.div
            key="partial-lead-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mb-5 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700"
          >
            <p className="text-sm text-amber-900 dark:text-amber-200 mb-3">
              👋 Te quedaste en una cotización
              {partialLead.selections.industriaValue ? <> para <strong>{partialLead.selections.industriaValue}</strong></> : null}
              . ¿Continuamos donde lo dejaste?
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={resumePartialLead} className="rounded-xl">
                Sí, continuar
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={dismissPartialLead} className="rounded-xl">
                Empezar de cero
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressBar current={currentStep} total={4} label={STEP_LABELS[currentStep - 1]} />

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ─── Step 1 — Industria ─── */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold mb-1">¿Qué necesitas proteger?</h2>
              <p className="text-sm text-muted-foreground mb-4">Esto nos ayuda a personalizar tu cotización.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INDUSTRIA_CHOICES.map((c) => (
                  <ChoiceCard
                    key={c.id}
                    Icon={c.Icon}
                    label={c.label}
                    description={c.description}
                    onClick={() => handleIndustria(c)}
                    selected={selections.industriaId === c.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 2 — Cobertura ─── */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold mb-1">¿Qué cobertura necesitas?</h2>
              <p className="text-sm text-muted-foreground mb-4">Elige el horario que mejor se ajuste o pide ayuda para definirlo.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COBERTURA_CHOICES.map((c) => (
                  <ChoiceCard
                    key={c.id}
                    Icon={c.Icon}
                    label={c.label}
                    description={c.description}
                    onClick={() => handleCobertura(c)}
                    selected={selections.cobertura === c.id}
                    highlight={c.highlight}
                  />
                ))}
              </div>
              <StepNav onBack={() => goToStep(1)} />
            </div>
          )}

          {/* ─── Step 3 — Cantidad ─── */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold mb-1">¿Cuántos guardias aproximadamente?</h2>
              <p className="text-sm text-muted-foreground mb-4">Es una estimación. Puedes ajustarla después con el especialista.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CANTIDAD_CHOICES.map((c) => (
                  <ChoiceCard
                    key={c.id}
                    Icon={c.needsHelp ? HelpCircle : Users}
                    label={c.label}
                    description={c.description}
                    onClick={() => handleCantidad(c)}
                    selected={selections.cantidadId === c.id}
                    highlight={c.highlight}
                  />
                ))}
              </div>
              <StepNav onBack={() => goToStep(2)} />
            </div>
          )}

          {/* ─── Step 4 — Datos ─── */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">Último paso — ¿a quién enviamos la cotización?</h2>
              <p className="text-sm text-muted-foreground mb-5">Completa tus datos y nuestro equipo te contacta hoy.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="nombre" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="apellido" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="Tu apellido" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email corporativo <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="email" placeholder="correo@ejemplo.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="empresa" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="Nombre de tu empresa" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="telefono" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="912345678"
                            maxLength={9}
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="direccion" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección del servicio <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa la dirección"
                          {...field}
                          ref={autocompleteRef}
                          autoComplete="street-address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <input type="hidden" {...form.register('comuna')} />
                  <input type="hidden" {...form.register('ciudad')} />
                  <input type="hidden" {...form.register('latitude')} />
                  <input type="hidden" {...form.register('longitude')} />
                  <input type="hidden" {...form.register('tipoIndustria')} />

                  {formStatus === 'error' && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-300 text-sm">
                      Hubo un error al enviar. Intenta nuevamente.
                    </div>
                  )}

                  {/* Trust signals */}
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-3 mb-1 text-xs text-muted-foreground border-y border-border/50">
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold py-6 text-base"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</>
                    ) : (
                      <>Recibir mi cotización personalizada →</>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground leading-relaxed">
                    Al enviar no te llamamos hasta que confirmes. Tus datos se manejan según nuestra{' '}
                    <a href="/privacidad" className="underline hover:text-foreground">política de privacidad</a>.
                  </p>
                </form>
              </Form>

              <StepNav onBack={() => goToStep(3)} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
