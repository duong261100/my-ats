/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'green-main': '#28b661',
        'blue-main': '#186fc9',
        'gray-main': '#ACACAC',
        'yellow-main': '#E1D123',
        'purple-main': '#6946A2',
        'red-main': '#DA3648',
        'blue-soft': '#32B5F3',
        'blue-soft-hover': '#47bdf4',
        'grey-light': '#ecebeb',
        'grey-soft': '#cfcfcf',
        'grey': '#666666',
        'grey-dark': '#444444',
        'grey-darker': '#2a2a2a',
        'primary': '#7367f0',
        'secondary': '#a5b4fc',
        'success': '#28c76f',
        'danger': '#ea5455',
        'warning': '#ff9f43',
        'info': '#909399',
        'black': '#22292f',
        'white': '#FFFFFF',
        'text': '#625f6e',
        'light': '#f6f6f6',
        'lightPrimary': '#f1f0fe',
        'lightGray': '#f0f0f0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)')
    }),
  ],
}
