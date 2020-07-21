module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-knobs/register', '@storybook/addon-storysource'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
