/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-overall': "url('/src/images/register_bg.jpg')",
      },
      colors: {
        
      }
    },
  },
  screens: {

    'lg': {'max': '1220px'},
    // => @media (max-width: 1023px) { ... }

    'slg': {'max': '1100px'},
    // => @media (max-width: 1023px) { ... }

    'md': {'max': '767px'},
    // => @media (max-width: 767px) { ... }

    'sm': {'max': '639px'},
    // => @media (max-width: 639px) { ... }
  },
  plugins: [],
}