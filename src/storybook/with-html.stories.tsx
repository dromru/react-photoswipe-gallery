import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item } from '..'

const storyMeta: Meta = {
  title: 'Gallery/With Html',
}

export const withHtml: Story = () => {
  const html = `
    <div style="
      color: white;
      display: flex;
      place-content: center;
      flex-direction: column;
      height: 100%;
      text-align: center;
    ">
      <h1 style="font-weight: normal;">😿</h1>
      There are no kittens :(
    </div>
    `
  return (
    <Gallery options={{ showHideOpacity: true }}>
      <Item html={html}>
        {({ open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
          >
            Open
          </a>
        )}
      </Item>
    </Gallery>
  )
}

export default storyMeta
