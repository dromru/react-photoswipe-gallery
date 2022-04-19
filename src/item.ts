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
  ref: ItemRef

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
   * Slide content
   */
  content?: JSX.Element

  /**
   * Slide html content
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
  const ref: ItemRef = useRef()
  const { remove, set, handleClick } = useContext(Context)
  const open = useCallback(
    (e: MouseEvent) => handleClick(ref, null, null, e),
    [],
  )

  useEffect(() => {
    set(ref, restProps)
    return () => remove(ref)
  }, Object.values(restProps))

  return children({ ref, open })
}

Item.propTypes = {
  original: PropTypes.string,
  originalSrcset: PropTypes.string,
  thumbnail: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  caption: PropTypes.string,
  html: PropTypes.string,
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cropped: PropTypes.bool,
}
