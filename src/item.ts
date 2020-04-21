import { useRef, useCallback, useContext, useLayoutEffect, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { ItemRef, ThumbRef } from './types'
import { Context } from './context'

const propTypes = {
  full: PropTypes.string.isRequired,
  thumb: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
  children: PropTypes.func.isRequired,
}

export type ItemProps = InferProps<typeof propTypes>

export const Item: FC<ItemProps> = ({ children, ...restProps }) => {
  const ref: ItemRef = useRef()
  const thumbRef: ThumbRef = useRef(null)
  const { remove, update, handleClick } = useContext(Context)
  const open = useCallback(() => handleClick(ref), [])

  useLayoutEffect(() => {
    remove(ref)
    update(ref, { thumbRef, ...restProps })
    return () => remove(ref)
  })

  return children({ open, thumbRef })
}

Item.propTypes = propTypes

Item.defaultProps = {
  thumb: null,
  title: null,
}
