import { ItemProps } from './item'

export type ItemRef = React.RefObject<undefined>

export type ThumbRef = React.RefObject<HTMLImageElement>

export type InternalItem = Omit<ItemProps, 'children'> & { thumbRef: ThumbRef }

export interface InternalAPI {
  remove: (ref: ItemRef) => void
  update: (ref: ItemRef, data: InternalItem) => void
  handleClick: (ref: ItemRef) => void
}
