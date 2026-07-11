---
title: "ICAM en investigación de incidentes mineros"
seoTitle: "ICAM: cómo investigar incidentes en faena minera"
date: "2026-07-11"
description: "Método ICAM aplicado a la investigación de incidentes en faena minera: origen en BHP, sus cuatro niveles de análisis, diferencia con el 5-Por-Qué y un caso práctico."
author: "Gard Security"
keywords: ["ICAM investigación incidentes", "Incident Cause Analysis Method", "ICAM minería Chile", "investigación causa raíz minería", "metodología ICAM"]
tags: ["minería", "investigación de incidentes", "prevención de riesgos"]
category: "Industrias"
imageId: "6c0f4092-944f-4573-af12-73aa9a005900"
faqSchema:
  - question: "¿Qué es el método ICAM?"
    answer: "ICAM (Incident Cause Analysis Method) es una metodología estructurada para investigar incidentes que busca las causas sistémicas, no un solo culpable. Desarrollada por BHP a partir del modelo de accidentes organizacionales de James Reason, organiza los factores contribuyentes en cuatro niveles, desde la acción inmediata hasta las decisiones de gestión."
  - question: "¿En qué se diferencia ICAM del análisis de 5 Por Qué?"
    answer: "El 5-Por-Qué sigue una sola cadena lineal de causas y suele detenerse en el error de una persona. ICAM parte de la premisa de que casi ningún incidente tiene una única causa: examina en paralelo defensas fallidas, acciones, condiciones de la tarea y factores organizacionales, lo que lo hace más apto para incidentes graves o complejos."
  - question: "¿Cuáles son los niveles del modelo ICAM?"
    answer: "ICAM clasifica los factores contribuyentes en cuatro niveles: defensas ausentes o fallidas, acciones individuales o del equipo, condiciones de la tarea y del entorno, y factores organizacionales. El análisis recomienda partir por las defensas fallidas y avanzar hacia los factores de gestión para reducir el sesgo de buscar culpables."
  - question: "¿Es obligatorio investigar los incidentes en la minería chilena?"
    answer: "Sí. El Decreto Supremo 132, Reglamento de Seguridad Minera fiscalizado por Sernageomin, obliga a las empresas mineras y a sus contratistas a investigar los accidentes y a implementar medidas correctivas. ICAM es una de las metodologías que permite cumplir esa obligación con un análisis de causa raíz trazable."
  - question: "¿Quién debe liderar una investigación ICAM?"
    answer: "Un investigador líder capacitado en ICAM, apoyado por un equipo multidisciplinario que conozca la tarea: prevención de riesgos, supervisión operativa y, cuando corresponde, el contratista involucrado. La clave es la independencia respecto de los hechos investigados y el foco en aprender, no en sancionar."
---

En una faena minera, la diferencia entre un incidente que se repite y uno del que la operación realmente aprende está en cómo se investiga. El método **ICAM** —sigla de *Incident Cause Analysis Method*— es hoy una de las metodologías de investigación de incidentes más usadas en la minería y la industria pesada, precisamente porque no se conforma con encontrar a quién responsabilizar: busca las causas de fondo que permitieron que el evento ocurriera. Esta guía está pensada para el prevencionista, el jefe de turno o el administrador de contratos que necesita entender qué es ICAM, cuáles son sus niveles de análisis, en qué se diferencia del clásico 5-Por-Qué y cómo se aplica en terreno.

## Origen de ICAM: BHP y la búsqueda de causas raíz

ICAM fue desarrollado por la minera **BHP** (entonces BHP Billiton) hacia fines de los años noventa, con la asesoría del psicólogo británico **James Reason** —referente mundial en error humano— y de la Oficina Australiana de Seguridad en el Transporte (ATSB). No nació como un ejercicio académico, sino como respuesta a un problema práctico: las investigaciones tradicionales tendían a cerrar con "el trabajador no siguió el procedimiento", una conclusión que castiga a la persona pero deja intactas las condiciones que hicieron probable el error.

El método se apoya directamente en el **modelo de accidentes organizacionales** de Reason, popularizado como el "queso suizo": cada barrera de seguridad —procedimientos, controles de ingeniería, supervisión, equipos de protección— es una capa con agujeros, y un incidente ocurre cuando esos agujeros se alinean y dejan pasar la trayectoria del peligro hasta la consecuencia. Reason distinguió dos tipos de fallas que ICAM hereda como columna vertebral: las **fallas activas**, actos u omisiones de quien está en contacto directo con la operación en el momento del hecho, y las **condiciones latentes**, debilidades de gestión, diseño o cultura que crearon el escenario mucho antes del hecho. La lógica es que sancionar la falla activa sin corregir la condición latente garantiza que el incidente vuelva a suceder con otra persona. Puede profundizar en el fundamento en el artículo clásico de Reason, [*Human error: models and management*](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1117770/), publicado en el *British Medical Journal*.

