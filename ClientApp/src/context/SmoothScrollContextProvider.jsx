import { createContext, useContext, useEffect } from "react"
import Scrollbar from "smooth-scrollbar"
import OverScrollPlugin from "smooth-scrollbar/plugins/overscroll"

const ScrollScrollContext = createContext()

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    Scrollbar.use(OverScrollPlugin)
  }, [])

  return (
    <ScrollScrollContext.Provider value={Scrollbar}>
      {children}
    </ScrollScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(ScrollScrollContext)

export default SmoothScrollProvider