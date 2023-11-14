function sortNodes(a: Element, b: Element) {
  if (a === b) return 0
  // eslint-disable-next-line no-bitwise
  if (a.compareDocumentPosition(b) & 2) {
    return 1
  }
  return -1
}

export default sortNodes
