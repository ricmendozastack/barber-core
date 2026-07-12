module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@bootstrap': './src/bootstrap',
            '@components': './src/components',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@store': './src/store',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@app-types': './src/types',
            '@config': './src/config',
            '@navigation': './src/navigation',
            '@api': './src/api',
            '@storage': './src/storage',
            '@lib': './src/lib',
            '@localization': './src/localization',
            '@providers': './src/providers',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
