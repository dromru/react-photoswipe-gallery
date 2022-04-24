import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, Story } from '@storybook/react'
import { Gallery, Item, GalleryProps } from '..'

const storyMeta: Meta = {
  title: 'Demo/Custom UI Elements',
}

export const thumbnailsInOpenedPhotoswipe: Story = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  }

  const uiElements: GalleryProps['uiElements'] = [
    {
      name: 'bulletsIndicator',
      order: 9,
      isButton: false,
      appendTo: 'wrapper',
      onInit: (el, pswpInstance) => {
        let prevIndex = -1
        const thumbnails = []

        /* eslint-disable no-param-reassign */
        el.style.position = 'absolute'
        el.style.bottom = '20px'
        el.style.left = '10px'
        el.style.right = '0'
        el.style.display = 'grid'
        el.style.gridGap = '10px'
        el.style.gridTemplateColumns = 'repeat(auto-fit, 40px)'
        el.style.gridTemplateRows = 'repeat(auto-fit, 40px)'
        el.style.justifyContent = 'center'
        /* eslint-enable no-param-reassign */

        for (let i = 0; i < pswpInstance.options.dataSource.length; i++) {
          const slideData = pswpInstance.options.dataSource[i]

          const thumbnail = document.createElement('div')
          thumbnail.style.transition = 'transform 0.15s ease-in'
          thumbnail.style.opacity = '0.6'
          thumbnail.style.cursor = 'pointer'
          thumbnail.onclick = (e: MouseEvent) => {
            const target = e.target as HTMLImageElement | HTMLDivElement
            const thumbnailEl =
              target.tagName === 'IMG' ? target.parentElement : e.target
            pswpInstance.goTo(thumbnails.indexOf(thumbnailEl))
          }

          const thumbnailImage = document.createElement('img')
          thumbnailImage.setAttribute('src', slideData.msrc)
          thumbnailImage.style.width = '100%'
          thumbnailImage.style.height = '100%'
          thumbnailImage.style.objectFit = 'cover'

          thumbnail.appendChild(thumbnailImage)

          el.appendChild(thumbnail)

          thumbnails.push(thumbnail)
        }

        pswpInstance.on('change', (a) => {
          if (prevIndex >= 0) {
            const prevThumbnail = thumbnails[prevIndex]
            prevThumbnail.style.opacity = '0.6'
            prevThumbnail.style.cursor = 'pointer'
            prevThumbnail.style.transform = 'scale(1)'
          }

          const currentThumbnail = thumbnails[pswpInstance.currIndex]
          currentThumbnail.style.opacity = '1'
          currentThumbnail.style.cursor = 'unset'
          currentThumbnail.style.transform = 'scale(1.2)'

          prevIndex = pswpInstance.currIndex
        })
      },
    },
  ]

  return (
    <Gallery uiElements={uiElements}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 171px 171px',
          gridTemplateRows: '114px 114px',
          gridGap: 12,
        }}
      >
        <Item
          original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
          thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
          width="1600"
          height="1600"
          alt="Photo of seashore by Folkert Gorter"
        >
          {({ ref, open }) => (
            <img
              style={{ cursor: 'pointer' }}
              src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
              ref={ref as React.MutableRefObject<HTMLImageElement>}
              onClick={open}
            />
          )}
        </Item>
        <Item
          original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
          thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
          width="1600"
          height="1068"
          alt="Photo of mountain lake by Samuel Rohl"
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
              ref={ref as React.MutableRefObject<HTMLImageElement>}
              onClick={open}
            />
          )}
        </Item>
        <Item
          original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
          thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
          width="1600"
          height="1066"
          alt="Photo of fog in the village by Ales Krivec"
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
              ref={ref as React.MutableRefObject<HTMLImageElement>}
              onClick={open}
            />
          )}
        </Item>
        <Item
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
              ref={ref as React.MutableRefObject<HTMLImageElement>}
              onClick={open}
            />
          )}
        </Item>
        <Item
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
              ref={ref as React.MutableRefObject<HTMLImageElement>}
              onClick={open}
            />
          )}
        </Item>
      </div>
    </Gallery>
  )
}

export default storyMeta
