import type { SlideData } from 'photoswipe'
import { InternalItem, ItemRef } from '../types'

const itemToSlide = (
  item: InternalItem,
  itemRef: ItemRef | null | undefined,
): SlideData => {
  const {
    width,
    height,
    original,
    originalSrcset,
    thumbnail,
    cropped,
    content,
    id: pid,
    ...rest
  } = item

  return {
    w: width ? Number(width) : undefined,
    h: height ? Number(height) : undefined,
    src: original,
    srcset: originalSrcset,
    msrc: thumbnail,
    element: itemRef?.current ?? undefined,
    thumbCropped: cropped,
    content,
    ...(content !== undefined ? { type: 'html' } : {}),
    ...(pid !== undefined ? { pid } : {}),
    ...rest,
  }
}

export default itemToSlide
