/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
