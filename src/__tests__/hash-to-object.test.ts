import hashToObject from '../helpers/hash-to-object.js'

type ExpectedObject = Record<string, string | undefined>

describe('hashToObject helper', () => {
  test('single key, without value', () => {
    const hash = 'my-block'
    const expectedObject: ExpectedObject = {
      'my-block': undefined,
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('single key, with value', () => {
    const hash = 'gid=my-gallery'
    const expectedObject: ExpectedObject = {
      gid: 'my-gallery',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('two key and value pairs v1', () => {
    const hash = 'gid=my-gallery&pid=2'
    const expectedObject: ExpectedObject = {
      gid: 'my-gallery',
      pid: '2',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('two key and value pairs v2', () => {
    const hash = 'gid=my-gallery&pid=second-slide'
    const expectedObject: ExpectedObject = {
      gid: 'my-gallery',
      pid: 'second-slide',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('complex', () => {
    const hash = 'my-block&gid=my-gallery&pid=second-slide'
    const expectedObject: ExpectedObject = {
      'my-block': undefined,
      gid: 'my-gallery',
      pid: 'second-slide',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })
})
