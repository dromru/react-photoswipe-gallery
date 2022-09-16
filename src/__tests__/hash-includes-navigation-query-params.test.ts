import hashIncludesNavigationQueryParams from '../helpers/hash-includes-navigation-query-params'

describe('hashIncludesNavigationQueryParams helper', () => {
  test('returns true if hash includes both query params: gid and pid', () => {
    expect(hashIncludesNavigationQueryParams('gid=my-gallery&pid=123')).toBe(
      true,
    )
    expect(
      hashIncludesNavigationQueryParams('args=1&gid=my-gallery&pid=my-slide'),
    ).toBe(true)
    expect(
      hashIncludesNavigationQueryParams('args=1&gid=321&pid=my-slide'),
    ).toBe(true)
    expect(hashIncludesNavigationQueryParams('gid=321&pid=my-slide')).toBe(true)
    expect(hashIncludesNavigationQueryParams('pid=my-slide&gid=321')).toBe(true)
    expect(
      hashIncludesNavigationQueryParams(
        'gid=gallery&args=value&a=1&pid=321&b=2',
      ),
    ).toBe(true)
  })

  test('returns false if hash includes both query params: gid and pid', () => {
    expect(hashIncludesNavigationQueryParams('')).toBe(false)
    expect(hashIncludesNavigationQueryParams('gid=my-gallery')).toBe(false)
    expect(hashIncludesNavigationQueryParams('pid=123')).toBe(false)
    expect(hashIncludesNavigationQueryParams('args=1&gid=321')).toBe(false)
    expect(
      hashIncludesNavigationQueryParams('args=value&a=1&gid=321&b=2'),
    ).toBe(false)
    expect(hashIncludesNavigationQueryParams('args=value&a=1&b=2')).toBe(false)
    expect(hashIncludesNavigationQueryParams('args=value&pid=1&pid=2')).toBe(
      false,
    )
    expect(hashIncludesNavigationQueryParams('args=value&pid=1&pid=2')).toBe(
      false,
    )
    expect(hashIncludesNavigationQueryParams('args=value&gid=1&pid=')).toBe(
      false,
    )
    expect(hashIncludesNavigationQueryParams('args=value&gid=&pid=2')).toBe(
      false,
    )
  })
})