De ahí el principio que ordena toda la metodología: **ICAM no reparte culpas, entiende sistemas.** Su objetivo es reforzar las defensas de la organización, no encontrar un responsable al que descontar del bono de seguridad.

## Los cuatro niveles del análisis ICAM

El modelo ICAM organiza los factores que contribuyen a un incidente en **cuatro niveles**, que van desde lo más cercano al evento hasta lo más profundo de la organización. Entenderlos es la clave para no quedarse en la superficie.

| Nivel | Qué agrupa | Ejemplo en faena |
|---|---|---|
| **Defensas ausentes o fallidas** | Los controles o barreras que debieron impedir o mitigar el incidente y no lo hicieron | Un sensor de proximidad desactivado; un permiso de trabajo que no se verificó |
| **Acciones individuales o del equipo** | Los actos u omisiones que llevaron directamente al hecho | El conductor no respeta la distancia de seguridad con el equipo pesado |
| **Condiciones de la tarea y del entorno** | Las condiciones bajo las cuales se ejecutó la acción, tanto de la tarea como del factor humano | Fatiga por turno extendido; polvo que reduce la visibilidad; ruta mal señalizada |
| **Factores organizacionales** | Las decisiones de gestión, políticas, cultura y asignación de recursos que permitieron que las condiciones existieran | Un programa de gestión de fatiga que existe en el papel pero no se controla |

Antes de clasificar nada, ICAM recoge la evidencia con un marco de ordenamiento conocido como **PEEPO**, por sus cinco fuentes: **P**ersonas, **E**ntorno, **E**quipos, **P**rocedimientos y **O**rganización. Recorrer PEEPO obliga al equipo investigador a mirar cada frente antes de sacar conclusiones, en lugar de fijarse solo en el operador que estaba presente.

Una recomendación práctica de la metodología es analizar los niveles **de derecha a izquierda**: partir por las defensas ausentes o fallidas —lo más tangible— y avanzar hacia los factores organizacionales. Este orden reduce el sesgo natural de empezar por "quién se equivocó" y ayuda a evitar el doble conteo de causas. El resultado no es una lista de culpables, sino un mapa de por qué las barreras no funcionaron y qué hay que reforzar.

## ICAM vs. 5-Por-Qué: cuándo usar cada uno

El 5-Por-Qué es la técnica de análisis de causa raíz más difundida: se pregunta "por qué" de forma sucesiva hasta llegar a una causa de fondo. Es rápido, intuitivo y útil, pero tiene un límite estructural: **asume una sola cadena lineal de causas.** En incidentes reales, que casi nunca tienen un único origen, esa linealidad se vuelve una debilidad. Dos investigadores distintos, siguiendo ramas diferentes del "por qué", pueden llegar a causas raíz completamente distintas, y el método no ofrece ninguna estructura para examinar los factores organizacionales.

| Criterio | 5-Por-Qué | ICAM |
|---|---|---|
| **Modelo de causa** | Lineal, una cadena | Múltiples factores en paralelo |
| **Factores organizacionales** | Sin estructura para abordarlos | Un nivel dedicado |
| **Velocidad** | Muy rápido | Requiere equipo y tiempo |
| **Mejor uso** | Incidentes simples, baja consecuencia | Incidentes graves, alto potencial o complejos |
| **Riesgo** | Detenerse en el error de una persona | Requiere investigador capacitado |

La conclusión no es que uno reemplace al otro. Para un cuasi-accidente menor y evidente, el 5-Por-Qué resuelve bien y no justifica movilizar un equipo completo. Para un incidente de alto potencial —una interacción con equipo pesado, una caída de altura, un evento con lesión grave— ICAM es la herramienta adecuada, porque su estructura impide que la investigación se cierre antes de tiempo. De hecho, el 5-Por-Qué puede convivir *dentro* de una investigación ICAM como una técnica más para profundizar en un factor puntual. La regla práctica: **haga coincidir la profundidad del método con el potencial del incidente, no solo con su consecuencia real.**

## Aplicación práctica: un caso de estudio anónimo

