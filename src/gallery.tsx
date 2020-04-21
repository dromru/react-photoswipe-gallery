import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { getElBounds } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  layout: PropTypes.any.isRequired,
  ui: PropTypes.any,
  options: PropTypes.object,
}

interface PhotoSwipeItem extends PhotoSwipe.Item {
  thumbEl?: HTMLImageElement
}

export type GalleryProps = InferProps<typeof propTypes>

export const Gallery: FC<GalleryProps> = ({
  children,
  layout: Layout,
  ui,
  options,
}) => {
  const tplRef = useRef<HTMLElement>()
  const items = useRef(new Map<ItemRef, InternalItem>())

  const handleClick = useCallback((ref: ItemRef) => {
    const normalized: PhotoSwipeItem[] = []
    let index = 0
    let i = 0
    for (const [
      r,
      { thumbRef, width, height, title, full, thumb },
    ] of items.current) {
      if (r === ref) {
        index = i
      }
      normalized.push({
        ...(title ? { title } : {}),
        w: Number(width),
        h: Number(height),
        src: full,
        msrc: thumb || undefined,
        thumbEl: thumbRef.current || undefined,
      })
      i++
    }
    if (tplRef.current) {
      new PhotoSwipe(tplRef.current, ui, normalized, {
        ...(options || {}),
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
      <Layout ref={tplRef} />
      {/* TODO: shared layout */}
    </Context.Provider>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = {
  ui: PhotoswipeUIDefault,
  options: null,
}
