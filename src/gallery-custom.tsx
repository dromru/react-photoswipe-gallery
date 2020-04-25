import PhotoSwipe from 'photoswipe'
import { Options as PhotoswipeUiDefaultOptions } from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, FC } from 'react'
import PropTypes from 'prop-types'
import { getElBounds, sortNodes } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'

interface PhotoSwipeItem extends PhotoSwipe.Item {
  el: HTMLElement
}

type PhotoSwipeUI =
  | (new (
      pswp: PhotoSwipe<PhotoSwipe.Options>,
      framework: PhotoSwipe.UIFramework,
    ) => PhotoSwipe.UI<PhotoSwipe.Options>)
  | boolean

export interface CustomGalleryProps {
  /**
   * Ref to your layout element
   */
  layoutRef: React.MutableRefObject<HTMLElement>

  /**
   * PhotoSwipe UI class
   */
  ui: PhotoSwipeUI

  /**
   * PhotoSwipe options
   */
  options?: PhotoSwipe.Options & PhotoswipeUiDefaultOptions
}

/**
 * Gallery component with ability to use specific UI and Layout
 */
export const CustomGallery: FC<CustomGalleryProps> = ({
  children,
  ui,
  options,
  layoutRef,
}) => {
  const items = useRef(new Map<ItemRef, InternalItem>())

  const handleClick = useCallback((targetRef: ItemRef) => {
    let index = 0

    const normalized: PhotoSwipeItem[] = []

    const entries = Array.from(items.current)

    const prepare = (entry: [ItemRef, InternalItem], i: number) => {
      const [
        ref,
        { width, height, title, original, thumbnail, ...rest },
      ] = entry

      if (targetRef === ref) {
        index = i
      }

      normalized.push({
        ...(title ? { title } : {}),
        w: Number(width),
        h: Number(height),
        src: original,
        msrc: thumbnail,
        el: ref.current,
        ...rest,
      })
    }

    if (items.current.size > 1) {
      entries
        .sort(([{ current: a }], [{ current: b }]) => sortNodes(a, b))
        .forEach(prepare)
    } else {
      entries.forEach(prepare)
    }

    const layoutEl = layoutRef.current

    if (layoutEl) {
      new PhotoSwipe(layoutEl, ui, normalized, {
        ...(options || {}),
        index,
        getThumbBoundsFn: (thumbIndex) => {
          const { el } = normalized[thumbIndex]
          if (el instanceof HTMLImageElement) {
            return getElBounds(el)
          }
          return { x: 0, y: 0, w: 0 }
        },
      }).init()
    }
  }, [])

  const remove = useCallback((ref) => {
    items.current.delete(ref)
  }, [])

  const set = useCallback((ref, data) => {
    items.current.set(ref, data)
  }, [])

  return (
    <Context.Provider value={{ remove, set, handleClick }}>
      {children}
    </Context.Provider>
  )
}

CustomGallery.propTypes = {
  children: PropTypes.any,
  options: PropTypes.object,
  // @ts-ignore
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? class Element {} : Element,
    ),
  }).isRequired,
  ui: PropTypes.any.isRequired,
}

CustomGallery.defaultProps = {
  options: {},
}
