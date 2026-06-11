import { useRef, useEffect, useMemo, useCallback } from 'react'
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
  const { remove, set, handleClick, close, isRefRegistered } = useApiContext()

  const refCallback = useCallback<ChildrenFnProps<NodeType>['ref']>(
    (node) => {
      ref.current = node
      set(ref, restProps)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      close,
    }),
    [refCallback, open, close],
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
