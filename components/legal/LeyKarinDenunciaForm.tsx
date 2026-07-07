'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { API_URLS } from '@/app/config/api';
import { submitOpaiMessage, uploadLegalEvidence } from '@/lib/submitOpaiMessage';

const TIPO_OPCIONES = [
  { value: 'acoso_sexual', label: 'Acoso sexual' },
  { value: 'acoso_laboral', label: 'Acoso laboral' },
  { value: 'violencia', label: 'Violencia en el trabajo' },
  { value: 'derechos_humanos', label: 'Vulneración de derechos humanos' },
  { value: 'otro', label: 'Otro' },
];

type FormState = {
  anonimo: boolean;
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  fecha_hecho: string;
  lugar_hecho: string;
  descripcion: string;
  persona_involucrada: string;
  testigos: string;
  evidencia_nombre: string;
};

type FieldErrors = Partial<Record<keyof FormState | 'tipo', string>>;

type LeyKarinDenunciaFormProps = {
  origen: 'ley-karin' | 'politica-derechos-humanos';
  heading?: string;
  description?: string;
};

const createInitialForm = (): FormState => ({
  anonimo: false,
  nombre: '',
  email: '',
  telefono: '',
  tipo: '',
  fecha_hecho: '',
  lugar_hecho: '',
  descripcion: '',
  persona_involucrada: '',
  testigos: '',
  evidencia_nombre: '',
});

