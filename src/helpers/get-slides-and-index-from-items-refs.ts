import type { SlideData } from 'photoswipe'
import type { MutableRefObject } from 'react'
import sortNodes from './sort-nodes'
import ensureRefPassed from './ensure-ref-passed'
import entryItemRefIsElement from './entry-item-ref-is-element'
import itemToSlide from './item-to-slide'
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
        const [ref, itemData] = entry

        if (
          targetRef === ref ||
          (itemData.id !== undefined && String(itemData.id) === targetId)
        ) {
          acc.index = i
        }

        acc.slides.push(itemToSlide(itemData, ref))

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
