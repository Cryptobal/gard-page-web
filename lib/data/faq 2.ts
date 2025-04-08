// Tipos para FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceFAQs {
  [key: string]: FAQItem[];
}

// FAQs genéricas que aplican a todos los servicios
const genericFAQs: FAQItem[] = [
  {
    question: '¿Cuál es el tiempo de respuesta para iniciar el servicio?',
    answer: 'En Gard Security, ofrecemos un tiempo de respuesta ágil. Una vez aprobada la cotización, podemos iniciar el servicio en un plazo de 24 a 72 horas, dependiendo de la complejidad del proyecto y la disponibilidad de recursos específicos para su implementación.'
  },
  {
    question: '¿Los servicios incluyen supervisión remota?',
    answer: 'Sí, todos nuestros servicios incluyen supervisión remota 24/7 desde nuestra central de monitoreo. Contamos con personal altamente capacitado y tecnología de punta para garantizar una respuesta inmediata ante cualquier incidente.'
  },
  {
    question: '¿Cómo se garantiza la calidad del servicio?',
    answer: 'Implementamos rigurosos estándares de calidad que incluyen supervisión constante, auditorías sorpresa, evaluaciones periódicas del personal y retroalimentación directa de nuestros clientes. Además, todo nuestro personal cuenta con certificaciones actualizadas y participa en programas de capacitación continua.'
  },
  {
    question: '¿Ofrecen servicios personalizados según las necesidades específicas?',
    answer: 'Absolutamente. Cada cliente recibe una evaluación inicial para determinar sus necesidades específicas de seguridad. A partir de esta evaluación, diseñamos un plan de seguridad a medida que se adapta perfectamente a los requerimientos particulares de su negocio o industria.'
  }
];

