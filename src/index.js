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

export const Gallery = ({ children, layout: Layout, ui, options }) => {
  const tplRef = useRef()
  const items = useRef([])
  const findByRef = useCallback(
    ref =>
      items.current.reduce(
        (res, cur, i) => (cur.ref === ref && !res.length ? [cur, i] : res),
        [],
      ),
    [],
  )
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
    const [, index] = findByRef(ref)
    new PhotoSwipe(tplRef.current, ui, normalized, {
      ...(options || {}),
      index,
      getThumbBoundsFn: i => getElBounds(normalized[i].thumbRef),
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

export const Item = ({ src, msrc, title, width, height, children }) => {
  const ref = useRef()
  const thumbRef = useRef()
  const { items, handleClick } = useContext(GalleryContext)
  const open = useCallback(() => handleClick(ref), [handleClick])
  useEffect(() => {
    items.current.push({ ref, thumbRef, src, msrc, title, width, height })
    return () => {
      items.current = items.current.filter(({ ref: r }) => r !== ref)
    }
  }, [src, msrc, title, width, height])
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
