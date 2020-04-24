import React, { useRef, useState } from 'react'
import PhotoSwipe from 'photoswipe'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { shuffle } from '../helpers'
import { InternalItem } from '../types'
import { Gallery, GalleryProps, Item, DefaultLayout, LayoutProps } from '..'

const PhotoSwipeMocked = PhotoSwipe as jest.MockedClass<typeof PhotoSwipe>

jest.mock('photoswipe', () => {
  return jest.fn().mockImplementation(() => {
    return { init: () => {} }
  })
})

beforeEach(() => PhotoSwipeMocked.mockClear())

const photoswipeArgsMock = (items: InternalItem[] | null, index: number) => [
  expect.anything(),
  expect.anything(),
  items === null
    ? expect.anything()
    : items.map(({ original, thumbnail, width, height, title }) => ({
        src: original,
        msrc: thumbnail,
        w: width,
        h: height,
        title,
        el: expect.anything(),
      })),
  {
    getThumbBoundsFn: expect.anything(),
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
      <TestGallery items={items} layoutRef={layoutRef} />
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
})
