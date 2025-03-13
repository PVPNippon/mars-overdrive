/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: "translateY(0)" }, // Fixed quotes
          '50%': { transform: "translateY(-10px)" }, // Fixed quotes
        }
      },
      animation: {
        float: "float 3s ease-in-out infinite" // Added animation
      }
    },
  },
  plugins: [],
};