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

export const Gallery = ({ children, layout: Layout, ui, options }) => {
  const tplRef = useRef()
  const items = useRef(new Map())

  const handleClick = useCallback(ref => {
    const normalized = []
    let index = 0
    let i = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const [
      r,
      { thumbRef, width, height, title, full, thumb },
    ] of items.current) {
      if (r === ref) {
        index = i
      }
      normalized.push({
        ...(title ? { title } : {}),
        w: width,
        h: height,
        src: full,
        msrc: thumb,
        thumbRef: thumbRef.current,
      })
      i++
    }
    new PhotoSwipe(tplRef.current, ui, normalized, {
      ...(options || {}),
      index,
      getThumbBoundsFn: thumbIndex =>
        normalized[thumbIndex].thumbRef &&
        getElBounds(normalized[thumbIndex].thumbRef),
    }).init()
  }, [])

  const remove = useCallback(ref => {
    items.current.delete(ref)
  }, [])

  const update = useCallback((ref, data) => {
    items.current.set(ref, data)
  }, [])

  return (
    <GalleryContext.Provider value={{ remove, update, handleClick }}>
      {children}
      <Layout ref={tplRef} />
      {/* TODO: shared layout */}
    </GalleryContext.Provider>
  )
}

export const Item = ({ children, ...restProps }) => {
  const ref = useRef()
  const thumbRef = useRef()
  const { remove, update, handleClick } = useContext(GalleryContext)
  const open = useCallback(() => handleClick(ref), [handleClick])

  useLayoutEffect(() => {
    remove(ref)
    update(ref, { thumbRef, ...restProps })
    return () => remove(ref)
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
