import { NoRefError } from '../no-ref-error'

const ensureRefPassed = (element: Element | undefined | null) => {
  if (!(element instanceof Element)) {
    throw new NoRefError()
  }
}

export default ensureRefPassed
