import { FAQItem } from '@/components/seo/FAQSchema';

/**
 * FAQs específicas por industria para SEO
 * Estas preguntas están optimizadas para keywords de conversión
 */

export const industryFAQs: Record<string, FAQItem[]> = {
  'mineria': [
    {
      question: '¿Cuánto cuesta el servicio de guardias de seguridad para minería?',
      answer: 'El costo varía según el tamaño de la faena, cantidad de guardias requeridos y nivel de certificación (OS10). En promedio, para una faena minera mediana con 4 guardias 24/7, el servicio comienza desde $8.000.000 mensuales. Incluye personal certificado, supervisión remota y cobertura completa. Solicite una cotización personalizada para su operación.'
    },
    {
      question: '¿Qué es la certificación OS10 y por qué es importante?',
      answer: 'La certificación OS10 es el estándar de seguridad emitido por el SERNAGEOMIN para trabajadores que operan en faenas mineras. Todos nuestros guardias que trabajan en minería cuentan con OS10 vigente, garantizando que conocen los protocolos de seguridad específicos del sector y pueden operar en ambientes de alto riesgo.'
    },
    {
      question: '¿Cómo manejan la seguridad en faenas mineras remotas?',
      answer: 'Implementamos un sistema integrado que combina guardias presenciales certificados OS10, monitoreo remoto 24/7 desde nuestra central, y tecnología de comunicación satelital. Nuestros equipos están preparados para operar en zonas aisladas con protocolos de emergencia específicos y coordinación con equipos de rescate minero.'
    },
    {
      question: '¿Qué tiempo de respuesta tienen ante emergencias en faenas mineras?',
      answer: 'En faenas donde tenemos guardias presenciales, la respuesta es inmediata. Para emergencias que requieren refuerzos externos, mantenemos tiempos de respuesta promedio de 15-30 minutos en zonas urbanas y 1-2 horas en faenas remotas, con coordinación directa con Carabineros y servicios de emergencia.'
    },
    {
      question: '¿Pueden integrarse con sistemas de seguridad existentes en la mina?',
      answer: 'Sí, nuestros sistemas son compatibles con la mayoría de plataformas de CCTV, control de acceso y alarmas industriales. Trabajamos con protocolos estándar de la industria y podemos integrarnos con sistemas Honeywell, Siemens, Schneider Electric y otros proveedores principales del sector minero.'
    }
  ],
  'bodegas': [
    {
      question: '¿Cuánto cuesta contratar guardias para una bodega logística?',
      answer: 'Para una bodega estándar de 2,000-5,000 m², el servicio de 2 guardias en turno de 12 horas cuesta aproximadamente $2.500.000 - $4.000.000 mensuales. Esto incluye personal capacitado, supervisión, bitácora digital y respuesta a incidentes. El costo varía según tamaño, ubicación y horarios de operación.'
    },
    {
      question: '¿Cómo reducen las mermas y pérdidas de inventario?',
      answer: 'Implementamos un protocolo integral que combina control de acceso con registro biométrico, rondas programadas con checkpoints RFID, inspección aleatoria de vehículos de carga/descarga, y CCTV con análisis inteligente. Nuestros clientes reportan reducciones de mermas del 70-85% en los primeros 6 meses.'
    },
    {
      question: '¿Ofrecen servicio 24/7 para centros de distribución?',
      answer: 'Sí, ofrecemos cobertura completa 24/7/365 con guardias en turnos rotativos de 12 horas. Para operaciones logísticas que requieren máxima flexibilidad, adaptamos los horarios a sus peaks de actividad (ej: refuerzo en horarios de despacho o recepción de mercancía).'
    },
    {
      question: '¿Qué capacitación tienen sus guardias para bodegas logísticas?',
      answer: 'Nuestros guardias reciben formación específica en: manejo de inventarios y sistemas WMS, protocolos de control de acceso para transportistas, uso de sistemas RFID y código de barras, procedimientos de emergencia en almacenes (incendios, derrames), y coordinación con operaciones logísticas para no interrumpir flujos.'
    },
    {
      question: '¿Pueden ayudar con control de acceso de transportistas externos?',
      answer: 'Sí, implementamos protocolos estrictos de verificación de identidad, inspección de vehículos, registro de entrada/salida con foto, validación de documentación de carga, y acompañamiento durante carga/descarga. Todo queda registrado en sistema digital para trazabilidad completa.'
    }
  ],
  'transporte-y-logistica': [
    {
      question: '¿Ofrecen escoltas para transporte de carga de alto valor?',
      answer: 'Sí, contamos con servicio especializado de escoltas para transporte de mercancía de alto valor. Incluye vehículos de escolta equipados, guardias armados con autorización OS-10, GPS tracking en tiempo real, y coordinación con nuestra central de monitoreo. Ideal para electrónica, farmacéutica, metales preciosos y otros.'
    },
    {
      question: '¿Cómo protegen terminales de transporte y patios de camiones?',
      answer: 'Implementamos vigilancia perimetral con CCTV, guardias en puntos de control de acceso, rondas vehiculares programadas, sistemas de iluminación inteligente, y alarmas en perímetro. Para terminales grandes, complementamos con drones para vigilancia aérea nocturna.'
    },
    {
      question: '¿Qué cobertura geográfica tienen en Chile?',
      answer: 'Tenemos presencia directa en las principales ciudades: Santiago, Valparaíso, Concepción, Antofagasta, Iquique y Puerto Montt. Para rutas logísticas intermedias, coordinamos con redes de seguridad aliadas para garantizar cobertura nacional completa en escoltas y respuesta a emergencias.'
    },
    {
      question: '¿Cómo rastrean las unidades en tránsito?',
      answer: 'Utilizamos GPS tracking en tiempo real con geofencing (alertas si el vehículo se desvía de ruta programada), puntos de chequeo obligatorios cada 2-3 horas, botón de pánico con respuesta inmediata, y comunicación directa entre chofer-escolta-central. Todo queda registrado para reportes post-viaje.'
    },
    {
      question: '¿Qué hacen si ocurre un intento de robo en tránsito?',
      answer: 'Nuestro protocolo incluye: activación inmediata de botón de pánico, notificación automática a Carabineros con ubicación exacta, despliegue de equipo de respuesta rápida más cercano, coordinación con autoridades para intercepción, y seguimiento hasta resolución. Contamos con tiempos de respuesta < 15 minutos en rutas principales.'
    }
  ],
  'edificios-corporativos': [
    {
      question: '¿Cuánto cuesta el servicio de seguridad para un edificio corporativo?',
      answer: 'Para un edificio de 10-15 pisos con recepción 24/7, el servicio con 2-3 guardias rotativos cuesta entre $3.500.000 - $6.000.000 mensuales. Incluye control de acceso, recepción corporativa, rondas por pisos comunes, gestión de visitas, y respuesta a emergencias. El costo varía según tamaño del edificio y servicios adicionales.'
    },
    {
      question: '¿Sus guardias pueden hacer funciones de recepción corporativa?',
      answer: 'Sí, nuestros guardias para edificios corporativos están capacitados en protocolo ejecutivo: atención profesional de visitas, gestión de credenciales temporales, manejo de paquetería y correspondencia, coordinación con empresas arrendatarias, y uso de sistemas de control de acceso corporativo (HID, Honeywell, etc.).'
    },
    {
      question: '¿Cómo manejan el control de acceso fuera de horario de oficina?',
      answer: 'Implementamos sistema de acceso diferenciado: durante horario laboral, acceso fluido con validación en recepción; fuera de horario, acceso solo con tarjeta/código + validación de identidad con guardia. Mantenemos registro digital de todas las entradas con foto, hora y motivo de visita para auditoría.'
    },
    {
      question: '¿Qué protocolo tienen para evacuaciones de emergencia?',
      answer: 'Nuestros guardias están certificados en evacuación de edificios corporativos: conocen plan de evacuación específico del edificio, coordinan con brigadistas internos, guían a personas hacia zonas seguras, verifican despeje completo de pisos, y coordinan con Bomberos y servicios de emergencia.'
    },
    {
      question: '¿Pueden integrarse con sistemas de control de acceso existentes?',
      answer: 'Sí, trabajamos con los principales sistemas corporativos: HID Global, Honeywell, Gallagher, Siemens, Schneider Electric, y otros. Nuestros guardias están capacitados en el uso y administración básica de estos sistemas para gestión de credenciales y reportes de acceso.'
    }
  ],
  'construccion': [
    {
      question: '¿Cuánto cuesta vigilancia para una obra de construcción?',
      answer: 'Para una obra mediana, el servicio de 2 guardias en turno nocturno (18:00-08:00) cuesta aproximadamente $2.000.000 - $3.500.000 mensuales. Incluye rondas por la obra, control de ingreso de vehículos, vigilancia de maquinaria y materiales, y respuesta a alarmas. Ajustamos el servicio según avance y necesidades de la obra.'
    },
    {
      question: '¿Cómo protegen maquinaria pesada en obras?',
      answer: 'Implementamos: rondas físicas programadas con registro fotográfico de maquinaria cada 2 horas, instalación de GPS tracking en equipos de alto valor, verificación de trabes de seguridad en retroexcavadoras y grúas, iluminación perimetral disuasiva, y respuesta inmediata ante movimientos sospechosos.'
    },
    {
      question: '¿Pueden ajustar el servicio según avance de obra?',
      answer: 'Sí, nuestro modelo es flexible por etapas: durante excavación y fundaciones (menor riesgo) podemos usar 1 guardia nocturno; en etapa de obra gruesa y terminaciones (mayor cantidad de materiales) reforzamos a 2-3 guardias; y en obra fina (mayor valor de materiales) implementamos vigilancia 24/7.'
    },
    {
      question: '¿Qué hacen con el control de acceso de contratistas?',
      answer: 'Mantenemos registro digital de todos los contratistas autorizados con foto, empresa y especialidad. Verificamos identidad en cada ingreso, llevamos control de herramientas/materiales que ingresan y egresan, y coordinamos con jefe de obra para validar accesos fuera de horario. Todo queda registrado en bitácora digital.'
    },
    {
      question: '¿Cómo previenen robos de materiales como cobre y fierro?',
      answer: 'Utilizamos estrategia multicapa: guardias con rondas aleatorias (no predecibles), registro fotográfico de stock de materiales nobles al inicio/fin de turno, verificación de egresos con firma de responsable, y sistema de alerta temprana para vehículos no autorizados. Hemos logrado reducir robos de material en 90%.'
    }
  ],
  'parques-industriales': [
    {
      question: '¿Cómo vigilan parques industriales de gran extensión?',
      answer: 'Combinamos vigilancia en puntos de control de acceso + rondas vehiculares programadas + cámaras PTZ en perímetro + drones para vigilancia nocturna de áreas extensas. Para parques de +50 hectáreas, usamos 4-6 guardias con vehículos 4x4 y coordinación centralizada vía radio.'
    },
    {
      question: '¿Pueden dar servicio a múltiples empresas dentro del parque?',
      answer: 'Sí, trabajamos con modelo de seguridad compartida donde el parque industrial contrata el servicio perimetral y de accesos, y cada empresa puede complementar con vigilancia específica de sus instalaciones. Esto optimiza costos y genera economías de escala para todas las empresas del parque.'
    },
    {
      question: '¿Qué tecnología usan para vigilancia perimetral?',
      answer: 'Implementamos solución integrada: cerco eléctrico con sensores de intrusión, cámaras térmicas para detección nocturna, drones programados para rondas aéreas en horarios críticos, sensores de movimiento en puntos vulnerables, y central de monitoreo con respuesta < 5 minutos.'
    },
    {
      question: '¿Cómo manejan el control de acceso de camiones de carga?',
      answer: 'Utilizamos sistema de pre-registro de transportistas autorizados, verificación de identidad con foto en garita de acceso, inspección básica de vehículos (undercarriage con espejos), emisión de pase temporal con QR, y registro de entrada/salida con hora exacta. Para transportistas recurrentes, ofrecemos credencial RFID para acceso expedito.'
    },
    {
      question: '¿Ofrecen servicio de respuesta rápida ante emergencias?',
      answer: 'Sí, mantenemos equipo de respuesta móvil dentro del parque industrial con tiempo de llegada < 3 minutos a cualquier punto. Incluye vehículo equipado con extintor, botiquín, radio-comunicación, y coordinación directa con Bomberos, Carabineros y servicios de emergencia externos.'
    }
  ],
  'manufactura': [
    {
      question: '¿Sus guardias entienden procesos industriales?',
      answer: 'Sí, capacitamos a nuestros guardias en fundamentos de manufactura: zonas de riesgo en plantas productivas, protocolos de seguridad industrial (EPP, manejo de químicos, espacios confinados), coordinación con operaciones sin interrumpir producción, y respuesta ante emergencias industriales específicas (derrames, incendios químicos).'
    },
    {
      question: '¿Cómo protegen materias primas y productos terminados?',
      answer: 'Implementamos control de acceso diferenciado a zonas de almacenamiento, registro digital de ingresos/egresos de materiales, rondas programadas en bodegas de producto terminado, verificación de trabes y sellos de seguridad, y sistema de alertas ante movimientos no autorizados fuera de horario productivo.'
    },
    {
      question: '¿Pueden trabajar en plantas con operación 24/7?',
      answer: 'Absolutamente. Entendemos las dinámicas de manufactura continua y adaptamos nuestros protocolos para no interferir con producción. Coordinamos cambios de turno de guardias con cambios de turno operativos, y mantenemos comunicación directa con supervisores de producción para gestión de accesos especiales.'
    },
    {
      question: '¿Qué protocolo tienen para control de ingreso de proveedores?',
      answer: 'Verificamos identidad de transportistas y proveedores, validamos documentación de entrega contra órdenes de compra (si lo requiere el cliente), realizamos inspección visual de vehículos, registramos entrada/salida con foto, y coordinamos con bodega/recepción para guiar descarga solo en zonas autorizadas.'
    },
    {
      question: '¿Cómo manejan cumplimiento normativo (ISO, HACCP, etc.)?',
      answer: 'Nuestros guardias están capacitados en protocolos de plantas certificadas: uso obligatorio de EPP, respeto de zonas críticas y limpias, registro detallado de todos los accesos para auditorías, y coordinación con responsables de calidad. Proveemos bitácoras digitales que facilitan trazabilidad para certificaciones.'
    }
  ],
  'sector-energetico': [
    {
      question: '¿Cómo vigilan plantas solares o eólicas en zonas remotas?',
      answer: 'Utilizamos combinación de guardias presenciales en caseta de control + drones para vigilancia perimetral automatizada + cámaras térmicas para detección nocturna + sensores de intrusión en cerco perimetral. Para plantas muy remotas, implementamos sistema de monitoreo satelital con guardias que hacen rondas vehiculares.'
    },
    {
      question: '¿Qué experiencia tienen con infraestructura energética crítica?',
      answer: 'Hemos protegido +15 plantas energéticas incluyendo: parques solares de +50MW, parques eólicos en zonas costeras, subestaciones eléctricas, y plantas de respaldo diesel. Entendemos criticidad de continuidad operacional y protocolos de seguridad específicos del sector energético.'
    },
    {
      question: '¿Pueden responder ante emergencias eléctricas?',
      answer: 'Nuestros guardias están capacitados en primeros auxilios para accidentes eléctricos, protocolos de evacuación en caso de incendio en subestaciones, coordinación con operadores de planta, y comunicación con servicios de emergencia especializados. No manipulan equipamiento eléctrico (eso es responsabilidad de técnicos), pero sí gestionan la emergencia.'
    },
    {
      question: '¿Usan drones para inspección de paneles o aerogeneradores?',
      answer: 'Sí, nuestros drones realizan vuelos programados para: vigilancia perimetral nocturna (detección de intrusos), inspección visual de estado general de instalaciones, y verificación de cercos e integridad de perímetro. Para inspección técnica de paneles/aerogeneradores, coordinamos con sus proveedores especializados.'
    },
    {
      question: '¿Cómo protegen cables y equipamiento contra robo de cobre?',
      answer: 'Implementamos vigilancia intensiva en zonas vulnerables: rondas aleatorias para evitar patrones predecibles, sensores de movimiento en áreas de cables expuestos, cámaras con detección inteligente de personas, e iluminación disuasiva activada por movimiento. Hemos reducido robos de cobre en 95% en nuestros clientes del sector.'
    }
  ]
};

/**
 * Obtiene FAQs para una industria específica
 */
export function getFAQsForIndustry(industrySlug: string): FAQItem[] {
  return industryFAQs[industrySlug] || [];
}

/**
 * Verifica si una industria tiene FAQs definidas
 */
export function hasFAQs(industrySlug: string): boolean {
  return !!industryFAQs[industrySlug] && industryFAQs[industrySlug].length > 0;
}

