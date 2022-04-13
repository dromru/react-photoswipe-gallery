/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react'
import PhotoSwipe from 'photoswipe'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NoRefError } from '../no-ref-error'
import shuffle from '../helpers/shuffle'
import { InternalItem } from '../types'
import { Gallery, GalleryProps, Item, useGallery } from '..'

const PhotoSwipeMocked = PhotoSwipe as jest.MockedClass<typeof PhotoSwipe>

const pswpNext = jest.fn()

let eventListeners: Record<string, Function[]> = {}

const on: PhotoSwipe['on'] = (name, fn) => {
  if (!eventListeners[name]) {
    eventListeners[name] = []
  }

  eventListeners[name].push(fn)
}

const dispatch = (name: string) => {
  if (!eventListeners[name]) {
    return
  }

  eventListeners[name].forEach((callback) => callback())
}

const closePhotoSwipe = () => {
  dispatch('destroy')
  eventListeners = {}
}

const registerElementMock = jest.fn()

jest.mock('../no-ref-error')

jest.mock('photoswipe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      init: () => {},
      close: () => {},
      on,
      off: () => {},
      dispatch,
      next: pswpNext,
      ui: {
        registerElement: registerElementMock,
      },
    }
  })
})

beforeEach(() => {
  closePhotoSwipe()
  PhotoSwipeMocked.mockClear()
  pswpNext.mockClear()
  registerElementMock.mockClear()
})

const photoswipeArgsMock = (index: number, items?: InternalItem[]): [any] => [
  expect.objectContaining({
    ...(items === undefined
      ? {}
      : {
          dataSource: expect.arrayContaining(
            items.map(({ original, thumbnail, width, height, cropped, id }) =>
              expect.objectContaining({
                src: original,
                msrc: thumbnail,
                w: width,
                h: height,
                thumbCropped: cropped,
              }),
            ),
          ),
        }),
    index,
  }),
]

const createItem = (index: number): InternalItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  caption: `kitty #${index}`,
})

const createItems = (length: number): InternalItem[] =>
  Array.from({ length }, (_, i) => createItem(i))

