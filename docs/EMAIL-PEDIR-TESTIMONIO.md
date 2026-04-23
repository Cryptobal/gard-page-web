# Email para pedir testimonios a clientes

> Template para enviar a clientes actuales con los que tengas relación directa.
> Meta: **3 a 5 testimonios verificables** en las próximas 3 semanas.
> No enviar en masa: personalizá el saludo y el contexto por cliente.

---

## Asunto sugerido

- `¿Me ayudás con un testimonio para la web?`
- `[Nombre], pequeña ayuda que vale oro`

(Evitar asuntos promocionales o con emojis: reduce tasa de apertura en B2B.)

---

## Cuerpo del email

```
Hola [Nombre],

Estoy actualizando la sección de "Clientes" de gard.cl y me gustaría que apareciera
tu voz real, no un texto genérico que haga mi equipo.

Te mando tres preguntas cortas. Respondé como hablarías vos, no como un comunicado:

1. ¿Qué problema concreto te ayudamos a resolver?
2. ¿Qué es lo que más valorás del servicio hoy?
3. Una oración que le dirías a otro [gerente/administrador/responsable de operaciones]
   evaluando contratarnos.

Yo armo un borrador de 2-3 frases con tu respuesta y te lo paso a aprobar antes de
publicar. Nada se sube sin tu ok explícito.

Si te sirve, podemos usar una foto profesional tuya (basta con la de LinkedIn) junto
con tu nombre, cargo y empresa. Si preferís quedar anónimo (ej: "Gerente de
Operaciones de empresa minera en Antofagasta") también me sirve.

Gracias,
[Tu nombre]
Gard Security
```

---

## Seguimiento (si no responde en 7 días)

```
Hola [Nombre],

Vuelvo por si te perdiste mi mail anterior. Sin apuro: si preferís que hablemos
por teléfono 10 minutos y yo después lo transcribo, también funciona.

¿Te parece este [día]?

Gracias,
[Tu nombre]
```

---

## Criterios de aceptación antes de publicar en `/lib/data/testimonials.ts`

Un testimonio es **publicable** solo si cumple **todos** estos puntos:

- [ ] El cliente aprobó por escrito el texto final.
- [ ] Tenemos nombre real, cargo real y empresa real (o explícito "anónimo con
      descriptor industrial"; nunca datos inventados).
- [ ] La quote menciona algo **concreto y verificable** (tiempo de respuesta,
      resultado medible, industria específica, problema operativo real). Nada
      de frases huecas tipo "gran empresa" o "equipo profesional".
- [ ] Tenemos logo de la empresa en Cloudflare Images.
- [ ] Si hay foto de la persona, tenemos permiso explícito de uso.
- [ ] Marcamos `verified: true` en el objeto.

---

## Qué NO hacer

- **No redactar** la quote vos y pedirle al cliente solo el ok. Google lo detecta
  por estructura demasiado perfecta (helpful content policy, agosto 2022+).
- **No inventar datos** si el cliente no responde. Prefiero un array vacío.
- **No mezclar** testimonios verificados con "frases representativas". El mix
  contamina la credibilidad de los verdaderos.
- **No olvidar** agregar `verified: true`. El tipo TypeScript lo obliga, pero
  es un recordatorio: si tenés que mentir en ese campo, no publiques.

---

## Lista de candidatos priorizados (completar por Carlos)

Prioridad 1 (industrias estratégicas para SEO 2026):

- [ ] Minería: __________
- [ ] Logística/bodegas: __________
- [ ] Corporativo Santiago: __________
- [ ] Retail: __________
- [ ] Construcción: __________

Meta: al menos 1 testimonio verificado por cada industria priorizada antes de
cierre de FASE 1.
