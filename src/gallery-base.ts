import PropTypes from 'prop-types'
import type { Options as PhotoswipeUiDefaultOptions } from 'photoswipe/dist/photoswipe-ui-default'
import type PhotoSwipe from 'photoswipe'

export const baseGalleryPropTypes = {
  children: PropTypes.any,
  options: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export interface BaseGalleryProps {
  /**
   * PhotoSwipe options
   *
   * https://photoswipe.com/documentation/options.html
   */
  options?: PhotoSwipe.Options & PhotoswipeUiDefaultOptions

  /**
   * Gallery ID, for hash navigation
   */
  id?: string | number

  /**
   * Triggers after PhotoSwipe.init() call
   *
   * Use it for accessing PhotoSwipe API
   *
   * https://photoswipe.com/documentation/api.html
   */
  onOpen?: (photoswipe: PhotoSwipe<PhotoSwipe.Options>) => void
}
