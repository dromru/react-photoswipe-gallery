/* eslint-disable max-classes-per-file */
/* eslint max-classes-per-file: ["error", 4] */

/**
 * Temporary type definitions for PhotoSwipe v5
 *
 * https://github.com/dimsemenov/PhotoSwipe/issues/1888
 */

declare module 'photoswipe' {
  export type PhotoSwipeEvent = any
  export type PhotoSwipeEventDetails = Record<string, any>
  type ItemData = Record<string, any>
  type ZoomLevel = 'fit' | 'fill' | number | ((zoomLevelObject: any) => any)
  type Point = {
    x: number
    y: number
  }

  export interface PhotoSwipeItem {
    element?: HTMLElement
    src?: string
    srcset?: string
    w?: number
    h?: number
    msrc?: string
    alt?: string
    thumbCropped?: boolean
    html?: string
    type?: 'image' | 'html'
    [key: string]: any
  }

  interface PhotoSwipeSlideData extends PhotoSwipeItem {
    pid?: string | number
  }

  interface PhotoSwipeSlide {
    data: PhotoSwipeSlideData

    /**
     * zoom slide to
     * @param level slide zoom level, 1 - original image size
     * @param zoomPointPos zoom center point
     * @param transitionDuration transition duration, can be 0
     * @param ignoreBounds wether pan/zoom bounds should be ignored
     */
    zoomTo(
      level: number,
      zoomPointPos: { x: number; y: number },
      transitionDuration: number,
      ignoreBounds: boolean,
    ): void

    /**
     * pan slide to
     * @param x x position
     * @param y y position
     */
    panTo(x: number, y: number): void
  }

  export interface PhotoSwipeOptions {
    allowPanToNext?: boolean
    spacing?: number
    loop?: boolean
    pinchToClose?: boolean
    closeOnVerticalDrag?: boolean
    hideAnimationDuration?: number
    showAnimationDuration?: number
    zoomAnimationDuration?: number
    escKey?: boolean
    arrowKeys?: boolean
    returnFocus?: boolean
    clickToCloseNonZoomable?: boolean
    imageClickAction?: string
    bgClickAction?: string
    tapAction?: string
    doubleTapAction?: string
    indexIndicatorSep?: string
    panPaddingRatio?: number
    bgOpacity?: number
    index?: number
    errorMsg?: string
    preload?: [number, number]
    easing?: string
    paddingTop?: number
    paddingBottom?: number
    paddingLeft?: number
    paddingRight?: number
    gallerySelector?: string
    childSelector?: string
    getClickedIndexFn?: (pswp: PhotoSwipeLightbox, e: Event) => number
    dataSource: PhotoSwipeItem[]
    arrowPrevSVG?: string
    arrowNextSVG?: string
    mainClass?: string
    closeTitle?: string
    zoomTitle?: string
    arrowPrevTitle?: string
    arrowNextTitle?: string
    arrowPrev?: boolean
    arrowNext?: boolean
    zoom?: boolean
    close?: boolean
    counter?: boolean
    initialZoomLevel?: ZoomLevel
    secondaryZoomLevel?: ZoomLevel
    maxZoomLevel?: ZoomLevel
    mouseMovePan?: boolean
    openPromise?: Promise<any>
    appendToEl?: HTMLElement
    initialPointerPos?: Point | null
  }

  /**
   * PhotoSwipe base class that can listen and dispatch for events.
   * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js
   */
  class Eventable {
    constructor(): Eventable

    on(name: string, fn: Function): void

    off(name: string, fn: Function): void

    dispatch(name: string, details: PhotoSwipeEventDetails): PhotoSwipeEvent
  }

  /**
   * PhotoSwipe base class that can retrieve data about every slide.
   * Shared by PhotoSwipe Core and PhotoSwipe Lightbox
   */
  class PhotoSwipeBase extends Eventable {
    /**
     * Get total number of slides
     */
    getNumItems(): number

    /**
     * Get item data by index.
     *
     * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
     * For example, it may contain properties like
     * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
     */
    getItemData(index: number): ItemData
  }

  /**
   * PhotoSwipe UI element's data.
   * https://photoswipe.com/adding-ui-elements/#uiregisterelement-api
   */
  interface UIElementData {
    /**
     * Unique name of the UI element.
     */
    name: string
    /**
     * Classname of the element.
     * Optional, if not defined - name will be used
     * in format pswp__button--name, or pswp__name.
     */
    className?: string
    /**
     * Order of element, default order elements:
     * counter - 5, zoom button - 10, info - 15, close - 20.
     */
    order: number
    /**
     * If element should be rendered as button.
     */
    isButton?: boolean
    /**
     * Element tag name.
     * Optional, if not defined - button or div will be used.
     */
    tagName?: string
    /**
     * Button title, optional.
     */
    title?: string
    /**
     * Button aria-label attribute, if not defined - title will be used.
     */
    ariaLabel?: string
    /**
     * Html string, will be added inside button, optional.
     * Can also be an object with svg data.
     */
    html?:
      | string
      | {
          isCustomSVG: boolean
          inner: string
          outlineID: string
        }
    /**
     * Element container, possible values:
     * - 'bar'  (top toolbar, .pswp__top-bar, default value);
     * - 'wrapper' (scroll viewport wrapper, .pswp__scroll-wrap);
     * - 'root' (root element of the dialog, .pswp).
     * If you add a text inside 'wrapper' - it won't be selectable,
     * as PhotoSwipe intersects all touch events there.
     */
    appendTo: 'root' | 'wrapper' | 'bar'
    /**
     * Callback is triggered right before corresponding element is added to DOM while dialog is opening/creating).
     */
    onInit?: (el: HTMLElement, pswp: PhotoSwipe) => void
    /**
     * Callback on user click / tap on element.
     */
    onClick?: (event: MouseEvent, el: HTMLElement, pswp: PhotoSwipe) => void
  }

