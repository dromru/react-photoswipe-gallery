import PropTypes from 'prop-types'
import PhotoSwipe, {
  PhotoSwipeOptions,
} from 'photoswipe/dist/photoswipe.esm.js'

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
   * https://photoswipe.com/documentation/api.html
   */
  onOpen?: (photoswipe: PhotoSwipe) => void
}
