// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Thirdweb v5 React Native configuration
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

// Node.js polyfills for thirdweb v5
config.resolver.alias = {
  ...config.resolver.alias,
  crypto: 'react-native-quick-crypto',
  stream: 'readable-stream',
  buffer: '@craftzdog/react-native-buffer',
  // Additional polyfills for thirdweb v5
  'node:crypto': 'react-native-quick-crypto',
  'node:stream': 'readable-stream',
  'node:buffer': '@craftzdog/react-native-buffer',
};

// Ensure all platforms are supported
config.resolver.platforms = ['native', 'ios', 'android', 'web'];

// Add transformer configuration for better compatibility
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = withNativeWind(config, { input: './global.css' });
