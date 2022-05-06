/**
 * The purpose of this class is to emulate the behavior of the PhotoSwipeLightbox
 * to provide the ability to use plugins
 */

import type PhotoSwipeCore from 'photoswipe'

export default class PhotoSwipeLightboxStub {
  pswp: PhotoSwipeCore

  on: PhotoSwipeCore['on']

  off: PhotoSwipeCore['off']

  dispatch: PhotoSwipeCore['dispatch']

  constructor(pswp: PhotoSwipeCore) {
    this.pswp = pswp
    this.on = pswp.on.bind(pswp)
    this.off = pswp.off.bind(pswp)
    this.dispatch = pswp.dispatch.bind(pswp)
  }
}
