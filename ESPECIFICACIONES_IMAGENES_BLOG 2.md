# Especificaciones de Imágenes para Nuevos Artículos del Blog

## Resumen

Se requieren 5 imágenes destacadas para los nuevos artículos de blog de Gard Security. Todas deben ser subidas a **Cloudflare Images** y los IDs deben reemplazarse en el frontmatter de cada artículo.

---

## Imágenes Requeridas

### 1. Seguridad en Eventos Masivos

**Archivo:** `seguridad-eventos-masivos-chile-2025.md`
**imageId actual (placeholder):** `"seguridad-eventos-masivos-chile-2025"`

**Concepto de imagen:**
- Guardias de seguridad Gard en evento masivo
- Idealmente: estadio o concierto con multitud
- Guardias con uniforme Gard visible
- Ambiente profesional y organizado
- Puede incluir: control de acceso, vallas, público ordenado

**Especificaciones técnicas:**
- Resolución mínima: 1920x1080px (Full HD)
- Formato: WebP (optimizado para web)
- Ratio: 16:9 (landscape)
- Peso máximo: 500KB (después de optimización Cloudflare)

**Alternativas si no hay foto real:**
- Diseño gráfico con: siluetas de multitud + guardias Gard + elementos de seguridad (vallas, radios)
- Colores: azul corporativo Gard + elementos naranjos/amarillos (seguridad)

---

### 2. Protocolo de Emergencias Corporativas

**Archivo:** `protocolo-emergencias-corporativas-guia-completa-chile-2025.md`
**imageId actual (placeholder):** `"protocolo-emergencias-corporativas-chile"`

**Concepto de imagen:**
- Evacuación ordenada de edificio corporativo
- Señalética de emergencia visible
- Guardias Gard guiando evacuación
- Ambiente serio y profesional

**Especificaciones técnicas:**
- Resolución mínima: 1920x1080px
- Formato: WebP
- Ratio: 16:9
- Peso máximo: 500KB

**Alternativas:**
- Diseño con: salida de emergencia, señalética fotoluminiscente, siluetas evacuando
- Incluir: extintor, alarma, ruta de evacuación
- Colores: rojo (emergencia) + verde (salida segura) + azul Gard

---

### 3. Auditoría de Seguridad Empresarial

**Archivo:** `auditoria-seguridad-empresarial-guia-completa-2025.md`
**imageId actual (placeholder):** `"auditoria-seguridad-empresarial-2025"`

**Concepto de imagen:**
- Inspector/auditor con tablet/clipboard inspeccionando instalación
- Guardia Gard acompañando
- Bodega o instalación corporativa de fondo
- Profesional, técnico

**Especificaciones técnicas:**
- Resolución mínima: 1920x1080px
- Formato: WebP
- Ratio: 16:9
- Peso máximo: 500KB

**Alternativas:**
- Diseño con: checklist, lupa (inspección), edificio/bodega, gráficos de evaluación
- Iconos: cámara CCTV, cerco perimetral, control acceso
- Colores: azul Gard + gris (corporativo) + verde (aprobado)

---

### 4. Capacitación y Certificación de Guardias

**Archivo:** `capacitacion-certificacion-guardias-seguridad-chile-2025.md`
**imageId actual (placeholder):** `"certificacion-guardias-seguridad-chile"`

**Concepto de imagen:**
- Guardias Gard en capacitación
- Instructor mostrando técnica (primeros auxilios o uso extintor)
- Sala de capacitación o práctica
- Ambiente educativo y profesional

**Especificaciones técnicas:**
- Resolución mínima: 1920x1080px
- Formato: WebP
- Ratio: 16:9
- Peso máximo: 500KB

**Alternativas:**
- Diseño con: certificado OS10 (sin datos reales), guardia con uniforme Gard, elementos capacitación
- Iconos: extintor, primeros auxilios, libro/curso
- Colores: azul Gard + dorado (certificación) + verde (aprobado)

---

### 5. 10 Señales Empresa Necesita Mejorar Seguridad

**Archivo:** `10-senales-empresa-necesita-mejorar-seguridad-chile-2025.md`
**imageId actual (placeholder):** `"senales-mejorar-seguridad-empresas"`

**Concepto de imagen:**
- Infografía visual con checklist
- Combinación de: ❌ (problema) y ✅ (solución)
- Elementos de seguridad: cámaras, guardias, control acceso
- Llamativo, estilo "alerta pero solucionable"

**Especificaciones técnicas:**
- Resolución mínima: 1920x1080px
- Formato: WebP
- Ratio: 16:9
- Peso máximo: 500KB

**Alternativas:**
- Diseño gráfico infográfico con: números 1-10, iconos de problemas comunes
- Split visual: lado izquierdo problemas (rojo), lado derecho soluciones (verde)
- Colores: rojo (alerta) + naranja (advertencia) + verde (solución) + azul Gard

---

## Proceso de Implementación

### Paso 1: Creación de Imágenes
- Diseñador crea las 5 imágenes según especificaciones
- Formato final: WebP optimizado
- Nombres sugeridos:
  - `blog-eventos-masivos-2025.webp`
  - `blog-protocolo-emergencias-2025.webp`
  - `blog-auditoria-seguridad-2025.webp`
  - `blog-certificacion-guardias-2025.webp`
  - `blog-10-senales-seguridad-2025.webp`

### Paso 2: Subida a Cloudflare Images
- Subir cada imagen a Cloudflare Images
- Copiar el **Image ID** que genera Cloudflare para cada una

### Paso 3: Actualización de Archivos Markdown
- Reemplazar los `imageId` placeholder en el frontmatter de cada archivo:

```markdown
# ANTES (placeholder)
imageId: "seguridad-eventos-masivos-chile-2025"

# DESPUÉS (ID real de Cloudflare)
imageId: "abc123def-456-789-xyz"
```

**Archivos a actualizar:**
1. `/docs/blog_posts/seguridad-eventos-masivos-chile-2025-costos-protocolos.md`
2. `/docs/blog_posts/protocolo-emergencias-corporativas-guia-completa-chile-2025.md`
3. `/docs/blog_posts/auditoria-seguridad-empresarial-guia-completa-2025.md`
4. `/docs/blog_posts/capacitacion-certificacion-guardias-seguridad-chile-2025.md`
5. `/docs/blog_posts/10-senales-empresa-necesita-mejorar-seguridad-chile-2025.md`

---

## Consideraciones de Diseño

### Branding Gard Security
- Logo Gard visible pero discreto (esquina superior o inferior)
- Colores corporativos Gard Security
- Uniformes Gard reconocibles (si aparecen guardias)

### Optimización SEO
- Nombres de archivo descriptivos
- Alt text será manejado por el componente `CloudflareImage`
- Todas las imágenes deben tener personas/escenas reales o diseños profesionales (no stock photos genéricas)

### Accesibilidad
- Alto contraste entre elementos
- Texto legible (si hay texto en la imagen, mínimo 24px)
- Evitar solo iconos sin contexto visual

---

## Contacto

Para coordinar la creación de estas imágenes, contactar:
- Equipo de diseño Gard Security
- Proveedor de fotografía corporativa
- Agencia de diseño gráfico

**Deadline sugerido:** 7-10 días antes de la publicación de los artículos

**Prioridad:** Media-Alta (los artículos pueden publicarse con placeholders temporales, pero las imágenes finales mejoran significativamente el CTR y engagement)

