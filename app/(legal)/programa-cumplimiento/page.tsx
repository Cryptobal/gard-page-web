"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Check } from "lucide-react";
import { API_URLS } from "@/config/api";

export default function ProgramaCumplimiento() {
  const [form, setForm] = useState({
    descripcion: "",
    nombre: "",
    email: "",
    anonimo: false,
    acepta: false,
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
        setForm({ descripcion: "", nombre: "", email: "", anonimo: false, acepta: false });
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
        <h1 className="text-heading-2 md:text-heading-1 text-center mb-10 text-primary dark:text-accent font-title">Programa de Cumplimiento y Política Anticorrupción</h1>
        <section className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-heading-4 mb-4">Compromiso con la Ley N° 20.393</h2>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            La <strong>Ley N° 20.393</strong> establece la responsabilidad penal de las personas jurídicas en Chile por delitos de lavado de activos, financiamiento del terrorismo, cohecho y otros ilícitos. Desde su promulgación, las empresas están obligadas a implementar modelos de prevención y sistemas de cumplimiento (compliance) que permitan detectar, prevenir y sancionar conductas ilícitas dentro de la organización.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Antecedentes y Evolución del Compliance en Chile</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Antes de la Ley 20.393, la responsabilidad penal recaía exclusivamente en las personas naturales. Sin embargo, la globalización, los tratados internacionales y la necesidad de combatir la corrupción llevaron a Chile a adoptar estándares internacionales de compliance. Hoy, el compliance es un pilar esencial para la sostenibilidad y competitividad de las empresas.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Delitos Cubiertos por la Ley 20.393</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Lavado de activos</li>
            <li>Financiamiento del terrorismo</li>
            <li>Cohecho a funcionario público nacional o extranjero</li>
            <li>Receptación</li>
            <li>Corrupción entre particulares</li>
            <li>Administración desleal</li>
            <li>Negociación incompatible</li>
            <li>Contaminación de aguas</li>
            <li>Delitos informáticos (Ley 21.459)</li>
            <li>Otros delitos incorporados por reformas sucesivas</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">¿Por qué es importante el compliance?</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            El compliance es fundamental para proteger la reputación, la continuidad operativa y la confianza de clientes, proveedores y autoridades. Un programa robusto de cumplimiento reduce riesgos legales, sanciones económicas y daños reputacionales, y demuestra el compromiso ético de la empresa ante el mercado y la sociedad.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">El Rol del Oficial de Cumplimiento</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Gard Security cuenta con un <strong>Oficial de Cumplimiento</strong> responsable de supervisar la implementación, actualización y efectividad del programa. Este profesional actúa con independencia, reporta directamente a la alta dirección y es el punto de contacto para consultas y denuncias.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Cultura de Integridad y Ética Empresarial</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Fomentamos una cultura organizacional donde la integridad, la ética y el respeto a la ley son valores intransables. Todos los colaboradores reciben formación continua y se promueve el liderazgo ético en todos los niveles jerárquicos.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Principios Rectores del Programa</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><strong>Integridad:</strong> Actuar siempre con honestidad y ética en todas las operaciones.</li>
            <li><strong>Transparencia:</strong> Información clara y accesible para todos los stakeholders.</li>
            <li><strong>Legalidad:</strong> Cumplimiento estricto de la normativa nacional e internacional.</li>
            <li><strong>Control interno:</strong> Procesos y auditorías para prevenir y detectar irregularidades.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Alcance del Programa</h3>
          <p className="mb-4">El programa de cumplimiento de Gard Security aplica a todos los empleados, ejecutivos, subcontratistas y proveedores, abarcando todas las áreas y niveles de la organización. Se exige el mismo estándar ético a quienes colaboran o prestan servicios para la empresa.</p>
          <h3 className="text-heading-4 mt-8 mb-2">Medidas Implementadas</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><strong>Gestión de riesgos:</strong> Identificación y evaluación periódica de riesgos legales y operativos.</li>
            <li><strong>Capacitaciones:</strong> Programas de formación continua en ética, compliance y prevención de delitos.</li>
            <li><strong>Auditorías internas:</strong> Revisión independiente y regular de procesos críticos.</li>
            <li><strong>Política de puertas abiertas:</strong> Fomento de la comunicación y reporte de irregularidades sin temor a represalias.</li>
            <li><strong>Evaluación de proveedores:</strong> Selección y monitoreo de terceros bajo criterios de integridad y cumplimiento.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Procedimiento de Denuncia</h3>
          <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Recepción:</strong> Las denuncias pueden realizarse de forma anónima o identificada a través del canal seguro al final de esta página.</li>
            <li><strong>Análisis inicial:</strong> El equipo de cumplimiento evalúa la denuncia y adopta medidas preventivas inmediatas si es necesario.</li>
            <li><strong>Investigación:</strong> Se realiza una investigación objetiva, confidencial y documentada.</li>
            <li><strong>Resolución:</strong> Se determinan sanciones, medidas correctivas o derivaciones a autoridades según corresponda.</li>
            <li><strong>Seguimiento:</strong> Se monitorea la situación para evitar represalias y asegurar la efectividad de las acciones.</li>
          </ol>
          <h3 className="text-heading-4 mt-8 mb-2">Consecuencias Legales y Organizacionales</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>El incumplimiento puede derivar en sanciones penales, civiles y administrativas para la empresa y sus directivos.</li>
            <li>Gard Security puede ser excluida de licitaciones públicas y privadas si no cumple con la Ley 20.393.</li>
            <li>La empresa promueve la reparación y la mejora continua tras cada incidente reportado.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Beneficios para Clientes y Proveedores</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Confianza en una empresa que prioriza la ética y la transparencia.</li>
            <li>Reducción de riesgos legales y reputacionales en la cadena de valor.</li>
            <li>Acceso a capacitaciones y buenas prácticas en compliance.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Impacto Positivo para la Empresa y la Sociedad</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Un programa de cumplimiento efectivo no solo protege a la empresa, sino que contribuye a la construcción de un entorno empresarial más justo, competitivo y transparente en Chile. Gard Security se posiciona como referente en integridad y responsabilidad social.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Compromiso Permanente</h3>
          <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
            Gard Security reafirma su compromiso con la integridad, la transparencia y el cumplimiento normativo, promoviendo una cultura organizacional basada en la ética y la responsabilidad social. Invitamos a todos nuestros colaboradores, clientes y proveedores a sumarse activamente a este esfuerzo.
          </p>
          <h3 className="text-heading-4 mt-8 mb-2">Preguntas Frecuentes sobre Compliance y Denuncias</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>¿Qué ocurre si denuncio de forma anónima?</strong> La denuncia será investigada con la misma seriedad y confidencialidad. No se solicitarán datos personales y se protegerá la identidad del denunciante.</li>
            <li><strong>¿Qué tipo de hechos debo denunciar?</strong> Cualquier sospecha o conocimiento de delitos, fraudes, corrupción, conflictos de interés, malas prácticas o incumplimientos éticos.</li>
            <li><strong>¿Qué protección tengo como denunciante?</strong> Gard Security prohíbe toda represalia y garantiza el resguardo de la identidad y la integridad de los denunciantes.</li>
            <li><strong>¿Quién puede acceder a la información de la denuncia?</strong> Solo el Oficial de Cumplimiento y el equipo autorizado, bajo estricta confidencialidad.</li>
            <li><strong>¿Qué pasa si la denuncia resulta infundada?</strong> No habrá sanción para el denunciante si actuó de buena fe. Las denuncias maliciosas sí pueden ser sancionadas.</li>
          </ul>
          <h3 className="text-heading-4 mt-8 mb-2">Recursos y Enlaces Útiles</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1012398" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-accent underline">Texto oficial de la Ley N° 20.393 en la Biblioteca del Congreso Nacional</a></li>
          </ul>
        </section>
        <form onSubmit={handleSubmit} className="gard-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
          <h2 className="text-heading-4 mb-4 text-center">Formulario de Denuncia</h2>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-body-base font-medium mb-2">Descripción del hecho o sospecha <span className="text-red-500">*</span></label>
            <Textarea id="descripcion" name="descripcion" required value={form.descripcion} onChange={handleChange} className="gard-input" placeholder="Describa el hecho, acto o sospecha de corrupción..." />
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
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" id="acepta" name="acepta" required checked={form.acepta} onChange={handleChange} className="accent-primary rounded" />
            <label htmlFor="acepta" className="text-body-base">Acepto los términos legales y la política de confidencialidad</label>
          </div>
          <div className="mb-6 text-xs text-gray-500 dark:text-gray-400">
            <p>Gard Security garantiza la confidencialidad de la información y la protección de los denunciantes conforme a la legislación chilena vigente.</p>
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