import { ItemProps } from './item'

export type ItemRef = React.RefObject<undefined>

export type ThumbnailRef = React.MutableRefObject<HTMLImageElement>

export type InternalItem = Omit<ItemProps, 'children'> & {
  thumbnailRef: ThumbnailRef
}

export interface InternalAPI {
  remove: (ref: ItemRef) => void
  update: (ref: ItemRef, data: InternalItem) => void
  handleClick: (ref: ItemRef) => void
}
