import React, { useState, useRef, FC } from 'react'
import { withKnobs, button } from '@storybook/addon-knobs'
import { shuffle } from './helpers'
import { InternalItem } from './types'
import { Gallery, Item, DefaultLayout } from '.'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default { title: 'Gallery', decorators: [withKnobs] }

const createItem = (index: number): InternalItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  title: `kitty #${index}`,
})

const items = Array.from({ length: 3 }, (_, i) => createItem(i + 1))

const ImageItem: FC<InternalItem> = ({
  original,
  thumbnail,
  width,
  height,
  title,
}) => {
  const [fullTitle, setFullTitle] = useState(title)
  return (
    <Item
      original={original}
      thumbnail={thumbnail}
      width={width}
      height={height}
      title={fullTitle}
    >
      {({ ref, open }) => (
        <div style={{ display: 'inline-block', margin: 5 }}>
          <img
            onClick={open}
            src={thumbnail}
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            style={{ display: 'block', cursor: 'pointer', marginBottom: 5 }}
          />
          <input
            type="text"
            value={fullTitle}
            onChange={(e) => setFullTitle(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      )}
    </Item>
  )
}

export const playground = () => {
  const [photos, setPhotos] = useState(items)
  button('add', () => setPhotos([createItem(photos.length + 1), ...photos]))
  button('remove', () => setPhotos(photos.slice(1)))
  button('swap first two', () =>
    setPhotos([photos[1], photos[0], ...photos.slice(2)]),
  )
  button('swap last two', () =>
    setPhotos([
      ...photos.slice(0, photos.length - 2),
      photos[photos.length - 1],
      photos[photos.length - 2],
    ]),
  )
  button('shuffle', () => setPhotos([...shuffle(photos)]))
  return (
    <Gallery>
      {photos.map((props) => (
        <ImageItem {...props} key={props.original} />
      ))}
    </Gallery>
  )
}

export const sharedLayout = () => {
  const layoutRef = useRef()
  return (
    <>
      <h1>First Gallery</h1>
      <Gallery layoutRef={layoutRef}>
        {shuffle(items).map((props) => (
          <ImageItem {...props} key={props.original} />
        ))}
      </Gallery>
      <h1>Second Gallery</h1>
      <Gallery layoutRef={layoutRef}>
        {shuffle(items).map((props) => (
          <ImageItem {...props} key={props.original} />
        ))}
      </Gallery>
      <DefaultLayout
        shareButton={false}
        fullscreenButton={false}
        zoomButton={false}
        ref={layoutRef}
      />
    </>
  )
}

export const withoutImages = () => {
  const [links, setLinks] = useState(items)
  button('add', () => setLinks([createItem(links.length + 1), ...links]))
  button('remove', () => setLinks(links.slice(1)))
  button('swap first two', () =>
    setLinks([links[1], links[0], ...links.slice(2)]),
  )
  button('swap last two', () =>
    setLinks([
      ...links.slice(0, links.length - 2),
      links[links.length - 1],
      links[links.length - 2],
    ]),
  )
  button('shuffle', () => setLinks([...shuffle(links)]))
  return (
    <Gallery options={{ showAnimationDuration: 0, hideAnimationDuration: 0 }}>
      <ul>
        {links.map((props) => (
          <Item {...props} key={props.original}>
            {({ ref, open }) => (
              <li ref={ref as React.MutableRefObject<HTMLLIElement>}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    open()
                  }}
                >
                  {props.title}
                </a>
              </li>
            )}
          </Item>
        ))}
      </ul>
    </Gallery>
  )
}
