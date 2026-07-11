---
title: "Matriz IPER en faena minera: cómo pasar auditoría"
seoTitle: "Matriz IPER en minería: guía práctica para armar la tuya"
date: "2026-07-11"
description: "Cómo construir una matriz IPER específica de faena minera que pase la auditoría del mandante: metodología paso a paso, ejemplos por operación y errores a evitar."
author: "Gard Security"
keywords: ["IPER minería", "matriz IPER faena", "identificación de peligros minería", "IPER Chile ejemplo", "IPER seguridad privada"]
tags: ["minería", "prevención de riesgos", "IPER"]
category: "Industrias"
imageId: "155e6f20-744e-4f00-6c25-9f82a0972800"
faqSchema:
  - question: "¿Qué es una matriz IPER en minería?"
    answer: "La matriz IPER (Identificación de Peligros y Evaluación de Riesgos) es el documento que lista cada tarea de un contrato en faena, identifica los peligros asociados, evalúa el nivel de riesgo y define los controles. En minería es el núcleo técnico del Plan SHE y lo primero que revisa el evaluador del mandante: si es genérica, todo el plan pierde credibilidad."
  - question: "¿Cómo se construye una matriz IPER paso a paso?"
    answer: "Se recorre cada tarea real del contrato, se identifican los peligros propios de esa faena, se evalúa el riesgo cruzando probabilidad por consecuencia, se definen controles siguiendo la jerarquía (eliminar, sustituir, ingeniería, administrativos y EPP) y se reevalúa el riesgo residual. El resultado se conecta con los procedimientos de trabajo seguro que se aplican en terreno."
  - question: "¿Cuál es la diferencia entre una IPER genérica y una específica del proyecto?"
    answer: "La IPER genérica se copia de otro contrato o de una plantilla y lista peligros que no corresponden a las tareas reales. La específica se construye recorriendo el alcance del contrato y nombra los riesgos propios de esa operación: altitud, interacción con equipo pesado, clima, agentes químicos presentes. La primera es la causa número uno de rechazo en auditoría; la segunda es lo que la aprueba."
  - question: "¿Es obligatoria la matriz IPER en Chile?"
    answer: "Sí. El Decreto Supremo 44, vigente desde febrero de 2025, exige a toda empresa desarrollar formalmente una matriz de identificación de peligros y evaluación de riesgos. En minería se suma el Decreto Supremo 132 (Reglamento de Seguridad Minera), fiscalizado por Sernageomin, que incorpora la identificación de peligros y evaluación de riesgos como componente del sistema de prevención."
  - question: "¿Cada cuánto se debe actualizar la matriz IPER?"
    answer: "La matriz IPER se revisa al menos una vez al año y, además, cada vez que cambia algo material: una tarea nueva, un equipo distinto, un cambio de método, un incidente o cuasi-accidente, o una observación de la fiscalización. Una IPER que no se actualiza tras un cambio deja de reflejar la faena y pierde validez ante una auditoría."
---

Construir una **matriz IPER** sólida es lo que separa a un contratista que entra a operar en una gran minera de uno que queda detenido en la puerta. Antes de que su primer trabajador pise la faena, el área de prevención del mandante abre el Plan SHE y busca una cosa primero: la matriz de Identificación de Peligros y Evaluación de Riesgos. Si es genérica, todo lo demás pierde credibilidad. Esta guía es para el prevencionista, el SHE Manager o el administrador de contratos que necesita armar una **IPER minería** que resista la auditoría del mandante: metodología, ejemplos por operación y los errores que hacen caer una matriz.

## Qué es una matriz IPER y por qué es la base del Plan SHE

Una matriz IPER es el documento que recorre cada tarea de un contrato, identifica los peligros que esa tarea introduce, evalúa el nivel de riesgo y define los controles para reducirlo a un nivel aceptable. La sigla —Identificación de Peligros y Evaluación de Riesgos— resume su lógica: primero se ve el peligro, después se mide el riesgo, al final se controla. En la industria local también se la conoce como MIPER (Matriz de Identificación de Peligros y Evaluación de Riesgos), y es el corazón técnico de cualquier sistema de gestión de seguridad.

En minería, la IPER no es un anexo: es la sección del [Plan SHE](/blog/plan-she-contratos-mineros) que el evaluador del mandante revisa primero y con más lupa. Todo el resto del plan —procedimientos de trabajo seguro, plan de emergencias, capacitación, permisos de alto riesgo— se deriva de ella. Si la matriz identificó bien los peligros, lo demás se sostiene; si no, el plan describe una operación que no existe. Por eso una IPER específica le da credibilidad instantánea a todo el documento, y una genérica hace que el evaluador revise el resto con desconfianza.

