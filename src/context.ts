import { createContext } from 'react'
import { InternalAPI } from './types.js'

export const Context = createContext<InternalAPI>({
  remove: () => {},
  set: () => {},
  handleClick: () => {},
  open: () => {},
})
