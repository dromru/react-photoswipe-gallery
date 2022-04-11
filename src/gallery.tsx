import PhotoSwipe from 'photoswipe'
import type { PhotoSwipeItem, PhotoSwipeOptions } from 'photoswipe'
import React, { useRef, useCallback, useEffect, useMemo, FC } from 'react'
import PropTypes from 'prop-types'
import sortNodes from './helpers/sort-nodes'
import objectToHash from './helpers/object-to-hash'
import hashToObject from './helpers/hash-to-object'
import getHashWithoutGidAndPid from './helpers/get-hash-without-gid-and-pid'
import getHashValue from './helpers/get-hash-value'
import getBaseUrl from './helpers/get-base-url'
import { Context } from './context'
import { ItemRef, InternalItem, InternalAPI } from './types'

// variable stores photoswipe instance
// it's aim is to check is photoswipe instance opened (exists)
// analog of window.pswp in 'photoswipe/lightbox'
let pswp: PhotoSwipe | null = null

export interface GalleryProps {
  /**
   * PhotoSwipe options
   *
   * https://photoswipe.com/options/
   */
  options?: PhotoSwipeOptions

  /**
   * Gallery ID, for hash navigation
   */
  id?: string | number

  /**
   * Triggers after PhotoSwipe.init() call
   *
   * Use it for accessing PhotoSwipe API
   *
   * https://photoswipe.com/events/
   * https://photoswipe.com/filters/
   * https://photoswipe.com/methods/
   */
  onOpen?: (photoswipe: PhotoSwipe) => void

  /**
   * Enables showing of default styled caption -
   * slide description provided via "title" prop of Item component
   *
   * https://photoswipe.com/caption/
   */
  withDefaultCaption?: boolean
}

/**
 * Gallery component with ability to use specific UI and Layout
 */
export const Gallery: FC<GalleryProps> = ({
  children,
  options,
  id: galleryUID,
  onOpen,
  withDefaultCaption,
}) => {
  const items = useRef(new Map<ItemRef, InternalItem>())
  const openWhenReadyPid = useRef(null)

  const open = useCallback<InternalAPI['handleClick']>(
    (targetRef, targetId, itemIndex, e) => {
      // only one photoswipe instance could be opened at once
      // so if photoswipe is already open, function should do nothing
      if (pswp) {
        return
      }

      let index: number | null = itemIndex || null

      const normalized: PhotoSwipeItem[] = []

      const entries = Array.from(items.current)

      const prepare = (entry: [ItemRef, InternalItem], i: number) => {
        const [
          ref,
          {
            width,
            height,
            title,
            original,
            originalSrcset,
            thumbnail,
            cropped,
            id: pid,
            ...rest
          },
        ] = entry
        if (
          targetRef === ref ||
          (pid !== undefined && String(pid) === targetId)
        ) {
          index = i
        }

        normalized.push({
          w: Number(width),
          h: Number(height),
          src: original,
          srcset: originalSrcset,
          msrc: thumbnail,
          element: ref.current,
          thumbCropped: cropped,
          ...(pid !== undefined ? { pid } : {}),
          ...(title ? { title } : {}),
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

      const initialPoint =
        e && e.clientX !== undefined && e.clientY !== undefined
          ? { x: e.clientX, y: e.clientY }
          : null

      const instance = new PhotoSwipe({
        dataSource: normalized,
        index: index === null ? parseInt(targetId, 10) - 1 : index,
        initialPointerPos: initialPoint,
        ...(options || {}),
      })

      pswp = instance

      if (withDefaultCaption) {
        instance.on('uiRegister', () => {
          instance.ui.registerElement({
            name: 'default-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            onInit: (el, pswpInstance) => {
              // eslint-disable-next-line no-param-reassign
              el.style.position = 'absolute'
              // eslint-disable-next-line no-param-reassign
              el.style.bottom = '15px'
              // eslint-disable-next-line no-param-reassign
              el.style.left = '0'
              // eslint-disable-next-line no-param-reassign
              el.style.right = '0'
              // eslint-disable-next-line no-param-reassign
              el.style.padding = '0 20px'
              // eslint-disable-next-line no-param-reassign
              el.style.color = 'var(--pswp-icon-color)'
              // eslint-disable-next-line no-param-reassign
              el.style.textAlign = 'center'
              // eslint-disable-next-line no-param-reassign
              el.style.fontSize = '14px'
              // eslint-disable-next-line no-param-reassign
              el.style.lineHeight = '1.5'
              // eslint-disable-next-line no-param-reassign
              el.style.textShadow =
                '1px 1px 3px var(--pswp-icon-color-secondary)'

              instance.on('change', () => {
                const { title } = pswpInstance.currSlide.data

                // eslint-disable-next-line no-param-reassign
                el.innerHTML = title || ''
              })
            },
          })
        })
      }

      instance.on('change', () => {
        if (galleryUID === undefined) {
          return
        }

        const pid = instance.currSlide.data.pid || instance.currIndex + 1
        const baseUrl = getBaseUrl()
        const baseHash = getHashWithoutGidAndPid(getHashValue())
        const gidAndPidHash = objectToHash({ gid: galleryUID, pid })
        const urlWithOpenedSlide = `${baseUrl}#${baseHash}&${gidAndPidHash}`
        window.history.pushState({}, document.title, urlWithOpenedSlide)
      })

      instance.on('destroy', () => {
        if (galleryUID !== undefined) {
          const baseUrl = getBaseUrl()
          const hash = getHashWithoutGidAndPid(getHashValue())
          const urlWithoutOpenedSlide = `${baseUrl}${hash ? `#${hash}` : ''}`
          window.history.pushState({}, document.title, urlWithoutOpenedSlide)
        }

        pswp = null
      })

      instance.init()

      if (onOpen !== undefined && typeof onOpen === 'function') {
        onOpen(instance)
      }
    },
    [options, galleryUID, onOpen, withDefaultCaption],
  )

  useEffect(() => {
    return () => {
      if (pswp) {
        pswp.close()
      }
    }
  }, [])

  useEffect(() => {
    if (galleryUID === undefined) {
      return
    }

    const hash = getHashValue()

    if (hash.length < 5) {
      return
    }

    const params = hashToObject(hash)

    const { pid, gid } = params

    if (!pid || !gid) {
      return
    }

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

  const contextValue = useMemo(
    () => ({ remove, set, handleClick: open, open: openAt }),
    [remove, set, open, openAt],
  )

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

Gallery.propTypes = {
  // @ts-expect-error
  children: PropTypes.any,
  options: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onOpen: PropTypes.func,
  withDefaultCaption: PropTypes.bool,
}
