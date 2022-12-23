/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './page-components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto-Regular', ...defaultTheme.fontFamily.sans],
        serif: ['Roboto-Regular', ...defaultTheme.fontFamily.serif],
        mono: ['Roboto-Regular', ...defaultTheme.fontFamily.mono],
        'roboto-bold': ['Roboto-Bold', ...defaultTheme.fontFamily.sans],
        'roboto-medium': ['Roboto-Medium', ...defaultTheme.fontFamily.sans],
        'roboto-regular': ['Roboto-Regular', ...defaultTheme.fontFamily.sans],
        'roboto-light': ['Roboto-Light', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
