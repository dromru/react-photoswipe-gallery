import { useRef, useCallback, useContext, useEffect, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { InternalItem } from './types'
import { Context } from './context'

interface ChildrenFnProps<NodeType extends HTMLElement> {
  /**
   * Required `ref` callback to any html node of item
   *
   * Can be omitted if there is only one item in gallery
   */
  ref: (node: NodeType | null) => void

  /**
   * Function that opens the gallery at the current item
   */
  open: (e: MouseEvent) => void
}

interface ItemProps<NodeType extends HTMLElement> extends InternalItem {
  /**
   * Render prop for exposing Gallery API
   */
  children: (props: ChildrenFnProps<NodeType>) => JSX.Element
}

/**
 * Gallery item
 *
 * Should be a children of Gallery component
 */
export const Item = <NodeType extends HTMLElement>({
  children,
  ...restProps
}: ItemProps<NodeType>): JSX.Element => {
  const ref = useRef<NodeType | null>(null)
  const { remove, set, handleClick } = useContext(Context)
  const open = useCallback(
    (e: MouseEvent) => handleClick(ref, null, null, e),
    [],
  )

  useEffect(() => {
    set(ref, restProps)
    return () => remove(ref)
  }, Object.values(restProps))

  return children({
    ref: (node) => {
      if (node) {
        ref.current = node
      } else {
        ref.current = null
      }
    },
    open,
  })
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
