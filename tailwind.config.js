/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          700: '#1E3A8A',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          900: '#111827',
        }
      }
    },
  },
  plugins: [],
}






