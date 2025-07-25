/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    '../../packages/ui-library/src/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Design System Typography - aligned with design.json
        // Primary Font: MD Nichrome (for headings)
        heading: ['Gilroy-ExtraBold'], // Default for h1, h2 (design.json: bold)
        'heading-thin': ['MDNichrome-Thin'],
        'heading-light': ['MDNichrome-Light'],
        'heading-regular': ['MDNichrome-Regular'],
        'heading-bold': ['MDNichrome-Bold'],
        'heading-dark': ['MDNichrome-Dark'],
        'heading-ultra': ['MDNichrome-Ultra'],
        'heading-infra': ['MDNichrome-Infra'],

        // Secondary Font: Gilroy (for body text, labels, captions)
        body: ['Gilroy-Light'], // Default for body text (design.json: regular)
        'body-light': ['Gilroy-Light'],
        'body-regular': ['Gilroy-Light'], // Mapping to light since no true regular
        'body-medium': ['Gilroy-ExtraBold'], // For labels (design.json: medium)
        'body-bold': ['Gilroy-ExtraBold'],

        // Semantic font classes based on design.json usage
        h1: ['MDNichrome-Bold'], // 36px, bold
        h2: ['MDNichrome-Bold'], // 24px, bold
        label: ['Gilroy-ExtraBold'], // 14px, medium
        caption: ['Gilroy-Light'], // 12px, regular
      },
      fontSize: {
        // Design System Typography Sizes from design.json
        h1: ['36px', { lineHeight: '1.2' }], // design.json: 36px
        h2: ['24px', { lineHeight: '1.3' }], // design.json: 24px
        h3: ['20px', { lineHeight: '1.4' }], // Common h3 size
        body: ['16px', { lineHeight: '1.5' }], // design.json: 16px
        label: ['14px', { lineHeight: '1.4' }], // design.json: 14px
        caption: ['12px', { lineHeight: '1.3' }], // design.json: 12px
      },
      colors: {
        // Design system colors from design.json
        primary: {
          DEFAULT: '#5852FF', // royalBlue
          dark: '#0A0427',
          lavender: '#949FFF',
          lavendertint: '#D7D6FF',
        },
        accent: {
          DEFAULT: '#B9FF4B', // limeGreen
        },
        background: {
          main: '#FFFFFF',
          dark: '#121212',
        },
        surface: {
          card: '#F7F7F7',
          light: '#EAE2FF',
        },
        text: {
          primary: '#000000',
          secondary: '#545454',
          tertiary: '#A0A0A0',
          'on-primary': '#FFFFFF',
          'on-accent': '#000000',
        },
        semantic: {
          success: '#28A745',
          danger: '#DC3545',
          warning: '#FFC107',
        },
      },
    },
  },
  plugins: [],
};
