import React, { useState, useRef, FC } from 'react'
import { withKnobs, button } from '@storybook/addon-knobs'
import { Gallery, Item, DefaultLayout } from '../src'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default { title: 'Gallery', decorators: [withKnobs] }

const N = 3

function shuffle<T>(array: T[]) {
  let currentIndex = array.length
  let temp: any
  let randomIndex: number
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temp = array[currentIndex]
    // eslint-disable-next-line no-param-reassign
    array[currentIndex] = array[randomIndex]
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = temp
  }

  return array
}

interface ImageItem {
  original: string
  thumbnail: string
  width: number
  height: number
  title: string
}

const createItem = (index: number): ImageItem => ({
  original: `https://placekitten.com/1024/768?image=${index}`,
  thumbnail: `https://placekitten.com/160/120?image=${index}`,
  width: 1024,
  height: 768,
  title: `kitty #${index}`,
})

const items = Array.from({ length: N }, (_, i) => createItem(i + 1))

const ImageItem: FC<ImageItem> = ({
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
      {({ open, thumbnailRef }) => (
        <div style={{ display: 'inline-block', margin: 5 }}>
          <img
            onClick={open}
            src={thumbnail}
            ref={thumbnailRef}
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
      <Gallery layoutRef={layoutRef}>
        {shuffle(items).map((props) => (
          <ImageItem {...props} key={props.original} />
        ))}
      </Gallery>
      <br />
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
