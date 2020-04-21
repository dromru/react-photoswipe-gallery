const pathlib = require('path')

const resolveStories = (path) => pathlib.resolve(__dirname, '../stories', path)

module.exports = {
  stories: [
    resolveStories('**/*.stories.ts'),
    resolveStories('**/*.stories.tsx'),
  ],
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