  class UI {
    constructor(pswp: PhotoSwipe): UI

    init(): void

    registerElement(elementData: UIElementData): void

    // eslint-disable-next-line no-underscore-dangle
    _onZoomPanUpdate(): void
  }

  export class PhotoSwipeLightbox extends PhotoSwipeBase {
    constructor(options: PhotoSwipeOptions): PhotoSwipeLightbox

    init(): void

    onThumbnailsClick(e: MouseEvent): void

    /**
     * Get index of gallery item that was clicked.
     */
    getClickedIndex(e: MouseEvent): number

    /**
     * Load and open PhotoSwipe
     */
    loadAndOpen(
      index: number,
      dataSource: PhotoSwipeItem | PhotoSwipeItem[] | null,
      initialPoint: Point,
    ): boolean

    /**
     * Load the main module and the slide content by index
     */
    preload(
      index: number,
      dataSource: PhotoSwipeItem | PhotoSwipeItem[] | null,
    ): void

    destroy(): void
  }

  // eslint-disable-next-line no-shadow
  enum LOAD_STATE {
    IDLE = 'idle',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
  }

  class PhotoSwipeContent {
    instance: PhotoSwipeCore

    data: PhotoSwipeSlideData

    index: number

    width: number

    height: number

    isAttached: boolean

    hasSlide: boolean

    state: LOAD_STATE

    element?: HTMLDivElement
  }

  type EventDefaultPreventable = {
    defaultPrevented: boolean
  } | void

  /**
   * https://photoswipe.com/adding-ui-elements/
   */
  type UIEvents = {
    uiRegister: () => void
    uiElementCreate: (event: { data: UIElementData }) => void
  }

  /**
   * https://photoswipe.com/events/#initialization-events
   */
  type InitializationEvents = {
    beforeOpen: () => void
    firstUpdate: () => void
    initialLayout: () => void
    change: () => void
    afterInit: () => void
    bindEvents: () => void
  }

  /**
   * https://photoswipe.com/events/#opening-or-closing-transition-events
   */
  type OpeningOrClosingTransitionEvents = {
    openingAnimationStart: () => void
    openingAnimationEnd: () => void
    closingAnimationStart: () => void
    closingAnimationEnd: () => void
  }

  /**
   * https://photoswipe.com/events/#closing-events
   */
  type ClosingEvents = {
    close: () => void
    destroy: () => void
  }

  /**
   * https://photoswipe.com/events/#pointer-and-gesture-events
   */
  type PointerAndGestureEvents = {
    pointerDown: (event: { originalEvent: PointerEvent }) => void
    pointerMove: (event: { originalEvent: PointerEvent }) => void
    pointerUp: (event: { originalEvent: PointerEvent }) => void
    pinchClose: (event: { bgOpacity: number }) => EventDefaultPreventable
    verticalDrag: (event: { panY: number }) => EventDefaultPreventable
  }

  /**
   * https://photoswipe.com/events/#slide-content-events
   */
  type SlideContentEvents = {
    contentInit: (event: { content: PhotoSwipeContent }) => void
    contentLoad: (event: {
      content: PhotoSwipeContent
      isLazy: boolean
    }) => EventDefaultPreventable
    contentLoadImage: (event: {
      content: PhotoSwipeContent
      isLazy: boolean
    }) => EventDefaultPreventable
    loadComplete: (event: {
      content: PhotoSwipeContent
      slide: PhotoSwipeSlide
    }) => void
    contentResize: (event: {
      content: PhotoSwipeContent
      width: number
      height: number
    }) => EventDefaultPreventable
    imageSizeChange: (event: {
      content: PhotoSwipeContent
      width: number
      height: number
      slide: PhotoSwipeSlide
    }) => void
    contentLazyLoad: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
    contentAppend: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
    contentActivate: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
    contentDeactivate: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
    contentRemove: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
    contentDestroy: (event: {
      content: PhotoSwipeContent
    }) => EventDefaultPreventable
  }

  type PhotoSwipeEventsMap = UIEvents &
    InitializationEvents &
    OpeningOrClosingTransitionEvents &
    ClosingEvents &
    PointerAndGestureEvents &
    SlideContentEvents

  type PhotoSwipeEvents = keyof PhotoSwipeEventsMap

  export default class PhotoSwipeCore extends PhotoSwipeBase {
    currIndex: number

    currSlide: PhotoSwipeSlide

    ui: UI

    constructor(options: PhotoSwipeOptions): PhotoSwipe

    on<K extends PhotoSwipeEvents>(
      name: K,
      handler: PhotoSwipeEventsMap[K],
    ): void

    off<K extends PhotoSwipeEvents>(name: K): void

    /**
     * go to slide by index
     */
    goTo(slideIndex: number): void

    /**
     * go to next slide
     */
    next(): void

    /**
     * go to previous slide
     */
    prev(): void

    /**
     * close the PhotoSwipe (with animation, if enabled)
     * PhotoSwipe will automatically destroy after it's closed
     */
    close(): void

    init(): boolean
  }
}
