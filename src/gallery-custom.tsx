import PhotoSwipe from 'photoswipe'
import { Options as PhotoswipeUiDefaultOptions } from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { getElBounds, sortNodes } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  options: PropTypes.object,
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? class Element {} : Element,
    ),
  }).isRequired,
  ui: PropTypes.any.isRequired,
}

interface PhotoSwipeItem extends PhotoSwipe.Item {
  el: HTMLElement
}

type Props = InferProps<typeof propTypes>

type PhotoSwipeUI =
  | (new (
      pswp: PhotoSwipe<PhotoSwipe.Options>,
      framework: PhotoSwipe.UIFramework,
    ) => PhotoSwipe.UI<PhotoSwipe.Options>)
  | boolean

export interface CustomGalleryProps
  extends Omit<Props, 'layoutRef' | 'ui' | 'options'> {
  layoutRef: React.MutableRefObject<HTMLElement>
  ui: PhotoSwipeUI
  options?: PhotoSwipe.Options & PhotoswipeUiDefaultOptions
}

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

// @ts-ignore
CustomGallery.propTypes = propTypes

CustomGallery.defaultProps = {
  options: {},
}
