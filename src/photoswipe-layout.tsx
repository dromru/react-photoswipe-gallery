import React from 'react'
import PropTypes from 'prop-types'

export const layoutPropTypes = {
  closeButtonCaption: PropTypes.string,
  shareButtonCaption: PropTypes.string,
  toggleFullscreenButtonCaption: PropTypes.string,
  zoomButtonCaption: PropTypes.string,
  prevButtonCaption: PropTypes.string,
  nextButtonCaption: PropTypes.string,
  shareButton: PropTypes.bool,
  fullscreenButton: PropTypes.bool,
  zoomButton: PropTypes.bool,
}

export const layoutDefaultProps = {
  closeButtonCaption: 'Close (Esc)',
  shareButtonCaption: 'Share',
  toggleFullscreenButtonCaption: 'Toggle fullscreen',
  zoomButtonCaption: 'Zoom in/out',
  prevButtonCaption: 'Previous (arrow left)',
  nextButtonCaption: 'Next (arrow right)',
  shareButton: true,
  fullscreenButton: true,
  zoomButton: true,
}

export type LayoutProps = {
  /**
   * `.pswp__button--close` caption
   *
   * Default: 'Close (Esc)'
   */
  closeButtonCaption?: string

  /**
   * `.pswp__button--share` caption
   *
   * Default: 'Share'
   */
  shareButtonCaption?: string

  /**
   * .pswp__button--fs caption
   *
   * Default: 'Toggle fullscreen'
   */
  toggleFullscreenButtonCaption?: string

  /**
   * .pswp__button--zoom caption
   *
   * Default: 'Zoom in/out'
   */
  zoomButtonCaption?: string

  /**
   * .pswp__button--arrow--left caption
   *
   * Default: 'Previous (arrow left)'
   */
  prevButtonCaption?: string

  /**
   * .pswp__button--arrow--right caption
   *
   * Default: 'Next (arrow right)'
   */
  nextButtonCaption?: string

  /**
   * Show .pswp__button--share
   *
   * Default: true
   */
  shareButton?: boolean

  /**
   * Show .pswp__button--fs
   *
   * Default: true
   */
  fullscreenButton?: boolean

  /**
   * Show .pswp__button--zoom
   *
   * Default: true
   */
  zoomButton?: boolean
}

/**
 * Default PhotoSwipe layout
 */
export const DefaultLayout = React.forwardRef<HTMLElement, LayoutProps>(
  (
    {
      closeButtonCaption,
      shareButtonCaption,
      toggleFullscreenButtonCaption,
      zoomButtonCaption,
      prevButtonCaption,
      nextButtonCaption,
      shareButton,
      fullscreenButton,
      zoomButton,
      ...rest
    },
    ref,
  ) => (
    <div
      className="pswp"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      {...rest}
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      <div className="pswp__bg" />
      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item" />
          <div className="pswp__item" />
          <div className="pswp__item" />
        </div>
        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter" />
            <button
              type="button"
              className="pswp__button pswp__button--close"
              title={closeButtonCaption}
            />
            {shareButton && (
              <button
                type="button"
                className="pswp__button pswp__button--share"
                title={shareButtonCaption}
              />
            )}
            {fullscreenButton && (
              <button
                type="button"
                className="pswp__button pswp__button--fs"
                title={toggleFullscreenButtonCaption}
              />
            )}
            {zoomButton && (
              <button
                type="button"
                className="pswp__button pswp__button--zoom"
                title={zoomButtonCaption}
              />
            )}
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut" />
                </div>
              </div>
            </div>
          </div>
          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip" />
          </div>
          <button
            type="button"
            className="pswp__button pswp__button--arrow--left"
            title={prevButtonCaption}
          />
          <button
            type="button"
            className="pswp__button pswp__button--arrow--right"
            title={nextButtonCaption}
          />
          <div className="pswp__caption">
            <div className="pswp__caption__center" />
          </div>
        </div>
      </div>
    </div>
  ),
)

DefaultLayout.propTypes = layoutPropTypes

DefaultLayout.defaultProps = layoutDefaultProps