// FAQs específicas por servicio
const serviceFAQs: ServiceFAQs = {
  'guardias-privados': [
    {
      question: '¿Los guardias cuentan con certificación OS-10?',
      answer: 'Sí, todos nuestros guardias cuentan con certificación OS-10 vigente, cumpliendo con la normativa establecida por Carabineros de Chile. Además, pasan por un riguroso proceso de selección y capacitación continua para garantizar el más alto estándar de servicio.'
    },
    {
      question: '¿Qué tipo de uniforme utilizan los guardias?',
      answer: 'Disponemos de uniformes formales institucionales para servicios estándar. Sin embargo, también ofrecemos la opción de guardias de civil para situaciones que requieren discreción o para adaptarse a entornos específicos como retail o eventos corporativos.'
    },
    {
      question: '¿Cómo se realiza la supervisión de los guardias?',
      answer: 'Implementamos un sistema de supervisión multinivel que incluye supervisores en terreno, monitoreo por GPS, controles biométricos y supervisión remota desde nuestra central. Esto garantiza que nuestros guardias cumplan estrictamente con sus funciones y protocolos establecidos.'
    },
    {
      question: '¿Qué sucede en caso de ausencia o reemplazo de un guardia?',
      answer: 'Contamos con un protocolo de respaldo que garantiza la continuidad del servicio. Ante cualquier eventualidad, activamos inmediatamente un reemplazo calificado, asegurando que su seguridad nunca quede desprotegida. Nuestro tiempo promedio de reemplazo es de 60 minutos.'
    },
    {
      question: '¿Los guardias reciben capacitación específica para mi industria?',
      answer: 'Sí, todos nuestros guardias reciben capacitación específica según la industria donde prestarán servicios. Esto incluye protocolos particulares, conocimiento de amenazas típicas del sector y estrategias de prevención adaptadas a su realidad empresarial.'
    }
  ],
  'camaras-seguridad': [
    {
      question: '¿Qué tipo de cámaras ofrecen para instalación?',
      answer: 'Ofrecemos diversos tipos de cámaras de alta definición (HD, Full HD, 4K) adaptadas a cada necesidad: cámaras fijas, PTZ (con movimiento), térmicas, con visión nocturna, y cámaras con analítica de video integrada. Todas nuestras cámaras son de marcas reconocidas con garantía y soporte técnico.'
    },
    {
      question: '¿Las cámaras incluyen almacenamiento de grabaciones?',
      answer: 'Sí, todas nuestras soluciones incluyen sistemas de almacenamiento. Ofrecemos diferentes opciones según sus necesidades: almacenamiento local en DVR/NVR, almacenamiento en la nube con respaldo automático, y soluciones híbridas. El período de retención de grabaciones es configurable según sus requerimientos.'
    },
    {
      question: '¿Es posible acceder a las cámaras de forma remota?',
      answer: 'Absolutamente. Todas nuestras soluciones incluyen acceso remoto a través de aplicaciones móviles y plataformas web. Esto le permite monitorear sus instalaciones en tiempo real desde cualquier lugar y dispositivo con conexión a internet, manteniendo altos estándares de seguridad y encriptación.'
    },
    {
      question: '¿Las cámaras incluyen analítica de video?',
      answer: 'Ofrecemos cámaras con capacidades avanzadas de analítica de video que incluyen: detección de movimiento inteligente, reconocimiento facial, conteo de personas, detección de objetos abandonados, cruce de línea virtual, y mapas de calor. Estas funcionalidades pueden personalizarse según sus necesidades específicas.'
    },
    {
      question: '¿Qué sucede si una cámara deja de funcionar?',
      answer: 'Nuestro sistema de monitoreo detecta automáticamente cualquier falla en las cámaras. Ante una incidencia, nuestro equipo técnico responde en un plazo máximo de 24 horas. Además, ofrecemos planes de mantenimiento preventivo para minimizar posibles interrupciones en el servicio.'
    }
  ],
  'alarmas': [
    {
      question: '¿Qué tipos de sensores incluyen los sistemas de alarma?',
      answer: 'Nuestros sistemas incluyen una amplia gama de sensores: sensores de movimiento PIR, sensores magnéticos para puertas y ventanas, detectores de vibración, sensores de rotura de cristal, detectores de humo/calor, y sensores de inundación. La combinación específica se determina tras una evaluación de seguridad de sus instalaciones.'
    },
    {
      question: '¿Cómo se gestiona una alarma cuando se activa?',
      answer: 'Cuando se activa una alarma, nuestro centro de monitoreo recibe la señal inmediatamente. Nuestros operadores verifican la alerta mediante verificación visual (si hay cámaras disponibles) o llamada de confirmación. Dependiendo del protocolo establecido, se notifica a contactos autorizados y/o se despacha a personal de seguridad o autoridades.'
    },
    {
      question: '¿Los sistemas de alarma funcionan durante cortes de energía?',
      answer: 'Sí, todos nuestros sistemas de alarma incluyen baterías de respaldo que garantizan su funcionamiento durante cortes de energía. Estas baterías proporcionan autonomía de 8 a 24 horas dependiendo del modelo. Adicionalmente, ofrecemos soluciones con respaldo energético extendido para requerimientos especiales.'
    },
    {
      question: '¿Es posible integrar el sistema de alarma con cámaras y control de acceso?',
      answer: 'Absolutamente. Nuestras soluciones están diseñadas para funcionar como sistemas integrados. Podemos conectar su sistema de alarma con cámaras de seguridad, control de acceso, sensores ambientales y otros sistemas de seguridad, creando una solución unificada gestionable desde una sola plataforma.'
    },
    {
      question: '¿Ofrecen mantenimiento para los sistemas de alarma?',
      answer: 'Sí, ofrecemos planes de mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento de su sistema de alarma. Estos incluyen revisiones periódicas, actualización de firmware, limpieza de sensores, verificación de baterías y ajustes necesarios para maximizar la efectividad del sistema.'
    }
  ]
};

// Función para obtener las FAQs según el servicio
export const getFAQsByService = (servicio: string): FAQItem[] => {
  // Combinar FAQs genéricas con específicas del servicio
  const specificFAQs = serviceFAQs[servicio] || [];
  return [...specificFAQs, ...genericFAQs];
};

export default getFAQsByService; 