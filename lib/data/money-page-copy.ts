/**
 * Copy de conversión para money pages nacionales (no ciudad×servicio).
 * Patrón alineado con `servicio-ciudad-copy.ts` / plantilla de oro.
 */

export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export type EnlaceInterno = {
  titulo: string;
  href: string;
  descripcion: string;
};

export type ProcesoPaso = {
  titulo: string;
  descripcion: string;
};

export type MoneyPageCopy = {
  heroH1: string;
  introParagraph: string;
  heroBadge: string;
  whatsAppPrefill: string;
  heroSecondaryAnchor?: { href: string; label: string };
  socialProofTitle: string;
  socialProofSubtitle: string;
  procesosTitle: string;
  procesosSubtitle: string;
  procesos: ProcesoPaso[];
  pricingTitle: string;
  pricingSubtitle: string;
  faq: FaqItem[];
  faqObjeciones: FaqItem[];
  enlacesInternos: EnlaceInterno[];
  finalCtaTitle: string;
  finalCtaDescription: string;
};

export const guardiasDeSeguridadNationalCopy: MoneyPageCopy = {
  heroH1: 'Guardias de Seguridad para Empresas en Chile · OS10 y Cobertura Nacional',
  introParagraph:
    'Contratar guardias de seguridad para empresas exige más que cubrir un turno: necesita personal con OS10 vigente, supervisión verificable y continuidad cuando alguien falta. Gard Security opera en 10 ciudades de Chile con dotación directa —sin subcontratar vigilancia—, central de monitoreo propia 24/7 y reportería OPAI para clientes B2B en minería, logística, retail, construcción y edificios corporativos. Cada sitio se dimensiona según riesgo real: cantidad de puestos, turnos, comuna y protocolos del activo. Entregamos propuesta comercial cerrada en menos de 12 horas hábiles, sin montos genéricos que no correspondan a su operación.',
  heroBadge: '100% Guardias Certificados OS10 · Cobertura 10 ciudades',
  whatsAppPrefill: 'Hola, quiero cotizar guardias de seguridad para mi empresa en Chile.',
  heroSecondaryAnchor: {
    href: '#como-operamos',
    label: 'Ver cómo opera Gard en guardias para empresas',
  },
  socialProofTitle: 'Confianza verificable para contratar guardias',
  socialProofSubtitle:
    'Métricas operativas y reseñas públicas — sin testimonios inventados ni casos sin consentimiento del cliente.',
  procesosTitle: 'Cómo entrega Gard el servicio de guardias',
  procesosSubtitle:
    'Proceso comercial y operativo transparente, desde la primera consulta hasta el guardia OS10 activo en su sitio.',
  procesos: [
    {
      titulo: '1. Evaluación y dimensionamiento',
      descripcion:
        'Recopilamos datos del sitio —puestos, turnos, comuna, tipo de activo y riesgos— para proponer dotación realista. La cotización cerrada llega en menos de 12 horas hábiles.',
    },
    {
      titulo: '2. Selección y OS10',
      descripcion:
        'Asignamos guardias de nuestra dotación directa con credencial OS10 vigente, verificada en auditoría mensual. Capacitación al protocolo de su industria antes del inicio.',
    },
    {
      titulo: '3. Supervisión y continuidad',
      descripcion:
        'Central de monitoreo 24/7, rondas GPS en OPAI, pool de reemplazos para ausencias y continuidad operacional medida sobre contratos activos.',
    },
    {
      titulo: '4. Reportería al cliente',
      descripcion:
        'Incidentes, novedades y cumplimiento de turnos quedan registrados para su equipo de operaciones o facilities, con contacto comercial en WhatsApp y teléfono NAP verificable.',
    },
  ],
  pricingTitle: 'Qué define el valor de su dotación de guardias',
  pricingSubtitle:
    'No publicamos precios genéricos: cada sitio se cotiza según factores verificables en visita técnica o levantamiento remoto.',
  faq: [
    {
      pregunta: '¿Para qué tipo de empresas contratan guardias de seguridad con Gard?',
      respuesta:
        'Trabajamos exclusivamente con clientes B2B: centros de distribución, plantas industriales, edificios corporativos, retail, minería, construcción, puertos y oficinas con flujo de visitantes. No operamos seguridad residencial ni condominios. Cada vertical tiene protocolos distintos —control de carga, recepción ejecutiva, vigilancia perimetral— y el guardia se capacita al contexto antes de asumir el puesto.',
    },
    {
      pregunta: '¿Cuánto demora recibir una cotización para contratar guardias?',
      respuesta:
        'Entregamos propuesta comercial cerrada en menos de 12 horas hábiles desde que recibimos los datos del sitio (ubicación, turnos, cantidad de puestos y riesgo). Puede solicitarla por formulario en /cotizar, WhatsApp comercial o teléfono +56 9 6872 7644. Sin compromiso y sin montos de referencia que no apliquen a su operación.',
    },
    {
      pregunta: '¿En qué ciudades de Chile tienen guardias disponibles?',
      respuesta:
        'Operamos en 10 ciudades: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Para Santiago y Antofagasta hay páginas con detalle operativo local; para otras comunas coordinamos despliegue desde la ciudad base más cercana con supervisión centralizada.',
    },
    {
      pregunta: '¿Qué incluye el servicio de guardias además del puesto en terreno?',
      respuesta:
        'Uniforme y equipamiento según protocolo, supervisión desde central propia, reemplazos por ausencia en la modalidad estándar, rondas registradas en OPAI y coordinación con autoridades cuando corresponde. La central de monitoreo opera 24/7 y el plantel mantiene 100% de certificación OS10 con auditoría mensual.',
    },
  ],
  faqObjeciones: [
    {
      pregunta: '¿Gard Security subcontrata guardias a terceros?',
      respuesta:
        'No subcontratamos personal de vigilancia. Los guardias son parte de la dotación directa de Gard Security SpA, con contrato laboral con nosotros y OS10 auditado mensualmente. Usted contrata a Gard y Gard responde por el servicio, la supervisión y el cumplimiento normativo — evitando la cadena de responsabilidad difusa que genera la subcontratación en el rubro.',
    },
    {
      pregunta: '¿Qué pasa si un guardia falta o se enferma?',
      respuesta:
        'Mantenemos pool de guardias OS10 de contingencia para cubrir ausencias planificadas e imprevistas. La continuidad operacional del 99,9% se mide sobre contratos activos: cuando un guardia no puede presentarse, la central activa reemplazo según protocolo. Supervisores verifican credenciales y entrega de turno, con registro digital en OPAI.',
    },
    {
      pregunta: '¿Todos los guardias asignados tienen certificación OS10 vigente?',
      respuesta:
        'Sí: el 100% del plantel tiene credencial OS10 vigente con auditoría mensual de vencimientos. Antes de asignar un guardia verificamos certificado, capacitación al protocolo del cliente y antecedentes según normativa. Si un guardia pierde la certificación, no opera hasta renovarla; en ese intervalo asignamos reemplazo desde el pool de contingencia.',
    },
    {
      pregunta: '¿En cuánto tiempo puede arrancar el servicio en un sitio nuevo?',
      respuesta:
        'El onboarding estándar es de 5 días hábiles desde la firma del contrato hasta guardia OS10 activo con protocolo validado. Para urgencias evaluamos modalidad express con personal de contingencia dentro de 48 horas, aunque la puesta completa con protocolos a medida requiere el plazo estándar de 5 días hábiles.',
    },
  ],
  enlacesInternos: [
    {
      titulo: 'Cotizar guardias de seguridad',
      href: '/cotizar',
      descripcion:
        'Formulario comercial con respuesta en menos de 12 horas hábiles y propuesta cerrada para su sitio.',
    },
    {
      titulo: 'Guardias en Santiago',
      href: '/santiago/guardias-de-seguridad',
      descripcion:
        'Detalle operativo RM: zonas, KPIs, FAQs y cobertura en el Gran Santiago.',
    },
    {
      titulo: 'Guardias en Antofagasta',
      href: '/antofagasta/guardias-de-seguridad',
      descripcion:
        'Operación norte grande: minería, puerto e industria con copy verificado local.',
    },
    {
      titulo: 'Empresa de seguridad privada en Chile',
      href: '/empresa-seguridad-privada-chile',
      descripcion:
        'Trayectoria, cobertura nacional, cumplimiento normativo y criterios para elegir proveedor.',
    },
    {
      titulo: 'Guía de factores de costo',
      href: '/cuanto-cuesta-guardia-seguridad-chile',
      descripcion:
        'Qué variables influyen en el valor mensual de guardias — sin precios inventados.',
    },
  ],
  finalCtaTitle: 'Contrate guardias de seguridad para su empresa',
  finalCtaDescription:
    'Dotación directa OS10, central de monitoreo propia y cobertura en 10 ciudades. Cotización cerrada sin compromiso.',
};

