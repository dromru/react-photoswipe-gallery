/* eslint max-classes-per-file: ["error", 4] */

declare module 'photoswipe' {
  type PhotoSwipeEvent = any
  type PhotoSwipeEventDetails = Record<string, any>
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
    title?: string
    thumbCropped?: boolean
  }

  interface PhotoSwipeSlideData extends PhotoSwipeItem {
    pid?: string | number
  }

  // Actually, PhotoSwipeSlide has much more properties, than single 'data' prop
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
   * @link https://photoswipe.com/adding-ui-elements/#uiregisterelement-api
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
    isButton: boolean
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
    onClick?: (event: MouseEvent, el: HTMLElement) => void
  }

  class UI {
    constructor(pswp: PhotoSwipe): UI

    init(): void

    registerElement(elementData: UIElementData): void

    // eslint-disable-next-line no-underscore-dangle
    _onZoomPanUpdate(): void
  }

  export default class PhotoSwipe extends PhotoSwipeBase {
    currIndex: number

    currSlide: PhotoSwipeSlide

    ui: UI

    constructor(options: PhotoSwipeOptions): PhotoSwipe

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
