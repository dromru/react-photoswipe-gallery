import { InternalItem } from '../../types'

const imagesIds = [
  '54778437102_c1538f008d',
  '54779290036_bfcd3e5a6f',
  '54779525053_c84eeed637',
  '54779517994_e65c3894d6',
  '54779290001_390a0043d4',
  '54779525058_e23bd1be2d',
  '54778437082_5025b65b89',
  '54779625425_dc724fce69',
  '54778437077_9440953e40',
  '54779517989_6a7f1c3ec9',
]

type Size = 'big' | 'small'

const sizeMapper: Record<Size, string> = {
  big: 'b',
  small: 'n',
}

const getImage = (index: number, size: 'big' | 'small') => {
  const imageIndex = index % 10
  const sizeToUse = sizeMapper[size]
  return `https://live.staticflickr.com/65535/${imagesIds[imageIndex]}_${sizeToUse}.jpg`
}

export const createItem = (
  index: number,
  contentFn: false | ((i: number) => JSX.Element | string) = false,
): InternalItem => {
  if (typeof contentFn === 'function') {
    const content = contentFn(index)
    return {
      caption: `item #${index}`,
      ...(typeof content === 'string' ? { html: content } : { content }),
    }
  }

  return {
    original: getImage(index, 'big'),
    thumbnail: getImage(index, 'small'),
    width: 1000,
    height: 768,
    caption: `kitty #${index}`,
    alt: `photo of kitty #${index}`,
  }
}