export const empresaSeguridadPrivadaChileCopy: MoneyPageCopy = {
  heroH1: 'Empresa de Seguridad Privada en Chile para Empresas B2B',
  introParagraph:
    'Elegir una empresa de seguridad privada en Chile implica verificar empleador directo, certificación OS10, continuidad de turnos y capacidad de responder en su comuna — no solo comparar precio por guardia. Gard Security es una empresa chilena orientada a clientes corporativos: fundada en 2022, con equipo fundador de más de 9 años en el rubro, dotación de 250 guardias activos, central de monitoreo propia 24/7 y operación en 10 ciudades. No somos una filial extranjera ni un marketplace de vigilantes: contrata con Gard y Gard responde por supervisión, reemplazos y cumplimiento. Propuesta comercial en menos de 12 horas hábiles.',
  heroBadge: 'Seguridad privada B2B · 100% OS10 · 10 ciudades',
  whatsAppPrefill:
    'Hola, busco una empresa de seguridad privada en Chile para mi operación. Quiero cotizar.',
  heroSecondaryAnchor: {
    href: '#por-que-gard',
    label: 'Ver por qué evaluar a Gard frente a grandes proveedores',
  },
  socialProofTitle: 'Datos verificables de Gard Security',
  socialProofSubtitle:
    'Cifras desde companyStats y perfil público de Google — sin rankings inventados ni casos de estudio ficticios.',
  procesosTitle: 'Por qué evaluar a Gard frente a grandes proveedores',
  procesosSubtitle:
    'Comparación honesta: no prometemos ser “la número 1”, sino explicar trade-offs reales entre escala masiva y operación directa B2B.',
  procesos: [
    {
      titulo: 'Empleador directo, sin subcontratar vigilancia',
      descripcion:
        'Muchos conglomerados externalizan turnos a terceros. Gard mantiene dotación propia con OS10 auditado mensualmente: un solo interlocutor comercial y responsabilidad clara ante su empresa.',
    },
    {
      titulo: 'Operación regional con central propia',
      descripcion:
        'Presencia en 10 ciudades con supervisión desde nuestra central 24/7 y tecnología OPAI (rondas GPS, reportería). No dependemos de franquicias locales desconectadas del estándar operativo.',
    },
    {
      titulo: 'Enfoque B2B y protocolos por industria',
      descripcion:
        'Minería, logística, retail, construcción y corporativo requieren capacitación distinta. Dimensionamos guardias y supervisión al riesgo del sitio, no a un catálogo genérico de “seguridad integral”.',
    },
    {
      titulo: 'Tiempos comerciales y operativos publicados',
      descripcion:
        'Cotización en menos de 12 horas hábiles, onboarding estándar en 5 días hábiles y continuidad del 99,9% medida sobre contratos activos — métricas que puede contrastar en la cotización.',
    },
  ],
  pricingTitle: 'Qué define el valor al contratar una empresa de seguridad privada',
  pricingSubtitle:
    'El precio por guardia varía según su operación. Estos son los factores que usamos para cotizar — sin publicar montos CLP genéricos.',
  faq: [
    {
      pregunta: '¿Qué debe verificar al contratar una empresa de seguridad privada en Chile?',
      respuesta:
        'Confirme que la empresa es empleador directo o que identifica claramente al subcontratista, exija OS10 vigente en todo el plantel asignado, pregunte por continuidad de turnos y pool de reemplazos, revise cobertura en su comuna y solicite SLA comercial por escrito. Gard publica sus métricas operativas y responde cotizaciones en menos de 12 horas hábiles.',
    },
    {
      pregunta: '¿Gard Security opera en todo Chile?',
      respuesta:
        'Tenemos operación activa en 10 ciudades principales: Santiago, Antofagasta, Valparaíso, Concepción, Iquique, Puerto Montt, Rancagua, Chillán, Temuco y Viña del Mar. Para otras comunas evaluamos despliegue desde la base más cercana; no declaramos presencia física donde no hay dotación respaldada.',
    },
    {
      pregunta: '¿Cuál es la certificación OS10 y por qué importa?',
      respuesta:
        'La credencial OS10 de Carabineros (en transición a la Subsecretaría de Prevención del Delito bajo Ley 21.659) acredita que el guardia cumple requisitos legales para ejercer vigilancia privada. Gard audita mensualmente el 100% del plantel; un guardia sin OS10 vigente no opera en nuestros contratos.',
    },
    {
      pregunta: '¿Qué servicios ofrece Gard además de guardias en terreno?',
      respuesta:
        'Central de monitoreo 24/7, seguridad electrónica (CCTV, control de acceso), drones para grandes extensiones, auditorías de seguridad y consultoría. Puede ver el detalle en /servicios y combinar capas según el riesgo de su activo.',
    },
  ],
  faqObjeciones: [
    {
      pregunta: '¿Por qué elegir a Gard y no a una empresa de seguridad más grande?',
      respuesta:
        'Las firmas grandes aportan escala nacional; Gard compite en trazabilidad operativa: empleador directo, central propia, OPAI para rondas y reportería, y un interlocutor comercial que conoce su sitio. Si su prioridad es precio unitario mínimo sin exigir continuidad medible, conviene comparar varias propuestas. Si necesita OS10 verificable y respuesta comercial en menos de 12 horas hábiles, Gard encaja en ese perfil B2B.',
    },
    {
      pregunta: '¿Subcontratan guardias o personal de vigilancia?',
      respuesta:
        'No. La vigilancia en terreno la ejecuta dotación directa de Gard Security SpA. Subcontratación difusa es común en el rubro y complica auditorías OS10 y responsabilidad solidaria del mandante; por eso lo excluimos de nuestro modelo operativo.',
    },
    {
      pregunta: '¿Cómo contacto al equipo comercial?',
      respuesta:
        'WhatsApp comercial wa.me/56968727644, teléfono +56 9 6872 7644 o formulario en /cotizar. Respuesta en menos de 12 horas hábiles. El canal de postulaciones de guardias (+56 9 5606 2246) es exclusivo de /reclutamiento y no se usa para cotizaciones comerciales.',
    },
    {
      pregunta: '¿Publican precios de guardias en el sitio?',
      respuesta:
        'No publicamos tarifas genéricas en CLP porque dependen de turnos, comuna, riesgo y supervisión. Compartimos factores de costo en /cuanto-cuesta-guardia-seguridad-chile y entregamos cotización cerrada para su sitio específico.',
    },
  ],
  enlacesInternos: [
    {
      titulo: 'Servicio de guardias de seguridad',
      href: '/servicios/guardias-de-seguridad',
      descripcion: 'Alcance del servicio, modalidades de turno, OS10 y proceso de contratación.',
    },
    {
      titulo: 'Guardias en Santiago',
      href: '/santiago/guardias-de-seguridad',
      descripcion: 'Operación en RM: zonas, KPIs locales y FAQs para el Gran Santiago.',
    },
    {
      titulo: 'Guardias en Antofagasta',
      href: '/antofagasta/guardias-de-seguridad',
      descripcion: 'Cobertura norte grande: minería, puerto e industria.',
    },
    {
      titulo: 'Cotizar seguridad privada',
      href: '/cotizar',
      descripcion: 'Formulario comercial con respuesta en menos de 12 horas hábiles.',
    },
    {
      titulo: 'Factores de costo de guardias',
      href: '/cuanto-cuesta-guardia-seguridad-chile',
      descripcion: 'Variables que influyen en el valor mensual — sin precios inventados.',
    },
    {
      titulo: 'Todos los servicios',
      href: '/servicios',
      descripcion: 'Monitoreo, electrónica, drones, auditoría y consultoría.',
    },
  ],
  finalCtaTitle: 'Evalúe a Gard como su empresa de seguridad privada',
  finalCtaDescription:
    '250 guardias OS10, 10 ciudades, central 24/7 y cotización cerrada en menos de 12 horas hábiles. Sin compromiso.',
};
