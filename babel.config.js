module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
          ],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@themes': './src/themes',
            '@types_': './src/types',
          }
        }
      ],
      ['react-native-reanimated/plugin']
    ]
  };
};
