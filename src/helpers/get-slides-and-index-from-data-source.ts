import type { SlideData } from 'photoswipe'
import type { MutableRefObject } from 'react'
import { NoSourceIdError } from '../no-source-id-error'
import { ItemRef, InternalItem, DataSourceItem } from '../types'

const getSlidesAndIndexFromDataSource = (
  dataSource: DataSourceItem[],
  items: MutableRefObject<Map<ItemRef, InternalItem>>,
  targetRef: ItemRef | null | undefined,
  targetId: string | null | undefined,
  itemIndex: number | null | undefined,
) => {
  const itemsWithElementMap = Array.from(items.current).reduce(
    (acc, [ref, { sourceId }]) => {
      if (sourceId === undefined) {
        throw new NoSourceIdError('sourceId is missed on Item component')
      }
      acc.set(sourceId, ref)
      return acc
    },
    new Map<number, ItemRef>(),
  )

  const { slides, index } = dataSource.reduce(
    (acc, dataSourceItem, i) => {
      const {
        width,
        height,
        original,
        originalSrcset,
        thumbnail,
        cropped,
        content,
        id: pid,
        sourceId,
        ...rest
      } = dataSourceItem

      if (sourceId === undefined) {
        throw new NoSourceIdError('sourceId is missed in dataSource item')
      }

      const elementRef = itemsWithElementMap.has(sourceId)
        ? itemsWithElementMap.get(sourceId)
        : undefined

      if (
        targetRef === elementRef ||
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
        element: elementRef ? elementRef.current ?? undefined : undefined,
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

export default getSlidesAndIndexFromDataSource
