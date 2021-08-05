/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react'
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js'
import { mount } from 'enzyme'
import { NoRefError } from '../no-ref-error'
import { shuffle } from '../helpers'
import { InternalItem } from '../types'
import { Gallery, GalleryProps, Item, useGallery } from '..'

const PhotoSwipeMocked = PhotoSwipe as jest.MockedClass<typeof PhotoSwipe>

const applyZoomPan = jest.fn()

jest.mock('photoswipe/dist/photoswipe.esm.js', () => {
  return jest.fn().mockImplementation(() => {
    return { init: () => {}, applyZoomPan }
  })
})

beforeEach(() => {
  PhotoSwipeMocked.mockClear()
  applyZoomPan.mockClear()
})

const photoswipeArgsMock = (
  items: InternalItem[] | null,
  index: number,
): [null, any] => [
  null,
  {
    dataSource:
      items === null
        ? expect.anything()
        : items.map(({ original, thumbnail, width, height }) => ({
            src: original,
            msrc: thumbnail,
            w: width,
            h: height,
            element: expect.anything(),
          })),
    index,
  },
]

const createItem = (index: number): InternalItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  // title: `kitty #${index}`,
})

const createItems = (length: number): InternalItem[] =>
  Array.from({ length }, (_, i) => createItem(i))

const TestGallery: React.FC<{ items: InternalItem[] } & GalleryProps> = ({
  items,
  ...rest
}) => (
  <Gallery {...rest}>
    {items.map(({ original, thumbnail, width, height, title, id }) => (
      <Item
        key={original}
        original={original}
        thumbnail={thumbnail}
        width={width}
        height={height}
        title={title}
        id={id}
      >
        {({ ref, open }) => (
          <img
            onClick={open}
            src={thumbnail}
            ref={ref as React.MutableRefObject<HTMLImageElement>}
          />
        )}
      </Item>
    ))}
  </Gallery>
)

const ItemsWithHooks: React.FC<{ items: InternalItem[]; index: number }> = ({
  items,
  index,
}) => {
  const { open } = useGallery()
  return (
    <>
      {items.map(({ original, thumbnail, width, height, title, id }) => (
        <Item
          key={original}
          original={original}
          thumbnail={thumbnail}
          width={width}
          height={height}
          title={title}
          id={id}
        >
          {({ ref }) => (
            <img
              src={thumbnail}
              ref={ref as React.MutableRefObject<HTMLImageElement>}
            />
          )}
        </Item>
      ))}
      <button type="button" onClick={() => open(index)} id="show">
        show
      </button>
    </>
  )
}

const TestGalleryHooks: React.FC<
  { items: InternalItem[]; index: number } & GalleryProps
> = ({ items, index, ...rest }) => {
  return (
    <Gallery {...rest}>
      <ItemsWithHooks items={items} index={index} />
    </Gallery>
  )
}

const StatefulItem: React.FC<{ title: string }> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [title, setTitle] = useState(props.title)
  return (
    <Item
      original="https://placekitten.com/1024/768?image=1"
      thumbnail="https://placekitten.com/160/120?image=1"
      width={1024}
      height={768}
      title={title}
    >
      {({ ref, open }) => (
        <>
          <img
            onClick={open}
            src="https://placekitten.com/160/120?image=1"
            ref={ref as React.MutableRefObject<HTMLImageElement>}
          />
          <button type="button" onClick={() => setTitle('Really first')} />
        </>
      )}
    </Item>
  )
}

const TestGalleryWithStatefulItem: React.FC = () => {
  return (
    <Gallery>
      <StatefulItem title="First" />
      <Item
        original="https://placekitten.com/1024/768?image=2"
        thumbnail="https://placekitten.com/160/120?image=2"
        width={1024}
        height={768}
        title="Second"
      >
        {({ ref, open }) => (
          <img
            onClick={open}
            src="https://placekitten.com/160/120?image=2"
            ref={ref as React.MutableRefObject<HTMLImageElement>}
          />
        )}
      </Item>
    </Gallery>
  )
}

