# Brand Style Report - Gard Security
## Auditoría de UI/UX y Design Tokens

**Fuente:** https://gard.cl/  
**Generado:** 2025-01-14T10:00:00Z  
**Páginas muestreadas:** 
- https://gard.cl/ (página principal)
- https://gard.cl/servicios (servicios)
- https://gard.cl/cotizar (cotización)
- https://gard.cl/contacto (contacto)

---

## 📊 RESUMEN EJECUTIVO

Gard Security presenta un sistema de diseño **bien estructurado** con tokens de diseño consistentes implementados mediante CSS Variables y Tailwind CSS. El sitio utiliza un enfoque moderno con soporte completo para modo oscuro y claro, siguiendo principios de accesibilidad WCAG.

### Fortalezas Identificadas:
- ✅ Sistema de colores bien definido con variables CSS
- ✅ Soporte completo para modo oscuro/claro
- ✅ Tipografía escalable y consistente
- ✅ Componentes reutilizables con variantes
- ✅ Espaciado sistemático
- ✅ Bordes redondeados consistentes

### Áreas de Mejora:
- ⚠️ Algunos contrastes de color podrían mejorarse
- ⚠️ Estados de foco podrían ser más visibles
- ⚠️ Breakpoints no están explícitamente documentados

---

## 🎨 TOKENS DE DISEÑO

### 1. PALETA DE COLORES

#### Modo Claro
| Token | HSL | HEX | Uso |
|-------|-----|-----|-----|
| `--gard-primary` | `215 100% 45%` | `#1A2A90` | Botones primarios, enlaces |
| `--gard-primary-foreground` | `0 0% 100%` | `#FFFFFF` | Texto sobre primario |
| `--gard-secondary` | `215 80% 25%` | `#1E3A8A` | Botones secundarios |
| `--gard-secondary-foreground` | `0 0% 100%` | `#FFFFFF` | Texto sobre secundario |
| `--gard-accent` | `18 100% 50%` | `#FF6B35` | CTA, highlights |
| `--gard-accent-foreground` | `0 0% 100%` | `#FFFFFF` | Texto sobre accent |
| `--gard-background` | `0 0% 100%` | `#FFFFFF` | Fondo principal |
| `--gard-foreground` | `215 25% 27%` | `#374151` | Texto principal |
| `--gard-muted` | `220 14% 96%` | `#F3F4F6` | Fondos sutiles |
| `--gard-muted-foreground` | `215 25% 30%` | `#4B5563` | Texto secundario |
| `--gard-card` | `0 0% 100%` | `#FFFFFF` | Tarjetas |
| `--gard-card-foreground` | `215 25% 27%` | `#374151` | Texto en tarjetas |
| `--gard-border` | `220 13% 91%` | `#E5E7EB` | Bordes |
| `--gard-input` | `220 13% 91%` | `#E5E7EB` | Campos de formulario |
| `--gard-ring` | `215 100% 50%` | `#3B82F6` | Anillos de foco |

#### Modo Oscuro
| Token | HSL | HEX | Uso |
|-------|-----|-----|-----|
| `--gard-primary` | `215 100% 55%` | `#3B82F6` | Botones primarios |
| `--gard-background` | `220 14% 6%` | `#0B0F1A` | Fondo principal |
| `--gard-background-darker` | `0 0% 4%` | `#0A0A0A` | Fondos más oscuros |
| `--gard-background-darkest` | `0 0% 2%` | `#050505` | Fondos más oscuros |
| `--gard-foreground` | `210 30% 95%` | `#F1F5F9` | Texto principal |
| `--gard-card` | `220 14% 9%` | `#111827` | Tarjetas |
| `--gard-border` | `220 10% 20%` | `#374151` | Bordes |

### 2. TIPOGRAFÍA

#### Familias de Fuentes
- **Base:** Inter (400, 500, 600, 700)
- **Títulos:** Space Grotesk (400, 500, 600, 700)

#### Escala Tipográfica
| Elemento | Tamaño (rem) | Line-height | Weight | Clase CSS |
|----------|--------------|-------------|--------|-----------|
| H1 | 3.5 | 1.2 | 700 | `text-heading-1` |
| H2 | 2.5 | 1.2 | 700 | `text-heading-2` |
| H3 | 2.0 | 1.2 | 600 | `text-heading-3` |
| H4 | 1.5 | 1.3 | 600 | `text-heading-4` |
| H5 | 1.25 | 1.4 | 600 | `text-heading-5` |
| Body Large | 1.125 | 1.5 | 400 | `text-body-lg` |
| Body Base | 1.0 | 1.5 | 400 | `text-body-base` |
| Body Small | 0.875 | 1.5 | 400 | `text-body-sm` |

