/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        seashell: '#F4F4F4',
      },
      fontFamily: {
        mango: ['var(--font-mango)'],
        playfair: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
