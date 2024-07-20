/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056A9',
        secondary: '#15B5EE',
        tertiary: '#F0F7FF',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover'],
    },
  },
  plugins: [],
}
