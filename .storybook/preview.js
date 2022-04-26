import { themes } from '@storybook/theming'

const currentRef = encodeURIComponent(process.env.GITHUB_REF_NAME || 'local')
const currentSha = process.env.GITHUB_SHA
const shortSha = currentSha ? currentSha.substring(0, 7) : 'local'

const createLogo = (theme = 'light') => {
  const title = 'Storybook'
  const name = 'react-photoswipe-gallery'
  const sha = shortSha
  let ref = currentRef
  if (ref.length > 15) {
    ref = `${ref.substring(0, 15)}…`
  }
  const colors = {
    light: 'rgb(51, 51, 51)',
    dark: 'rgb(255, 255, 255)',
  }
  console.log('createLogo', colors[theme])
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='202px' height='40px' viewBox='0 0 202 40' role='img'%0A%3E%3Ctitle%3E${title}%3C/title%3E%3Ctext x='0' y='14' text-anchor='start' font-family='BlinkMacSystemFont, -apple-system, Arial, sans-serif' font-weight='bold' font-size='14' fill='${colors[theme]}' %3E${name}%3C/text%3E%3Ctext x='0' y='32' text-anchor='start' font-family='monospace' font-size='14' fill='${colors[theme]}' %3E${sha}@${ref}%3C/text%3E%3C/svg%3E`
}

const brandSettings = {
  brandTitle: `react-photoswipe-gallery/${currentRef} - Storybook${shortSha ? ` - ${shortSha}` : ''}`,
  brandUrl: `https://github.com/dromru/react-photoswipe-gallery/${currentRef === 'local' ? '' : `tree/${currentRef}`}`,
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
      brandImage: createLogo('dark'),
    },
    light: {
      ...themes.light,
      ...brandSettings,
      brandImage: createLogo('light'),
    },
  },
  options: {
    storySort: {
      order: ['Demo', ['Basic', 'Cropped', 'Hash Navigation', 'Caption', 'Srcset', 'Download Button', 'Custom Content', 'Plugins'], 'Dev'],
    },
  },
}
