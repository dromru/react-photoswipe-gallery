import { useRef, useCallback, useContext, useEffect, FC } from 'react'
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
  open: () => void
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
   * Title for Default UI
   */
  title?: string

  /**
   * Html content, if you need to use it as modal
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
 * Should be a children of Gallery or CustomGallery component
 */
export const Item: FC<ItemProps> = ({ children, ...restProps }) => {
  const ref: ItemRef = useRef()
  const { remove, set, handleClick } = useContext(Context)
  const open = useCallback(() => handleClick(ref), [])

  useEffect(() => {
    set(ref, restProps)
    return () => remove(ref)
  }, Object.values(restProps))

  return children({ ref, open })
}

Item.propTypes = {
  original: PropTypes.string,
  thumbnail: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  html: PropTypes.string,
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cropped: PropTypes.bool,
}
