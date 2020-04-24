import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import React, { useRef, FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { CustomGallery, DefaultLayout, layoutPropTypes, LayoutProps } from '.'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  options: PropTypes.object,
  ...layoutPropTypes,
}

type Props = InferProps<typeof propTypes>

export interface GalleryProps extends Omit<Props & LayoutProps, 'options'> {
  options?: PhotoSwipe.Options & PhotoswipeUIDefault.Options
}

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

// @ts-ignore
Gallery.propTypes = propTypes
