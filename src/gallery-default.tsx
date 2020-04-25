import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, FC } from 'react'
import PropTypes from 'prop-types'
import { CustomGallery, DefaultLayout, layoutPropTypes, LayoutProps } from '.'

export interface GalleryProps extends LayoutProps {
  /**
   * PhotoSwipe options
   */
  options?: PhotoSwipe.Options & PhotoswipeUIDefault.Options

  /**
   * Gallery ID, for hash navigation
   */
  id?: string | number
}

/**
 * Gallery component with default Layout and UI
 */
export const Gallery: FC<GalleryProps> = ({
  children,
  options,
  id,
  ...restProps
}) => {
  const defaultLayoutRef = useRef<HTMLElement>()
  return (
    <CustomGallery
      layoutRef={defaultLayoutRef}
      ui={PhotoswipeUIDefault}
      options={options}
      id={id}
    >
      {children}
      <DefaultLayout {...restProps} ref={defaultLayoutRef} />
    </CustomGallery>
  )
}

Gallery.propTypes = {
  options: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...layoutPropTypes,
}
