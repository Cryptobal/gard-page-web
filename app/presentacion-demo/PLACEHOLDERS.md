# Placeholders de las slides HTML

Listado de tokens entre corchetes (`[...]`) que aparecen en los HTML importados. Sirve para mapear datos provenientes de Zoho hacia la presentación.

## Slide 01 · Portada
- `[NOMBRE CLIENTE]`
- `[CIUDAD / DIRECCIÓN]`
- `[DD/MM/AAAA] · 15 días` (fecha de emisión y vigencia)

## Slide 06 · Alcance
- `[ Definir ]` (celdas de tabla de alcance; usar texto por servicio/actividad)

## Slide 11 · Gobierno
- `[Cargo / Área]` (participantes o responsables)

## Slide 15 · KPIs
- `[Meta]` (valor objetivo por KPI)
- `[Definir con cliente]` (detalle/meta por tabla)

## Slide 17 · Presencia / Dotación
- `[N]` (dotación por rol/turno)
- `[Definir]` (texto libre en tabla de turnos)
- `[Zona 1] … [Zona 5]` y `[Estacionamiento]` (sectores de cobertura)
- `[N] guardias` (cantidad por turno/zona)

## Slide 18 · Equipamiento
- `[N] ...` (cantidades por ítem: sets, pares, unidades)
- `[Definir]` (otros ítems o cantidades por definir)

## Slide 19 · Experiencia
- `[N+]` (stats resumidas, ej. años de experiencia, proyectos, etc.)

## Slide 20 · Propuesta económica
- Tabla principal: `[N]` (cantidad), `$[Valor]` (valor unitario), `$[Subtotal]`, `$[TOTAL]`
- Condiciones: `[N] días desde emisión`, `[N] meses`, `[Definir]` (forma de pago)

## Slide 22 · Cierre / Contacto
- `[Nombre Contacto]`, `[email@gard.cl]`, `[+56 9 XXXX XXXX]`

## Sugerencia de mapeo de datos (Zoho → presentación)
- `cliente.nombre` → `[NOMBRE CLIENTE]`
- `cliente.ubicacion` (ciudad/dirección) → `[CIUDAD / DIRECCIÓN]`
- `propuesta.fechaEmision` y `propuesta.vigenciaDias` → `[DD/MM/AAAA] · 15 días` y `[N] días desde emisión`
- `propuesta.kpis[*].meta` → `[Meta]`
- `propuesta.dotacion[*]` (rol/turno, cantidad, zona) → `[N]`, `[Zona X]`, `[Definir]`
- `propuesta.equipamiento[*].cantidad` y `descripcion` → `[N] ...` / `[Definir]`
- `propuesta.experiencia[*].valor` → `[N+]`
- `propuesta.economia.items[*]` (cantidad, valor unitario, subtotal, total) → placeholders de tabla económica
- `propuesta.condiciones` (vigencia, duración contrato, forma de pago) → `[N] días`, `[N] meses`, `[Definir]`
- `contacto.nombre/email/telefono` → placeholders de cierre

## Notas para la futura sustitución automática
- Mantener los corchetes como delimitadores de tokens simples (`[TOKEN]`).
- La sustitución puede ser por string replace previo a pasar `srcDoc`, o ya en componentes React cuando se conviertan las slides.
- Validar longitudes: algunos campos son cortos (ej. slide 20 tablas), ajustar a truncado si es necesario.
