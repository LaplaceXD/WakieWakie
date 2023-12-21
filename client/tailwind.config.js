/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral' : {
          100: "#EEF7FC",
          200: "#808080",
          300: "#061923",
        },
        'yellow' : {
          100: "#F8FAC1",
          200: "#F1F583",
        },
        'peach' : {
          100: "#FAC7C2",
          200: "#F49084",
        },
        'pink' : {
          100: "#FC91C3",
          200: "#F82386",
        },
      },
    },
  },
  plugins: [],
}

