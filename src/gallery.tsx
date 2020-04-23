import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import {
  DefaultLayout,
  layoutPropTypes,
  layoutDefaultProps,
  LayoutProps,
} from '.'
import { getElBounds } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? class Element {} : Element,
    ),
  }),
  ui: PropTypes.any,
  options: PropTypes.object,
  ...layoutPropTypes,
}

const defaultProps = {
  ui: PhotoswipeUIDefault,
  options: {},
  ...layoutDefaultProps,
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

export interface GalleryProps
  extends Omit<Props & LayoutProps, 'layoutRef' | 'ui' | 'options'> {
  layoutRef?: React.MutableRefObject<HTMLElement>
  ui?: PhotoSwipeUI
  options?: PhotoSwipe.Options & PhotoswipeUIDefault.Options
}

export const Gallery: FC<GalleryProps> = ({
  children,
  ui,
  options,
  layoutRef,
  ...restProps
}) => {
  const defaultLayoutRef = useRef<HTMLElement>()
  const items = useRef(new Map<ItemRef, InternalItem>())

  const handleClick = useCallback((targetRef: ItemRef) => {
    let index = 0

    const normalized: PhotoSwipeItem[] = []

    Array.from(items.current)
      .sort(([{ current: a }], [{ current: b }]) => {
        if (a === b) return 0
        // eslint-disable-next-line no-bitwise
        if (a.compareDocumentPosition(b) & 2) {
          return 1
        }
        return -1
      })
      .forEach(([ref, { width, height, title, original, thumbnail }], i) => {
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
        })
      })

    const layoutEl = defaultLayoutRef.current || layoutRef?.current

    if (layoutEl) {
      new PhotoSwipe(layoutEl, ui, normalized, {
        ...options,
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
      {layoutRef ? null : (
        <DefaultLayout {...restProps} ref={defaultLayoutRef} />
      )}
    </Context.Provider>
  )
}

// @ts-ignore
Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps
