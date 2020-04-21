import React, { useState, useCallback, FC } from 'react'
import { withKnobs, button } from '@storybook/addon-knobs'
import { Gallery, Item, PhotoswipeLayoutDefault } from '../src'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default { title: 'Gallery', decorators: [withKnobs] }

const N = 3

function shuffle(array: any[]) {
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
  large: string
  thumb: string
  w: number
  h: number
  title: string
}

const createItem = (index: number): ImageItem => ({
  large: `https://placekitten.com/1024/768?image=${index}`,
  thumb: `https://placekitten.com/160/120?image=${index}`,
  w: 1024,
  h: 768,
  title: `kitty #${index}`,
})

const items = Array.from({ length: N }, (_, i) => createItem(i + 1))

const ImageItem: FC<ImageItem> = ({ large, thumb, w, h, title }) => {
  const [fullTitle, setFullTitle] = useState(title)
  return (
    <Item width={w} height={h} full={large} thumb={thumb} title={fullTitle}>
      {({ open, thumbRef }) => (
        <div style={{ display: 'inline-block', margin: 5 }}>
          <img
            onClick={open}
            src={thumb}
            ref={thumbRef}
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
    <Gallery layout={PhotoswipeLayoutDefault}>
      {photos.map((props) => (
        <ImageItem {...props} key={props.thumb} />
      ))}
    </Gallery>
  )
}