export default function LeyKarinDenunciaForm({
  origen,
  heading = 'Formulario de Denuncia Ley Karin',
  description,
}: LeyKarinDenunciaFormProps) {
  const [form, setForm] = useState<FormState>(createInitialForm);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const errors: FieldErrors = {};
    if (!form.tipo) errors.tipo = 'Obligatorio';
    if (!form.fecha_hecho) errors.fecha_hecho = 'Obligatorio';
    if (!form.lugar_hecho) errors.lugar_hecho = 'Obligatorio';
    if (!form.descripcion) errors.descripcion = 'Obligatorio';
    if (!form.testigos) errors.testigos = 'Obligatorio';
    if (!form.anonimo) {
      if (!form.nombre) errors.nombre = 'Obligatorio';
      if (!form.email) errors.email = 'Obligatorio';
      if (!form.telefono) errors.telefono = 'Obligatorio';
      else if (!/^\d{9}$/.test(form.telefono)) errors.telefono = 'Debe tener 9 dígitos';
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Email inválido';
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleTipo = (value: string) => {
    setForm((prev) => ({ ...prev, tipo: value }));
    setFieldErrors((prev) => ({ ...prev, tipo: undefined }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({
      ...prev,
      evidencia_nombre: file?.name ?? '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setWarning('');
    setSuccessMsg('');
    setLoading(true);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      let fileUrl: string | undefined;
      let fileName: string | undefined;
      const selectedFile = fileInputRef.current?.files?.[0];

      if (selectedFile) {
        const uploadResult = await uploadLegalEvidence(API_URLS.LEGAL_UPLOAD, selectedFile);
        if (uploadResult.ok) {
          fileUrl = uploadResult.url;
          fileName = uploadResult.fileName;
        } else {
          setWarning(uploadResult.message);
        }
      }

      const result = await submitOpaiMessage(API_URLS.LEGAL_DENUNCIAS, {
        type: 'denuncia_ley_karin',
        anonymous: form.anonimo,
        name: form.anonimo ? undefined : form.nombre,
        email: form.anonimo ? undefined : form.email,
        phone: form.anonimo ? undefined : form.telefono,
        subject: `Denuncia Ley Karin: ${form.tipo}`,
        body: form.descripcion,
        fileUrl,
        fileName,
        metadata: {
          origen,
          tipo: form.tipo,
          fecha_hecho: form.fecha_hecho,
          lugar_hecho: form.lugar_hecho,
          persona_involucrada: form.persona_involucrada,
          testigos: form.testigos,
        },
      });

      if (result.ok) {
        setSuccessMsg(
          'Denuncia enviada con éxito. Gard Security la recibirá por el mismo canal que el formulario Ley Karin. Nos contactaremos si corresponde.'
        );
        setForm(createInitialForm());
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(result.message);
      }
    } catch {
      setError('Error de conexión. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="denuncia"
      onSubmit={handleSubmit}
      className="gard-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 max-w-2xl mx-auto touch-pan-y overscroll-contain"
      noValidate
    >
      <h2 className="text-heading-4 mb-2 text-center">{heading}</h2>
      {description && (
        <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6 text-center">{description}</p>
      )}

      <div className="mb-6 flex items-start gap-2">
        <input
          type="checkbox"
          id={`anonimo-${origen}`}
          name="anonimo"
          checked={form.anonimo}
          onChange={handleChange}
          className="mt-1 accent-primary rounded focus:ring-2 focus:ring-primary"
        />
        <label htmlFor={`anonimo-${origen}`} className="text-body-base select-none">
          ¿Desea que su denuncia sea anónima?
        </label>
      </div>

      {!form.anonimo && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor={`nombre-${origen}`} className="block text-body-base font-medium mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <Input
              id={`nombre-${origen}`}
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.nombre ? 'border-red-500' : ''}`}
              placeholder="Nombre y apellido"
              autoComplete="name"
              required
              aria-invalid={!!fieldErrors.nombre}
            />
            {fieldErrors.nombre && <p className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</p>}
          </div>
          <div>
            <label htmlFor={`email-${origen}`} className="block text-body-base font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id={`email-${origen}`}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.email ? 'border-red-500' : ''}`}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <label htmlFor={`telefono-${origen}`} className="block text-body-base font-medium mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <Input
              id={`telefono-${origen}`}
              name="telefono"
              type="tel"
              inputMode="numeric"
              value={form.telefono}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.telefono ? 'border-red-500' : ''}`}
              placeholder="912345678"
              autoComplete="tel"
              maxLength={9}
              required
              aria-invalid={!!fieldErrors.telefono}
            />
            {fieldErrors.telefono && <p className="text-red-500 text-xs mt-1">{fieldErrors.telefono}</p>}
          </div>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor={`tipo-${origen}`} className="block text-body-base font-medium mb-2">
          Tipo de hecho denunciado <span className="text-red-500">*</span>
        </label>
        <Select value={form.tipo} onValueChange={handleTipo} name="tipo" required>
          <SelectTrigger className={`gard-input ${fieldErrors.tipo ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[40vh]">
            {TIPO_OPCIONES.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.tipo && <p className="text-red-500 text-xs mt-1">{fieldErrors.tipo}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor={`fecha_hecho-${origen}`} className="block text-body-base font-medium mb-2">
          Fecha o período del hecho <span className="text-red-500">*</span>
        </label>
        <Input
          id={`fecha_hecho-${origen}`}
          name="fecha_hecho"
          type="text"
          value={form.fecha_hecho}
          onChange={handleChange}
          className={`gard-input ${fieldErrors.fecha_hecho ? 'border-red-500' : ''}`}
          placeholder="Ej: 12/04/2024 o 'abril 2024'"
          required
          aria-invalid={!!fieldErrors.fecha_hecho}
        />
        {fieldErrors.fecha_hecho && <p className="text-red-500 text-xs mt-1">{fieldErrors.fecha_hecho}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor={`lugar_hecho-${origen}`} className="block text-body-base font-medium mb-2">
          Lugar donde ocurrieron los hechos <span className="text-red-500">*</span>
        </label>
        <Input
          id={`lugar_hecho-${origen}`}
          name="lugar_hecho"
          type="text"
          value={form.lugar_hecho}
          onChange={handleChange}
          className={`gard-input ${fieldErrors.lugar_hecho ? 'border-red-500' : ''}`}
          placeholder="Ej: Oficina central, faena minera, etc."
          required
          aria-invalid={!!fieldErrors.lugar_hecho}
        />
        {fieldErrors.lugar_hecho && <p className="text-red-500 text-xs mt-1">{fieldErrors.lugar_hecho}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor={`descripcion-${origen}`} className="block text-body-base font-medium mb-2">
          Descripción detallada del hecho <span className="text-red-500">*</span>
        </label>
        <Textarea
          id={`descripcion-${origen}`}
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className={`gard-input min-h-[120px] ${fieldErrors.descripcion ? 'border-red-500' : ''}`}
          placeholder="Describa el hecho o situación con el mayor detalle posible..."
          required
          aria-invalid={!!fieldErrors.descripcion}
        />
        {fieldErrors.descripcion && <p className="text-red-500 text-xs mt-1">{fieldErrors.descripcion}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor={`persona_involucrada-${origen}`} className="block text-body-base font-medium mb-2">
          Persona(s) involucrada(s) (si se conoce)
        </label>
        <Input
          id={`persona_involucrada-${origen}`}
          name="persona_involucrada"
          type="text"
          value={form.persona_involucrada}
          onChange={handleChange}
          className="gard-input"
          placeholder="Nombre(s) de persona(s) involucrada(s)"
        />
      </div>

      <div className="mb-6">
        <label htmlFor={`testigos-${origen}`} className="block text-body-base font-medium mb-2">
          ¿Existen testigos? ¿Quiénes? <span className="text-red-500">*</span>
        </label>
        <Input
          id={`testigos-${origen}`}
          name="testigos"
          type="text"
          value={form.testigos}
          onChange={handleChange}
          className={`gard-input ${fieldErrors.testigos ? 'border-red-500' : ''}`}
          placeholder="Nombre(s) de testigos o 'No existen'"
          required
          aria-invalid={!!fieldErrors.testigos}
        />
        {fieldErrors.testigos && <p className="text-red-500 text-xs mt-1">{fieldErrors.testigos}</p>}
      </div>

      <div className="mb-8">
        <label htmlFor={`evidencia-${origen}`} className="block text-body-base font-medium mb-2">
          Adjuntar evidencia o documentos (opcional)
        </label>
        <input
          ref={fileInputRef}
          id={`evidencia-${origen}`}
          name="evidencia"
          type="file"
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
          className="gard-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition"
          onChange={handleFile}
        />
        {form.evidencia_nombre && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Archivo seleccionado: <span className="font-medium">{form.evidencia_nombre}</span>
          </div>
        )}
      </div>

      {warning && <div className="text-amber-600 dark:text-amber-400 mb-4 text-sm text-center">{warning}</div>}
      {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
      {successMsg && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 p-4 rounded-xl text-center mb-4">
          {successMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        className="w-full rounded-2xl py-3 text-lg mt-2"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar denuncia'}
      </Button>

      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        Gard Security garantiza la confidencialidad y protección de los denunciantes conforme a la Ley Karin (N° 21.643).
      </div>
    </form>
  );
}
