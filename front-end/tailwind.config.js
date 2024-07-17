// /** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Các tệp trong thư mục app
    "./pages/**/*.{js,ts,jsx,tsx}", // Các tệp trong thư mục pages
    "./components/**/*.{js,ts,jsx,tsx}", // Các tệp trong thư mục components
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        },
      },
    },
  },
  plugins: [],
};
