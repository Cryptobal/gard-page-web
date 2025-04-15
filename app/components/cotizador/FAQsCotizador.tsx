import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    pregunta: "¿Cómo funciona el cotizador de guardias de seguridad?",
    respuesta: "Nuestro cotizador te permite calcular el costo de guardias de seguridad personalizando parámetros como tipo de turno, horario y número de puestos. Simplemente configura tus necesidades y obtén una cotización instantánea."
  },
  {
    pregunta: "¿Qué tipos de servicios de seguridad puedo cotizar?",
    respuesta: "Ofrecemos cotización para servicios de seguridad industrial, retail, corporativa, centros comerciales, hotelería, minería, tecnología, financiera y más. El cotizador se adapta a las necesidades específicas de cada sector."
  },
  {
    pregunta: "¿Cuál es el costo de guardias de seguridad 24/7?",
    respuesta: "El costo de guardias 24/7 varía según el sistema de turnos (4x4, 5x2, 7x7, 14x14) y el número de puestos. Nuestro cotizador te permite ver el costo exacto según tu configuración específica."
  },
  {
    pregunta: "¿Qué incluye el servicio de guardias de seguridad?",
    respuesta: "Nuestros servicios incluyen guardias profesionales capacitados, supervisión constante, reportes diarios, equipamiento básico y cobertura de responsabilidad civil. Todo personalizado según las necesidades de tu empresa."
  },
  {
    pregunta: "¿Cómo se calcula el precio de los guardias de seguridad?",
    respuesta: "El precio se calcula considerando el sueldo líquido del guardia, cargas legales, beneficios, equipamiento, supervisión y margen operacional. Nuestro cotizador transparenta todos estos costos."
  }
];

export default function FAQsCotizador() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="border border-border/50 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-medium text-left text-gray-900 dark:text-white">
              {faq.pregunta}
            </h3>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 text-gray-600 dark:text-gray-300"
            >
              {faq.respuesta}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
} 