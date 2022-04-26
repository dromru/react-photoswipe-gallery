import React, { useState, useEffect, FC } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item } from '..'

const storyMeta: Meta = {
  title: 'Demo/Custom Content',
}

const Content: FC<{ text: string }> = ({ text }) => {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((cur) => (cur > 5 ? 1 : cur + 1))
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const cats = ['😹', '😻', '🙀', '😸', '😺', '😼']

  return (
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
      <h1 style={{ fontWeight: 'normal' }}>
        {Array.from(
          { length: count },
          () => cats[Math.floor(Math.random() * cats.length)],
        )}
      </h1>
      {text}
    </div>
  )
}

export const customContent: Story = () => {
  const htmlString = `
<div style="
  color: white;
  display: flex;
  place-content: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
">
  <h1 style="font-weight: normal;">😿</h1>
  Lonely html kitten
</div>
`

  return (
    <Gallery options={{ showHideOpacity: true }}>
      <Item content={<Content text="It's a React slide, nice!" />}>
        {({ ref, open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
            ref={ref as React.MutableRefObject<HTMLAnchorElement>}
          >
            Open a slide with React content
          </a>
        )}
      </Item>
      <br />
      <Item html={htmlString}>
        {({ ref, open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
            ref={ref as React.MutableRefObject<HTMLAnchorElement>}
          >
            Open a slide with raw html content
          </a>
        )}
      </Item>
    </Gallery>
  )
}

export default storyMeta
