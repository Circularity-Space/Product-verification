const tailwindcss = require('tailwindcss')
module.exports = {
  plugins: [tailwindcss('./tailwind.js'), require('autoprefixer')],
  theme: {
    colors: {
      primary: '#5c6ac4',
      secondary: '#ecc94b',
    },
  },
}
