import { NoRefError } from '../no-ref-error'
import { EnsuredItemRef, InternalItem, ItemRef } from '../types'
import entryItemRefIsElement from './entry-item-ref-is-element'

const ensureRefPassed = (
  entry: [ItemRef, InternalItem],
): [EnsuredItemRef, InternalItem] => {
  if (entryItemRefIsElement(entry)) {
    return entry
  }

  throw new NoRefError()
}

export default ensureRefPassed
