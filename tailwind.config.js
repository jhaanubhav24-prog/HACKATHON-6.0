/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0a',
        panel: '#111111',
        card: '#0d0d0d',
        border: '#232323',
        strike: {
          green: '#39ff88',
          greendim: '#1f8a4c',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(57,255,136,0.25)',
      },
    },
  },
  plugins: [],
}
