/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.tsx',
    './src/**/*.tsx',
    './src/**/**/*.tsx',
    './src/**/**/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'
      }, 
      gridTemplateRows: {
        7: 'repeat(7,minmax(01fr))'
      }
    },
  },
  plugins: [],
}
