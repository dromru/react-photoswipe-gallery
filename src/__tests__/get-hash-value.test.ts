/**
 * @jest-environment jsdom
 */

import getHashValue from '../helpers/get-hash-value'

let windowSpy: any

beforeEach(() => {
  // @ts-ignore
  windowSpy = jest.spyOn(global, 'window', 'get')
})

afterEach(() => {
  windowSpy.mockRestore()
})

describe('getHashValue helper', () => {
  test('should return hash without #', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hash: '#some-block',
      },
    }))

    expect(getHashValue()).toEqual('some-block')
  })
})
