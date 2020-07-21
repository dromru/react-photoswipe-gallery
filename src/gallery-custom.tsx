import PhotoSwipe from 'photoswipe'
import React, { useRef, useCallback, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { getElBounds, sortNodes } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'
import { baseGalleryPropTypes, BaseGalleryProps } from './gallery-base'

interface PhotoSwipeItem extends PhotoSwipe.Item {
  el: HTMLElement
  pid?: string | number
}

type PhotoSwipeUI =
  | (new (
      pswp: PhotoSwipe<PhotoSwipe.Options>,
      framework: PhotoSwipe.UIFramework,
    ) => PhotoSwipe.UI<PhotoSwipe.Options>)
  | boolean

export interface CustomGalleryProps extends BaseGalleryProps {
  /**
   * Ref to your layout element
   */
  layoutRef: React.MutableRefObject<HTMLElement>

  /**
   * PhotoSwipe UI class
   */
  ui: PhotoSwipeUI
}

/**
 * Gallery component with ability to use specific UI and Layout
 */
export const CustomGallery: FC<CustomGalleryProps> = ({
  children,
  layoutRef,
  ui,
  options,
  id: galleryUID,
  onOpen,
}) => {
  const items = useRef(new Map<ItemRef, InternalItem>())

  const open = useCallback(
    (targetRef?: ItemRef, targetId?: string, itemIndex?: number) => {
      let index: number | null = itemIndex || null

      const normalized: PhotoSwipeItem[] = []

      const entries = Array.from(items.current)

      const prepare = (entry: [ItemRef, InternalItem], i: number) => {
        const [
          ref,
          { width, height, title, original, thumbnail, id: pid, ...rest },
        ] = entry

        if (
          targetRef === ref ||
          (pid !== undefined && String(pid) === targetId)
        ) {
          index = i
        }

        normalized.push({
          ...(title ? { title } : {}),
          w: Number(width),
          h: Number(height),
          src: original,
          msrc: thumbnail,
          el: ref.current,
          ...(pid !== undefined ? { pid } : {}),
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
        const instance = new PhotoSwipe(layoutEl, ui, normalized, {
          index: index === null ? parseInt(targetId, 10) - 1 : index,
          getThumbBoundsFn: (thumbIndex) => {
            const { el } = normalized[thumbIndex]
            return el ? getElBounds(el) : { x: 0, y: 0, w: 0 }
          },
          history: false,
          ...(galleryUID !== undefined
            ? { galleryUID: galleryUID as number, history: true }
            : {}),
          ...(options || {}),
        })

        instance.init()

        if (onOpen !== undefined && typeof onOpen === 'function') {
          onOpen(instance)
        }
      }
    },
    [],
  )

  useEffect(() => {
    if (galleryUID === undefined) {
      return
    }

    const hash = window.location.hash.substring(1)
    const params: { [key: string]: string } = {}

    if (hash.length < 5) {
      return
    }

    const vars = hash.split('&')

    for (let i = 0; i < vars.length; i++) {
      if (vars[i]) {
        const [key, value] = vars[i].split('=')
        if (key && value) {
          params[key] = value
        }
      }
    }

    const { pid, gid } = params

    if (pid && gid === String(galleryUID)) {
      open(null, pid)
    }
  }, [])

  const remove = useCallback((ref) => {
    items.current.delete(ref)
  }, [])

  const set = useCallback((ref, data) => {
    items.current.set(ref, data)
  }, [])

  const openAt = useCallback((index: number) => {
    open(null, null, index)
  }, [])

  return (
    <Context.Provider value={{ remove, set, handleClick: open, open: openAt }}>
      {children}
    </Context.Provider>
  )
}

CustomGallery.propTypes = {
  ...baseGalleryPropTypes,
  // @ts-ignore
  layoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? class Element {} : Element,
    ),
  }).isRequired,
  ui: PropTypes.any.isRequired,
}
