import { NoRefError } from './no-ref-error'

export const getElBounds = (el: HTMLElement) => {
  const pageXScroll = window.pageXOffset || document.documentElement.scrollLeft
  const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + pageXScroll,
    y: rect.top + pageYScroll,
    w: rect.width,
  }
}

export function sortNodes(a?: Element, b?: Element) {
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

export function shuffle<T>(array: T[]) {
  const result = [...array]
  let currentIndex = result.length
  let temp: any
  let randomIndex: number
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temp = result[currentIndex]
    // eslint-disable-next-line no-param-reassign
    result[currentIndex] = result[randomIndex]
    // eslint-disable-next-line no-param-reassign
    result[randomIndex] = temp
  }

  return result
}
