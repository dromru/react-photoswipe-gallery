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
  thumbEl?: HTMLImageElement
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

  const handleClick = useCallback((ref: ItemRef) => {
    const normalized: PhotoSwipeItem[] = []
    let index = 0
    let i = 0
    for (const [
      r,
      { thumbnailRef, width, height, title, original, thumbnail },
    ] of items.current) {
      if (r === ref) {
        index = i
      }
      normalized.push({
        ...(title ? { title } : {}),
        w: Number(width),
        h: Number(height),
        src: original,
        msrc: thumbnail,
        thumbEl: thumbnailRef.current,
      })
      i++
    }
    const layoutEl = defaultLayoutRef.current || layoutRef?.current
    if (layoutEl) {
      new PhotoSwipe(layoutEl, ui, normalized, {
        ...options,
        index,
        getThumbBoundsFn: (thumbIndex) => {
          const thumb = normalized[thumbIndex].thumbEl
          if (thumb) {
            return getElBounds(thumb)
          }
          return { x: 0, y: 0, w: 0 }
        },
      }).init()
    }
  }, [])

  const remove = useCallback((ref) => {
    items.current.delete(ref)
  }, [])

  const update = useCallback((ref, data) => {
    items.current.set(ref, data)
  }, [])

  return (
    <Context.Provider value={{ remove, update, handleClick }}>
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
