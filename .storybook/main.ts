import { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-dark-mode'],
  webpackFinal: async (config) => {
    // @ts-expect-error
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
      },
      {
        resolve: { fullySpecified: false },
      },
    )
    // @ts-expect-error
    config.resolve.extensions.push('.ts', '.tsx')
    // @ts-expect-error
    config.resolve.fallback.util = require.resolve('util')
    return config
  },
  env: (config) => ({
    ...config,
    GITHUB_REF_NAME: process.env.GITHUB_REF_NAME || '',
    GITHUB_SHA: process.env.GITHUB_SHA || '',
  }),
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
}

export default config
