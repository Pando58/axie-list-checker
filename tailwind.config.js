const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      minWidth: {
        '3ch': '3ch'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}