import React, { useState, FC, MouseEvent } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import shuffle from '../helpers/shuffle'
import { Gallery, Item, useGallery } from '..'
import { items, createItem } from './helpers/items'
import { InternalItem } from '../types'

interface StoryProps {
  currentItem: number
}

const storyMeta: Meta<StoryProps> = {
  title: 'Dev/Playground',
  args: {
    currentItem: 1,
  },
  argTypes: {
    currentItem: {
      name: 'Kitten number in "Show kitty #" button',
    },
  },
}

const ImageItem: FC<InternalItem> = ({
  original,
  thumbnail,
  width,
  height,
  caption,
  id,
}) => {
  const [fullCaption, setFullCaption] = useState(caption)
  return (
    <Item
      original={original}
      thumbnail={thumbnail}
      width={width}
      height={height}
      caption={fullCaption}
      id={id}
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
            value={fullCaption}
            onChange={(e) => setFullCaption(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      )}
    </Item>
  )
}

const Button: FC<{ onClick: (e: MouseEvent) => void }> = ({
  onClick,
  children,
}) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}

const Kittens: FC<StoryProps> = ({ currentItem }) => {
  const { open } = useGallery()

  const [photos, setPhotos] = useState(items)

  const showKittyNumber = (index: number) => () => open(index)
  const addPhoto = () => setPhotos([...photos, createItem(photos.length + 1)])
  const removePhoto = () => setPhotos(photos.slice(1))
  const swapFirstTwoPhotos = () =>
    setPhotos([photos[1], photos[0], ...photos.slice(2)])
  const swapLastTwoPhotos = () =>
    setPhotos([
      ...photos.slice(0, photos.length - 2),
      photos[photos.length - 1],
      photos[photos.length - 2],
    ])
  const shufflePhotos = () => setPhotos([...shuffle(photos)])

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Button onClick={showKittyNumber(currentItem - 1)}>
          Show kitty #{currentItem}
        </Button>
        <Button onClick={addPhoto}>Add</Button>
        <Button onClick={removePhoto}>Remove</Button>
        <Button onClick={swapFirstTwoPhotos}>Swap first two</Button>
        <Button onClick={swapLastTwoPhotos}>Swap last two</Button>
        <Button onClick={shufflePhotos}>Shuffle</Button>
      </div>
      {photos.map((props) => (
        <ImageItem {...props} key={props.original} />
      ))}
    </>
  )
}

export const playground: Story<StoryProps> = (args) => {
  return (
    <Gallery withDefaultCaption>
      <Kittens {...args} />
    </Gallery>
  )
}

export default storyMeta
