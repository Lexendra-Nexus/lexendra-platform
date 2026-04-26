/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
      colors: {
        legal: {
          bg: 'rgb(var(--legal-bg-rgb) / <alpha-value>)',
          bgLight: 'rgb(var(--legal-bg-light-rgb) / <alpha-value>)',
          surface: 'rgb(var(--legal-surface-rgb) / <alpha-value>)',
          surfaceLight: 'rgb(var(--legal-surface-light-rgb) / <alpha-value>)',
          text: 'rgb(var(--legal-text-rgb) / <alpha-value>)',
          textLight: 'rgb(var(--legal-text-light-rgb) / <alpha-value>)',
          gray: 'rgb(var(--legal-gray-rgb) / <alpha-value>)',
          border: 'rgb(var(--legal-border-rgb) / <alpha-value>)',
          accent: 'rgb(var(--legal-accent-rgb) / <alpha-value>)',
          accentLight: 'rgb(var(--legal-accent-light-rgb) / <alpha-value>)',
          primary: 'rgb(var(--legal-primary-rgb) / <alpha-value>)',
          lightGray: 'rgb(var(--legal-light-gray-rgb) / <alpha-value>)',
          dark: 'rgb(var(--legal-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--legal-light-rgb) / <alpha-value>)',
          success: 'rgb(var(--legal-success-rgb) / <alpha-value>)',
          warning: 'rgb(var(--legal-warning-rgb) / <alpha-value>)',
          error: 'rgb(var(--legal-error-rgb) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}