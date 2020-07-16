import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, FC } from 'react'
import { CustomGallery, DefaultLayout, layoutPropTypes, LayoutProps } from '.'
import { baseGalleryPropTypes, BaseGalleryProps } from './gallery-base'

export type GalleryProps = BaseGalleryProps & LayoutProps

/**
 * Gallery component with default Layout and UI
 */
export const Gallery: FC<GalleryProps> = ({
  children,
  options,
  id,
  onOpen,
  isOpen,
  activeIndex,
  onClose,
  ...restProps
}) => {
  const defaultLayoutRef = useRef<HTMLElement>()
  return (
    <CustomGallery
      layoutRef={defaultLayoutRef}
      ui={PhotoswipeUIDefault}
      options={options}
      id={id}
      onOpen={onOpen}
      isOpen={isOpen}
      activeIndex={activeIndex}
      onClose={onClose}
    >
      {children}
      <DefaultLayout {...restProps} ref={defaultLayoutRef} />
    </CustomGallery>
  )
}

Gallery.propTypes = {
  ...baseGalleryPropTypes,
  ...layoutPropTypes,
}
