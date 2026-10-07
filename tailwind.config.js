/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0a1f1c',
        navy: '#0b132b',
        amber: '#ffaa00',
        sunflower: '#ffd700',
        parchment: '#f4e8d1',
        glow: 'rgba(255, 215, 0, 0.4)',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
