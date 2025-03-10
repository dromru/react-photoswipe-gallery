import { createContext } from 'react'
import { InternalAPI } from './types'

export const Context = createContext<InternalAPI>({
  remove: () => {},
  set: () => {},
  handleClick: () => {},
  open: () => {},
  close: () => {},
  isRefRegistered: () => false,
})
