module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        keyframes: {
          fadeOut: {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
          revert: {
            '0%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(10px, 10px)' }, // Adjust as needed
            '100%': { transform: 'translate(0, 0)' },
          },
        },
        animation: {
          fadeOut: 'fadeOut 0.5s ease-out',
          revert: 'revert 0.5s ease-out',
        },
      },
    },
    plugins: [],
}
  