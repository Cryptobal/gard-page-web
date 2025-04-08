export const theme = {
  light: {
    // Colores primarios con más contraste
    '--gard-primary': '215 80% 35%', // Azul principal más oscuro para mejor contraste
    '--gard-primary-foreground': '0 0% 100%', // Blanco
    '--gard-secondary': '215 80% 20%', // Azul oscuro con más contraste
    '--gard-secondary-foreground': '0 0% 100%', // Blanco
    '--gard-accent': '18 100% 45%', // Naranja más oscuro
    '--gard-accent-foreground': '0 0% 100%', // Blanco

    // Colores de fondo
    '--gard-background': '0 0% 100%', // Blanco
    '--gard-foreground': '215 30% 20%', // Azul oscuro para texto con más contraste
    '--gard-muted': '220 14% 92%', // Gris claro con más contraste
    '--gard-muted-foreground': '215 30% 30%', // Azul medio para texto secundario

    // Componentes
    '--gard-card': '0 0% 100%', // Blanco
    '--gard-card-foreground': '215 30% 20%', // Azul oscuro con más contraste
    '--gard-popover': '0 0% 100%', // Blanco
    '--gard-popover-foreground': '215 30% 20%', // Azul oscuro con más contraste
    '--gard-border': '220 13% 85%', // Gris con más contraste
    '--gard-input': '220 13% 85%', // Gris con más contraste
    '--gard-ring': '215 80% 35%', // Mismo azul del primario

    // Radio
    '--radius': '0.75rem',
  },
  dark: {
    // Colores primarios - Unificados para consistencia
    '--gard-primary': '215 80% 55%', // Azul principal un poco más brillante para modo oscuro
    '--gard-primary-foreground': '0 0% 100%', // Blanco
    '--gard-secondary': '215 70% 30%', // Azul oscuro
    '--gard-secondary-foreground': '0 0% 100%', // Blanco
    '--gard-accent': '18 100% 60%', // Naranja más brillante
    '--gard-accent-foreground': '0 0% 100%', // Blanco

    // Sistema refinado de fondos oscuros
    '--gard-background': '220 14% 6%',           // Base oscura principal: #0B0F1A
    '--gard-background-darker': '0 0% 4%',       // Negro sofisticado casi puro: #0a0a0a
    '--gard-background-darkest': '0 0% 2%',      // Negro puro para contrastar: #050505
    '--gard-background-subtle': '220 10% 8%',    // Para variaciones sutiles: #111827
    
    // Fondos para componentes
    '--gard-card': '220 14% 9%',                 // Tarjetas sobre fondo negro
    '--gard-card-accent': '18 30% 7%',           // Tarjetas con tinte naranja muy sutil
    '--gard-muted': '220 10% 12%',               // Secciones con fondo intermedio
    '--gard-muted-foreground': '215 15% 65%',    // Subtítulos o texto leve
    
    // Textos
    '--gard-foreground': '210 30% 95%',          // Texto general blanco suave
    '--gard-card-foreground': '210 30% 95%',     // Texto en tarjetas
    '--gard-popover': '220 14% 9%',              // Popovers 
    '--gard-popover-foreground': '210 30% 95%',  // Texto en popovers

    // Elementos interactivos
    '--gard-border': '220 10% 20%',              // Bordes estándar
    '--gard-border-subtle': '0 0% 15%',          // Bordes sutiles
    '--gard-input': '220 10% 20%',               // Campos de formulario
    '--gard-ring': '215 80% 55%',                // Anillo de focus azul
    '--gard-ring-accent': '18 100% 60%',         // Anillo de focus naranja

    // Radio
    '--radius': '0.75rem',
  },
}; 