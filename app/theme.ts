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
    // Nueva paleta basada en gard.cl
    '--gard-primary': '0 0% 100%', // Blanco puro para texto principal
    '--gard-primary-foreground': '0 0% 10%', // Negro para contraste
    '--gard-secondary': '0 0% 90%', // Gris claro para elementos secundarios
    '--gard-secondary-foreground': '0 0% 10%', // Negro para contraste
    '--gard-accent': '6 100% 57%', // Rojo-anaranjado #e63946
    '--gard-accent-foreground': '0 0% 100%', // Blanco para contraste

    // Sistema de fondos basado en gard.cl
    '--gard-background': '0 0% 10%',           // Gris oscuro #1a1a1a
    '--gard-background-darker': '0 0% 5%',     // Negro más oscuro
    '--gard-background-darkest': '0 0% 2%',    // Negro puro
    '--gard-background-subtle': '0 0% 15%',    // Gris ligeramente más claro
    
    // Fondos para componentes
    '--gard-card': '0 0% 12%',                 // Tarjetas sobre fondo gris oscuro
    '--gard-card-accent': '6 30% 8%',          // Tarjetas con tinte rojo muy sutil
    '--gard-muted': '0 0% 15%',                // Secciones con fondo intermedio
    '--gard-muted-foreground': '0 0% 70%',     // Gris medio para texto secundario
    
    // Textos
    '--gard-foreground': '0 0% 100%',          // Blanco puro para texto principal
    '--gard-card-foreground': '0 0% 100%',     // Blanco puro en tarjetas
    '--gard-popover': '0 0% 12%',              // Popovers 
    '--gard-popover-foreground': '0 0% 100%',  // Blanco puro en popovers

    // Elementos interactivos
    '--gard-border': '0 0% 20%',               // Bordes grises
    '--gard-border-subtle': '0 0% 15%',        // Bordes sutiles
    '--gard-input': '0 0% 20%',                // Campos de formulario
    '--gard-ring': '6 100% 57%',               // Anillo de focus rojo-anaranjado
    '--gard-ring-accent': '6 100% 57%',        // Anillo de focus rojo-anaranjado

    // Radio
    '--radius': '0.75rem',
  },
}; 