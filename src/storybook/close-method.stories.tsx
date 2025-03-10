import React, { FC, useEffect, useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, StoryObj } from '@storybook/react'
import { Gallery, Item, useGallery } from '..'

const storyMeta: Meta = {
  title: 'Demo/Close Method',
}

const GalleryContent: FC = () => {
  const { open, close } = useGallery()

  const smallItemStyles: React.CSSProperties = {
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button type="button" onClick={() => open(0)}>
          Open gallery
        </button>
        <button
          type="button"
          onClick={close}
          style={{ position: 'relative', zIndex: 999_999 }}
        >
          Close gallery
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 171px 171px',
          gridTemplateRows: '114px 114px',
          gridGap: 12,
        }}
      >
        <Item<HTMLImageElement>
          original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
          thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
          width="1600"
          height="1600"
          alt="Photo of seashore by Folkert Gorter"
        >
          {({ ref }) => (
            <img
              src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
              ref={ref}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
          thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
          width="1600"
          height="1068"
          alt="Photo of mountain lake by Samuel Rohl"
        >
          {({ ref }) => (
            <img
              style={smallItemStyles}
              src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
              ref={ref}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
          thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
          width="1600"
          height="1066"
          alt="Photo of fog in the village by Ales Krivec"
        >
          {({ ref }) => (
            <img
              style={smallItemStyles}
              src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
              ref={ref}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg"
          thumbnail="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
          width="1600"
          height="1066"
          alt="Photo of river sunset by Michael Hull"
        >
          {({ ref }) => (
            <img
              style={{ ...smallItemStyles, gridColumnStart: 2 }}
              src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
              ref={ref}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg"
          thumbnail="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
          width="1600"
          height="1066"
          alt="Photo of bear by Thomas Lefebvre"
        >
          {({ ref }) => (
            <img
              style={smallItemStyles}
              src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
              ref={ref}
            />
          )}
        </Item>
      </div>
    </div>
  )
}

const MyGallery: FC = () => {
  return (
    <Gallery>
      <GalleryContent />
    </Gallery>
  )
}

export const CloseButton: StoryObj = {
  render: () => {
    return <MyGallery />
  },
}

const AutoClosedGalleryContent: FC = () => {
  const [secondsBeforeClose, setSecondsBeforeClose] = useState(3)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsBeforeClose((prev) => {
        if (prev > 0) {
          return prev - 1
        }

        return prev
      })
    }, 1_000)

    return () => {
      clearInterval(intervalId)
    }
  })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        width: '100%',
        height: '100%',
      }}
    >
      <h2>
        Gallery will be closed automatically in {secondsBeforeClose} second(s)!
      </h2>
    </div>
  )
}

export const AutoClosedGallery: StoryObj = {
  render: () => {
    return (
      <Gallery>
        <Item<HTMLButtonElement> content={<AutoClosedGalleryContent />}>
          {({ ref, open, close }) => {
            return (
              <button
                type="button"
                ref={ref}
                onClick={(e) => {
                  open(e)

                  setTimeout(close, 3_000)
                }}
              >
                Open gallery that will be closed automatically after 3 seconds
              </button>
            )
          }}
        </Item>
      </Gallery>
    )
  },
}

export default storyMeta