Veamos cómo cambia el resultado con un caso ilustrativo —compuesto y con datos modificados, no un evento real específico—. En un camino interior, una camioneta liviana frena bruscamente y estuvo a punto de ser alcanzada por un camión de extracción. No hubo lesionados: es un cuasi-accidente de alto potencial.

Una investigación de 5-Por-Qué probablemente habría terminado así: *¿por qué casi hay colisión? Porque la camioneta se detuvo en un punto ciego. ¿Por qué? Porque el conductor se distrajo. ¿Por qué? Porque estaba cansado.* Causa raíz: "conductor fatigado". Acción correctiva: "reforzar la charla de manejo defensivo". Caso cerrado.

ICAM aplica los cuatro niveles y encuentra bastante más. Recolecta evidencia con PEEPO —bitácoras de turno, estado del camino, mantención de la camioneta, el procedimiento de tránsito interno, los registros de la empresa contratista— y ordena los hallazgos:

- **Defensas ausentes o fallidas:** el punto ciego no tenía barrera física ni prioridad de paso señalizada; el radio de coordinación entre vehículos livianos y equipo pesado no se usó.
- **Acciones individuales o del equipo:** el conductor ingresó al cruce sin confirmar por radio la posición del camión.
- **Condiciones de la tarea y del entorno:** turno en su décima hora, señalización desgastada por el polvo, sol bajo que encandilaba en ese tramo a esa hora.
- **Factores organizacionales:** el plan de gestión de fatiga del contrato no controlaba las horas efectivas de conducción; la señalización del camino no tenía un responsable de mantención asignado.

La diferencia es evidente. El 5-Por-Qué habría producido una charla; ICAM produce un paquete de acciones correctivas que ataca el sistema: rediseñar el cruce, exigir el protocolo de radio, auditar las horas de conducción del contratista y asignar mantención de señalética. La fatiga del conductor era real, pero era el último eslabón, no la causa. Este enfoque conecta de forma directa con la sección de investigación de incidentes que toda empresa contratista debe describir en su [Plan SHE para contratos mineros](/blog/plan-she-contratos-mineros): la minera mandante no solo pregunta *si* investiga, sino *cómo* lo hace.

## Cómo Gard integra ICAM al ciclo de mejora continua

Investigar bien un incidente solo sirve si el aprendizaje vuelve a la operación. Por eso ICAM se inserta en el ciclo de mejora continua **Planificar-Hacer-Verificar-Actuar**: cada investigación genera acciones correctivas, cada acción se asigna con responsable y plazo, y su cierre se verifica en terreno. Un análisis brillante que termina en un informe archivado no cambia nada; el valor está en cerrar el ciclo.

En Gard abordamos la investigación de incidentes como parte de la gestión de seguridad de la faena, no como un trámite posterior al accidente. Nuestro equipo, con guardias 100% certificados OS10 y presencia en faenas remotas del norte, trabaja con la lógica ICAM para que los cuasi-accidentes —los que no dejan lesionados pero anticipan el evento grave— se investiguen con la misma seriedad que un accidente. Apoyamos la trazabilidad de las acciones correctivas con [tecnología de seguridad](/tecnologia-seguridad) y una central de monitoreo 24/7, de modo que el estado de cada medida quede documentado y disponible para la auditoría del mandante o una fiscalización de Sernageomin. Investigar bajo ICAM, además, no es opcional en el fondo: el [Decreto Supremo 132, Reglamento de Seguridad Minera](https://www.bcn.cl/leychile/Navegar?idNorma=221064) obliga a investigar los accidentes y a implementar medidas, y una metodología estructurada es la forma de cumplir esa exigencia con evidencia.

Puede conocer nuestro enfoque integral en [seguridad para la industria minera](/industrias/mineria) y el detalle de nuestros [servicios de seguridad para faenas mineras](/servicios/guardias-de-seguridad/mineria).

## Conclusión

ICAM no es una plantilla que se rellena después de un accidente: es una forma de mirar los incidentes que asume que casi nunca hay una sola causa y que castigar a una persona rara vez evita la repetición. Sus cuatro niveles —defensas fallidas, acciones, condiciones y factores organizacionales— obligan a la investigación a llegar hasta las decisiones de gestión, que es donde de verdad se puede reforzar la seguridad. Frente al 5-Por-Qué, ICAM gana cuando el potencial del incidente es alto y las causas se entrelazan. Si su empresa necesita operar en minería con una investigación de incidentes formal, trazable y que resista la evaluación de una minera Tier 1, [cotice con Gard](/cotizar) y revisamos su operación.
