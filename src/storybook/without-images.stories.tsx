import React, { useState, FC, MouseEvent, ReactNode } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import shuffle from '../helpers/shuffle'
import { Gallery, Item, ItemRef } from '..'
import { createItem } from './helpers/items'

const storyMeta: Meta = {
  title: 'Dev/Without Images',
  argTypes: {
    content: {
      control: 'boolean',
    },
  },
}

const Button: FC<{ onClick: (e: MouseEvent) => void; children: ReactNode }> = ({
  onClick,
  children,
}) => {
  return (
    <button style={{ marginRight: '5px' }} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

const Content: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      color: 'white',
      display: 'flex',
      placeContent: 'center',
      flexDirection: 'column',
      height: '100%',
      textAlign: 'center',
    }}
  >
    <h1>{children}</h1>
  </div>
)

const createContent = (i: number) => <Content>Content #{i}</Content>

const defaultItems = Array.from({ length: 3 }, (_, i) => createItem(i + 1))

export const withoutImages: Story = ({ content }) => {
  const [links, setLinks] = useState(defaultItems)

  const addLink = () =>
    setLinks([
      ...links,
      createItem(links.length + 1, content ? createContent : false),
    ])
  const removeLink = () => setLinks(links.slice(1))
  const swapFirstTwoLinks = () =>
    setLinks([links[1], links[0], ...links.slice(2)])
  const swapLastTwoLinks = () =>
    setLinks([
      ...links.slice(0, links.length - 2),
      links[links.length - 1],
      links[links.length - 2],
    ])
  const shuffleLinks = () => setLinks([...shuffle(links)])

  return (
    <Gallery options={{ showHideOpacity: true }} withCaption>
      <div style={{ marginBottom: 20 }}>
        <Button onClick={addLink}>Add</Button>
        <Button onClick={removeLink}>Remove</Button>
        <Button onClick={swapFirstTwoLinks}>Swap first two</Button>
        <Button onClick={swapLastTwoLinks}>Swap last two</Button>
        <Button onClick={shuffleLinks}>Shuffle</Button>
      </div>
      <ul>
        {links.map((props) => (
          <Item {...props} key={props.original || props.caption}>
            {({ ref, open }) => (
              <li ref={(node: HTMLLIElement): ItemRef => ref(node)}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    open(e)
                  }}
                >
                  {props.caption}
                </a>
              </li>
            )}
          </Item>
        ))}
      </ul>
    </Gallery>
  )
}

export default storyMeta
