import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      colors: {
        'ios-bg': 'hsl(var(--ios-bg))',
        'ios-panel': 'hsl(var(--ios-panel))',
        'ios-panel-contrast': 'hsl(var(--ios-panel-contrast))',
        'ios-blue': 'hsl(var(--ios-blue))',
        'ios-border': 'hsl(var(--ios-border))',
        'ios-text-primary': 'hsl(var(--ios-text-primary))',
        'ios-text-secondary': 'hsl(var(--ios-text-secondary))',
        'ios-green': 'hsl(var(--ios-green))',
        'ios-orange': 'hsl(var(--ios-orange))',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config