/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ff",
          100: "#e5efff",
          500: "#2b6df6",
          600: "#1759e7",
          700: "#1047bf",
          900: "#0f1d3a"
        }
      }
    }
  },
  plugins: [],
};