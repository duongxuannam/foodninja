module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          navigation: './src/navigation',
          api: './src/api',
          asset: './src/asset',
          component: './src/component',
          screen: './src/screen',
          language: './src/language',
          util: './src/util',
          constant: './src/constant',
          store: './src/store',
          data: './src/data',
          service: './src/service',
          manager: './src/manager',
          hook: './src/hook',
        },
        extensions: ['.android.js', '.ios.js', '.js'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  retainLines: true,
};
