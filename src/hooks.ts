import { useContext } from 'react'
import { Context } from './context'

/**
 * A hook that gives you access to provided methods for more advanced usage
 */
export const useGallery = () => {
  const { open, close } = useContext(Context)
  return {
    /**
     * Function that opens the gallery at the provided index
     */
    open,
    /**
     * Function that closes the gallery
     */
    close,
  }
}

export const useApiContext = () => useContext(Context)