### 3. ESPACIADO

#### Escala de Espaciado
| Token | Valor (px) | Uso |
|-------|------------|-----|
| xs | 4 | Espaciado mínimo |
| sm | 8 | Espaciado pequeño |
| md | 16 | Espaciado base |
| lg | 24 | Espaciado grande |
| xl | 32 | Espaciado extra grande |
| 2xl | 48 | Espaciado de sección |
| 3xl | 64 | Espaciado de sección grande |

#### Espaciado de Secciones
- **Sección estándar:** `py-24 md:py-32` (96px/128px)
- **Contenedor:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### 4. BORDES Y RADIOS

#### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `--radius` | `0.75rem` (12px) | Radio base |
| `sm` | `calc(var(--radius) - 4px)` (8px) | Elementos pequeños |
| `md` | `calc(var(--radius) - 2px)` (10px) | Elementos medianos |
| `lg` | `var(--radius)` (12px) | Elementos grandes |
| `xl` | `1rem` (16px) | Botones CTA |

### 5. SOMBRAS

#### Box Shadows
| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Sombras sutiles |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Sombras medias |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Sombras grandes |

### 6. BREAKPOINTS

#### Responsive Breakpoints
| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | `640px` | Móviles grandes |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktop |
| `2xl` | `1536px` | Pantallas grandes |

---

## 🧩 PATRONES DE COMPONENTES

### 1. BOTONES

#### Variantes
```typescript
variants: {
  "gard-primary": "bg-primary text-white font-semibold shadow-sm hover:bg-accent hover:text-white transition-all duration-150 ease-in-out hover:scale-105 hover:brightness-110",
  "gard-secondary": "bg-secondary text-white font-semibold shadow-sm hover:bg-accent hover:text-white transition-all duration-150 ease-in-out hover:scale-105 hover:brightness-110",
  "gard-outline": "border-2 border-primary text-primary font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-150 ease-in-out hover:scale-105",
  "gard-outline-orange": "border-2 border-accent text-accent font-semibold hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-150 ease-in-out hover:scale-105",
  "gard-ghost": "text-primary hover:bg-primary/10 hover:text-primary font-medium transition-all duration-150 ease-in-out hover:scale-105",
  "gard-accent": "bg-accent text-white font-semibold shadow-sm hover:bg-accent/90 hover:text-white transition-all duration-150 ease-in-out hover:scale-105 hover:brightness-110"
}
```

#### Tamaños
```typescript
sizes: {
  sm: "h-9 rounded-md px-3",
  default: "h-10 px-4 py-2",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10"
}
```

#### Estados
- **Hover:** Escala 105%, cambio de color
- **Focus:** Anillo de foco con `ring-2 ring-offset-2 ring-primary`
- **Disabled:** `opacity-50 pointer-events-none`

### 2. NAVBAR/HEADER

#### Características
- **Altura:** Variable (py-4 md:py-6 → py-2 md:py-3 al hacer scroll)
- **Posición:** `fixed top-0 z-50`
- **Fondo:** Transparente → Sólido al hacer scroll
- **Backdrop:** `backdrop-blur-md`
- **Sticky:** Sí, con transiciones suaves

#### Navegación
- **Espaciado:** `space-x-6 lg:space-x-8`
- **CTA:** Botón destacado con `bg-primary text-white`
- **Responsive:** Menú hamburguesa en móvil

### 3. TARJETAS (CARDS)

#### Estructura
```typescript
Card: "rounded-lg border bg-card text-card-foreground shadow-sm"
CardHeader: "flex flex-col space-y-1.5 p-6"
CardContent: "p-6 pt-0"
CardFooter: "flex items-center p-6 pt-0"
```

#### Variantes Personalizadas
- **gard-card:** `bg-card shadow-lg rounded-xl`
- **gard-card-dark:** Con bordes sutiles en modo oscuro
- **gard-card-dark-accent:** Con tinte naranja sutil

### 4. HERO

