/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {  
    extend: {
      colors: {
        grass: "#5DBE62",
        fire: "#FC6C6E",
        water: "#60A5FA",
        bug: "#9DC12F",
        normal: "#9B9DA1",
        electric: "#F4CF62",
        warning: "#FFCC02",
      }
    },
  },
  plugins: [],
}