Conviene distinguir dos conceptos que muchos usan como sinónimos. Un **peligro** es la fuente con potencial de causar daño —un vehículo en movimiento, la altitud, una sustancia química—; el **riesgo** es qué tan probable es que ese peligro cause daño y qué tan grave sería. La matriz IPER conecta ambos de forma trazable: nombra el peligro, cuantifica el riesgo y define qué se hace al respecto.

## Metodología estándar: identificación, evaluación, control

Una matriz IPER que pasa auditoría se construye siempre con la misma secuencia. No es un formato que se rellena, es un análisis que se recorre.

**1. Identificación de peligros.** Se descompone el contrato en sus tareas reales y, para cada una, se listan los peligros. La clave es partir del alcance concreto —qué va a hacer efectivamente el contratista en esa faena— y no de una lista prestada. La [norma ISO 45001](https://www.iso.org/standard/63787.html), estándar internacional de gestión de seguridad y salud en el trabajo, coloca la identificación de peligros (cláusula 6.1.2) como base de todo el sistema, precisamente porque un peligro no identificado no se controla nunca.

**2. Evaluación del riesgo.** Para cada peligro se estima la probabilidad de ocurrencia y la severidad de la consecuencia, y se cruzan en una matriz de valoración —típicamente de 5×5— que entrega un nivel de riesgo: bajo, medio, alto o crítico. Lo importante no es el número, sino usar un criterio consistente en toda la matriz: que un riesgo alto signifique lo mismo en cualquier tarea.

**3. Definición de controles.** Aquí se decide cómo se reduce cada riesgo, y el orden importa. La ISO 45001 exige aplicar la jerarquía de controles (cláusula 8.1.2), de mayor a menor eficacia: **eliminar** el peligro, **sustituir** por algo menos riesgoso, aplicar **controles de ingeniería**, luego **controles administrativos** y, solo al final, **elemento de protección personal**. Una matriz que resuelve todo con "usar EPP y capacitar" delata que no se pensó el control: el EPP es la última barrera, no la primera.

**4. Riesgo residual.** Con los controles definidos, se reevalúa el riesgo. Si sigue siendo alto o crítico, hacen falta más controles antes de habilitar la tarea. Es el paso que demuestra al mandante que la matriz no solo lista peligros: los gestiona hasta un nivel aceptable.

En Chile este método dejó de ser una buena práctica para volverse obligación transversal. El [Decreto Supremo 44](https://www.suseso.gob.cl/605/w3-article-749255.html), vigente desde el 1 de febrero de 2025 en reemplazo del antiguo DS 40, exige a toda empresa —sin importar tamaño ni rubro— desarrollar formalmente una matriz de identificación de peligros y evaluación de riesgos, con un enfoque más técnico y riguroso que los métodos genéricos anteriores. En faena minera, esa exigencia general se cruza con la regulación sectorial.

## Peligros típicos en una faena minera (por tipo de operación)

Una IPER específica nombra los peligros que el evaluador ya conoce de su operación. Estos son los que casi nunca deberían faltar, agrupados por el tipo de trabajo que suele ejecutar un contratista:

- **Interacción de vehículos.** Es una de las principales causas de fatalidad en minería. Flota liviana compartiendo caminos con equipo pesado, puntos ciegos, fatiga del conductor y velocidad. El control va más allá del reglamento de tránsito interno: hoy las mineras Tier 1 evalúan los [sistemas ADAS de los vehículos de faena](/blog/adas-vehiculos-faena-minera) como parte del control de este riesgo.
- **Altitud geográfica.** En faenas sobre los 3.000 metros, la hipobaria intermitente crónica es un riesgo con protocolo propio: exámenes de altura, aclimatación y vigilancia médica. Ignorarlo es una omisión que un evaluador de la zona norte detecta de inmediato.
- **Trabajos en altura física, izaje y espacios confinados.** Caídas de distinto nivel, cargas suspendidas, atmósferas peligrosas. Cada uno exige permiso de trabajo de alto riesgo y controles de ingeniería específicos, no solo arnés y charla.
- **Energías peligrosas.** Bloqueo y etiquetado (LOTO) sobre equipos eléctricos, hidráulicos o neumáticos antes de intervenirlos. La ausencia de un procedimiento de bloqueo es un hallazgo clásico de auditoría.
- **Agentes de salud ocupacional.** Sílice, ruido, vibraciones y polvo. Son riesgos de exposición crónica que la matriz debe capturar aunque no produzcan un accidente visible el primer día.
- **Clima y aislamiento.** Temporales, caminos cortados y distancia a un centro asistencial. En operaciones remotas, el tiempo real de evacuación cambia por completo la evaluación de la severidad.

No toda faena tiene todos estos peligros, y ahí está el punto: la matriz debe reflejar los de *esa* operación y su alcance real, no una suma de todos por si acaso.

## Errores frecuentes: IPER genérica vs. IPER específica del proyecto

Si hay un solo error que hace caer una matriz en auditoría, es la **IPER genérica**: copiada de otro contrato, con peligros que no corresponden a las tareas reales y controles que nadie va a aplicar en terreno. Es la causa número uno de rechazo, porque delata que el contratista no analizó la faena. Los demás errores suelen ser variantes del mismo problema:

- **Copiar la plantilla y cambiar el encabezado.** Una matriz que podría servir para cualquier faena no sirve para ninguna. El evaluador reconoce las plantillas que circulan en la industria.
- **Evaluar sin criterio consistente.** Niveles de riesgo asignados "a ojo", donde tareas comparables reciben valoraciones distintas sin justificación. Rompe la trazabilidad de toda la matriz.
- **Saltarse la jerarquía de controles.** Resolver todo con EPP y capacitación, sin considerar eliminación, sustitución ni ingeniería. Es el atajo que más rápido detecta un auditor.
- **Matriz desconectada del terreno.** Peligros bien listados en el papel, pero sin traducción a procedimientos que la gente aplique. Una IPER que no baja a la operación es un ejercicio de escritorio.

Una IPER específica del proyecto se construye al revés: recorriendo las tareas reales del contrato, nombrando los peligros propios de la faena y definiendo controles que alguien va a ejecutar y verificar. Cuando el evaluador ve que la matriz habla de su operación, el resto del plan gana credibilidad de inmediato. Diferenciarse no es agregar páginas: es demostrar conocimiento del proyecto en la sección que más lo refleja.

## Cómo integrar la IPER a los procedimientos de trabajo seguro (PTS)

Una matriz IPER que se queda en un archivo no controla nada. Su valor aparece cuando cada riesgo relevante se traduce en un **procedimiento de trabajo seguro (PTS)** que la gente aplica antes y durante la tarea. La lógica es directa: la IPER identifica y evalúa; el PTS instruye cómo ejecutar la tarea con los controles definidos; el análisis de riesgo de la tarea (ART o AST), hecho en terreno el mismo día, verifica que las condiciones no cambiaron.

Esta cadena —IPER → PTS → permiso de trabajo → verificación en terreno— es lo que convierte la matriz en gestión real, y es lo que un mandante audita: no solo pide ver la matriz, sino la evidencia de que sus controles se aplican y se registran. Aquí la **trazabilidad digital** pesa cada vez más. Un plan en PDF envejece el día que se firma; una gestión con respaldo en línea —capacitaciones vigentes, permisos emitidos, incidentes y controles verificados— permite que una auditoría del mandante o una fiscalización de Sernageomin se resuelva con evidencia ordenada. La [tecnología de seguridad](/tecnologia-seguridad) que la sostiene es hoy parte de lo que se evalúa, no un extra.

## Actualización periódica: cuándo revisar la IPER

Una matriz IPER es una fotografía de la faena en un momento dado, y las faenas cambian. Por eso la matriz se revisa al menos una vez al año, pero sobre todo cada vez que ocurre un cambio material que la desactualiza:

- Una **tarea o alcance nuevo** en el contrato que introduce peligros no evaluados.
- Un **cambio de equipo, método o proveedor** que altera el riesgo de una actividad existente.
- Un **incidente o cuasi-accidente**, que obliga a revisar por qué los controles no fueron suficientes.
- Una **observación de la fiscalización** o de una auditoría interna del mandante.

Una IPER que no se actualiza tras un cambio deja de reflejar la operación y pierde validez ante una auditoría. Documentar cada revisión —qué cambió, cuándo y quién la aprobó— cierra el ciclo de mejora continua bajo la lógica Planificar-Hacer-Verificar-Actuar que estructura los sistemas de gestión modernos, y le da al mandante la trazabilidad que espera encontrar.

## Cómo Gard construye matrices IPER para faenas remotas

En Gard abordamos la matriz IPER como el punto de partida de la gestión de seguridad, no como una plantilla que se rellena. Partimos por recorrer las tareas reales del contrato, identificamos los peligros propios de esa faena y desde ahí derivamos los procedimientos, los controles y el plan de emergencias adaptado a la ubicación. Nuestra experiencia en [seguridad para minería](/servicios/guardias-de-seguridad/mineria) —con guardias 100% certificados OS10 y presencia en faenas remotas del norte— nos permite construir matrices que resisten la evaluación del mandante porque hablan de la operación real, con la trazabilidad de los controles documentada y disponible para auditoría.

## Conclusión

Una matriz IPER en faena minera es, antes que un documento, la prueba de que un contratista entendió la operación en la que quiere entrar. La metodología —identificar, evaluar, controlar y reevaluar el riesgo residual— es el esqueleto; la especificidad del proyecto y la trazabilidad del cumplimiento son lo que la convierte en una matriz que aprueba. Si su empresa necesita operar en minería con una IPER y un Plan SHE que resistan la auditoría de una minera Tier 1, [cotice con Gard](/cotizar) y evaluamos su operación. Puede conocer también nuestro enfoque integral de [seguridad para la industria minera](/industrias/mineria).