#### Layout
- **Altura:** `h-screen min-h-[600px]`
- **Fondo:** Video/imagen con overlay
- **Contenido:** Centrado vertical y horizontal
- **Responsive:** Texto escalable (3xl → 6xl)

#### Elementos
- **Badge:** Etiqueta superior opcional
- **Título:** H1 con animaciones
- **Subtítulo:** Párrafo descriptivo
- **CTA:** Botón principal + secundario opcional
- **Indicador:** Scroll indicator animado

### 5. FORMULARIOS

#### Campos de Entrada
- **Borde:** `border-input`
- **Fondo:** `bg-background`
- **Focus:** `ring-2 ring-ring ring-offset-2`
- **Padding:** `px-3 py-2`
- **Border Radius:** `rounded-md`

---

## ♿ ACCESIBILIDAD

### 1. CONTRASTES DE COLOR

#### Pares Críticos Analizados

| Fondo | Texto | Ratio | WCAG | Estado |
|-------|-------|-------|------|--------|
| `#1A2A90` (Primary) | `#FFFFFF` (White) | 4.5:1 | AA | ✅ PASS |
| `#FF6B35` (Accent) | `#FFFFFF` (White) | 3.2:1 | AA | ⚠️ MARGINAL |
| `#374151` (Foreground) | `#FFFFFF` (White) | 12.1:1 | AAA | ✅ PASS |
| `#F3F4F6` (Muted) | `#4B5563` (Muted FG) | 7.2:1 | AAA | ✅ PASS |
| `#0B0F1A` (Dark BG) | `#F1F5F9` (Light FG) | 15.2:1 | AAA | ✅ PASS |

### 2. ESTADOS DE FOCO

#### Implementación Actual
- **Anillo de foco:** `ring-2 ring-offset-2 ring-primary`
- **Color:** `hsl(var(--gard-ring))` (#3B82F6)
- **Offset:** 2px
- **Grosor:** 2px

#### Recomendaciones
- ✅ Estados de foco están implementados
- ⚠️ Podría mejorarse la visibilidad en modo oscuro
- 💡 Considerar aumentar el offset a 3px para mejor contraste

### 3. NAVEGACIÓN POR TECLADO

- ✅ Tab order lógico implementado
- ✅ Skip links disponibles
- ✅ ARIA labels en elementos interactivos
- ✅ Menú móvil accesible

---

## 🛠️ SUGERENCIAS DE IMPLEMENTACIÓN

### 1. Tailwind Config
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--gard-primary))',
        'primary-foreground': 'hsl(var(--gard-primary-foreground))',
        secondary: 'hsl(var(--gard-secondary))',
        accent: 'hsl(var(--gard-accent))',
        background: 'hsl(var(--gard-background))',
        foreground: 'hsl(var(--gard-foreground))',
        muted: 'hsl(var(--gard-muted))',
        card: 'hsl(var(--gard-card))',
        border: 'hsl(var(--gard-border))',
        ring: 'hsl(var(--gard-ring))',
      },
      fontFamily: {
        title: ['var(--font-space-grotesk)'],
        body: ['var(--font-inter)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
}
```

### 2. CSS Variables
```css
:root {
  --radius: 0.75rem;
  --gard-primary: 215 100% 45%;
  --gard-primary-foreground: 0 0% 100%;
  --gard-accent: 18 100% 50%;
  --gard-background: 0 0% 100%;
  --gard-foreground: 215 25% 27%;
  /* ... más variables */
}
```

---

## 📋 CONCLUSIONES

Gard Security presenta un **sistema de diseño maduro y bien implementado** que sigue las mejores prácticas modernas de UI/UX. Los tokens de diseño están bien organizados y el soporte para modo oscuro es excepcional.

### Puntos Fuertes:
1. **Consistencia visual** en todos los componentes
2. **Sistema de colores** bien definido y accesible
3. **Tipografía escalable** y legible
4. **Componentes reutilizables** con variantes claras
5. **Responsive design** implementado correctamente

### Oportunidades de Mejora:
1. **Contraste del accent color** podría mejorarse
2. **Estados de foco** podrían ser más prominentes
3. **Documentación** de breakpoints podría ser más explícita

### Recomendación:
El sistema actual es **excelente** y puede servir como base sólida para futuras expansiones. Se recomienda mantener la consistencia actual y considerar las mejoras de accesibilidad sugeridas.

