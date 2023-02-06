import getInitialActiveSlideIndex from '../helpers/get-initial-active-slide-index'

describe('getInitialActiveSlideIndex helper', () => {
  test('index is number, targetId is null', () => {
    expect(getInitialActiveSlideIndex(10, null)).toBe(10)
  })

  test('index is null, targetId is defined', () => {
    expect(getInitialActiveSlideIndex(null, '5')).toBe(4)
  })

  test('index is null, targetId is null', () => {
    expect(getInitialActiveSlideIndex(null, null)).toBe(0)
  })
})
