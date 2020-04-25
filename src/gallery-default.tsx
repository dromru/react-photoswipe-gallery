import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, FC } from 'react'
import PropTypes from 'prop-types'
import { CustomGallery, DefaultLayout, layoutPropTypes, LayoutProps } from '.'

export interface GalleryProps extends LayoutProps {
  /**
   * PhotoSwipe options
   */
  options?: PhotoSwipe.Options & PhotoswipeUIDefault.Options
}

/**
 * Gallery component with default Layout and UI
 */
export const Gallery: FC<GalleryProps> = ({
  children,
  options,
  ...restProps
}) => {
  const defaultLayoutRef = useRef<HTMLElement>()
  return (
    <CustomGallery
      layoutRef={defaultLayoutRef}
      ui={PhotoswipeUIDefault}
      options={options}
    >
      {children}
      <DefaultLayout {...restProps} ref={defaultLayoutRef} />
    </CustomGallery>
  )
}

Gallery.propTypes = {
  options: PropTypes.object,
  ...layoutPropTypes,
}
