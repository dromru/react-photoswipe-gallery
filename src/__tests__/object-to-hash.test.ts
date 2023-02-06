import objectToHash, { InputObject } from '../helpers/object-to-hash'

describe('objectToHash helper', () => {
  test('single key, without value', () => {
    const inputObject: InputObject = {
      'my-block': undefined,
    }
    const expectedHash = 'my-block'

    expect(objectToHash(inputObject)).toBe(expectedHash)
  })

  test('single key, with value', () => {
    const inputObject: InputObject = {
      gid: 'my-gallery',
    }
    const expectedHash = 'gid=my-gallery'
    expect(objectToHash(inputObject)).toBe(expectedHash)
  })

  test('two key and value pairs v1', () => {
    const inputObject: InputObject = {
      gid: 'my-gallery',
      pid: '2',
    }
    const expectedHash = 'gid=my-gallery&pid=2'
    expect(objectToHash(inputObject)).toBe(expectedHash)
  })

  test('two key and value pairs v2', () => {
    const inputObject: InputObject = {
      gid: 'my-gallery',
      pid: 'second-slide',
    }
    const expectedHash = 'gid=my-gallery&pid=second-slide'
    expect(objectToHash(inputObject)).toBe(expectedHash)
  })

  test('complex', () => {
    const inputObject: InputObject = {
      'my-block': undefined,
      gid: 'my-gallery',
      pid: 'second-slide',
    }
    const expectedHash = 'my-block&gid=my-gallery&pid=second-slide'
    expect(objectToHash(inputObject)).toBe(expectedHash)
  })
})
