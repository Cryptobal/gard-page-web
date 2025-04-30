"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const TIPO_OPCIONES = [
  { value: "acoso_sexual", label: "Acoso sexual" },
  { value: "acoso_laboral", label: "Acoso laboral" },
  { value: "violencia", label: "Violencia en el trabajo" },
  { value: "otro", label: "Otro" },
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
  evidencia: string | null;
  evidencia_nombre: string;
  evidencia_tipo: string;
  origen: string;
};

const initialForm: FormState = {
  anonimo: false,
  nombre: "",
  email: "",
  telefono: "",
  tipo: "",
  fecha_hecho: "",
  lugar_hecho: "",
  descripcion: "",
  persona_involucrada: "",
  testigos: "",
  evidencia: null,
  evidencia_nombre: "",
  evidencia_tipo: "",
  origen: "ley-karin",
};

export default function LeyKarin() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validación de campos obligatorios
  const validate = () => {
    const errors: any = {};
    if (!form.tipo) errors.tipo = "Obligatorio";
    if (!form.fecha_hecho) errors.fecha_hecho = "Obligatorio";
    if (!form.lugar_hecho) errors.lugar_hecho = "Obligatorio";
    if (!form.descripcion) errors.descripcion = "Obligatorio";
    if (!form.testigos) errors.testigos = "Obligatorio";
    if (!form.anonimo) {
      if (!form.nombre) errors.nombre = "Obligatorio";
      if (!form.email) errors.email = "Obligatorio";
      if (!form.telefono) errors.telefono = "Obligatorio";
      else if (!/^\d{9}$/.test(form.telefono)) errors.telefono = "Debe tener 9 dígitos";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email inválido";
    }
    return errors;
  };

  // Manejo de cambios en campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      setFieldErrors((prev: any) => ({ ...prev, [name]: undefined }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setFieldErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  // Manejo de select
  const handleTipo = (value: string) => {
    setForm((prev) => ({ ...prev, tipo: value }));
    setFieldErrors((prev: any) => ({ ...prev, tipo: undefined }));
  };

  // Manejo de archivo
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, evidencia: null, evidencia_nombre: "", evidencia_tipo: "" }));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        evidencia: ev.target?.result as string | null,
        evidencia_nombre: file.name,
        evidencia_tipo: file.type,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setEnviado(false);
    setLoading(true);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }
    // Preparar payload
    const payload: any = { ...form };
    // Si no hay archivo, eliminar campos de evidencia (asegurar que sean opcionales en el payload)
    if (!form.evidencia) {
      payload.evidencia = undefined;
      payload.evidencia_nombre = undefined;
      payload.evidencia_tipo = undefined;
    }
    try {
      const res = await fetch("https://hook.us1.make.com/v3rknlt7mxqvjtna74iajcyfku7vnfj2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setEnviado(true);
        setSuccessMsg("¡Denuncia enviada con éxito! Nos contactaremos si corresponde. Guarda tu comprobante si lo deseas.");
        setForm(initialForm);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError("Hubo un problema al enviar la denuncia. Intenta nuevamente.");
      }
    } catch {
      setError("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="gard-section bg-gray-50 dark:bg-gray-900 min-h-screen py-16 md:py-24">
      <div className="gard-container max-w-4xl mx-auto px-4">
        <h1 className="text-heading-2 md:text-heading-1 text-center mb-10 text-primary dark:text-accent font-title">
          Canal de Denuncias – Ley Karin (N° 21.643)
        </h1>
        <section className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-heading-4 mb-4">¿Qué es la Ley Karin?</h2>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            La <strong>Ley N° 21.643</strong>, conocida como <strong>Ley Karin</strong>, fue promulgada en Chile en 2024 y representa un avance fundamental en la protección de los derechos de los trabajadores frente al acoso laboral, acoso sexual y la violencia en el trabajo. Esta ley establece la obligación para todas las empresas de implementar canales confidenciales y protocolos claros para la recepción, investigación y resolución de denuncias, garantizando la protección de denunciantes y víctimas.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Contexto y Antecedentes</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            La Ley Karin surge como respuesta a la creciente preocupación social y jurídica por los casos de acoso y violencia en el ámbito laboral, y lleva el nombre de Karin, una trabajadora que fue víctima de acoso y cuya historia impulsó la creación de esta normativa. El objetivo principal es erradicar conductas que atenten contra la dignidad, integridad y bienestar de los trabajadores, promoviendo ambientes laborales seguros, inclusivos y respetuosos.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Definiciones Clave</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><strong>Acoso laboral:</strong> Toda conducta reiterada ejercida por el empleador o por uno o más trabajadores en contra de otro trabajador, por cualquier medio, que resulte en menoscabo, maltrato o humillación, o que amenace o perjudique su situación laboral o sus oportunidades en el empleo.</li>
            <li><strong>Acoso sexual:</strong> Manifestación de conductas de connotación sexual no consentidas, que afecten la dignidad o generen un ambiente hostil, intimidatorio o humillante para la persona afectada.</li>
            <li><strong>Violencia en el trabajo:</strong> Acciones o amenazas de violencia física o psicológica que ocurran en el contexto laboral, incluyendo agresiones, intimidaciones o cualquier forma de maltrato.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Derechos y Deberes de los Trabajadores</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Derecho a un ambiente laboral seguro, libre de acoso y violencia.</li>
            <li>Derecho a denunciar hechos de acoso o violencia sin temor a represalias.</li>
            <li>Deber de respetar la dignidad y derechos de todos los integrantes de la organización.</li>
            <li>Colaborar con los procesos de investigación interna cuando corresponda.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Compromiso de Gard Security</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            En Gard Security, estamos comprometidos con la prevención, detección y sanción de cualquier forma de acoso o violencia en el trabajo. Hemos implementado un <strong>canal de denuncias confidencial</strong> y un protocolo de actuación que asegura la protección de los derechos de denunciantes y víctimas, en estricto cumplimiento de la Ley Karin y las mejores prácticas internacionales.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">¿Cómo funciona el Canal de Denuncias?</h3>
          <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Recepción:</strong> Toda denuncia puede ser presentada de forma anónima o identificada, a través del formulario al final de esta página. Se garantiza absoluta confidencialidad y resguardo de la identidad.</li>
            <li><strong>Análisis preliminar:</strong> El equipo de cumplimiento revisa la denuncia y determina las medidas inmediatas de protección para el denunciante y la presunta víctima.</li>
            <li><strong>Investigación interna:</strong> Se realiza una investigación objetiva, imparcial y reservada, respetando el debido proceso y los derechos de todas las partes involucradas.</li>
            <li><strong>Resolución:</strong> Se adoptan medidas correctivas, sanciones o derivaciones según la gravedad de los hechos y conforme a la ley y reglamentos internos.</li>
            <li><strong>Seguimiento:</strong> Se monitorea la situación para evitar represalias y asegurar la efectividad de las medidas adoptadas.</li>
          </ol>
          <h3 className="text-heading-4 mt-8 mb-2">Medidas de Protección y Confidencialidad</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Prohibición absoluta de represalias contra denunciantes o testigos.</li>
            <li>Resguardo de la identidad y datos personales de todas las personas involucradas.</li>
            <li>Acceso restringido a la información de la denuncia, solo para el equipo autorizado.</li>
            <li>Asesoría y acompañamiento a víctimas durante todo el proceso.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Consecuencias Legales y Organizacionales</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Las conductas de acoso o violencia pueden derivar en sanciones disciplinarias, despido, acciones civiles y/o penales según la gravedad.</li>
            <li>La empresa puede ser fiscalizada y sancionada por la Dirección del Trabajo si no cumple con la Ley Karin.</li>
            <li>Gard Security promueve la reparación y reinserción laboral de las víctimas, así como la capacitación continua en prevención.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Recursos y Enlaces Útiles</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1205338" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-accent underline">Texto oficial de la Ley Karin (N° 21.643) en la Biblioteca del Congreso Nacional</a></li>
          </ul>
        </section>
        <form
          onSubmit={handleSubmit}
          className="gard-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 max-w-2xl mx-auto"
          noValidate
        >
          <h2 className="text-heading-4 mb-4 text-center">Formulario de Denuncia Ley Karin</h2>
          {/* Checkbox anónimo */}
          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="anonimo"
              name="anonimo"
              checked={form.anonimo}
              onChange={handleChange}
              className="accent-primary rounded focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="anonimo" className="text-body-base select-none">
              ¿Desea que su denuncia sea anónima?
            </label>
          </div>
          {/* Campos de contacto condicionales */}
          {!form.anonimo && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-body-base font-medium mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className={`gard-input ${fieldErrors.nombre ? "border-red-500" : ""}`}
                  placeholder="Nombre y apellido"
                  autoComplete="name"
                  required
                  aria-invalid={!!fieldErrors.nombre}
                />
                {fieldErrors.nombre && <p className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-body-base font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`gard-input ${fieldErrors.email ? "border-red-500" : ""}`}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  required
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className="block text-body-base font-medium mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  className={`gard-input ${fieldErrors.telefono ? "border-red-500" : ""}`}
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
          {/* Tipo de hecho denunciado */}
          <div className="mb-6">
            <label htmlFor="tipo" className="block text-body-base font-medium mb-2">
              Tipo de hecho denunciado <span className="text-red-500">*</span>
            </label>
            <Select value={form.tipo} onValueChange={handleTipo} name="tipo" required>
              <SelectTrigger className={`gard-input ${fieldErrors.tipo ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                {TIPO_OPCIONES.map((op) => (
                  <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.tipo && <p className="text-red-500 text-xs mt-1">{fieldErrors.tipo}</p>}
          </div>
          {/* Fecha o período del hecho */}
          <div className="mb-6">
            <label htmlFor="fecha_hecho" className="block text-body-base font-medium mb-2">
              Fecha o período del hecho <span className="text-red-500">*</span>
            </label>
            <Input
              id="fecha_hecho"
              name="fecha_hecho"
              type="text"
              value={form.fecha_hecho}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.fecha_hecho ? "border-red-500" : ""}`}
              placeholder="Ej: 12/04/2024 o 'abril 2024'"
              required
              aria-invalid={!!fieldErrors.fecha_hecho}
            />
            {fieldErrors.fecha_hecho && <p className="text-red-500 text-xs mt-1">{fieldErrors.fecha_hecho}</p>}
          </div>
          {/* Lugar de los hechos */}
          <div className="mb-6">
            <label htmlFor="lugar_hecho" className="block text-body-base font-medium mb-2">
              Lugar donde ocurrieron los hechos <span className="text-red-500">*</span>
            </label>
            <Input
              id="lugar_hecho"
              name="lugar_hecho"
              type="text"
              value={form.lugar_hecho}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.lugar_hecho ? "border-red-500" : ""}`}
              placeholder="Ej: Oficina central, sucursal, etc."
              required
              aria-invalid={!!fieldErrors.lugar_hecho}
            />
            {fieldErrors.lugar_hecho && <p className="text-red-500 text-xs mt-1">{fieldErrors.lugar_hecho}</p>}
          </div>
          {/* Descripción detallada */}
          <div className="mb-6">
            <label htmlFor="descripcion" className="block text-body-base font-medium mb-2">
              Descripción detallada del hecho <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className={`gard-input min-h-[120px] ${fieldErrors.descripcion ? "border-red-500" : ""}`}
              placeholder="Describa el hecho o situación con el mayor detalle posible..."
              required
              aria-invalid={!!fieldErrors.descripcion}
            />
            {fieldErrors.descripcion && <p className="text-red-500 text-xs mt-1">{fieldErrors.descripcion}</p>}
          </div>
          {/* Persona(s) involucrada(s) */}
          <div className="mb-6">
            <label htmlFor="persona_involucrada" className="block text-body-base font-medium mb-2">
              Persona(s) involucrada(s) (si se conoce)
            </label>
            <Input
              id="persona_involucrada"
              name="persona_involucrada"
              type="text"
              value={form.persona_involucrada}
              onChange={handleChange}
              className="gard-input"
              placeholder="Nombre(s) de persona(s) involucrada(s)"
            />
          </div>
          {/* Testigos */}
          <div className="mb-6">
            <label htmlFor="testigos" className="block text-body-base font-medium mb-2">
              ¿Existen testigos? ¿Quiénes? <span className="text-red-500">*</span>
            </label>
            <Input
              id="testigos"
              name="testigos"
              type="text"
              value={form.testigos}
              onChange={handleChange}
              className={`gard-input ${fieldErrors.testigos ? "border-red-500" : ""}`}
              placeholder="Nombre(s) de testigos o 'No existen'"
              required
              aria-invalid={!!fieldErrors.testigos}
            />
            {fieldErrors.testigos && <p className="text-red-500 text-xs mt-1">{fieldErrors.testigos}</p>}
          </div>
          {/* Upload de evidencia */}
          <div className="mb-8">
            <label htmlFor="evidencia" className="block text-body-base font-medium mb-2">
              Adjuntar evidencia o documentos (opcional)
            </label>
            <input
              ref={fileInputRef}
              id="evidencia"
              name="evidencia"
              type="file"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
              className="gard-input file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition"
              onChange={handleFile}
            />
            {form.evidencia_nombre && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Archivo seleccionado: <span className="font-medium">{form.evidencia_nombre}</span>
              </div>
            )}
          </div>
          {/* Campo oculto de origen */}
          <input type="hidden" name="origen" value="ley-karin" />
          {/* Mensajes de error y éxito */}
          {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
          {successMsg && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 p-4 rounded-xl text-center mb-4 animate-fade-in">
              {successMsg}
            </div>
          )}
          {/* Botón de envío */}
          <Button
            type="submit"
            variant="gard-primary"
            className="w-full rounded-2xl py-3 text-lg mt-2"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar denuncia"}
          </Button>
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
            Gard Security garantiza la confidencialidad y protección de los denunciantes conforme a la Ley Karin (N° 21.643).
          </div>
        </form>
        <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Privacidad y cumplimiento legal garantizados. Gard Security © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
} 