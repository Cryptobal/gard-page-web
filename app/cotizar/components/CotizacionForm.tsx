"use client";

import React, { useState, useEffect, useRef, useCallback, RefCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Plus, Trash2, Shield, MessageCircle, ArrowLeft } from 'lucide-react';
import DotacionQuickBuilder, {
  type QuickPuesto,
  buildDotacion,
  createDefaultQuickPuesto,
  type DotacionApiItem,
} from './DotacionQuickBuilder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@googlemaps/js-api-loader';
import { useGtmEvent } from '../../components/EventTracker';
import API_URLS from '@/app/config/api';
import { getPaginaWebFromEmail } from '@/lib/opaiPayload';
import { trackFormSubmission } from '@/lib/analytics/formTracking';

// Declaración para Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

// ── Días de la semana ──
const WEEKDAYS = [
  { value: 'lunes', label: 'Lun' },
  { value: 'martes', label: 'Mar' },
  { value: 'miercoles', label: 'Mié' },
  { value: 'jueves', label: 'Jue' },
  { value: 'viernes', label: 'Vie' },
  { value: 'sabado', label: 'Sáb' },
  { value: 'domingo', label: 'Dom' },
];

// ── Schema de dotación ──
const dotacionItemSchema = z.object({
  puesto: z.string().min(1, 'Selecciona un puesto'),
  cantidad: z.number().int().min(1, 'Mínimo 1').max(100),
  dias: z.array(z.string()).min(1, 'Selecciona al menos un día'),
  horaInicio: z.string().min(1, 'Requerido'),
  horaFin: z.string().min(1, 'Requerido'),
});

// ── Schema principal ──
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
  servicioRequerido: z.string().min(1, { message: 'Selecciona un servicio requerido' }),
  cotizacion: z.string().optional(),
  dotacion: z.array(dotacionItemSchema).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  landing_page: z.string().optional(),
});
// NOTE: The dotacion validation for "Guardias de Seguridad" is now handled
// at submit time, since quick mode manages dotacion outside React Hook Form.

// Puestos por defecto si OPAI no responde
const PUESTOS_DEFAULT = [
  { value: 'Portería', label: 'Portería' },
  { value: 'Recepción', label: 'Recepción' },
  { value: 'Ronda', label: 'Ronda' },
  { value: 'CCTV (Centro de Control)', label: 'CCTV (Centro de Control)' },
  { value: 'Control de Acceso', label: 'Control de Acceso' },
  { value: 'Supervisión', label: 'Supervisión' },
  { value: 'Otro', label: 'Otro' },
];

// Lista de servicios (fallback si OPAI no responde)
const SERVICIOS_DEFAULT = [
  { value: 'guardias_seguridad', label: 'Guardias de Seguridad' },
  { value: 'seguridad_electronica', label: 'Seguridad Electrónica' },
  { value: 'otro', label: 'Otro' },
];

type FormValues = z.infer<typeof formSchema>;

interface CotizacionFormProps {
  prefillServicio?: string;
  prefillIndustria?: string;
}

const getGoogleMapsLink = (direccion: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
};

// OPAI public config URL
const OPAI_URL = process.env.NEXT_PUBLIC_OPAI_API_URL || 'https://opai.gard.cl';

// Mensaje predefinido para WhatsApp (modal y email al cliente)
function buildWhatsAppCotizacionMessage(nombre: string, apellido: string, empresa: string, detalle?: string): string {
  const base = `Hola, ${nombre}. Soy ${nombre} ${apellido} de ${empresa}. Te envío una cotización y el detalle de la cotización.`;
  return detalle?.trim() ? `${base}\n\n${detalle.trim()}` : base;
}

// Mensaje para el link de WhatsApp en el email a comercial@gard.cl (para que comercial le escriba al cliente)
function buildWhatsAppComercialToClientMessage(
  nombreCliente: string,
  empresa: string,
  direccion: string,
  comuna: string,
  ciudad: string,
  servicioRequerido: string,
  dotacion: Array<{ puesto: string; cantidad: number }> | undefined,
  detalleCotizacion: string
): string {
  const ubicacion = [direccion, comuna, ciudad].filter(Boolean).join(', ') || direccion;
  let consisteEn: string;
  if (dotacion && dotacion.length > 0) {
    const partes = dotacion.map((d) => `${d.cantidad} puesto${d.cantidad !== 1 ? 's' : ''} de ${d.puesto}`);
    consisteEn = partes.join(', ');
    if (detalleCotizacion?.trim()) consisteEn += `. ${detalleCotizacion.trim()}`;
  } else {
    consisteEn = detalleCotizacion?.trim() || servicioRequerido;
  }
  return `Hola ${nombreCliente}, te contacto de gard.cl. Nos enviaste una cotización para la empresa ${empresa}, ubicada en ${ubicacion}, que consiste en ${consisteEn}.`;
}

