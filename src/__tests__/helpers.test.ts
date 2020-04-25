import { getElBounds } from '../helpers'

describe('helpers', () => {
  test('getElBounds', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    expect(getElBounds(el)).toStrictEqual({ w: 0, x: 0, y: 0 })
  })
})
