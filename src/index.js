import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React from 'react'
import PropTypes from 'prop-types'

const renderItemDefault = ({ imgRef, onClick, src, msrc, title }) => (
  <a key={src} href={src} onClick={onClick}>
    <img ref={imgRef} src={msrc || src} alt={title || ''} />
  </a>
)

// eslint-disable-next-line no-unused-vars
export const Item = ({ renderItem, src, msrc, title, width, height }) => <></>

export { default as PhotoswipeLayoutDefault } from './PhotoswipeLayout'

const getElBounds = el => {
  const pageXScroll = window.pageXOffset || document.documentElement.scrollLeft
  const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + pageXScroll,
    y: rect.top + pageYScroll,
    w: rect.width,
  }
}

export const Gallery = ({ children, layout: Layout, ui, options }) => {
  const tplRef = React.createRef()
  const items = []
  const data = []
  const openGallery = index => {
    new PhotoSwipe(tplRef.current, ui, data, {
      ...(options || {}),
      index,
      getThumbBoundsFn: i => getElBounds(data[i].imgRef.current),
    }).init()
  }
  React.Children.forEach(
    children,
    ({ props: { renderItem, src, msrc, width, height, title } }, index) => {
      const imgRef = React.createRef()
      items.push(
        renderItem({
          imgRef,
          src,
          msrc,
          onClick: e => {
            e.preventDefault()
            openGallery(index)
          },
        }),
      )
      data.push({
        imgRef,
        src,
        w: width,
        h: height,
        ...(title ? { title } : {}),
      })
    },
  )
  return (
    <>
      {items}
      <Layout ref={tplRef} />
    </>
  )
}

Gallery.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  layout: PropTypes.any.isRequired,
  ui: PropTypes.func,
  options: PropTypes.object,
}

Gallery.defaultProps = {
  ui: PhotoswipeUIDefault,
  options: null,
}

Item.propTypes = {
  renderItem: PropTypes.func,
  src: PropTypes.string.isRequired,
  msrc: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string,
}

Item.defaultProps = {
  renderItem: renderItemDefault,
  msrc: null,
  title: null,
}

renderItemDefault.propTypes = {
  imgRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element !== 'undefined' ? Element : Object,
    ),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  msrc: PropTypes.string,
  title: PropTypes.string,
}

renderItemDefault.defaultProps = {
  msrc: null,
  title: null,
}
