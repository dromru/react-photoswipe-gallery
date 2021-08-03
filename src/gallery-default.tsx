/* eslint-disable react/prop-types */

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
  ...restProps
}) => {
  const defaultLayoutRef = useRef<HTMLElement>()
  return (
    <CustomGallery
      // layoutRef={defaultLayoutRef}
      options={options}
      id={id}
      onOpen={onOpen}
    >
      {children}
      <DefaultLayout {...restProps} ref={defaultLayoutRef} />
    </CustomGallery>
  )
}

// TODO
// Gallery.propTypes = {
//   ...baseGalleryPropTypes,
//   ...layoutPropTypes,
// }
