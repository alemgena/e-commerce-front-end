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
      colors: {
        primary: '#2456B4',
        secondary: {
          light: '#F0F1F0',
          dark: '#E4E5E5',
        },
        main: {
          secondary: '#363736',
        },
        success: {
          main: '#70C274',
        },
        warning: {
          main: '#FFE141',
        },
        error: {
          main: '#FF3434',
        },
        info: {
          main: '#2889CA',
        },
      },
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
    keyframes: {
      sidenavLTR: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0px)' },
      },
      sidenavRTL: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(0px)' },
      },
      fade: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      dropDown: {
        '0%': { opacity: 0, transform: 'scaleY(0)' },
        '100%': { opacity: 1, transform: 'scaleY(1)' },
      },
    },
    animation: {
      sidenavLTREntering: 'sidenavLTR 0.3s ease-in-out forwards',
      sidenavRTLEntering: 'sidenavRTL 0.3s ease-in-out forwards',
      sidenavLTRExit: 'sidenavLTR 0.3s ease-in-out reverse forwards',
      sidenavRTLExit: 'sidenavRTL 0.3s ease-in-out reverse forwards',
      fadeEntering: 'fade 0.3s forwards',
      fadeExit: 'fade 0.3s reverse forwards',
      dropDown: 'dropDown 0.3s forwards',
      dropDownExit: 'dropDown 0.3s reverse forwards',
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
