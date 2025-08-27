import { useContext, useRef, useCallback } from "react"
import { EarContext } from "./EarContext"

const dropTargets = [
  { x: 45, y: 20 }, // Head area
  { x: 55, y: 20 },
  { x: 40, y: 35 }, // Upper torso  
  { x: 60, y: 35 },
  { x: 35, y: 50 }, // Mid torso
  { x: 65, y: 50 },
  { x: 42, y: 65 }, // Lower area
  { x: 58, y: 65 },
  { x: 50, y: 80 }  // Bottom
]

const EarDropPage75 = () => {
  const {
    draggingEar,
    setDraggingEar,
    placedEars,
    setPlacedEars,
    setIsEarDragging
  } = useContext(EarContext)
  const pageRef = useRef(null)

  const findNearestDropTarget = useCallback((mouseX, mouseY, rect) => {
    const relativeX = ((mouseX - rect.left) / rect.width) * 100
    const relativeY = ((mouseY - rect.top) / rect.height) * 100

    let nearestTarget = null
    let minDistance = Infinity

    dropTargets.forEach((target, index) => {
      const isOccupied = placedEars.some(ear => ear.targetIndex === index)
      if (isOccupied) return

      const distance = Math.sqrt(
        Math.pow(relativeX - target.x, 2) + Math.pow(relativeY - target.y, 2)
      )

      if (distance < minDistance && distance < 15) { // 15% threshold
        minDistance = distance
        nearestTarget = { ...target, targetIndex: index }
      }
    })

    return nearestTarget
  }, [placedEars])

  const handleMouseUp = useCallback((e) => {
    if (!draggingEar || !pageRef.current) return

    const rect = pageRef.current.getBoundingClientRect()
    const nearestTarget = findNearestDropTarget(e.clientX, e.clientY, rect)

    if (nearestTarget) {
      setPlacedEars(prev => [
        ...prev,
        {
          ...draggingEar,
          x: nearestTarget.x,
          y: nearestTarget.y,
          targetIndex: nearestTarget.targetIndex,
          placedAt: Date.now()
        }
      ])
    }

    setDraggingEar(null)
    setIsEarDragging(false)
  }, [draggingEar, findNearestDropTarget, setPlacedEars, setDraggingEar, setIsEarDragging])

  const handleTouchEnd = useCallback((e) => {
    if (!draggingEar || !pageRef.current) return

    const touch = e.changedTouches[0]
    const rect = pageRef.current.getBoundingClientRect()
    const nearestTarget = findNearestDropTarget(touch.clientX, touch.clientY, rect)

    if (nearestTarget) {
      setPlacedEars(prev => [
        ...prev,
        {
          ...draggingEar,
          x: nearestTarget.x,
          y: nearestTarget.y,
          targetIndex: nearestTarget.targetIndex,
          placedAt: Date.now()
        }
      ])
    }

    setDraggingEar(null)
    setIsEarDragging(false)
  }, [draggingEar, findNearestDropTarget, setPlacedEars, setDraggingEar, setIsEarDragging])

  return (
    <div
      ref={pageRef}
      className="relative w-full h-full"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src="/book-pages/page75.jpg"
        alt="Human Body"
        className="absolute inset-0 w-full h-full object-contain z-0"
      />

      {/* Drop Target Indicators (only visible when dragging) */}
      {draggingEar && dropTargets.map((target, index) => {
        const isOccupied = placedEars.some(ear => ear.targetIndex === index)
        if (isOccupied) return null

        return (
          <div
            key={index}
            className="absolute w-8 h-8 border-2 border-dashed border-blue-400 bg-blue-100/50 rounded-full animate-pulse z-10"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )
      })}

      {/* Placed Ears */}
      {placedEars.map((ear, i) => (
        <img
          key={`${ear.id}-${i}-${ear.placedAt}`}
          src={ear.src}
          alt={`Placed ear ${ear.id}`}
          className="absolute w-12 h-auto pointer-events-none z-20"
          style={{
            left: `${ear.x}%`,
            top: `${ear.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}


    </div>
  )
}

export default EarDropPage75