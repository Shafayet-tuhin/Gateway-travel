/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      abc:[ "Rancho", "cursive"] ,
      abc2:["Comfortaa", "sans-serif"]
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

