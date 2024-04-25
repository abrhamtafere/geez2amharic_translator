// Import the required plugin
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue-500": "#03a9f4",
        "light-blue-700": "#0288d1",
        'light-blue-600': '#4A85F6'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/scrollbar'),
    tailwindScrollbar,
  ],
}

