/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.md",
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        primary: {
          default: "var(--vp-c-brand)",
          light: "var(--vp-c-brand-light)",
          lighter: "var(--vp-c-brand-lighter)",
          lightest: "var(--vp-c-brand-lightest)",
          dark: "var(--vp-c-brand-dark)",
          darker: "var(--vp-c-brand-darker)",
        },
        secondary: "var(--vp-c-brand-accent)",
        main: "var(--vp-c-text-1)",
        
      },
      backgroundColor: {
        primary: "var(--vp-c-bg-brand)",
        dark: "var(--vp-c-bg-brand-dark)"
      },
      borderColor: {
        primary: "var(--vp-c-brand)",
        main: "var(--vp-c-divider)",
      },
      outlineColor:{
        primary: "var(--vp-c-brand)",
      },
      transitionProperty: {
        'home': 'box-shadow, opacity, outline-color',
      }
    }
  }
}

