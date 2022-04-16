module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-storysource', '@storybook/addon-essentials', 'storybook-dark-mode'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    })
    config.module.rules.push({
      resolve: { fullySpecified: false },
    })
    config.resolve.extensions.push('.ts', '.tsx')
    config.resolve.fallback.util = require.resolve('util')
    return config
  },
}
