import React from 'react'
import { Context } from './context'

export const useGallery = () => {
  const { open } = React.useContext(Context)
  return {
    open,
  }
}
