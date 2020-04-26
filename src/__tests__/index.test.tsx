import React, { useRef, useState } from 'react'
import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { NoRefError } from '../no-ref-error'
import { shuffle } from '../helpers'
import { InternalItem } from '../types'
import {
  Gallery,
  CustomGallery,
  GalleryProps,
  Item,
  DefaultLayout,
  LayoutProps,
} from '..'

const PhotoSwipeMocked = PhotoSwipe as jest.MockedClass<typeof PhotoSwipe>

const applyZoomPan = jest.fn()

jest.mock('photoswipe', () => {
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
  galleryUID?: string,
) => [
  expect.anything(),
  expect.anything(),
  items === null
    ? expect.anything()
    : items.map(({ original, thumbnail, width, height, title, id }) => ({
        src: original,
        msrc: thumbnail,
        w: width,
        h: height,
        title,
        el: expect.anything(),
        pid: id,
      })),
  {
    getThumbBoundsFn: expect.anything(),
    history: false,
    ...(galleryUID !== undefined ? { history: true, galleryUID } : {}),
    index,
  },
]

const createItem = (index: number): InternalItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  title: `kitty #${index}`,
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

const TestGalleryWithLayout: React.FC<
  { items: InternalItem[] } & LayoutProps
> = ({ items, ...rest }) => {
  const layoutRef = useRef()
  return (
    <>
      <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
        {items.map(({ original, thumbnail, width, height, title }, i) => (
          <Item
            key={original}
            original={original}
            thumbnail={thumbnail}
            width={width}
            height={height}
            title={title}
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
      </CustomGallery>
      <DefaultLayout ref={layoutRef} {...rest} />
    </>
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

  test('should render with external layout', () => {
    const items = createItems(1)
    const wrapper = shallow(<TestGalleryWithLayout items={items} />)
    expect(toJson(wrapper)).toMatchSnapshot()
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

  test('should init photoswipe when location.hash contains valid gid and pid', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=2`
    mount(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 1, galleryID),
    )
  })

  test('should init photoswipe when location.hash contains valid gid and custom pid, passed via Item id prop', () => {
    const items = createItems(3).map((item, index) => ({
      ...item,
      id: `picture-${index + 1}`,
    }))
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=picture-3`
    mount(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(items, 2, galleryID),
    )
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
})
