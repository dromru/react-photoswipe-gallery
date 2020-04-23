import { useRef, useCallback, useContext, useEffect, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { ItemRef } from './types'
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
  children: (props: { ref: ItemRef; open: () => void }) => JSX.Element
}

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

Item.propTypes = propTypes

Item.defaultProps = {
  thumbnail: null,
  title: null,
}
