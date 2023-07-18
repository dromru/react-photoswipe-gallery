import {
  useRef,
  useCallback,
  useContext,
  useEffect,
  FC,
  MouseEvent,
} from 'react'
import PropTypes from 'prop-types'
import { ItemRef } from './types'
import { Context } from './context'

interface ChildrenFnProps {
  /**
   * Required `ref` object to any html node of item
   *
   * Can be omitted if there is only one item in gallery
   */
  ref: (node) => void

  /**
  *
  * To give an ability to use gathered ref node outside of the component
  *
  */
  getRef: ItemRef

  /**
   * Function that opens the gallery at the current item's index
   */
  open: (e: MouseEvent) => void
}

export interface ItemProps {
  /**
   * Render prop for exposing Gallery API
   */
  children: (props: ChildrenFnProps) => JSX.Element

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

/**
 * Gallery item
 *
 * Should be a children of Gallery component
 */
export const Item: FC<ItemProps> = ({ children, ...restProps }) => {
  const getRef: ItemRef = useRef() as ItemRef
  const { remove, set, handleClick } = useContext(Context)
  const open = useCallback(
    (e: MouseEvent) => handleClick(getRef, null, null, e),
    [],
  )

  const ref = useCallback(node => {
    if (node) {
      getRef.current = node
      set(getRef, restProps)
    }
  }, Object.values(restProps))

  useEffect(() => {
    return () => {
      if (getRef.current)
        remove(getRef)
    }
  }, [])

  return children({ ref, open, getRef })
}

Item.propTypes = {
  children: PropTypes.func.isRequired,
  original: PropTypes.string,
  originalSrcset: PropTypes.string,
  thumbnail: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  caption: PropTypes.string,
  content: PropTypes.element,
  html: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cropped: PropTypes.bool,
}
