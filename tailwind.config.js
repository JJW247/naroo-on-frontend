module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: { min: '475px', max: '639px' },
        sm: { min: '640px', max: '767px' },
        md: { min: '768px', max: '949px' },
        lg: { min: '950px', max: '1199px' },
        xl: { min: '1200px', max: '1535px' },
      },
      colors: {
        gray: {
          100: '#C4C4C4',
          200: '#666666',
          300: '#555555',
          400: '#111111',
        },
        'shuttle-gray': '#5E6774',
        harp: '#E9EFF1',
        yellow: '#F9D66C',
      },
      fontFamily: {
        noto: 'Noto Sans KR',
      },
    },
    debugScreens: {
      position: ['top', 'left'],
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
