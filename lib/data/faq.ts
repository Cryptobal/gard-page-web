// Definición de estructura de preguntas frecuentes por servicio
export type FAQItem = {
  question: string;
  answer: string;
};

// Preguntas generales sobre Gard Security
const generalFAQs: FAQItem[] = [
  {
    question: "¿Qué es Gard Security?",
    answer: "Gard Security es una empresa líder en soluciones de seguridad privada para empresas en Chile. Ofrecemos servicios integrales de guardias, cámaras, alarmas y sistemas de control de acceso con tecnología de punta y personal altamente capacitado."
  },
  {
    question: "¿Cuál es el área de cobertura de Gard Security?",
    answer: "Operamos en toda la Región Metropolitana y principales ciudades de Chile. Nuestros servicios están disponibles para empresas de todos los tamaños y sectores industriales, adaptándonos a las necesidades específicas de cada cliente."
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer: "Puede solicitar una cotización completando el formulario en nuestra página web, llamando al +56 9 4113 7976 o enviando un correo a comercial@gard.cl. Uno de nuestros asesores especializados se pondrá en contacto con usted en menos de 24 horas."
  },
  {
    question: "¿Qué acreditaciones tiene Gard Security?",
    answer: "Gard Security cuenta con todas las certificaciones y acreditaciones requeridas por la ley chilena, incluyendo OS-10 de Carabineros. Nuestro personal está certificado y capacitado según los más altos estándares de la industria."
  }
];

