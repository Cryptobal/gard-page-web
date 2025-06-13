/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--gard-border))",
        input: "hsl(var(--gard-input))",
        ring: "hsl(var(--gard-ring))",
        background: "hsl(var(--gard-background))",
        foreground: "hsl(var(--gard-foreground))",
        primary: {
          DEFAULT: "hsl(var(--gard-primary))",
          foreground: "hsl(var(--gard-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--gard-secondary))",
          foreground: "hsl(var(--gard-secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--gard-accent))",
          foreground: "hsl(var(--gard-accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--gard-muted))",
          foreground: "hsl(var(--gard-muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--gard-card))",
          foreground: "hsl(var(--gard-card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--gard-popover))",
          foreground: "hsl(var(--gard-popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      opacity: {
        90: "0.9",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
} 