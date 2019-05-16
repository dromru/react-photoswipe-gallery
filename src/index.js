import PhotoSwipe from 'photoswipe'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, useCallback, useContext, useEffect } from 'react'
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
      ({ ref: _, thumbRef, width, height, title, ...rest }) => ({
        ...rest,
        ...(title ? { title } : {}),
        w: width,
        h: height,
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

  return (
    <GalleryContext.Provider value={{ items, handleClick }}>
      {children}
      <Layout ref={tplRef} />
      {/* TODO: shared layout */}
    </GalleryContext.Provider>
  )
}

export const Item = ({ children, ...restProps }) => {
  const ref = useRef()
  const thumbRef = useRef()
  const { items, handleClick } = useContext(GalleryContext)
  const open = useCallback(() => handleClick(ref), [handleClick])

  useEffect(() => {
    items.current.push({ ref, thumbRef })
    return () => {
      items.current = items.current.filter(({ ref: r }) => r !== ref)
    }
  }, [])

  useEffect(() => {
    const index = findIndexByRef(items.current, ref)
    if (index !== -1) {
      items.current[index] = { ...items.current[index], restProps }
    }
  }, Object.values(restProps))

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
  src: PropTypes.string.isRequired,
  msrc: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string,
}

Item.defaultProps = {
  msrc: null,
  title: null,
}
