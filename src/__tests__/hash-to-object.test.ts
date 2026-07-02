import hashToObject from '../helpers/hash-to-object'

type ExpectedObject = Record<string, string>

describe('hashToObject helper', () => {
  test('single key, without value', () => {
    const hash = 'my-block'
    const expectedObject: ExpectedObject = {
      'my-block': '',
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
      'my-block': '',
      gid: 'my-gallery',
      pid: 'second-slide',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('should decode URI-encoded keys and values', () => {
    const hash = 'gid=my%2Fgallery&pid=photo%2F1'
    const expectedObject: ExpectedObject = {
      gid: 'my/gallery',
      pid: 'photo/1',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('should decode encoded special characters', () => {
    const hash = 'gid=my%20gallery&pid=slide%231'
    const expectedObject: ExpectedObject = {
      gid: 'my gallery',
      pid: 'slide#1',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })

  test('should handle value containing equals sign', () => {
    const hash = 'gid=my-gallery&data=key%3Dvalue'
    const expectedObject: ExpectedObject = {
      gid: 'my-gallery',
      data: 'key=value',
    }
    expect(hashToObject(hash)).toEqual(expectedObject)
  })
})
