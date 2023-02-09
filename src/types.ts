import { MouseEvent } from 'react'
import { ItemProps } from './item'

export type ItemRef = React.MutableRefObject<HTMLElement>

export type InternalItem = Omit<ItemProps, 'children'>

export interface InternalAPI {
  remove: (ref: ItemRef) => void
  set: (ref: ItemRef, data: InternalItem) => void
  handleClick: (
    ref?: ItemRef | null,
    targetId?: string | null,
    itemIndex?: number | null,
    e?: MouseEvent | null,
  ) => void
  open: (i: number) => void
}
