/**
 * @jest-environment jsdom
 */

import entryItemRefIsElement from '../helpers/entry-item-ref-is-element'
import { InternalItem, ItemRef } from '../types'

describe('entryItemRefIsElement helper', () => {
  test('ref with element should return true', () => {
    const entry: [ItemRef, InternalItem] = [
      { current: new Image() },
      {} as InternalItem,
    ]

    expect(entryItemRefIsElement(entry)).toBe(true)
  })

  test('ref with null should return false', () => {
    const entry: [ItemRef, InternalItem] = [
      { current: null },
      {} as InternalItem,
    ]

    expect(entryItemRefIsElement(entry)).toBe(false)
  })
})
