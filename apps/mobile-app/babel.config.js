module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [
      [
        'babel-preset-expo', 
        { 
          jsxImportSource: 'react-native-css-interop/jsx-runtime',
          unstable_transformImportMeta: true
        }
      ], 
      'nativewind/babel'
    ],

    plugins,
  };
};
