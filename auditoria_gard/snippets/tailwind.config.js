/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de Gard Security
        primary: 'hsl(var(--gard-primary))',
        'primary-foreground': 'hsl(var(--gard-primary-foreground))',
        secondary: 'hsl(var(--gard-secondary))',
        'secondary-foreground': 'hsl(var(--gard-secondary-foreground))',
        accent: 'hsl(var(--gard-accent))',
        'accent-foreground': 'hsl(var(--gard-accent-foreground))',
        
        // Fondos y textos
        background: 'hsl(var(--gard-background))',
        foreground: 'hsl(var(--gard-foreground))',
        muted: 'hsl(var(--gard-muted))',
        'muted-foreground': 'hsl(var(--gard-muted-foreground))',
        
        // Componentes
        card: 'hsl(var(--gard-card))',
        'card-foreground': 'hsl(var(--gard-card-foreground))',
        popover: 'hsl(var(--gard-popover))',
        'popover-foreground': 'hsl(var(--gard-popover-foreground))',
        border: 'hsl(var(--gard-border))',
        input: 'hsl(var(--gard-input))',
        ring: 'hsl(var(--gard-ring))',
        
        // Estados
        destructive: 'hsl(var(--gard-destructive))',
        'destructive-foreground': 'hsl(var(--gard-destructive-foreground))',
      },
      
      // Familias de fuentes
      fontFamily: {
        title: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      
      // Escala tipográfica
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body-base': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      
      // Border radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      // Sombras
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
      
      // Espaciado personalizado
      spacing: {
        'section': '6rem', // 96px
        'section-lg': '8rem', // 128px
      },
      
      // Animaciones
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}

