import getHashWithoutGidAndPid from '../helpers/get-hash-without-gid-and-pid.js'

describe('getHashWithoutGidAndPid helper', () => {
  test('hash without gid and pid v1', () => {
    const hash = 'some-anchor'
    const expectedHash = 'some-anchor'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })

  test('hash without gid and pid v2', () => {
    const hash = 'some-anchor&qwerty=3'
    const expectedHash = 'some-anchor&qwerty=3'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })

  test('hash with gid only', () => {
    const hash = 'some-anchor&gid=photo-gallery'
    const expectedHash = 'some-anchor'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })

  test('hash with pid only', () => {
    const hash = 'some-anchor&pid=123'
    const expectedHash = 'some-anchor'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })

  test('hash with gid and pid v1', () => {
    const hash = 'some-anchor&gid=photo-gallery&pid=123'
    const expectedHash = 'some-anchor'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })

  test('hash with gid and pid v2', () => {
    const hash = 'some-anchor&gid=photo-gallery&pid=123&qwerty=3'
    const expectedHash = 'some-anchor&qwerty=3'
    expect(getHashWithoutGidAndPid(hash)).toEqual(expectedHash)
  })
})
