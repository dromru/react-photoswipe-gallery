import type { SlideData } from 'photoswipe'
import type { MutableRefObject } from 'react'
import itemToSlide from './item-to-slide'
import { NoSourceIdError } from '../no-source-id-error'
import { ItemRef, InternalItem, DataSource } from '../types'

const getSlidesAndIndexFromDataSource = (
  dataSource: DataSource,
  items: MutableRefObject<Map<ItemRef, InternalItem>>,
  targetRef: ItemRef | null | undefined,
  targetId: string | null | undefined,
  itemIndex: number | null | undefined,
) => {
  const itemsWithRefsMap = Array.from(items.current).reduce(
    (acc, [ref, { sourceId }]) => {
      if (sourceId === undefined) {
        throw new NoSourceIdError('sourceId is missed on Item component')
      }
      acc.set(sourceId, ref)
      return acc
    },
    new Map<number | string, ItemRef>(),
  )

  const { slides, index } = dataSource.reduce(
    (acc, dataSourceItem, i) => {
      const { sourceId, ...rest } = dataSourceItem

      if (sourceId === undefined) {
        throw new NoSourceIdError('sourceId is missed in dataSource item')
      }

      const elementRef = itemsWithRefsMap.has(sourceId)
        ? itemsWithRefsMap.get(sourceId)
        : undefined

      if (
        targetRef === elementRef ||
        (rest.id !== undefined && String(rest.id) === targetId)
      ) {
        acc.index = i
      }

      acc.slides.push(itemToSlide(rest, elementRef))

      return acc
    },
    {
      slides: [] as SlideData[],
      index: itemIndex || null,
    },
  )

  return { slides, index }
}

export default getSlidesAndIndexFromDataSource
