import { createElement } from 'react'
import itemToSlide from '../helpers/item-to-slide'

describe('itemToSlide helper', () => {
  test('original', () => {
    expect(
      itemToSlide(
        {
          width: 100,
          height: 100,
          original: 'a.jpg',
        },
        null,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: 'a.jpg',
      srcset: undefined,
      msrc: undefined,
      element: undefined,
      thumbCropped: undefined,
      content: undefined,
    })
  })

  test('originalSrcset', () => {
    expect(
      itemToSlide(
        {
          width: '100',
          height: '100',
          originalSrcset: 'a.jpg 1x, a2x.jpg 2x',
        },
        null,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: undefined,
      srcset: 'a.jpg 1x, a2x.jpg 2x',
      msrc: undefined,
      element: undefined,
      thumbCropped: undefined,
      content: undefined,
    })
  })

  test('original and thumbnail', () => {
    expect(
      itemToSlide(
        {
          width: 100,
          height: 100,
          original: 'a.jpg',
          thumbnail: 'b.jpg',
        },
        null,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: 'a.jpg',
      srcset: undefined,
      msrc: 'b.jpg',
      element: undefined,
      thumbCropped: undefined,
      content: undefined,
    })
  })

  test('ref', () => {
    const ref = {
      current: { name: 'Mock Html Element' } as unknown as HTMLElement,
    }
    expect(
      itemToSlide(
        {
          width: 100,
          height: 100,
          original: 'a.jpg',
          thumbnail: 'b.jpg',
        },
        ref,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: 'a.jpg',
      srcset: undefined,
      msrc: 'b.jpg',
      element: ref.current,
      thumbCropped: undefined,
      content: undefined,
    })
  })

  test('content', () => {
    expect(
      itemToSlide(
        {
          content: createElement('div'),
        },
        null,
      ),
    ).toEqual({
      w: undefined,
      h: undefined,
      src: undefined,
      srcset: undefined,
      msrc: undefined,
      element: undefined,
      thumbCropped: undefined,
      type: 'html',
      content: createElement('div'),
    })
  })

  test('id', () => {
    expect(
      itemToSlide(
        {
          width: 100,
          height: 100,
          original: 'a.jpg',
          id: 'my-id',
        },
        null,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: 'a.jpg',
      srcset: undefined,
      msrc: undefined,
      element: undefined,
      thumbCropped: undefined,
      content: undefined,
      pid: 'my-id',
    })
  })

  test('...rest', () => {
    expect(
      itemToSlide(
        {
          width: 100,
          height: 100,
          original: 'a.jpg',
          // @ts-expect-error
          propertyOutOfType: 123,
        },
        null,
      ),
    ).toEqual({
      w: 100,
      h: 100,
      src: 'a.jpg',
      srcset: undefined,
      msrc: undefined,
      element: undefined,
      thumbCropped: undefined,
      content: undefined,
      propertyOutOfType: 123,
    })
  })
})
