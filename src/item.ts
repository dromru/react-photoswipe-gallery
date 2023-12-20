import { useRef, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { ChildrenFnProps, ItemProps } from './types'
import { useApiContext } from './hooks'
import { NoRefError } from './no-ref-error'

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
  const { remove, set, handleClick, isRefRegistered } = useApiContext()

  const refCallback = useCallback<ChildrenFnProps<NodeType>['ref']>(
    (node) => {
      ref.current = node
      set(ref, restProps)
    },
    [set, ...Object.values(restProps)],
  )

  const open = useCallback<ChildrenFnProps<NodeType>['open']>(
    (event) => {
      if (!isRefRegistered(ref)) {
        throw new NoRefError()
      }
      handleClick(ref, null, null, event)
    },
    [handleClick, isRefRegistered],
  )

  const childrenFnProps: ChildrenFnProps<NodeType> = useMemo(
    () => ({
      ref: refCallback,
      open,
    }),
    [refCallback, open],
  )

  useEffect(() => {
    return () => {
      if (ref.current === null) {
        remove(ref)
      }
    }
  }, [remove])

  return children(childrenFnProps)
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
