import type { SlideData } from 'photoswipe'
import type { MutableRefObject } from 'react'
import sortNodes from './sort-nodes'
import ensureRefPassed from './ensure-ref-passed'
import entryItemRefIsElement from './entry-item-ref-is-element'
import { NoRefError } from '../no-ref-error'
import { ItemRef, InternalItem } from '../types'

const getSlidesAndIndexFromItemsRefs = (
  items: MutableRefObject<Map<ItemRef, InternalItem>>,
  targetRef: ItemRef | null | undefined,
  targetId: string | null | undefined,
  itemIndex: number | null | undefined,
) => {
  const entries = Array.from(items.current)

  if (
    typeof itemIndex === 'number' &&
    (entries[itemIndex] === undefined ||
      !entryItemRefIsElement(entries[itemIndex]))
  ) {
    throw new NoRefError(`Failed to open at index ${itemIndex}`)
  }

  const { slides, index } = entries
    .map(ensureRefPassed)
    .sort(([{ current: a }], [{ current: b }]) => sortNodes(a, b))
    .reduce(
      (acc, entry, i) => {
        const [
          ref,
          {
            width,
            height,
            original,
            originalSrcset,
            thumbnail,
            cropped,
            content,
            id: pid,
            ...rest
          },
        ] = entry
        if (
          targetRef === ref ||
          (pid !== undefined && String(pid) === targetId)
        ) {
          acc.index = i
        }

        acc.slides.push({
          w: Number(width),
          h: Number(height),
          src: original,
          srcset: originalSrcset,
          msrc: thumbnail,
          element: ref.current,
          thumbCropped: cropped,
          content,
          ...(content !== undefined ? { type: 'html' } : {}),
          ...(pid !== undefined ? { pid } : {}),
          ...rest,
        })
        return acc
      },
      {
        slides: [] as SlideData[],
        index: itemIndex || null,
      },
    )

  return { slides, index }
}

export default getSlidesAndIndexFromItemsRefs
