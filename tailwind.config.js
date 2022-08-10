const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      ...colors,
      primary: '#5f19f7',
      secondary: '#f9d04a',
      tertiary: '#477cfe',
      fourth: '#eb9560',
      dark: '#070126'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
