import { MouseEvent, MutableRefObject, ReactNode } from 'react'
import type PhotoSwipe from 'photoswipe'
import type { PhotoSwipeOptions, UIElementData } from 'photoswipe'
import PhotoSwipeLightboxStub from './lightbox-stub'

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

export interface InternalItem {
  /**
   * Url of original image
   */
  original?: string

  /**
   * Srcset of original image
   */
  originalSrcset?: string

  /**
   * Url of thumbnail
   */
  thumbnail?: string

  /**
   * Width of original image
   */
  width?: string | number

  /**
   * Height of original image
   */
  height?: string | number

  /**
   * Alternate text for original image
   */
  alt?: string

  /**
   * Text for caption
   */
  caption?: string

  /**
   * Custom slide content
   */
  content?: JSX.Element

  /**
   * Custom slide content (raw html)
   *
   * TODO: deprecate, use `content` instead
   */
  html?: string

  /**
   * Item ID, for hash navigation
   */
  id?: string | number

  /**
   * Thumbnail is cropped
   */
  cropped?: boolean
}

export interface ChildrenFnProps<NodeType extends HTMLElement> {
  /**
   * Required `ref` callback to any html node of item
   */
  ref: (node: NodeType | null) => void

  /**
   * Function that opens the gallery at the current item
   */
  open: (e: MouseEvent) => void
}

export interface ItemProps<NodeType extends HTMLElement> extends InternalItem {
  children: (props: ChildrenFnProps<NodeType>) => JSX.Element
}

/**
 * At Gallery level we can freely assume that ref is HTMLElement since we don't use any of html attributes.
 * At Item level we can either set ref type like <Item<HTMLImageElement>> to ensure typing or simply omit it since
 * elements like HTMLImageElement extends HTMLElement.
 */
export type ItemRef<NodeType extends HTMLElement = HTMLElement> =
  MutableRefObject<NodeType | null>

export type EnsuredItemRef<NodeType extends HTMLElement = HTMLElement> =
  MutableRefObject<NodeType>

export interface InternalAPI {
  remove: (ref: ItemRef) => void
  set: (ref: ItemRef, data: InternalItem) => void
  handleClick: (
    ref?: ItemRef | null,
    targetId?: string | null,
    itemIndex?: number | null,
    e?: MouseEvent | null,
  ) => void
  open: (i: number) => void
  isRefRegistered: (ref: ItemRef) => boolean
}
