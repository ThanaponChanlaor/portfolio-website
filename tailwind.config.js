/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem' },
      screens: { sm: '40rem', md: '48rem', lg: '64rem', xl: '77.5rem' },
    },
    extend: {
      colors: {
        ink: '#262838',
        sky: '#CFE6F7',
        cream: '#FDF6E3',
        blush: '#F6C3D1',
        coral: { DEFAULT: '#F2876A', dark: '#D9532E' },
        sun: { DEFAULT: '#F7CF4F', shade: '#D9A916' },
        brand: { DEFAULT: '#2F6FB3', light: '#CFE8FA' },
        // Pastel card tones: DEFAULT is the fill, `shade` is the pop shadow.
        peach: { DEFAULT: '#FCE3C6', shade: '#EBB27A' },
        lilac: { DEFAULT: '#E2DAF5', shade: '#B3A1E3' },
        ice: { DEFAULT: '#D6E8F7', shade: '#8DBDE6' },
        mint: { DEFAULT: '#D8EFE3', shade: '#8FCBA9' },
        fog: { DEFAULT: '#ECEEF2', shade: '#B8BDC9' },
        butter: { DEFAULT: '#FCF0B8', shade: '#EACB4F' },
        rose: { DEFAULT: '#FAD9E1', shade: '#E897AD' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Color comes from a `shadow-<color>` utility, e.g. `shadow-pop shadow-peach-shade`.
        pop: '0 0.375rem 0 0 #262838',
        'pop-sm': '0 0.1875rem 0 0 #262838',
      },
      borderWidth: { 3: '0.1875rem' },
    },
  },
  plugins: [],
};