// Preguntas específicas por servicio
const serviceFAQs: Record<string, FAQItem[]> = {
  "guardias-privados": [
    {
      question: "¿Los guardias de Gard Security están certificados?",
      answer: "Sí, todos nuestros guardias cuentan con certificación OS-10 al día, capacitación continua y son seleccionados mediante un riguroso proceso que incluye verificación de antecedentes y evaluación psicológica."
    },
    {
      question: "¿Qué tipo de uniforme utilizan los guardias?",
      answer: "Nuestros guardias pueden utilizar uniformes corporativos estándar o vestimenta de civil según las necesidades específicas del cliente y el entorno. Todos nuestros uniformes cumplen con la normativa vigente y son de alta calidad."
    },
    {
      question: "¿Cómo se supervisa a los guardias durante su turno?",
      answer: "Implementamos un sistema de supervisión en tiempo real mediante tecnología GPS, rondas programadas de supervisores y cámaras de monitoreo. Además, realizamos evaluaciones de desempeño periódicas para garantizar la calidad del servicio."
    },
    {
      question: "¿Qué ocurre si un guardia se ausenta o enferma?",
      answer: "Contamos con personal de reemplazo disponible 24/7 para cubrir cualquier eventualidad. Nuestra política garantiza la continuidad del servicio sin interrupciones, manteniendo siempre los mismos estándares de calidad."
    },
    {
      question: "¿Qué protocolos siguen los guardias ante una emergencia?",
      answer: "Nuestros guardias están capacitados en protocolos específicos para cada tipo de emergencia: incendios, robos, sismos, primeros auxilios, entre otros. Estos protocolos son personalizados según las necesidades y características de cada cliente."
    }
  ],
  "camaras-seguridad": [
    {
      question: "¿Qué tipo de cámaras de seguridad ofrece Gard Security?",
      answer: "Ofrecemos una amplia gama de cámaras de seguridad, incluyendo cámaras HD, 4K, térmicas, con visión nocturna, PTZ (con movimiento), y cámaras con analítica de video e inteligencia artificial. Todas nuestras soluciones utilizan tecnología de última generación."
    },
    {
      question: "¿Dónde se almacenan las grabaciones de las cámaras?",
      answer: "Las grabaciones pueden almacenarse localmente en DVR/NVR o en la nube, según las preferencias del cliente. Nuestros sistemas garantizan la seguridad de los datos mediante encriptación y copias de respaldo automáticas."
    },
    {
      question: "¿Es posible acceder a las cámaras de forma remota?",
      answer: "Sí, proporcionamos acceso remoto a través de aplicaciones móviles y plataformas web seguras. Esto permite visualizar las cámaras en tiempo real desde cualquier lugar y dispositivo con conexión a internet."
    },
    {
      question: "¿Cuánto tiempo se conservan las grabaciones?",
      answer: "El tiempo de almacenamiento depende de la configuración elegida, normalmente entre 15 y 90 días. Ofrecemos opciones personalizadas según las necesidades regulatorias y operativas de cada cliente."
    },
    {
      question: "¿Las cámaras incluyen detección de movimiento e intrusión?",
      answer: "Sí, nuestras cámaras incluyen detección de movimiento, análisis de comportamiento, reconocimiento facial, detección de intrusión perimetral y otras funciones avanzadas según el modelo seleccionado."
    }
  ],
  "alarmas": [
    {
      question: "¿Cómo funcionan los sistemas de alarma de Gard Security?",
      answer: "Nuestros sistemas de alarma combinan sensores de movimiento, contactos magnéticos, detectores de humo y sirenas para una protección integral. Al activarse, la señal es enviada a nuestra central de monitoreo que opera 24/7 y se toman las medidas correspondientes."
    },
    {
      question: "¿Qué sucede cuando se activa una alarma?",
      answer: "Cuando se activa una alarma, nuestra central de monitoreo recibe la señal inmediatamente. Se verifica la autenticidad de la alerta mediante cámaras o contacto telefónico, y si es necesario, se despacha personal de seguridad y/o se notifica a las autoridades."
    },
    {
      question: "¿Las alarmas funcionan durante cortes de energía?",
      answer: "Sí, todos nuestros sistemas de alarma cuentan con baterías de respaldo que garantizan su funcionamiento continuo durante cortes de energía por periodos de hasta 24 horas, dependiendo del modelo."
    },
    {
      question: "¿Se pueden integrar las alarmas con otros sistemas de seguridad?",
      answer: "Sí, nuestras soluciones de alarmas son totalmente integrables con cámaras de seguridad, control de acceso y otros sistemas de protección, creando un ecosistema de seguridad completo y centralizado."
    },
    {
      question: "¿Puedo controlar el sistema de alarma desde mi teléfono?",
      answer: "Sí, ofrecemos aplicaciones móviles que permiten armar/desarmar el sistema, recibir notificaciones en tiempo real, verificar el estado de los sensores y administrar usuarios autorizados desde cualquier lugar."
    }
  ],
  "control-acceso": [
    {
      question: "¿Qué tipos de control de acceso ofrece Gard Security?",
      answer: "Ofrecemos sistemas de control de acceso basados en tarjetas de proximidad, huella digital, reconocimiento facial, código PIN, y soluciones móviles. Cada sistema puede personalizarse según los requisitos de seguridad específicos de cada cliente."
    },
    {
      question: "¿Es posible integrar el control de acceso con otros sistemas?",
      answer: "Sí, nuestros sistemas de control de acceso se integran perfectamente con cámaras de seguridad, alarmas, sistemas contra incendios y software de gestión empresarial, permitiendo una administración centralizada de la seguridad."
    },
    {
      question: "¿Cómo se administran los permisos de acceso?",
      answer: "Proporcionamos un software intuitivo que permite gestionar fácilmente los permisos de acceso por usuario, zona, horario y nivel de autorización. Esto facilita la administración del personal y visitantes en tiempo real."
    },
    {
      question: "¿Se genera un registro de todos los accesos?",
      answer: "Sí, el sistema mantiene un registro completo de todos los accesos, intentos fallidos y excepciones. Estos registros pueden exportarse para auditorías, cumplimiento normativo o investigaciones internas."
    },
    {
      question: "¿Qué ocurre si el sistema falla o hay un corte de energía?",
      answer: "Nuestros sistemas tienen modos de funcionamiento a prueba de fallos (fail-safe o fail-secure según los requisitos). Incluyen baterías de respaldo y protocolos para garantizar la seguridad y el acceso autorizado incluso durante emergencias."
    }
  ]
};

// Función para obtener preguntas específicas según el servicio
export const getFAQsByService = (servicio: string): FAQItem[] => {
  // Combinar preguntas generales con las específicas del servicio
  const specificFAQs = serviceFAQs[servicio] || [];
  
  // Si no hay preguntas específicas para el servicio, devolver solo las generales
  if (specificFAQs.length === 0) {
    return generalFAQs;
  }
  
  // Combinar preguntas generales y específicas
  return [...specificFAQs, ...generalFAQs];
};

export default getFAQsByService; 