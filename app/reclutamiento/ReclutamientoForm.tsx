'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, Upload, FilePlus2, Plus, X, CheckCircle, CalendarDays } from 'lucide-react';
import { API_URLS } from '@/app/config/api';
import { trackFormSubmission } from '@/lib/analytics/formTracking';
import { Loader } from '@googlemaps/js-api-loader';
import {
  AFP_CHILE,
  BANK_ACCOUNT_TYPES,
  CHILE_BANKS,
  HEALTH_SYSTEMS,
  ISAPRES_CHILE,
  PAISES_AMERICA,
  PERSON_SEX,
  SHOE_SIZES,
  PANTS_SIZES,
  TOP_GARMENT_SIZES,
  DEFAULT_POSTULACION_DOCUMENTS,
  completeRutWithDv,
  formatRutForInput,
  isChileanRutFormat,
  isValidChileanRut,
  normalizeMobileNineDigits,
  normalizeRut,
} from '@/lib/postulacion-data';

// Token de postulación
const POSTULACION_TOKEN = 'opai-postulacion-2026';

type DocTypeConfig = { code: string; label: string; required: boolean };
type UploadedDoc = { id: string; type: string; fileUrl: string; fileName?: string };

export default function ReclutamientoForm() {
  const [documentTypes, setDocumentTypes] = useState<DocTypeConfig[]>(DEFAULT_POSTULACION_DOCUMENTS);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [docType, setDocType] = useState('');
  const [healthSystem, setHealthSystem] = useState('fonasa');
  const [isapreHasExtraPercent, setIsapreHasExtraPercent] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [rutError, setRutError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Google Maps autocomplete
  const addressInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    phoneMobile: '',
    addressFormatted: '',
    googlePlaceId: '',
    commune: '',
    city: '',
    region: '',
    lat: '',
    lng: '',
    birthDate: '',
    sex: '',
    nacionalidad: 'Chile',
    afp: '',
    isapreName: '',
    isapreExtraPercent: '',
    hasMobilization: 'si',
    availableExtraShifts: 'si',
    shoeSize: '',
    pantsSize: '',
    tshirtSize: '',
    shirtSize: '',
    geologoSize: '',
    polarSize: '',
    jacketSize: '',
    heightCm: '',
    weightKg: '',
    bankCode: '',
    accountType: '',
    accountNumber: '',
    notes: '',
  });

  // Cargar tipos de documentos desde Opai
  useEffect(() => {
    let mounted = true;
    fetch(`${API_URLS.POSTULACION_DOC_TYPES}?token=${encodeURIComponent(POSTULACION_TOKEN)}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setDocumentTypes(data.data);
          setDocType((prev) => {
            const first = data.data[0].code;
            return data.data.some((d: DocTypeConfig) => d.code === prev) ? prev : first;
          });
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (documentTypes.length > 0 && !documentTypes.some((d) => d.code === docType)) {
      setDocType(documentTypes[0].code);
    }
  }, [documentTypes, docType]);

  // Inicializar Google Maps Autocomplete
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      if (!addressInputRef.current || autocompleteRef.current) return;
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        { componentRestrictions: { country: 'cl' }, types: ['address'] }
      );
      autocompleteRef.current = autocomplete;
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry?.location) return;

        let commune = '', city = '', region = '';
        for (const comp of place.address_components || []) {
          if (comp.types.includes('administrative_area_level_3') || comp.types.includes('locality')) {
            commune = comp.long_name;
          }
          if (comp.types.includes('administrative_area_level_2')) {
            city = comp.long_name;
          }
          if (comp.types.includes('administrative_area_level_1')) {
            region = comp.long_name;
          }
        }

        setForm((prev) => ({
          ...prev,
          addressFormatted: place.formatted_address || '',
          googlePlaceId: place.place_id || '',
          commune,
          city,
          region,
          lat: String(place.geometry!.location!.lat()),
          lng: String(place.geometry!.location!.lng()),
        }));
      });
    }).catch(console.error);
  }, []);

  const handleUpload = useCallback(async (file?: File | null) => {
    if (!file) return;
    if (!docType) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append('token', POSTULACION_TOKEN);
      body.append('file', file);
      const response = await fetch(API_URLS.POSTULACION_UPLOAD, {
        method: 'POST',
        body,
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'No se pudo subir el archivo');
      }
      setUploadedDocs((prev) => [
        {
          id: crypto.randomUUID(),
          type: docType,
          fileUrl: payload.data.url,
          fileName: file.name,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
      setSubmitError('No se pudo subir el documento. Intenta con otro archivo.');
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      setUploading(false);
    }
  }, [docType]);

  const removeDoc = (id: string) => {
    setUploadedDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSubmit = async () => {
    setSubmitSuccess(null);
    setSubmitError(null);

    // Validar documentos obligatorios
    const requiredCodes = documentTypes.filter((d) => d.required).map((d) => d.code);
    const uploadedTypes = new Set(uploadedDocs.map((d) => d.type));
    const missingRequired = requiredCodes.filter((code) => !uploadedTypes.has(code));
    if (missingRequired.length > 0) {
      const names = missingRequired
        .map((code) => documentTypes.find((d) => d.code === code)?.label ?? code)
        .join(', ');
      setSubmitError(`Faltan documentos obligatorios: ${names}`);
      return;
    }

    // Validar campos obligatorios
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.rut.trim() ||
      !form.email.trim() ||
      !form.phoneMobile.trim() ||
      !form.addressFormatted.trim() ||
      !form.googlePlaceId ||
      !form.birthDate ||
      !form.sex ||
      !form.afp ||
      !form.bankCode ||
      !form.accountType ||
      !form.accountNumber.trim() ||
      uploadedDocs.length === 0
    ) {
      setSubmitError('Completa todos los campos obligatorios y sube al menos un documento.');
      return;
    }

    if (healthSystem === 'isapre' && !form.isapreName) {
      setSubmitError('Debes seleccionar Isapre');
      return;
    }

    // Validar RUT
    const completedRut = completeRutWithDv(form.rut);
    if (!isChileanRutFormat(completedRut) || !isValidChileanRut(completedRut)) {
      setRutError('RUT inválido. Verifica guión y dígito verificador.');
      setSubmitError('Corrige el RUT antes de enviar.');
      return;
    }
    setRutError(null);

    setSaving(true);
    try {
      const response = await fetch(API_URLS.POSTULACION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: POSTULACION_TOKEN,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          rut: normalizeRut(completedRut),
          email: form.email.trim(),
          phoneMobile: normalizeMobileNineDigits(form.phoneMobile),
          addressFormatted: form.addressFormatted.trim(),
          googlePlaceId: form.googlePlaceId,
          commune: form.commune.trim() || null,
          city: form.city.trim() || null,
          region: form.region.trim() || null,
          lat: form.lat,
          lng: form.lng,
          birthDate: form.birthDate,
          sex: form.sex,
          nacionalidad: form.nacionalidad || 'Chile',
          afp: form.afp,
          healthSystem,
          isapreName: healthSystem === 'isapre' ? form.isapreName : null,
          isapreHasExtraPercent: healthSystem === 'isapre' ? isapreHasExtraPercent : false,
          isapreExtraPercent:
            healthSystem === 'isapre' && isapreHasExtraPercent
              ? form.isapreExtraPercent
              : null,
          hasMobilization: form.hasMobilization === 'si',
          availableExtraShifts: form.availableExtraShifts === 'si',
          shoeSize: form.shoeSize || null,
          pantsSize: form.pantsSize || null,
          tshirtSize: form.tshirtSize || null,
          shirtSize: form.shirtSize || null,
          geologoSize: form.geologoSize || null,
          polarSize: form.polarSize || null,
          jacketSize: form.jacketSize || null,
          heightCm: form.heightCm ? Number(form.heightCm) : null,
          weightKg: form.weightKg ? Number(form.weightKg) : null,
          bankCode: form.bankCode,
          accountType: form.accountType,
          accountNumber: form.accountNumber.trim(),
          notes: form.notes.trim() || null,
          documents: uploadedDocs.map((doc) => ({ type: doc.type, fileUrl: doc.fileUrl })),
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'No se pudo enviar la postulación');
      }

      trackFormSubmission({ formType: 'reclutamiento' });
      setSubmitSuccess(
        'Postulación enviada correctamente. Nuestro equipo revisará tu postulación y te contactará pronto.'
      );
      // Reset
      setForm({
        firstName: '', lastName: '', rut: '', email: '', phoneMobile: '',
        addressFormatted: '', googlePlaceId: '', commune: '', city: '', region: '',
        lat: '', lng: '', birthDate: '', sex: '', nacionalidad: 'Chile',
        afp: '', isapreName: '', isapreExtraPercent: '',
        hasMobilization: 'si', availableExtraShifts: 'si',
        shoeSize: '', pantsSize: '', tshirtSize: '', shirtSize: '',
        geologoSize: '', polarSize: '', jacketSize: '',
        heightCm: '', weightKg: '', bankCode: '', accountType: '', accountNumber: '',
        notes: '',
      });
      setUploadedDocs([]);
      setHealthSystem('fonasa');
      setIsapreHasExtraPercent(false);
      setRutError(null);
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          document.getElementById('postulacion-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } catch (error) {
      const msg = (error as Error)?.message || 'No se pudo enviar la postulación';
      if (/rut|root/i.test(msg)) {
        setRutError('RUT ya ingresado. Comunicarse con recursos humanos.');
        setSubmitError('RUT ya ingresado. Comunicarse con recursos humanos.');
      } else {
        setSubmitError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  // Panel de éxito
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
      </div>
    );
  }

  const inputClass = "w-full h-10 rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all";
  const selectClass = inputClass;
  const labelClass = "block text-xs font-medium text-[hsl(var(--gard-muted-foreground))] mb-1";

  return (
    <div className="bg-[hsl(var(--gard-card))] rounded-2xl p-6 md:p-8 shadow-sm border border-[hsl(var(--gard-border))]">
      <h2 className="text-xl font-bold mb-1">Formulario de Postulación</h2>
      <p className="text-sm text-[hsl(var(--gard-muted-foreground))] mb-6">
        Completa tus datos y sube tus documentos para que el equipo de operaciones revise tu postulación.
      </p>

      {submitError && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 p-3 rounded-lg text-sm">
          {submitError}
        </div>
      )}

      <div className="space-y-6">
        {/* Datos Personales */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gard-muted-foreground))] mb-3">Datos Personales</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input className={inputClass} placeholder="Ingrese su nombre" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Apellido *</label>
              <input className={inputClass} placeholder="Ingrese su apellido" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>RUT * (sin puntos y con guión)</label>
              <input
                className={`${inputClass} ${rutError ? 'border-red-500 ring-red-500' : ''}`}
                placeholder="12345678-9"
                value={form.rut}
                onChange={(e) => setForm((p) => ({ ...p, rut: formatRutForInput(e.target.value) }))}
                onBlur={() => {
                  const completed = completeRutWithDv(form.rut);
                  setForm((p) => ({ ...p, rut: completed }));
                  if (completed && (!isChileanRutFormat(completed) || !isValidChileanRut(completed))) {
                    setRutError('RUT inválido.');
                  } else {
                    setRutError(null);
                  }
                }}
              />
              {rutError && <p className="text-xs text-red-500 mt-1">{rutError}</p>}
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input className={inputClass} type="email" placeholder="ejemplo@correo.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Celular * (9 dígitos)</label>
              <input className={inputClass} placeholder="912345678" maxLength={9} value={form.phoneMobile}
                onChange={(e) => setForm((p) => ({ ...p, phoneMobile: normalizeMobileNineDigits(e.target.value).slice(0, 9) }))} />
            </div>
            <div>
              <label className={labelClass}>Fecha de Nacimiento *</label>
              <div className="flex gap-2">
                <input type="date" className={`${inputClass} flex-1`} value={form.birthDate}
                  onChange={(e) => setForm((p) => ({ ...p, birthDate: e.target.value }))} id="postulacion-birthdate" />
                <button type="button" className="h-10 w-10 rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] flex items-center justify-center hover:bg-[hsl(var(--gard-accent))]/10"
                  onClick={() => (document.getElementById('postulacion-birthdate') as HTMLInputElement)?.showPicker?.()}>
                  <CalendarDays className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Sexo *</label>
              <select className={selectClass} value={form.sex} onChange={(e) => setForm((p) => ({ ...p, sex: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {PERSON_SEX.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Nacionalidad</label>
              <select className={selectClass} value={form.nacionalidad} onChange={(e) => setForm((p) => ({ ...p, nacionalidad: e.target.value }))}>
                {PAISES_AMERICA.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Dirección */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gard-muted-foreground))] mb-3">Dirección</h3>
          <p className="text-xs text-[hsl(var(--gard-muted-foreground))] mb-2">
            Escribe calle y número; elige una sugerencia (no solo el nombre del sector).
          </p>
          <input ref={addressInputRef} className={`${inputClass} mb-3`} placeholder="Ej: Av. Principal 123, comuna…" value={form.addressFormatted}
            onChange={(e) => setForm((p) => ({ ...p, addressFormatted: e.target.value }))} />
          <div className="grid gap-3 md:grid-cols-3">
            <input className={inputClass} placeholder="Comuna" value={form.commune} readOnly />
            <input className={inputClass} placeholder="Ciudad" value={form.city} readOnly />
            <input className={inputClass} placeholder="Región" value={form.region} readOnly />
          </div>
        </section>

        {/* Previsión y Salud */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gard-muted-foreground))] mb-3">Previsión y Salud</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>AFP *</label>
              <select className={selectClass} value={form.afp} onChange={(e) => setForm((p) => ({ ...p, afp: e.target.value }))}>
                <option value="">Seleccionar AFP...</option>
                {AFP_CHILE.map((afp) => <option key={afp} value={afp}>{afp}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Sistema de Salud</label>
              <select className={selectClass} value={healthSystem}
                onChange={(e) => {
                  setHealthSystem(e.target.value);
                  if (e.target.value !== 'isapre') {
                    setForm((p) => ({ ...p, isapreName: '', isapreExtraPercent: '' }));
                    setIsapreHasExtraPercent(false);
                  }
                }}>
                {HEALTH_SYSTEMS.map((h) => <option key={h} value={h}>Salud: {h.toUpperCase()}</option>)}
              </select>
            </div>
            {healthSystem === 'isapre' && (
              <>
                <div>
                  <label className={labelClass}>Isapre *</label>
                  <select className={selectClass} value={form.isapreName} onChange={(e) => setForm((p) => ({ ...p, isapreName: e.target.value }))}>
                    <option value="">Seleccionar Isapre...</option>
                    {ISAPRES_CHILE.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Cotización Isapre</label>
                  <select className={selectClass} value={isapreHasExtraPercent ? 'si' : 'no'} onChange={(e) => setIsapreHasExtraPercent(e.target.value === 'si')}>
                    <option value="no">Cotiza solo 7%</option>
                    <option value="si">Cotiza sobre 7%</option>
                  </select>
                </div>
                {isapreHasExtraPercent && (
                  <div>
                    <label className={labelClass}>Porcentaje cotización ISAPRE</label>
                    <input type="number" step="0.01" min="7.01" className={inputClass} placeholder="Ej: 7.5" value={form.isapreExtraPercent}
                      onChange={(e) => setForm((p) => ({ ...p, isapreExtraPercent: e.target.value }))} />
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Disponibilidad y Tallas */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gard-muted-foreground))] mb-3">Disponibilidad y Tallas</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>¿Tiene movilización?</label>
              <select className={selectClass} value={form.hasMobilization} onChange={(e) => setForm((p) => ({ ...p, hasMobilization: e.target.value }))}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>¿Disponible para turnos extra?</label>
              <select className={selectClass} value={form.availableExtraShifts} onChange={(e) => setForm((p) => ({ ...p, availableExtraShifts: e.target.value }))}>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Calzado</label>
              <select className={selectClass} value={form.shoeSize} onChange={(e) => setForm((p) => ({ ...p, shoeSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {SHOE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Pantalón</label>
              <select className={selectClass} value={form.pantsSize} onChange={(e) => setForm((p) => ({ ...p, pantsSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {PANTS_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Polera</label>
              <select className={selectClass} value={form.tshirtSize} onChange={(e) => setForm((p) => ({ ...p, tshirtSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {TOP_GARMENT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Camisa</label>
              <select className={selectClass} value={form.shirtSize} onChange={(e) => setForm((p) => ({ ...p, shirtSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {TOP_GARMENT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Geólogo</label>
              <select className={selectClass} value={form.geologoSize} onChange={(e) => setForm((p) => ({ ...p, geologoSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {TOP_GARMENT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Polar</label>
              <select className={selectClass} value={form.polarSize} onChange={(e) => setForm((p) => ({ ...p, polarSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {TOP_GARMENT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Chaqueta</label>
              <select className={selectClass} value={form.jacketSize} onChange={(e) => setForm((p) => ({ ...p, jacketSize: e.target.value }))}>
                <option value="">Seleccionar...</option>
                {TOP_GARMENT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Estatura (cm)</label>
              <input type="number" min="120" max="230" step="0.1" className={inputClass} placeholder="Ej: 175" value={form.heightCm}
                onChange={(e) => setForm((p) => ({ ...p, heightCm: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Peso (kg)</label>
              <input type="number" min="35" max="250" step="0.1" className={inputClass} placeholder="Ej: 78" value={form.weightKg}
                onChange={(e) => setForm((p) => ({ ...p, weightKg: e.target.value }))} />
            </div>
          </div>
        </section>

        {/* Datos Bancarios */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--gard-muted-foreground))] mb-3">Datos Bancarios</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClass}>Banco *</label>
              <select className={selectClass} value={form.bankCode} onChange={(e) => setForm((p) => ({ ...p, bankCode: e.target.value }))}>
                <option value="">Seleccionar banco...</option>
                {CHILE_BANKS.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tipo de cuenta *</label>
              <select className={selectClass} value={form.accountType} onChange={(e) => setForm((p) => ({ ...p, accountType: e.target.value }))}>
                <option value="">Seleccionar tipo...</option>
                {BANK_ACCOUNT_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Número de cuenta *</label>
              <input className={inputClass} placeholder="Ingrese número de cuenta" value={form.accountNumber}
                onChange={(e) => setForm((p) => ({ ...p, accountNumber: e.target.value }))} />
            </div>
          </div>
        </section>

        {/* Notas */}
        <div>
          <label className={labelClass}>Notas o comentarios (opcional)</label>
          <textarea className={`${inputClass} h-20 py-2`} placeholder="Experiencia previa, disponibilidad horaria, etc." value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
        </div>

        {/* Documentos */}
        <section className="rounded-xl border-2 border-dashed border-[hsl(var(--gard-accent))]/30 bg-[hsl(var(--gard-accent))]/5 p-4 space-y-3">
          <h3 className="text-sm font-semibold">Documentos</h3>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <select className={selectClass} value={docType} onChange={(e) => setDocType(e.target.value)}>
              {documentTypes.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.required ? '(*) ' : ''}{d.label}
                </option>
              ))}
            </select>
            <button type="button" className="h-10 px-3 rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] text-sm flex items-center gap-1 hover:bg-[hsl(var(--gard-accent))]/10"
              onClick={() => { if (fileInputRef.current) fileInputRef.current.value = ''; }}>
              <Plus className="h-4 w-4" /> Agregar otro
            </button>
            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,image/*"
              onChange={(e) => { handleUpload(e.target.files?.[0]); e.target.value = ''; }} disabled={uploading} />
            <button type="button" disabled={uploading}
              className="h-10 px-3 rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] text-sm flex items-center gap-1 hover:bg-[hsl(var(--gard-accent))]/10 disabled:opacity-50"
              onClick={() => fileInputRef.current?.click()}>
              <FilePlus2 className="h-4 w-4" />
              {uploading ? 'Subiendo...' : 'Cargar documento'}
            </button>
          </div>

          {uploadedDocs.length > 0 ? (
            <div className="space-y-2">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border border-[hsl(var(--gard-border))] bg-[hsl(var(--gard-background))] px-3 py-2">
                  <span className="text-sm">
                    {documentTypes.find((d) => d.code === doc.type)?.label ?? doc.type}
                    {doc.fileName ? ` · ${doc.fileName}` : ''}
                  </span>
                  <div className="flex items-center gap-2">
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-[hsl(var(--gard-accent))] hover:underline">Ver</a>
                    <button type="button" onClick={() => removeDoc(doc.id)} className="h-6 w-6 flex items-center justify-center rounded hover:bg-red-100 dark:hover:bg-red-900/20">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[hsl(var(--gard-muted-foreground))]">
              Debes subir al menos un documento (puedes cargar varios).
              {documentTypes.some((d) => d.required) && (
                <> Los marcados con (*) son obligatorios para enviar la postulación.</>
              )}
            </p>
          )}
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[hsl(var(--gard-accent))] text-white py-3 px-8 rounded-xl font-medium hover:bg-[hsl(var(--gard-accent))]/90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {saving ? 'Enviando...' : 'Enviar postulación'}
          </button>
        </div>
      </div>
    </div>
  );
}
