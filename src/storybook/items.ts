import { InternalItem } from '../types'

export const createItem = (index: number): InternalItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  title: `kitty #${index}`,
  alt: `photo of kitty #${index}`,
})

export const items = Array.from({ length: 3 }, (_, i) => createItem(i + 1))
