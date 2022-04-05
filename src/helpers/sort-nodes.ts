import { NoRefError } from '../no-ref-error'

function sortNodes(a?: Element, b?: Element) {
  if (!(a instanceof Element)) {
    throw new NoRefError()
  }
  if (a === b) return 0
  // eslint-disable-next-line no-bitwise
  if (a.compareDocumentPosition(b) & 2) {
    return 1
  }
  return -1
}

export default sortNodes
