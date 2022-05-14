import { InternalItem } from '../../types'

export const createItem = (
  index: number,
  contentFn: false | ((i?: number) => JSX.Element | string) = false,
): InternalItem => {
  if (typeof contentFn === 'function') {
    const content = contentFn(index)
    return {
      caption: `item #${index}`,
      ...(typeof content === 'string' ? { html: content } : { content }),
    }
  }

  return {
    original: `https://placekitten.com/1024/768?image=${index}`,
    thumbnail: `https://placekitten.com/160/120?image=${index}`,
    width: 1024,
    height: 768,
    caption: `kitty #${index}`,
    alt: `photo of kitty #${index}`,
  }
}
