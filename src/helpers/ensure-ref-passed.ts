import { NoRefError } from '../no-ref-error'
import { EnsuredItemRef, InternalItem, ItemRef } from '../types'

export const entryItemRefIsElement = (
  entry: [ItemRef, InternalItem],
): entry is [EnsuredItemRef, InternalItem] =>
  entry[0].current instanceof Element

const ensureRefPassed = (
  entry: [ItemRef, InternalItem],
): [EnsuredItemRef, InternalItem] => {
  if (entryItemRefIsElement(entry)) {
    return entry
  }

  throw new NoRefError()
}

export default ensureRefPassed
