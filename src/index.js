import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, useContext, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

export { default as PhotoswipeLayoutDefault } from './PhotoswipeLayout'

const GalleryContext = React.createContext()

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

const findIndexByRef = (array, ref) => {
  for (let i = 0; i < array.length; i++) {
    if (ref === array[i].ref) return i
  }
  return -1
}

export const Gallery = ({ children, layout: Layout, ui, options }) => {
  const tplRef = useRef()
  const items = useRef([])

  const handleClick = useCallback(ref => {
    const normalized = items.current.map(
      ({ thumbRef, width, height, title, full, thumb }) => ({
        ...(title ? { title } : {}),
        w: width,
        h: height,
        src: full,
        msrc: thumb,
        thumbRef: thumbRef.current,
      }),
    )
    new PhotoSwipe(tplRef.current, ui, normalized, {
      ...(options || {}),
      index: findIndexByRef(items.current, ref),
      getThumbBoundsFn: i =>
        normalized[i].thumbRef && getElBounds(normalized[i].thumbRef),
    }).init()
  }, [])

  const update = useCallback(data => {
    items.current = items.current.filter(({ ref: r }) => r !== data.ref)
    items.current.push(data)
  }, [])

  return (
    <GalleryContext.Provider value={{ update, handleClick }}>
      {children}
      <Layout ref={tplRef} />
      {/* TODO: shared layout */}
    </GalleryContext.Provider>
  )
}

export const Item = ({ children, ...restProps }) => {
  const ref = useRef()
  const thumbRef = useRef()
  const { update, handleClick } = useContext(GalleryContext)
  const open = useCallback(() => handleClick(ref), [handleClick])

  useLayoutEffect(() => {
    update({ ref, thumbRef, ...restProps })
  })

  return children({ open, thumbRef })
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
  full: PropTypes.string.isRequired,
  thumb: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
}

Item.defaultProps = {
  thumb: null,
  title: null,
}