describe('gallery', () => {
  test('item click should init photoswipe', () => {
    const items = createItems(3)
    const wrapper = mount(<TestGallery items={items} />)

    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 0),
    )

    wrapper.find(Item).last().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 2),
    )
  })

  test('add one, then item click should init photoswipe', () => {
    const items = createItems(3)
    const wrapper = mount(<TestGallery items={items} />)

    const newItems = [createItem(items.length + 1), ...items]

    wrapper.setProps({ items: newItems })

    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(newItems, 0),
    )

    wrapper.find(Item).last().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(newItems, 3),
    )
  })

  test('shuffle, then item click should init photoswipe', () => {
    const items = createItems(20)
    const wrapper = mount(<TestGallery items={items} />)

    const newItems = shuffle(items)

    wrapper.find(Item).at(5).simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 5),
    )

    wrapper.setProps({ items: newItems })

    wrapper.find(Item).at(10).simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(newItems, 10),
    )
    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(newItems, 0),
    )
    wrapper.find(Item).last().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(newItems, 19),
    )
  })

  test('should preserve right order after re-rendering just one item', () => {
    const wrapper = mount(<TestGalleryWithStatefulItem />)
    wrapper.find(Item).first().find('button').simulate('click')
    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(null, 0),
    )
  })

  test('should throw when there is no ref and more than one item', () => {
    /* eslint-disable no-console */
    const consoleError = console.error
    console.error = jest.fn()
    const items = createItems(2)
    expect(() => {
      mount(
        <Gallery>
          {items.map((item) => (
            <Item key={item.original} {...item}>
              {({ open }) => <img onClick={open} src={item.thumbnail} />}
            </Item>
          ))}
        </Gallery>,
      )
        .find(Item)
        .first()
        .simulate('click')
    }).toThrow(new NoRefError())
    console.error = consoleError
    /* eslint-enable no-console */
  })

  test('should not throw when there is no ref and only one item', () => {
    const item: InternalItem = {
      original: 'https://placekitten.com/1024/768',
      thumbnail: 'https://placekitten.com/160/120',
      width: 1024,
      height: 768,
    }
    const wrapper = mount(
      <Gallery>
        <Item {...item}>
          {({ open }) => <img onClick={open} src={item.thumbnail} />}
        </Item>
      </Gallery>,
    )
    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(null, 0),
    )
  })

  xtest('should init photoswipe when location.hash contains valid gid and pid', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=2`
    mount(<TestGallery id={galleryID} items={items} />)
    // expect(PhotoSwipeMocked).toHaveBeenCalledWith(
    //   ...photoswipeArgsMock(items, 1, galleryID),
    // )
  })

  xtest('should only init photoswipe when location.hash contains gid and pid and items are provided', () => {
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=2`
    const gallery = mount(<TestGallery id={galleryID} items={[]} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledTimes(0)
    const items = createItems(3)
    gallery.setProps({
      items,
    })
    gallery.unmount()
    gallery.mount()
    // expect(PhotoSwipeMocked).toHaveBeenCalledWith(
    //   ...photoswipeArgsMock(items, 1, galleryID),
    // )
  })

  xtest('should init photoswipe when location.hash contains valid gid and custom pid, passed via Item id prop', () => {
    const items = createItems(3).map((item, index) => ({
      ...item,
      id: `picture-${index + 1}`,
    }))
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=picture-3`
    const gallery = mount(<TestGallery id={galleryID} items={[]} />)
    expect(PhotoSwipeMocked).toBeCalledTimes(0)
    gallery.setProps({
      items,
    })
    // expect(PhotoSwipeMocked).toHaveBeenCalledWith(
    //   ...photoswipeArgsMock(items, 2, galleryID),
    // )
  })

  test('should call exposed photoswipe instance method after open', () => {
    const items = createItems(1)
    const wrapper = mount(
      <TestGallery
        items={items}
        onOpen={(pswp) => pswp.applyZoomPan(0, 0, 0)}
      />,
    )
    wrapper.find(Item).first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 0),
    )
    expect(applyZoomPan).toHaveBeenCalled()
  })

  test('useGallery hook - open method should init photoswipe item at chosen index', () => {
    const items = createItems(3)
    const wrapper = mount(<TestGalleryHooks index={3} items={items} />)
    wrapper.find('#show').first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 3),
    )
    wrapper.setProps({ index: 2 })
    wrapper.find('#show').first().simulate('click')
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 2),
    )
  })
})
