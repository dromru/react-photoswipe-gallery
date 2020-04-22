import { useRef, useCallback, useContext, useLayoutEffect, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { ItemRef, ThumbnailRef } from './types'
import { Context } from './context'

const propTypes = {
  original: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
  children: PropTypes.func.isRequired,
}

export interface ItemProps
  extends Omit<InferProps<typeof propTypes>, 'children'> {
  children: (props: {
    open: () => void
    thumbnailRef: ThumbnailRef
  }) => JSX.Element
}

export const Item: FC<ItemProps> = ({ children, ...restProps }) => {
  const ref: ItemRef = useRef()
  const thumbnailRef: ThumbnailRef = useRef()
  const { remove, update, handleClick } = useContext(Context)
  const open = useCallback(() => handleClick(ref), [])

  useLayoutEffect(() => {
    remove(ref)
    update(ref, { thumbnailRef, ...restProps })
    return () => remove(ref)
  })

  return children({ open, thumbnailRef })
}

Item.propTypes = propTypes

Item.defaultProps = {
  thumbnail: null,
  title: null,
}
