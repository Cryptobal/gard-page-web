# Estilo-Guide lx3.ai - Basado en gard.cl

## Paleta de Colores

### Colores Principales
- **Fondo Principal**: `#1a1a1a` (gris oscuro)
- **Texto Principal**: `#ffffff` (blanco puro)
- **Acento**: `#e63946` (rojo-anaranjado)

### Variables CSS
```css
:root {
  --gard-background: 0 0% 10%;           /* #1a1a1a */
  --gard-foreground: 0 0% 100%;          /* #ffffff */
  --gard-accent: 6 100% 57%;             /* #e63946 */
  --gard-accent-foreground: 0 0% 100%;   /* #ffffff */
}
```

## Tipografía

### Jerarquía de Títulos
- **H1**: Space Grotesk, Bold, 3.5rem
- **H2**: Space Grotesk, Bold, 2.5rem
- **H3**: Space Grotesk, Bold, 2rem
- **H4**: Space Grotesk, Bold, 1.5rem
- **H5**: Space Grotesk, Bold, 1.25rem

### Cuerpo de Texto
- **Principal**: Inter, Regular, 1rem
- **Secundario**: Inter, Regular, 0.875rem
- **Pequeño**: Inter, Regular, 0.75rem

## Componentes

### Botones

#### Botón Primario (CTA)
```css
.gard-btn-primary {
  background-color: #e63946;
  color: #ffffff;
  font-weight: bold;
  border-radius: 0.75rem;
  padding: 0.75rem 2rem;
  transition: opacity 0.3s;
}

.gard-btn-primary:hover {
  opacity: 0.9;
}
```

#### Botón Secundario
```css
.gard-btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  padding: 0.75rem 2rem;
}
```

### Iconos

#### Estilo de Iconos
- **Tipo**: Lineales, minimalistas
- **Color**: `#e63946` (rojo-anaranjado)
- **Tamaños**: 16px, 20px, 24px, 32px, 48px
- **Biblioteca**: Lucide React

#### Ejemplo de Uso
```jsx
<Shield className="h-6 w-6 text-[hsl(var(--gard-accent))]" />
<CheckCircle className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
<BarChart4 className="h-12 w-12 text-[hsl(var(--gard-accent))]" />
```

### Tarjetas

#### Tarjeta Estándar
```css
.gard-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}
```

#### Tarjeta con Acento
```css
.gard-card-accent {
  background-color: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
```

## Secciones

### Hero Section
- **Fondo**: `#1a1a1a` con overlay oscuro
- **Texto**: Blanco puro con alta legibilidad
- **CTA**: Botón rojo-anaranjado `#e63946`
- **Imagen/Video**: Con overlay para contraste

### Sección de Estadísticas
- **Fondo**: Gradiente sutil
- **Iconos**: Rojo-anaranjado `#e63946`
- **Números**: Blanco puro, tamaño grande
- **Efectos**: Hover con escala y transparencia

### Sección de Servicios
- **Tarjetas**: Fondo semi-transparente
- **Iconos**: Rojo-anaranjado `#e63946`
- **Enlaces**: Color acento con hover

## Imágenes

### Directrices de Imágenes
- **Tipo**: Reales, profesionales
- **Tema**: Tecnología, personas, seguridad
- **Iluminación**: Neutra/fría
- **Estilo**: Moderno y limpio
- **Formato**: Optimizadas para web

### Uso de Imágenes
```jsx
<CloudflareImage
  imageId="id-de-imagen"
  alt="Descripción profesional"
  fill
  objectFit="cover"
  className="rounded-xl"
/>
```

## Espaciado

### Sistema de Espaciado
- **XS**: 0.25rem (4px)
- **S**: 0.5rem (8px)
- **M**: 1rem (16px)
- **L**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)

## Bordes y Sombras

### Bordes
- **Radio**: 0.75rem (12px)
- **Color**: `rgba(255, 255, 255, 0.1)`
- **Estilo**: Sólido

### Sombras
- **Sutil**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Media**: `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Fuerte**: `0 10px 15px rgba(0, 0, 0, 0.1)`

## Estados Interactivos

### Hover
- **Botones**: Opacidad 0.9
- **Tarjetas**: Escala 1.05
- **Enlaces**: Subrayado

### Focus
- **Anillo**: `#e63946` con opacidad 0.5
- **Radio**: 0.75rem

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptaciones
- **Títulos**: Tamaño reducido en mobile
- **Grid**: 1 columna en mobile, 2+ en desktop
- **Espaciado**: Reducido en mobile

## Accesibilidad

### Contraste
- **Texto principal**: Ratio 4.5:1 mínimo
- **Texto grande**: Ratio 3:1 mínimo
- **Elementos interactivos**: Ratio 3:1 mínimo

### Navegación
- **Focus visible**: Siempre visible
- **Skip links**: Para navegación por teclado
- **Alt text**: Para todas las imágenes

## Implementación

### Archivos Principales
- `app/theme.ts` - Variables de color
- `app/globals.css` - Estilos globales
- `components/` - Componentes reutilizables

### Clases CSS Utilitarias
- `.gard-btn-primary` - Botón principal
- `.gard-card` - Tarjeta estándar
- `.gard-section` - Sección de página
- `.text-heading-*` - Títulos
- `.text-body-*` - Cuerpo de texto