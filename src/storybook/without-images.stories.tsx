import React, { useState, FC, MouseEvent } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import shuffle from '../helpers/shuffle'
import { Gallery, Item } from '..'
import { items, createItem } from './helpers/items'

const storyMeta: Meta = {
  title: 'Dev/Without Images',
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

export const withoutImages: Story = () => {
  const [links, setLinks] = useState(items)

  const addLink = () => setLinks([...links, createItem(links.length + 1)])
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
          <Item {...props} key={props.original}>
            {({ ref, open }) => (
              <li ref={ref as React.MutableRefObject<HTMLLIElement>}>
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
