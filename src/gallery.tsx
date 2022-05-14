import PhotoSwipe from 'photoswipe'
import type { SlideData, PhotoSwipeOptions, UIElementData } from 'photoswipe'
import React, {
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  FC,
  ReactNode,
  ReactPortal,
} from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import sortNodes from './helpers/sort-nodes'
import objectToHash from './helpers/object-to-hash'
import hashToObject from './helpers/hash-to-object'
import getHashWithoutGidAndPid from './helpers/get-hash-without-gid-and-pid'
import getHashValue from './helpers/get-hash-value'
import getBaseUrl from './helpers/get-base-url'
import { Context } from './context'
import { ItemRef, InternalItem, InternalAPI } from './types'
import PhotoSwipeLightboxStub from './lightbox-stub'

/**
 * This variable stores the PhotoSwipe instance object
 * It aims to check whether does the PhotoSwipe opened at the moment
 * (analog of window.pswp in 'photoswipe/lightbox')
 */
let pswp: PhotoSwipe | null = null

export interface GalleryProps {
  children?: ReactNode

  /**
   * PhotoSwipe options
   *
   * https://photoswipe.com/options/
   */
  options?: PhotoSwipeOptions

  /**
   * Function for registering PhotoSwipe plugins
   *
   * You should pass `photoswipeLightbox` to each plugin constructor
   */
  plugins?: (photoswipeLightbox: PhotoSwipeLightboxStub) => void

  /**
   * Array of configuration objects for custom UI elements
   *
   * Use it for adding custom UI elements
   *
   * https://photoswipe.com/adding-ui-elements
   */
  uiElements?: UIElementData[]

  /**
   * Gallery ID, for hash navigation
   */
  id?: string | number

  /**
   * Triggers before PhotoSwipe.init() call
   *
   * Use it for accessing PhotoSwipe API
   *
   * https://photoswipe.com/events/
   * https://photoswipe.com/filters/
   * https://photoswipe.com/methods/
   */
  onBeforeOpen?: (photoswipe: PhotoSwipe) => void

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
   * Enables built-in caption display
   *
   * Use the `caption` prop of the Item component to control caption text
   *
   * https://photoswipe.com/caption/
   */
  withCaption?: boolean

  /**
   * Adds UI control for downloading the original image of the current slide
   *
   * https://photoswipe.com/adding-ui-elements/#adding-download-button
   */
  withDownloadButton?: boolean
}

/**
 * Gallery component providing photoswipe context
 */
export const Gallery: FC<GalleryProps> = ({
  children,
  options,
  plugins,
  uiElements,
  id: galleryUID,
  onBeforeOpen,
  onOpen,
  withCaption,
  withDownloadButton,
}) => {
  const [contentPortal, setContentPortal] = useState<ReactPortal | null>(null)

  const items = useRef(new Map<ItemRef, InternalItem>())

  /**
   * Store PID from hash if there are no items yet,
   * but we need to open photoswipe if items appear in the next render
   */
  const openWhenReadyPid = useRef(null)

  const open = useCallback<InternalAPI['handleClick']>(
    (targetRef, targetId, itemIndex, e) => {
      // only one photoswipe instance could be opened at once
      // so if photoswipe is already open, function should do nothing
      if (pswp) {
        return
      }

      let index: number | null = itemIndex || null

      const normalized: SlideData[] = []

      const entries = Array.from(items.current)

      const prepare = (entry: [ItemRef, InternalItem], i: number) => {
        const [
          ref,
          {
            width,
            height,
            original,
            originalSrcset,
            thumbnail,
            cropped,
            content,
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
          content,
          ...(content !== undefined ? { type: 'html' } : {}),
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

      instance.on('contentActivate', ({ content: slideContent }) => {
        if (slideContent.data.content) {
          setContentPortal(
            createPortal(slideContent.data.content, slideContent.element),
          )
        } else {
          setContentPortal(null)
        }
      })

      instance.on('close', () => {
        setContentPortal(null)
      })

      if (withDownloadButton) {
        instance.on('uiRegister', () => {
          instance.ui.registerElement({
            name: 'download-button',
            ariaLabel: 'Download',
            order: 8,
            isButton: true,
            tagName: 'a',
            appendTo: 'bar',
            html: {
              isCustomSVG: true,
              inner:
                '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
              outlineID: 'pswp__icn-download',
            },
            // can't test onInit callback correctly
            onInit: /* istanbul ignore next */ (el, pswpInstance) => {
              el.setAttribute('download', '')
              el.setAttribute('target', '_blank')
              el.setAttribute('rel', 'noopener')

              instance.on('change', () => {
                const downloadButton = el as HTMLAnchorElement
                downloadButton.href = pswpInstance.currSlide.data.src
              })
            },
          })
        })
      }

      if (withCaption) {
        instance.on('uiRegister', () => {
          instance.ui.registerElement({
            name: 'default-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            // can't test onInit callback correctly
            onInit: /* istanbul ignore next */ (el, pswpInstance) => {
              /* eslint-disable no-param-reassign */
              el.style.position = 'absolute'
              el.style.bottom = '15px'
              el.style.left = '0'
              el.style.right = '0'
              el.style.padding = '0 20px'
              el.style.color = 'var(--pswp-icon-color)'
              el.style.textAlign = 'center'
              el.style.fontSize = '14px'
              el.style.lineHeight = '1.5'
              el.style.textShadow =
                '1px 1px 3px var(--pswp-icon-color-secondary)'
              /* eslint-enable no-param-reassign */

              instance.on('change', () => {
                const { caption, alt } = pswpInstance.currSlide.data

                // eslint-disable-next-line no-param-reassign
                el.innerHTML = caption || alt || ''
              })
            },
          })
        })
      }

      if (Array.isArray(uiElements)) {
        uiElements.forEach((uiElement) => {
          instance.on('uiRegister', () => {
            instance.ui.registerElement(uiElement)
          })
        })
      }

      if (typeof plugins === 'function') {
        plugins(new PhotoSwipeLightboxStub(instance))
      }

      if (typeof onBeforeOpen === 'function') {
        onBeforeOpen(instance)
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

      if (typeof onOpen === 'function') {
        onOpen(instance)
      }
    },
    [
      options,
      plugins,
      uiElements,
      galleryUID,
      onBeforeOpen,
      onOpen,
      withCaption,
      withDownloadButton,
    ],
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
      // no items currently, save PID from hash for future use
      openWhenReadyPid.current = pid
      return
    }

    if (pid && gid === String(galleryUID)) {
      open(null, pid)
    }
  }, [open, galleryUID])

  const remove = useCallback((ref: ItemRef) => {
    items.current.delete(ref)
  }, [])

  const set = useCallback(
    (ref: ItemRef, data: InternalItem) => {
      const { id } = data
      items.current.set(ref, data)

      if (openWhenReadyPid.current === null) {
        return
      }

      if (id === openWhenReadyPid.current) {
        // user provided `id` prop of Item component
        open(ref)
        openWhenReadyPid.current = null
        return
      }

      if (!id) {
        // in this case we using index of item as PID
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

  return (
    <Context.Provider value={contextValue}>
      {children}
      {contentPortal}
    </Context.Provider>
  )
}

Gallery.propTypes = {
  children: PropTypes.any,
  options: PropTypes.object,
  plugins: PropTypes.func,
  uiElements: PropTypes.array,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  withCaption: PropTypes.bool,
  withDownloadButton: PropTypes.bool,
}
