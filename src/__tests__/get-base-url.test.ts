/**
 * @jest-environment jsdom
 */

import getBaseUrl from '../helpers/get-base-url.js'

let windowSpy: any

beforeEach(() => {
  // @ts-ignore
  windowSpy = jest.spyOn(global, 'window', 'get')
})

afterEach(() => {
  windowSpy.mockRestore()
})

describe('getBaseUrl helper', () => {
  test('should return location.pathname', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: 'section/subsection',
        search: '',
      },
    }))

    expect(getBaseUrl()).toEqual('section/subsection')
  })

  test('should return location.search', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: '',
        search: '?qwery=params',
      },
    }))

    expect(getBaseUrl()).toEqual('?qwery=params')
  })

  test('should return location.pathname + location.search', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: 'section/subsection',
        search: '?qwery=params',
      },
    }))

    expect(getBaseUrl()).toEqual('section/subsection?qwery=params')
  })
})