const TestGallery: React.FC<{ items: InternalItem[] } & GalleryProps> = ({
  items,
  ...rest
}) => (
  <Gallery {...rest}>
    {items.map(({ original, thumbnail, width, height, caption, id }) => (
      <Item
        key={original}
        original={original}
        thumbnail={thumbnail}
        width={width}
        height={height}
        caption={caption}
        id={id}
      >
        {({ ref, open }) => (
          <img
            role="img"
            onClick={open}
            src={thumbnail}
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            alt={caption}
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
      {items.map(({ original, thumbnail, width, height, caption, id }) => (
        <Item
          key={original}
          original={original}
          thumbnail={thumbnail}
          width={width}
          height={height}
          caption={caption}
          id={id}
        >
          {({ ref }) => (
            <img
              role="img"
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
    <Gallery id="hooks" {...rest}>
      <ItemsWithHooks items={items} index={index} />
    </Gallery>
  )
}

const StatefulItem: React.FC<{ caption: string }> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [caption, setCaption] = useState(props.caption)
  return (
    <Item
      original="https://placekitten.com/1024/768?image=1"
      thumbnail="https://placekitten.com/160/120?image=1"
      width={1024}
      height={768}
      caption={caption}
    >
      {({ ref, open }) => (
        <>
          <img
            role="img"
            onClick={open}
            src="https://placekitten.com/160/120?image=1"
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            alt={caption}
          />
          <button
            type="button"
            role="button"
            onClick={() => setCaption('Really first')}
          />
        </>
      )}
    </Item>
  )
}

const TestGalleryWithStatefulItem: React.FC = () => {
  return (
    <Gallery>
      <StatefulItem caption="First" />
      <Item
        original="https://placekitten.com/1024/768?image=2"
        thumbnail="https://placekitten.com/160/120?image=2"
        width={1024}
        height={768}
        caption="Second"
      >
        {({ ref, open }) => (
          <img
            role="img"
            onClick={open}
            src="https://placekitten.com/160/120?image=2"
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            alt="Second"
          />
        )}
      </Item>
    </Gallery>
  )
}

describe('gallery', () => {
  test('item click should init photoswipe', async () => {
    const items = createItems(3)
    const user = userEvent.setup()

    render(<TestGallery items={items} />)

    const images = screen.getAllByRole('img')

    await user.click(images[0])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(0, items),
    )

    closePhotoSwipe()

    await user.click(images[images.length - 1])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(2, items),
    )
  })

  test('add one, then item click should init photoswipe', async () => {
    const items = createItems(3)
    const user = userEvent.setup()

    const { rerender } = render(<TestGallery items={items} />)
    const newItems = [createItem(items.length), ...items]
    rerender(<TestGallery items={newItems} />)

    const images = screen.getAllByRole('img')

    await user.click(images[0])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(0, newItems),
    )

    closePhotoSwipe()

    await user.click(images[images.length - 1])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(3, newItems),
    )
  })

  test('shuffle, then item click should init photoswipe', async () => {
    const items = createItems(20)
    const user = userEvent.setup()

    const { rerender } = render(<TestGallery items={items} />)

    await user.click(screen.getAllByRole('img')[5])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(5, items),
    )

    closePhotoSwipe()

    const newItems = shuffle(items)
    rerender(<TestGallery items={newItems} />)

    const renderedItems = screen.getAllByRole('img')

    await user.click(renderedItems[10])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(10, newItems),
    )

    closePhotoSwipe()

    await user.click(renderedItems[0])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(0, newItems),
    )

    closePhotoSwipe()

    await user.click(renderedItems[19])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(19, newItems),
    )
  })

  test('should preserve right order after re-rendering just one item', async () => {
    const user = userEvent.setup()

    render(<TestGalleryWithStatefulItem />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getAllByRole('img')[0])

    expect(PhotoSwipeMocked).toHaveBeenCalledWith(...photoswipeArgsMock(0))
  })

  test('should throw when there is no ref and more than one item', async () => {
    const items = createItems(2)
    const user = userEvent.setup()
    let error = null

    render(
      <Gallery>
        {items.map((item) => (
          <Item key={item.original} {...item}>
            {({ open }) => (
              <img
                role="img"
                onClick={(e) => {
                  try {
                    open(e)
                  } catch (er) {
                    error = er
                  }
                }}
                src={item.thumbnail}
              />
            )}
          </Item>
        ))}
      </Gallery>,
    )

    await user.click(screen.getAllByRole('img')[0])

    expect(error).toBeInstanceOf(NoRefError)
  })

  test('should not throw when there is no ref and only one item', async () => {
    const user = userEvent.setup()
    const item: InternalItem = {
      original: 'https://placekitten.com/1024/768',
      thumbnail: 'https://placekitten.com/160/120',
      width: 1024,
      height: 768,
    }
    render(
      <Gallery>
        <Item {...item}>
          {({ open }) => <img role="img" onClick={open} src={item.thumbnail} />}
        </Item>
      </Gallery>,
    )
    await user.click(screen.getAllByRole('img')[0])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(...photoswipeArgsMock(0))
  })

  test('should not init photoswipe when location.hash does not contain valid gid', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&pid=2`
    render(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).not.toHaveBeenCalled()
  })

  test('should not init photoswipe when location.hash does not contain valid pid', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}`
    render(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).not.toHaveBeenCalled()
  })

  test('should init photoswipe when location.hash contains valid gid and pid', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=2`
    render(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(1, items),
    )
  })

  test('should init photoswipe when location.hash contains gid and pid and items are provided', () => {
    const items = createItems(3)
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=3`

    const { rerender } = render(<TestGallery id={galleryID} items={[]} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledTimes(0)

    rerender(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(2, items),
    )
  })

  test('should init photoswipe when location.hash contains valid gid and custom pid, passed via Item id prop', () => {
    const items = createItems(3).map((item, index) => ({
      ...item,
      id: `picture-${index + 1}`,
    }))
    const galleryID = 'my-gallery'
    window.location.hash = `&gid=${galleryID}&pid=picture-3`

    const { rerender } = render(<TestGallery id={galleryID} items={[]} />)
    expect(PhotoSwipeMocked).toBeCalledTimes(0)

    rerender(<TestGallery id={galleryID} items={items} />)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(2, items),
    )
  })

  test('should call exposed photoswipe instance method after open', async () => {
    const user = userEvent.setup()
    const items = createItems(1)
    render(<TestGallery items={items} onOpen={(pswp) => pswp.next()} />)
    await user.click(screen.getAllByRole('img')[0])
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(0, items),
    )
    expect(pswpNext).toHaveBeenCalled()
  })

  test('should call onBeforeOpen callback before photoswipe open', async () => {
    const user = userEvent.setup()
    const items = createItems(1)
    const onBeforeOpen = jest.fn()

    render(<TestGallery items={items} onBeforeOpen={onBeforeOpen} />)
    expect(onBeforeOpen).not.toHaveBeenCalled()

    await user.click(screen.getAllByRole('img')[0])
    expect(onBeforeOpen).toHaveBeenCalled()
  })

  test('should call plugins callback before photoswipe open', async () => {
    const user = userEvent.setup()
    const items = createItems(1)
    const plugins = jest.fn()

    render(<TestGallery items={items} plugins={plugins} />)
    expect(plugins).not.toHaveBeenCalled()

    await user.click(screen.getAllByRole('img')[0])
    expect(plugins).toHaveBeenCalled()
  })

  test('should call `ui.registerElement` when `withDownloadButton` option enabled', async () => {
    const user = userEvent.setup()
    const items = createItems(1)

    render(<TestGallery items={items} withDownloadButton />)

    await user.click(screen.getAllByRole('img')[0])
    eventListeners.uiRegister.forEach((fn) => fn())
    expect(registerElementMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'download-button' }),
    )
  })

  test('should call `ui.registerElement` when `withDefaultCaption` option enabled', async () => {
    const user = userEvent.setup()
    const items = createItems(1)

    render(<TestGallery items={items} withDefaultCaption />)

    await user.click(screen.getAllByRole('img')[0])
    eventListeners.uiRegister.forEach((fn) => fn())
    expect(registerElementMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'default-caption' }),
    )
  })

  test('useGallery hook - open method should init photoswipe item at chosen index', async () => {
    const user = userEvent.setup()
    const items = createItems(3)
    const { rerender } = render(<TestGalleryHooks index={3} items={items} />)
    // clicking twice, should get only one PhotoSwipe call to ensure "already open" check
    await user.click(screen.getByText('show'))
    await user.click(screen.getByText('show'))
    expect(PhotoSwipeMocked).toHaveBeenCalledTimes(1)
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(3, items),
    )

    closePhotoSwipe()

    rerender(<TestGalleryHooks index={2} items={items} />)
    await user.click(screen.getByText('show'))
    expect(PhotoSwipeMocked).toHaveBeenCalledWith(
      ...photoswipeArgsMock(2, items),
    )
  })
})
