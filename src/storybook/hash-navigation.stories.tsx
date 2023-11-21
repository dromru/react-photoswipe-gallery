import React, { useEffect, useState } from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item } from '..'

const storyMeta: Meta = {
  title: 'Demo/Hash Navigation',
  decorators: [
    (StoryComponent: Story) => {
      const [isFrame, setIsFrame] = useState(false)
      useEffect(() => {
        setIsFrame(window.location !== window.parent.location)
      }, [])
      return (
        <>
          {isFrame && (
            <p>
              ℹ️ Open this page in new tab using button in the top right corner
              of the Storybook UI to check hash navigation functionality.
            </p>
          )}
          <StoryComponent />
        </>
      )
    },
  ],
}

export const hashNavigation: Story = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  }
  return (
    <Gallery id="my-gallery">
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
          // You can pass string id
          id="first-pic"
        >
          {({ ref, open }) => (
            <img
              style={{ cursor: 'pointer' }}
              src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
              ref={ref}
              onClick={open}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
          thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
          width="1600"
          height="1068"
          alt="Photo of mountain lake by Samuel Rohl"
          // You can pass number id
          id={999}
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
              ref={ref}
              onClick={open}
            />
          )}
        </Item>
        <Item<HTMLImageElement>
          original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
          thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
          width="1600"
          height="1066"
          alt="Photo of fog in the village by Ales Krivec"
          // Or you can miss id (photo index will be used automatically)
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
              ref={ref}
              onClick={open}
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
          {({ ref, open }) => (
            <img
              style={{ ...smallItemStyles, gridColumnStart: 2 }}
              src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
              ref={ref}
              onClick={open}
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
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
              ref={ref}
              onClick={open}
            />
          )}
        </Item>
      </div>
    </Gallery>
  )
}

export default storyMeta
