/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shilo': '#ebbeb8',
        'shiko':'#f3ccc7',
        'shino':'#f7d7d3',
        'dhama': '#c4d7e6'
      },
      animation: {
        fadein: 'fadein 2s', // The animation name and timing
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundSize: {
        '150': '150%', // Defines the `bg-[120]` class
        '80' : '80%'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  
}

