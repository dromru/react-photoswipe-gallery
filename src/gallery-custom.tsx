import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js'
import type { PhotoSwipeItem } from 'photoswipe/dist/photoswipe.esm.js'
import React, { useRef, useCallback, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { sortNodes } from './helpers'
import { Context } from './context'
import { ItemRef, InternalItem } from './types'
import { baseGalleryPropTypes, BaseGalleryProps } from './gallery-base'

export interface CustomGalleryProps extends BaseGalleryProps {
  /**
   * TODO
   *
   * Ref to your layout element
   */
  // layoutRef: React.MutableRefObject<HTMLElement>
}

/**
 * Gallery component with ability to use specific UI and Layout
 */
export const CustomGallery: FC<CustomGalleryProps> = ({
  children,
  // layoutRef,
  options,
  id: galleryUID,
  onOpen,
}) => {
  const items = useRef(new Map<ItemRef, InternalItem>())
  const openWhenReadyPid = useRef(null)

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
          // TODO
          // ...(title ? { title } : {}),
          w: Number(width),
          h: Number(height),
          src: original,
          msrc: thumbnail,
          element: ref.current,
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

      // TODO
      // const layoutEl = layoutRef.current
      // if (layoutEl) {
      const instance = new PhotoSwipe(null, {
        dataSource: normalized,
        index: index === null ? parseInt(targetId, 10) - 1 : index,
        // TODO
        // history: false,
        // ...(galleryUID !== undefined
        //   ? { galleryUID: galleryUID as number, history: true }
        //   : {}),
        ...(options || {}),
      })

      instance.init()

      if (onOpen !== undefined && typeof onOpen === 'function') {
        onOpen(instance)
      }
      // }
    },
    [options, galleryUID, onOpen],
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

    if (items.current.size === 0) {
      openWhenReadyPid.current = pid
      return
    }

    if (pid && gid === String(galleryUID)) {
      open(null, pid)
    }
  }, [open, galleryUID])

  const remove = useCallback((ref) => {
    items.current.delete(ref)
  }, [])

  const set = useCallback(
    (ref, data: InternalItem) => {
      const { id } = data
      items.current.set(ref, data)

      if (!openWhenReadyPid.current) return

      if (id === openWhenReadyPid.current) {
        open(ref)
        openWhenReadyPid.current = null
      } else if (!id) {
        const index = parseInt(openWhenReadyPid.current, 10) - 1
        const refToOpen = Array.from(items.current.keys())[index]
        if (refToOpen) {
          open(refToOpen)
          openWhenReadyPid.current = null
        }
      }
    },
    [open],
  )

  const openAt = useCallback(
    (index: number) => {
      open(null, null, index)
    },
    [open],
  )

  return (
    <Context.Provider value={{ remove, set, handleClick: open, open: openAt }}>
      {children}
    </Context.Provider>
  )
}

// TODO
CustomGallery.propTypes = {
  ...baseGalleryPropTypes,
  // layoutRef: PropTypes.shape({
  //   current: PropTypes.instanceOf(
  //     typeof Element === 'undefined' ? class Element {} : Element,
  //   ),
  // }).isRequired,
}
