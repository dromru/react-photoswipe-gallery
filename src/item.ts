import {
  useRef,
  useCallback,
  useContext,
  useLayoutEffect,
  FC,
  MouseEvent,
} from 'react'
import PropTypes from 'prop-types'
import { ItemProps, ItemRef } from './types'
import { Context } from './context'

/**
 * Gallery item
 *
 * Should be a children of Gallery component
 */
export const Item: FC<ItemProps> = ({ children, ...restProps }) => {
  const ref: ItemRef = useRef() as ItemRef
  const { remove, set, handleClick } = useContext(Context)
  const open = useCallback(
    (e: MouseEvent) => handleClick(ref, null, null, e),
    [],
  )

  useLayoutEffect(() => {
    set(ref, restProps)
    return () => remove(ref)
  }, Object.values(restProps))

  return children({ ref, open })
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
