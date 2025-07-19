// src/components/EarContext.jsx
import { createContext, useState } from "react"

export const EarContext = createContext()

export const EarProvider = ({ children }) => {
  const [draggingEar, setDraggingEar] = useState(null)
  const [placedEars, setPlacedEars] = useState([])
  const [isEarDragging, setIsEarDragging] = useState(false)

  return (
    <EarContext.Provider
      value={{
        draggingEar,
        setDraggingEar,
        placedEars,
        setPlacedEars,
        isEarDragging,
        setIsEarDragging,
      }}
    >
      {children}
    </EarContext.Provider>
  )
}