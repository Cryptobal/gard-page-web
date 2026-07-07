import React from 'react';
import LeyKarinDenunciaForm from '@/components/legal/LeyKarinDenunciaForm';
import { LegalPageShell, LegalPageTitle } from '@/components/legal/LegalPageShell';

export default function LeyKarin() {
  return (
    <LegalPageShell>
      <LegalPageTitle title="Canal de Denuncias – Ley Karin (N° 21.643)" />

      <section className="prose dark:prose-invert max-w-none mb-12 break-words">
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

      <LeyKarinDenunciaForm origen="ley-karin" />

      <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>Privacidad y cumplimiento legal garantizados. Gard Security © {new Date().getFullYear()}</p>
      </footer>
    </LegalPageShell>
  );
}
