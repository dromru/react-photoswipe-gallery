import React, { useState, useEffect, FC } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item, ItemRef } from '..'

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

export const simpleHtml: Story = () => {
  const htmlString = (val: number) => `
<div style="
  color: white;
  display: flex;
  place-content: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
">
  <h1 style="font-weight: normal;">😿</h1>
  Lonely html kitten ${val}
</div>
`

  return (
    <Gallery options={{ showHideOpacity: true }}>
      <Item html={htmlString(1)}>
        {({ ref, open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
            ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
          >
            Open a slide with raw html content 1
          </a>
        )}
      </Item>
      <br />
      <Item html={htmlString(2)}>
        {({ ref, open }) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              open(e)
            }}
            ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
          >
            Open a slide with raw html content 2
          </a>
        )}
      </Item>
    </Gallery>
  )
}

export const reactElements: Story = () => (
  <Gallery options={{ showHideOpacity: true }}>
    <Item content={<Content text="It's a React slide #1, nice!" />}>
      {({ ref, open }) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            open(e)
          }}
          ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
        >
          Open a slide with React content 1
        </a>
      )}
    </Item>
    <br />
    <Item content={<Content text="It's a React slide #2, nice!" />}>
      {({ ref, open }) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            open(e)
          }}
          ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
        >
          Open a slide with React content 2
        </a>
      )}
    </Item>
  </Gallery>
)

const gmUrl1 =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.1846960041926!2d140.36867611576957!3d37.6448616273954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8a9e8c7893f543%3A0x119f5b940725798b!2sEbisu%20Circuit!5e0!3m2!1sen!2sjp!4v1664241282163!5m2!1sen!2sjp'
const gmUrl2 =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7995558122125!2d135.99188853244033!3d34.634505331751846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60014c6626e0108b%3A0x8c75cf62f8f4d46d!2sMeihan%20Sportsland!5e0!3m2!1sen!2sjp!4v1664241603152!5m2!1sen!2sjp'

const Map: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <iframe
        style={{
          background: '#444',
          width: '100%',
          height: '100%',
          maxWidth: '800px',
          maxHeight: '600px',
          pointerEvents: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        allowFullScreen
        src={url}
      />
    </div>
  )
}

export const googleMaps: Story = () => (
  <Gallery options={{ showHideOpacity: true }}>
    <Item content={<Map url={gmUrl1} />}>
      {({ ref, open }) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            open(e)
          }}
          ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
        >
          Open a map #1
        </a>
      )}
    </Item>
    <br />
    <Item content={<Map url={gmUrl2} />}>
      {({ ref, open }) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            open(e)
          }}
          ref={(node: HTMLAnchorElement): ItemRef => ref(node)}
        >
          Open a map #2
        </a>
      )}
    </Item>
  </Gallery>
)

export default storyMeta
