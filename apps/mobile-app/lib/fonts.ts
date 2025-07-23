import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    // MD Nichrome fonts for headings
    'MDNichrome-Thin': require('../assets/fonts/MDNichromeTest-Thin.otf'),
    'MDNichrome-Light': require('../assets/fonts/MDNichromeTest-Light.otf'),
    'MDNichrome-Regular': require('../assets/fonts/MDNichromeTest-Regular.otf'),
    'MDNichrome-Bold': require('../assets/fonts/MDNichromeTest-Bold.otf'),
    'MDNichrome-Dark': require('../assets/fonts/MDNichromeTest-Dark.otf'),
    'MDNichrome-Ultra': require('../assets/fonts/MDNichromeTest-Ultra.otf'),
    'MDNichrome-Infra': require('../assets/fonts/MDNichromeTest-Infra.otf'),
    
    // Gilroy fonts for body text
    'Gilroy-Light': require('../assets/fonts/Gilroy-Light.otf'),
    'Gilroy-ExtraBold': require('../assets/fonts/Gilroy-ExtraBold.otf'),
  });

  return fontsLoaded;
};

// Font family mappings aligned with design.json specifications
export const FontFamilies = {
  // MD Nichrome variants (for headings) - design.json specifies "MD Nichrome" for headings
  heading: {
    thin: 'MDNichrome-Thin',
    light: 'MDNichrome-Light',
    regular: 'MDNichrome-Regular',
    bold: 'MDNichrome-Bold',        // Used for h1, h2 per design.json
    dark: 'MDNichrome-Dark',
    ultra: 'MDNichrome-Ultra',
    infra: 'MDNichrome-Infra',
  },
  // Gilroy variants (for body text) - design.json specifies "Gilroy" for body, labels, captions
  body: {
    light: 'Gilroy-Light',          // Used for body text and captions (regular weight)
    regular: 'Gilroy-Light',        // Mapping regular to light since we don't have true regular
    medium: 'Gilroy-ExtraBold',     // Used for labels (medium weight) - mapping to ExtraBold
    bold: 'Gilroy-ExtraBold',       // ExtraBold for emphasis
  },
} as const;

// Design system typography specifications from design.json
export const DesignSystemTypography = {
  h1: {
    fontFamily: FontFamilies.heading.bold,
    fontSize: 36,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontFamily: FontFamilies.heading.bold,
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  body: {
    fontFamily: FontFamilies.body.regular,
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  label: {
    fontFamily: FontFamilies.body.medium,
    fontSize: 14,
    fontWeight: '500' as const,
  },
  caption: {
    fontFamily: FontFamilies.body.regular,
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
} as const;

// Type definitions for better TypeScript support
export type HeadingFontWeight = keyof typeof FontFamilies.heading;
export type BodyFontWeight = keyof typeof FontFamilies.body;
export type TypographyVariant = keyof typeof DesignSystemTypography;