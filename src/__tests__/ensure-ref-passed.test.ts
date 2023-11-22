/**
 * @jest-environment jsdom
 */

import ensureRefPassed from '../helpers/ensure-ref-passed'
import { NoRefError } from '../no-ref-error'
import { InternalItem, ItemRef } from '../types'

describe('ensureRefPassed helper', () => {
  test('entry with element-ref should return entry', () => {
    const entry: [ItemRef, InternalItem] = [
      { current: new Image() },
      {} as InternalItem,
    ]

    expect(ensureRefPassed(entry)).toBe(entry)
  })

  test('entry with null-ref should throw', () => {
    const entry: [ItemRef, InternalItem] = [
      { current: null },
      {} as InternalItem,
    ]

    expect(() => ensureRefPassed(entry)).toThrow(NoRefError)
  })
})
