declare module 'photoswipe/dist/photoswipe.esm.js' {
  type PhotoSwipeEvent = any
  type PhotoSwipeEventDetails = Record<string, any>
  type ItemData = Record<string, any>
  type ZoomLevel = 'fit' | 'fill' | number | ((zoomLevelObject: any) => any)

  export interface PhotoSwipeItem {
    element?: HTMLElement
    src?: string
    srcset?: string
    w?: number
    h?: number
    msrc?: string
    alt?: string
    thumbCropped?: boolean
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
  }

  /**
   * PhotoSwipe base class that can listen and dispatch for events.
   * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js
   */
  interface Eventable {
    new (): Eventable
    on(name: string, fn: Function): void
    off(name: string, fn: Function): void
    dispatch(name: string, details: PhotoSwipeEventDetails): PhotoSwipeEvent
  }

  /**
   * PhotoSwipe base class that can retrieve data about every slide.
   * Shared by PhotoSwipe Core and PhotoSwipe Lightbox
   */
  interface PhotoSwipeBase extends Eventable {
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

  export default class PhotoSwipe extends PhotoSwipeBase {
    constructor(items: PhotoSwipeItem[], options: PhotoSwipeOptions): PhotoSwipe

    applyZoomPan(a: number, b: number, c: number): boolean

    init(): boolean
  }
}
