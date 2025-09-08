"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URLS } from "@/app/config/api";

export default function CodigoEtica() {
  const [form, setForm] = useState({
    relato: "",
    nombre: "",
    email: "",
    anonimo: false,
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URLS.LEGAL_DENUNCIAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEnviado(true);
        setForm({ relato: "", nombre: "", email: "", anonimo: false });
      } else {
        setError("Hubo un problema al enviar la denuncia. Intente nuevamente.");
      }
    } catch {
      setError("Error de conexión. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="gard-section bg-gray-50 dark:bg-gray-900 min-h-screen py-16 md:py-24">
      <div className="gard-container max-w-4xl mx-auto px-4">
        <h1 className="text-heading-2 md:text-heading-1 text-center mb-10 text-primary dark:text-accent font-title">Código de Ética y Conducta</h1>
        <section className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-heading-4 mb-4">¿Por qué un Código de Ética?</h2>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            El <strong>Código de Ética y Conducta</strong> es el pilar fundamental para construir una cultura organizacional sólida, transparente y responsable. En el contexto chileno, la adopción de códigos éticos responde tanto a exigencias legales como a la necesidad de fortalecer la confianza de clientes, colaboradores y la sociedad en general. Gard Security se compromete a mantener los más altos estándares éticos, alineados con la legislación nacional y las mejores prácticas internacionales.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Antecedentes y Marco Legal</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            La Ley N° 20.393 y la normativa laboral chilena exigen a las empresas establecer políticas claras de integridad, prevención de delitos y promoción de ambientes laborales sanos. El Código de Ética de Gard Security es parte integral de nuestro sistema de cumplimiento y prevención, y se actualiza periódicamente para responder a los desafíos actuales.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Valores y Principios Rectores</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Respeto:</strong> Promovemos la dignidad, la inclusión y el trato justo para todos.</li>
            <li><strong>Integridad:</strong> Actuamos con honestidad, transparencia y coherencia en cada acción.</li>
            <li><strong>Profesionalismo:</strong> Cumplimos nuestras funciones con excelencia, responsabilidad y compromiso.</li>
            <li><strong>Responsabilidad:</strong> Asumimos las consecuencias de nuestros actos y decisiones.</li>
            <li><strong>Legalidad:</strong> Cumplimos estrictamente la normativa vigente y los compromisos contractuales.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Conductas Esperadas y Prohibidas</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Esperadas:</strong> Trato digno y cordial, colaboración, uso responsable de recursos, reporte de irregularidades, protección de la información confidencial, respeto a la diversidad y cumplimiento de normas de seguridad.</li>
            <li><strong>Prohibidas:</strong> Discriminación, acoso de cualquier tipo, uso indebido de recursos, conflictos de interés no declarados, corrupción, fraude, represalias contra denunciantes, y cualquier conducta que atente contra la ética o la ley.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Gestión de Conflictos de Interés</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Todo colaborador debe informar oportunamente cualquier situación que pueda afectar su objetividad o independencia en la toma de decisiones. Gard Security cuenta con procedimientos claros para la declaración, análisis y resolución de conflictos de interés, priorizando siempre la transparencia y el interés de la organización.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Adhesión y Compromiso</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Al integrarse a Gard Security, cada trabajador firma una declaración de adhesión al Código de Ética y se compromete a cumplirlo en todas sus actividades. La formación ética es parte del proceso de inducción y se refuerza periódicamente mediante capacitaciones y comunicaciones internas.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Procedimiento para Reportar Infracciones</h3>
          <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Recepción:</strong> Las denuncias pueden realizarse de forma anónima o identificada a través del canal seguro al final de esta página.</li>
            <li><strong>Análisis inicial:</strong> El Comité de Ética evalúa la denuncia y adopta medidas preventivas inmediatas si es necesario.</li>
            <li><strong>Investigación:</strong> Se realiza una investigación objetiva, confidencial y documentada.</li>
            <li><strong>Resolución:</strong> Se determinan sanciones, medidas correctivas o derivaciones a autoridades según corresponda.</li>
            <li><strong>Seguimiento:</strong> Se monitorea la situación para evitar represalias y asegurar la efectividad de las acciones.</li>
          </ol>
          <h3 className="text-heading-4 mt-8 mb-2">Consecuencias del Incumplimiento</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Sanciones disciplinarias proporcionales a la gravedad de la infracción.</li>
            <li>Posible terminación de la relación laboral o contractual.</li>
            <li>Acciones legales en caso de delitos o daños a terceros.</li>
            <li>Reparación y medidas de mejora para evitar reincidencias.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Beneficios de un Código de Ética Fuerte</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Ambiente laboral sano, seguro y motivador.</li>
            <li>Mejora de la reputación y confianza ante clientes y la sociedad.</li>
            <li>Reducción de riesgos legales y operativos.</li>
            <li>Fomento de la responsabilidad social empresarial.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Preguntas Frecuentes sobre Ética y Denuncias</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>¿Qué tipo de conductas debo reportar?</strong> Toda acción que contravenga los valores, principios o normas del Código de Ética, incluyendo discriminación, acoso, fraude, corrupción, uso indebido de recursos, etc.</li>
            <li><strong>¿Puedo denunciar de forma anónima?</strong> Sí, el canal de denuncias permite el anonimato y garantiza la confidencialidad.</li>
            <li><strong>¿Qué protección tengo como denunciante?</strong> Gard Security prohíbe toda represalia y protege la identidad y la integridad de los denunciantes.</li>
            <li><strong>¿Qué pasa si la denuncia resulta infundada?</strong> No habrá sanción para el denunciante si actuó de buena fe. Las denuncias maliciosas sí pueden ser sancionadas.</li>
            <li><strong>¿Quién gestiona las denuncias?</strong> El Comité de Ética y Cumplimiento, con independencia y confidencialidad.</li>
          </ul>
        </section>
        <form onSubmit={handleSubmit} className="gard-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
          <h2 className="text-heading-4 mb-4 text-center">Formulario de Denuncia Ética</h2>
          <div className="mb-4">
            <label htmlFor="relato" className="block text-body-base font-medium mb-2">Relato o denuncia de la conducta observada <span className="text-red-500">*</span></label>
            <Textarea id="relato" name="relato" required value={form.relato} onChange={handleChange} className="gard-input" placeholder="Describa la conducta o infracción ética..." />
          </div>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="nombre" className="block text-body-base font-medium mb-2">Nombre (opcional)</label>
              <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} className="gard-input" placeholder="Su nombre (opcional)" />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-body-base font-medium mb-2">Correo electrónico (opcional)</label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="gard-input" placeholder="correo@ejemplo.com" />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" id="anonimo" name="anonimo" checked={form.anonimo} onChange={handleChange} className="accent-primary rounded" />
            <label htmlFor="anonimo" className="text-body-base">Enviar denuncia de forma anónima</label>
          </div>
          <div className="mb-6 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="Confidencialidad garantizada"></span>
            Confidencialidad garantizada según normativa chilena.
          </div>
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
          {enviado ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 p-4 rounded-xl text-center">¡Denuncia enviada con éxito!</div>
          ) : (
            <Button type="submit" variant="gard-primary" className="w-full rounded-2xl py-3 text-lg" disabled={loading}>{loading ? "Enviando..." : "Enviar denuncia"}</Button>
          )}
        </form>
        <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Privacidad y cumplimiento legal garantizados. Gard Security © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
} 