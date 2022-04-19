import { themes } from '@storybook/theming'

const currentRef = encodeURIComponent(process.env.GITHUB_REF_NAME || 'local')
const currentSha = process.env.GITHUB_SHA
const brandUrlTail = currentRef === 'local' ? '' : `tree/${currentRef}`
const brandSettings = {
  brandTitle: `react-photoswipe-gallery/${currentRef} - Storybook${currentSha ? ` - ${currentSha}` : ''}`,
  brandUrl: `https://github.com/dromru/react-photoswipe-gallery/${brandUrlTail}`,
  brandImage: `https://badgen.net/badge/icon/${currentSha || 'local'}?icon=github&label=${currentRef}`,
}

export const parameters = {
  controls: { hideNoControlsWarning: true },
  darkMode: {
    stylePreview: true,
    darkClass: 'lights-out',
    lightClass: 'lights-on',
    dark: {
      ...themes.dark,
      ...brandSettings,
    },
    light: {
      ...themes.light,
      ...brandSettings,
    },
  },
  options: {
    storySort: {
      order: ['Demo', ['Basic', 'Cropped', 'Hash Navigation', 'Caption', 'Srcset', 'Download Button', 'Html', 'Plugins'], 'Dev'],
    },
  },
}
