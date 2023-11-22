import { EnsuredItemRef, InternalItem, ItemRef } from '../types'

const entryItemRefIsElement = (
  entry: [ItemRef, InternalItem],
): entry is [EnsuredItemRef, InternalItem] =>
  entry[0].current instanceof Element

export default entryItemRefIsElement
