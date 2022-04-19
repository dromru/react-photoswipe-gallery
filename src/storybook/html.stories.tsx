import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item } from '..'

const storyMeta: Meta = {
  title: 'Demo/Html',
}

const Content: React.FC<{ text: string }> = ({ text }) => {
  const [count, setCount] = React.useState(1)

  React.useEffect(() => {
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

export const html: Story = () => {
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
      Lonely static html kitten
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
            Open (react)
          </a>
        )}
      </Item>
      <br />
      <Item content={<Content text="Another React slide!" />}>
        {({ ref, open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
            ref={ref as React.MutableRefObject<HTMLAnchorElement>}
          >
            Open (react)
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
            Open (html)
          </a>
        )}
      </Item>
    </Gallery>
  )
}

export default storyMeta
