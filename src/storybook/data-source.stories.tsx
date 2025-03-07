import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, StoryObj } from '@storybook/react'
import { Gallery, Item } from '..'
import { DataSource } from '../types'

const storyMeta: Meta = {
  title: 'Demo/Data Source',
}

const dataSource: DataSource = [
  {
    sourceId: 1,
    original:
      'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
    thumbnail:
      'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
    width: 1600,
    height: 1600,
    cropped: true,
  },
  {
    sourceId: 2,
    original:
      'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
    thumbnail:
      'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
    width: 1600,
    height: 1068,
  },
  {
    sourceId: 3,
    original:
      'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
    thumbnail:
      'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
    width: 1600,
    height: 1066,
  },
  {
    sourceId: 4,
    original:
      'https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg',
    width: 1600,
    height: 1066,
  },
  {
    sourceId: 5,
    original:
      'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
    width: 1600,
    height: 1066,
  },
]

export const OpenByButton: StoryObj = {
  render: () => {
    return (
      <Gallery dataSource={dataSource}>
        <Item<HTMLButtonElement> sourceId={1}>
          {({ ref, open }) => (
            <button type="button" ref={ref} onClick={open}>
              Open gallery
            </button>
          )}
        </Item>
      </Gallery>
    )
  },
}

export const PlusSomeImages: StoryObj = {
  render: () => {
    const imageStyles: React.CSSProperties = {
      cursor: 'pointer',
      objectFit: 'cover',
      width: '100%',
      maxHeight: '100%',
    }
    return (
      <Gallery dataSource={dataSource}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '171px 171px 171px',
            gridTemplateRows: '114px',
            gridGap: 12,
          }}
        >
          <Item<HTMLImageElement> sourceId={1}>
            {({ ref, open }) => (
              <img
                style={imageStyles}
                src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                ref={ref}
                onClick={open}
              />
            )}
          </Item>
          <Item<HTMLImageElement> sourceId={2}>
            {({ ref, open }) => (
              <img
                style={imageStyles}
                src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
                ref={ref}
                onClick={open}
              />
            )}
          </Item>
          <Item<HTMLDivElement> sourceId={3}>
            {({ ref, open }) => (
              <div style={{ position: 'relative' }} ref={ref} onClick={open}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '2em',
                    cursor: 'pointer',
                  }}
                >
                  <p>+ 2</p>
                </div>
                <img
                  style={imageStyles}
                  src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
                />
              </div>
            )}
          </Item>
        </div>
      </Gallery>
    )
  },
}

export default storyMeta
