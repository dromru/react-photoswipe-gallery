import React from 'react'

export default React.forwardRef((props, ref) => (
  <div
    className="pswp"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
    {...props}
    ref={ref}
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
            title="Close (Esc)"
          />
          <button
            type="button"
            className="pswp__button pswp__button--share"
            title="Share"
          />
          <button
            type="button"
            className="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          />
          <button
            type="button"
            className="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          />
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
          title="Previous (arrow left)"
        />
        <button
          type="button"
          className="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        />
        <div className="pswp__caption">
          <div className="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
))