export default function CotizacionForm({ prefillServicio, prefillIndustria }: CotizacionFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastSuccessData, setLastSuccessData] = useState<{ nombre: string; apellido: string; empresa: string; cotizacion: string } | null>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [puestosOptions, setPuestosOptions] = useState<{ value: string; label: string }[]>([]);
  const [industriesOptions, setIndustriesOptions] = useState<{ value: string; label: string }[]>([]);
  const { pushEvent } = useGtmEvent();

  // ── Dotación: modo rápido vs manual ──
  const [dotacionMode, setDotacionMode] = useState<'quick' | 'manual'>('quick');
  const [quickPuestos, setQuickPuestos] = useState<QuickPuesto[]>([
    createDefaultQuickPuesto(),
  ]);

  // Fetch puestos e industrias desde OPAI (se reflejan cambios del CRM)
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`${OPAI_URL}/api/public/config`);
        if (!res.ok) return;
        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) return;
        const data = await res.json();
        if (data.success && data.data) {
          if (data.data.puestos?.length) setPuestosOptions(data.data.puestos);
          if (data.data.industries?.length) setIndustriesOptions(data.data.industries);
        }
      } catch {
        // Fallback silencioso: el formulario usa opciones por defecto si OPAI no está disponible
      }
    }
    fetchConfig();
  }, []);

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
      servicioRequerido: '',
      cotizacion: '',
      dotacion: [],
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      landing_page: '',
    },
  });

  const { setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dotacion',
  });

  const servicioActual = watch('servicioRequerido');
  const isGuardias = servicioActual === 'guardias_seguridad' || servicioActual === 'Guardias de Seguridad';

  // Ref callback for Google Maps autocomplete
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // Recover saved data from sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedIndustry = prefillIndustria || sessionStorage.getItem('user_industry') || '';
    const savedService = prefillServicio || sessionStorage.getItem('user_service') || '';
    
    if (savedIndustry) {
      setValue('tipoIndustria', savedIndustry);
    }
    
    if (savedService) {
      const servicioEncontrado = SERVICIOS_DEFAULT.find(s => 
        s.value.toLowerCase().includes(savedService.toLowerCase()) ||
        s.label.toLowerCase().includes(savedService.toLowerCase())
      );
      if (servicioEncontrado) {
        setValue('servicioRequerido', servicioEncontrado.value);
      }
      const cotizacionInicial = `Estoy interesado en contratar servicios de ${savedService}`;
      setValue('cotizacion', cotizacionInicial);
    }
    
    // Capture UTM params
    const urlParams = new URLSearchParams(window.location.search);
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    trackingParams.forEach(param => {
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

  // Google Maps loader
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY',
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => setMapLoaded(true)).catch(error => {
      console.error('Error cargando Google Maps API:', error);
    });
  }, []);

  // Google Maps autocomplete
  useEffect(() => {
    if (!mapLoaded || !autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'cl' },
    });
    autocomplete.setOptions({ fields: ['formatted_address', 'geometry', 'address_components'] });

    const isMobile = window.innerWidth < 768;

    if (isMobile && autocompleteInputRef.current) {
      autocompleteInputRef.current.addEventListener('focus', (e) => {
        const currentScrollPos = window.scrollY;
        setTimeout(() => { window.scrollTo({ top: currentScrollPos, behavior: 'auto' }); }, 10);
      });
    }

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
        if (types.includes('administrative_area_level_3') || types.includes('sublocality_level_1') || types.includes('sublocality')) {
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

    return () => {
      if (isMobile && autocompleteInputRef.current) {
        autocompleteInputRef.current.removeEventListener('focus', () => {});
      }
    };
  }, [mapLoaded, setValue]);

  // Presets de días y turnos (para facilitar al usuario)
  const PRESETS = {
    todaSemana: { dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'], horaInicio: '08:00', horaFin: '20:00' },
    lunVie: { dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'], horaInicio: '08:00', horaFin: '20:00' },
    finSemana: { dias: ['sabado', 'domingo'], horaInicio: '08:00', horaFin: '20:00' },
    deDia: { horaInicio: '08:00', horaFin: '20:00' },
    deNoche: { horaInicio: '20:00', horaFin: '08:00' },
  };

  const applyPreset = useCallback((index: number, preset: keyof typeof PRESETS) => {
    const p = PRESETS[preset];
    if ('dias' in p && Array.isArray(p.dias)) setValue(`dotacion.${index}.dias`, p.dias);
    setValue(`dotacion.${index}.horaInicio`, p.horaInicio);
    setValue(`dotacion.${index}.horaFin`, p.horaFin);
  }, [setValue]);

  // Comparar arrays de días (sin importar orden) para marcar preset activo
  const diasMatch = (current: string[], expected: string[]) =>
    current.length === expected.length && current.every((d) => expected.includes(d)) && expected.every((d) => current.includes(d));

  const isDiasPresetActive = (index: number, preset: 'todaSemana' | 'lunVie' | 'finSemana') => {
    const dias = watch(`dotacion.${index}.dias`) || [];
    const p = PRESETS[preset];
    return 'dias' in p && Array.isArray(p.dias) && diasMatch(dias, p.dias);
  };

  const isTurnoPresetActive = (index: number, preset: 'deDia' | 'deNoche') => {
    const inicio = watch(`dotacion.${index}.horaInicio`);
    const fin = watch(`dotacion.${index}.horaFin`);
    const p = PRESETS[preset];
    return inicio === p.horaInicio && fin === p.horaFin;
  };

  const puestosParaSelect = puestosOptions.length > 0 ? puestosOptions : PUESTOS_DEFAULT;
  const addPuesto = useCallback(() => {
    append({
      puesto: puestosParaSelect[0]?.value || '',
      cantidad: 1,
      dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      horaInicio: '08:00',
      horaFin: '20:00',
    });
  }, [append, puestosParaSelect]);

  // Toggle day helper
  const toggleDay = (index: number, day: string) => {
    const current = watch(`dotacion.${index}.dias`) || [];
    if (current.includes(day)) {
      setValue(`dotacion.${index}.dias`, current.filter((d: string) => d !== day));
    } else {
      setValue(`dotacion.${index}.dias`, [...current, day]);
    }
  };

  // ── Cambio de modo: Quick ↔ Manual ──
  const switchToManual = useCallback(() => {
    // Mapear puestos rápidos al formato manual
    const dotacionFromQuick = buildDotacion(quickPuestos);
    // Limpiar campos actuales y poblar con los datos rápidos
    const currentDotacion = form.getValues('dotacion') || [];
    // Reemplazar con los datos del quick builder
    while (fields.length > 0) remove(0);
    dotacionFromQuick.forEach((d) => {
      append({
        puesto: d.puesto,
        cantidad: d.cantidad,
        dias: d.dias,
        horaInicio: d.horaInicio,
        horaFin: d.horaFin,
      });
    });
    setDotacionMode('manual');
  }, [quickPuestos, form, fields.length, remove, append]);

  const switchToQuick = useCallback(() => {
    // Intentar mapear puestos manuales a quick format
    const manualDotacion = form.getValues('dotacion') || [];
    const ALL_WEEK = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const WEEKDAYS_ONLY = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    const WEEKEND_ONLY = ['sabado', 'domingo'];

    const arraysEqual = (a: string[], b: string[]) =>
      a.length === b.length && a.every((v) => b.includes(v));

    let hasCustomConfig = false;
    const mappedPuestos: QuickPuesto[] = manualDotacion.map((d) => {
      let dias: QuickPuesto['dias'] = 'toda_semana';
      if (arraysEqual(d.dias || [], ALL_WEEK)) dias = 'toda_semana';
      else if (arraysEqual(d.dias || [], WEEKDAYS_ONLY)) dias = 'lunes_viernes';
      else if (arraysEqual(d.dias || [], WEEKEND_ONLY)) dias = 'fin_semana';
      else hasCustomConfig = true;

      let jornada: QuickPuesto['jornada'] = '24h';
      let turno: QuickPuesto['turno'] = 'dia';
      if (d.horaInicio === '00:00' && d.horaFin === '00:00') {
        jornada = '24h';
      } else if (d.horaInicio === '08:00' && d.horaFin === '20:00') {
        jornada = '12h'; turno = 'dia';
      } else if (d.horaInicio === '20:00' && d.horaFin === '08:00') {
        jornada = '12h'; turno = 'noche';
      } else {
        hasCustomConfig = true;
      }

      return {
        id: createDefaultQuickPuesto().id,
        dias,
        jornada,
        turno,
        cantidad: d.cantidad || 1,
      };
    });

    if (hasCustomConfig) {
      const confirmar = window.confirm(
        'Algunos puestos tienen configuración personalizada que se perderá al volver al modo rápido. ¿Continuar?'
      );
      if (!confirmar) return;
    }

    if (mappedPuestos.length > 0) {
      setQuickPuestos(mappedPuestos);
    } else {
      setQuickPuestos([createDefaultQuickPuesto()]);
    }
    setDotacionMode('quick');
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    // Validar dotación para Guardias de Seguridad
    if (isGuardias) {
      if (dotacionMode === 'quick' && quickPuestos.length === 0) {
        form.setError('dotacion', { message: 'Agrega al menos un puesto de trabajo' });
        return;
      }
      if (dotacionMode === 'manual' && (!data.dotacion || data.dotacion.length === 0)) {
        form.setError('dotacion', { message: 'Agrega al menos un puesto de trabajo' });
        return;
      }
    }

    try {
      setIsSubmitting(true);
      
      // Mensaje para WhatsApp (botón del modal y link en el email al cliente)
      const whatsappMessage = buildWhatsAppCotizacionMessage(
        data.nombre,
        data.apellido,
        data.empresa,
        data.cotizacion || ''
      );

      // Mensaje para el link de WhatsApp en el email a comercial@gard.cl (para responder al cliente)
      const whatsappComercialToClient = buildWhatsAppComercialToClientMessage(
        data.nombre,
        data.empresa,
        data.direccion,
        data.comuna || '',
        data.ciudad || '',
        data.servicioRequerido,
        data.dotacion?.map((d) => ({ puesto: d.puesto, cantidad: d.cantidad })),
        data.cotizacion || ''
      );

      const detalleCompleto = (data.cotizacion || '') + (data.utm_source ? `\n\n[UTM: ${data.utm_source}/${data.utm_medium}/${data.utm_campaign}]` : '');
      const detalleTruncado = detalleCompleto.length > 5000 ? detalleCompleto.slice(0, 4997) + '...' : detalleCompleto;

      // Build dotacion from quick mode or manual mode
      let dotacionOpai: DotacionApiItem[] | undefined;
      if (isGuardias) {
        if (dotacionMode === 'quick' && quickPuestos.length > 0) {
          dotacionOpai = buildDotacion(quickPuestos);
        } else if (data.dotacion && data.dotacion.length > 0) {
          dotacionOpai = data.dotacion.map((d) => ({
            puesto: d.puesto,
            cantidad: d.cantidad,
            dias: d.dias || [],
            horaInicio: d.horaInicio || '08:00',
            horaFin: d.horaFin || '20:00',
          }));
        }
      }

      // Map to OPAI public leads format
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
        whatsapp_prefilled_message: whatsappMessage,
        whatsapp_message_comercial_to_cliente: whatsappComercialToClient,
      };
      
      const response = await fetch(API_URLS.COTIZACION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opaiPayload),
      });
      
      if (response.ok) {
        setLastSuccessData({ nombre: data.nombre, apellido: data.apellido, empresa: data.empresa, cotizacion: data.cotizacion || '' });
        setFormStatus('success');
        form.reset();
        setQuickPuestos([createDefaultQuickPuesto()]);
        setDotacionMode('quick');
        sessionStorage.removeItem('user_service');
        sessionStorage.removeItem('user_industry');
        sessionStorage.removeItem('user_service_slug');
        sessionStorage.removeItem('user_industry_slug');
        
        trackFormSubmission({
          formType: 'cotizacion',
          additionalData: {
            tipo_industria: data.tipoIndustria,
            servicio_requerido: data.servicioRequerido,
            pagina_origen: window.location.pathname,
            utm_source: data.utm_source || '',
            utm_medium: data.utm_medium || '',
            utm_campaign: data.utm_campaign || '',
            utm_term: data.utm_term || '',
            utm_content: data.utm_content || '',
            gclid: data.gclid || '',
            landing_page: data.landing_page || '',
            dotacion_puestos: data.dotacion?.length || 0,
            dotacion_guardias: data.dotacion?.reduce((sum, d) => sum + d.cantidad, 0) || 0,
          }
        });
      } else {
        // Fallback 1: intentar solo envío de emails (OPAI responde pero lead falló)
        const emailOnlyRes = await fetch(API_URLS.COTIZACION, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...opaiPayload, emailOnly: true }),
        });
        if (emailOnlyRes.ok) {
          setLastSuccessData({ nombre: data.nombre, apellido: data.apellido, empresa: data.empresa, cotizacion: data.cotizacion || '' });
          setFormStatus('success');
          form.reset();
          setQuickPuestos([createDefaultQuickPuesto()]);
          setDotacionMode('quick');
          sessionStorage.removeItem('user_service');
          sessionStorage.removeItem('user_industry');
          sessionStorage.removeItem('user_service_slug');
          sessionStorage.removeItem('user_industry_slug');
        } else {
          // Fallback 2: Make webhook (configurar Make para enviar email)
          try {
            await fetch(API_URLS.COTIZACION_FALLBACK, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...opaiPayload, source: 'cotizacion_fallback', opaiFailed: true }),
            });
          } catch (_) { /* Make también puede fallar */ }
          setFormStatus('error');
        }
      }
    } catch (error) {
      // Fallback: error de red o OPAI caído - intentar email-only y luego Make
      const whatsappMessageFallback = buildWhatsAppCotizacionMessage(data.nombre, data.apellido, data.empresa, data.cotizacion || '');
      const whatsappComercialFallback = buildWhatsAppComercialToClientMessage(
        data.nombre,
        data.empresa,
        data.direccion,
        data.comuna || '',
        data.ciudad || '',
        data.servicioRequerido,
        data.dotacion?.map((d) => ({ puesto: d.puesto, cantidad: d.cantidad })),
        data.cotizacion || ''
      );
      let dotacionFallback: DotacionApiItem[] | undefined;
      if (isGuardias) {
        if (dotacionMode === 'quick' && quickPuestos.length > 0) {
          dotacionFallback = buildDotacion(quickPuestos);
        } else if (data.dotacion && data.dotacion.length > 0) {
          dotacionFallback = data.dotacion.map((d) => ({
            puesto: d.puesto,
            cantidad: d.cantidad,
            dias: d.dias || [],
            horaInicio: d.horaInicio || '08:00',
            horaFin: d.horaFin || '20:00',
          }));
        }
      }
      const fallbackPayload = {
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
        detalle: (data.cotizacion || '').slice(0, 5000),
        dotacion: dotacionFallback,
        source: 'web_cotizador' as const,
        emailOnly: true,
        whatsapp_prefilled_message: whatsappMessageFallback,
        whatsapp_message_comercial_to_cliente: whatsappComercialFallback,
      };
      try {
        const emailOnlyRes = await fetch(API_URLS.COTIZACION, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fallbackPayload),
        });
        if (emailOnlyRes.ok) {
          setLastSuccessData({ nombre: data.nombre, apellido: data.apellido, empresa: data.empresa, cotizacion: data.cotizacion || '' });
          setFormStatus('success');
          form.reset();
          setQuickPuestos([createDefaultQuickPuesto()]);
          setDotacionMode('quick');
          sessionStorage.removeItem('user_service');
          sessionStorage.removeItem('user_industry');
          sessionStorage.removeItem('user_service_slug');
          sessionStorage.removeItem('user_industry_slug');
        } else {
          await fetch(API_URLS.COTIZACION_FALLBACK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...fallbackPayload, source: 'cotizacion_fallback', opaiFailed: true }),
          });
          setFormStatus('error');
        }
      } catch (_) {
        try {
          await fetch(API_URLS.COTIZACION_FALLBACK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...fallbackPayload, source: 'cotizacion_fallback', opaiFailed: true }),
          });
        } catch (_) { /* Make también puede fallar */ }
        setFormStatus('error');
      }
      setLastSuccessData(null);
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      {formStatus === 'success' ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-heading-4 text-primary mb-4">¡Tu solicitud ha sido enviada correctamente!</h2>
          <p className="text-body-base mb-6">Nuestro equipo comercial revisará tu requerimiento y te contactará en menos de 12 horas hábiles.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
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
            <Button
              onClick={() => { setLastSuccessData(null); setFormStatus('idle'); }}
              variant="secondary"
              className="rounded-2xl"
            >
              Enviar otra cotización
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ── Datos de contacto ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de contacto <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Input type="email" placeholder="correo@ejemplo.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="telefono" render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="912345678" maxLength={9} {...field}
                      onChange={(e) => { field.onChange(e.target.value.replace(/\D/g, '')); }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* ── Datos de empresa ── */}
            <FormField control={form.control} name="empresa" render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa <span className="text-red-500">*</span></FormLabel>
                <FormControl><Input placeholder="Nombre de tu empresa" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="direccion" render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección o ubicación del servicio <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa la dirección" {...field} ref={autocompleteRef}
                    autoComplete="street-address"
                    onFocus={(e) => {
                      if (window.innerWidth < 768) {
                        setTimeout(() => { e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
                      }
                    }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <input type="hidden" {...form.register('comuna')} />
            <input type="hidden" {...form.register('ciudad')} />
            <input type="hidden" {...form.register('latitude')} />
            <input type="hidden" {...form.register('longitude')} />

            {/* ── Servicio ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="tipoIndustria" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de industria <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Selecciona el tipo de industria" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(industriesOptions.length ? industriesOptions : [
                        { value: 'Banca y Finanzas', label: 'Banca y Finanzas' },
                        { value: 'Retail y Centros Comerciales', label: 'Retail y Centros Comerciales' },
                        { value: 'Salud (Hospitales y Clínicas)', label: 'Salud (Hospitales y Clínicas)' },
                        { value: 'Educación (Colegios y Universidades)', label: 'Educación (Colegios y Universidades)' },
                        { value: 'Infraestructura Crítica', label: 'Infraestructura Crítica' },
                        { value: 'Transporte y Logística', label: 'Transporte y Logística' },
                        { value: 'Construcción e Inmobiliario', label: 'Construcción e Inmobiliario' },
                        { value: 'Minería y Energía', label: 'Minería y Energía' },
                        { value: 'Corporativo y Oficinas', label: 'Corporativo y Oficinas' },
                        { value: 'Condominios y Residencias', label: 'Condominios y Residencias' },
                        { value: 'Sector Privado', label: 'Sector Privado' },
                        { value: 'Otra', label: 'Otra' },
                      ]).map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="servicioRequerido" render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio requerido <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Selecciona el servicio que necesitas" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICIOS_DEFAULT.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* ── ESTRUCTURA DE DOTACIÓN (solo Guardias de Seguridad) ── */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {isGuardias && (
              <>
                {dotacionMode === 'quick' ? (
                  /* ── MODO RÁPIDO: Constructor visual ── */
                  <DotacionQuickBuilder
                    puestos={quickPuestos}
                    onChange={setQuickPuestos}
                    onSwitchToManual={switchToManual}
                  />
                ) : (
                  /* ── MODO MANUAL: Formulario detallado ── */
                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="text-base font-semibold">Estructura de Dotación <span className="text-red-500">*</span></h3>
                          <p className="text-sm text-muted-foreground">
                            Configura horarios personalizados
                          </p>
                        </div>
                      </div>
                      <Button type="button" variant="default" size="sm" className="gap-1.5 rounded-xl" onClick={addPuesto}>
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Agregar</span>
                      </Button>
                    </div>

                    {fields.length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Agrega al menos un puesto de trabajo
                        </p>
                        <Button type="button" variant="ghost" size="sm" onClick={addPuesto} className="text-primary">
                          + Agregar primer puesto
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {fields.map((field, index) => (
                          <div key={field.id} className="bg-card rounded-lg p-4 border border-border shadow-sm space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-primary">Puesto #{index + 1}</span>
                              <Button type="button" variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                              </Button>
                            </div>

                            {/* Presets rápidos: días y turno */}
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">Días de servicio — elige uno:</p>
                              <div className="flex flex-wrap gap-2">
                                {(['todaSemana', 'lunVie', 'finSemana'] as const).map((preset) => {
                                  const isActive = isDiasPresetActive(index, preset);
                                  return (
                                    <button
                                      key={preset}
                                      type="button"
                                      onClick={() => applyPreset(index, preset)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                        isActive
                                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                                          : 'bg-muted hover:bg-primary/20 hover:text-primary'
                                      }`}
                                    >
                                      {preset === 'todaSemana' ? 'Toda la semana' : preset === 'lunVie' ? 'Lunes a viernes' : 'Solo fin de semana'}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-xs font-medium text-muted-foreground mt-2">Turno:</p>
                              <div className="flex flex-wrap gap-2">
                                {(['deDia', 'deNoche'] as const).map((preset) => {
                                  const isActive = isTurnoPresetActive(index, preset);
                                  return (
                                    <button
                                      key={preset}
                                      type="button"
                                      onClick={() => applyPreset(index, preset)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                        isActive
                                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                                          : 'bg-muted hover:bg-primary/20 hover:text-primary'
                                      }`}
                                    >
                                      {preset === 'deDia' ? 'De día (08:00–20:00)' : 'De noche (20:00–08:00)'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <FormField control={form.control} name={`dotacion.${index}.puesto`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel className="text-xs">Puesto de trabajo</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={f.onChange} value={f.value}>
                                      <SelectTrigger><SelectValue placeholder="Selecciona un puesto" /></SelectTrigger>
                                      <SelectContent>
                                        {puestosParaSelect.map(p => (
                                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <FormField control={form.control} name={`dotacion.${index}.cantidad`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel className="text-xs">Cantidad de puestos</FormLabel>
                                  <FormControl>
                                    <Input type="number" min={1} max={100} {...f}
                                      onChange={(e) => f.onChange(parseInt(e.target.value) || 1)} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <FormField control={form.control} name={`dotacion.${index}.horaInicio`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel className="text-xs">Hora inicio</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={f.onChange} value={f.value}>
                                      <SelectTrigger><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                        {Array.from({ length: 24 }, (_, i) => {
                                          const h = i.toString().padStart(2, '0') + ':00';
                                          return <SelectItem key={h} value={h}>{h}</SelectItem>;
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <FormField control={form.control} name={`dotacion.${index}.horaFin`} render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel className="text-xs">Hora fin</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={f.onChange} value={f.value}>
                                      <SelectTrigger><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                        {Array.from({ length: 24 }, (_, i) => {
                                          const h = i.toString().padStart(2, '0') + ':00';
                                          return <SelectItem key={h} value={h}>{h}</SelectItem>;
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />

                              <div className="sm:col-span-2">
                                <label className="text-xs font-medium mb-2 block">O selecciona días manualmente</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {WEEKDAYS.map(day => {
                                    const dias = watch(`dotacion.${index}.dias`) || [];
                                    const isActive = dias.includes(day.value);
                                    return (
                                      <button key={day.value} type="button" onClick={() => toggleDay(index, day.value)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                        }`}>
                                        {day.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="flex items-center justify-between px-3 py-2 bg-primary/10 rounded-lg text-sm">
                          <span className="font-medium">
                            Total: {fields.length} tipo{fields.length > 1 ? 's' : ''} de puesto · {
                              (watch('dotacion') || []).reduce((sum, d) => sum + (d?.cantidad || 0), 0)
                            } puesto{(watch('dotacion') || []).reduce((sum, d) => sum + (d?.cantidad || 0), 0) !== 1 ? 's' : ''}
                          </span>
                          <Button type="button" variant="ghost" size="sm" onClick={addPuesto} className="text-primary text-xs">
                            + Otro puesto
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Link para volver al modo rápido */}
                    <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3.5 text-center">
                      <button
                        type="button"
                        onClick={switchToQuick}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="font-medium text-blue-600 dark:text-blue-400 underline underline-offset-2">
                          Volver al modo rápido
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Descripción (opcional) ── */}
            <FormField control={form.control} name="cotizacion" render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción adicional (opcional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Si quieres, agrega más detalles sobre tu necesidad de seguridad..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* ── Error message ── */}
            {formStatus === 'error' && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-700 dark:text-red-300 text-sm">
                Hubo un error al enviar. Intenta nuevamente.
              </div>
            )}

            {/* ── Submit ── */}
            <Button type="submit" disabled={isSubmitting} variant="default" size="lg" className="w-full md:w-auto rounded-2xl">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
              ) : (
                "Enviar Cotización"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
