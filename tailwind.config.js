/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': 'repeat(auto-fit, minmax(190px, 1fr))'
      },
      fontFamily: {
        'pacific': 'Pacifico, cursive;'
      },
      animation: {
        'slidedown': 'slidedown .2s ease-in-out',
      },
      keyframes: {
        slidedown: {
          from: { opacity: '0', transform: 'translateY(-15%)' },
          to: { opacity: '1', transform: 'none' },
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}