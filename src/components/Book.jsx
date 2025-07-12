
import { useRef, useState, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"

const Book = () => {
  const bookRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [glassBreakVisible, setGlassBreakVisible] = useState(false)
  const [hammerPosition, setHammerPosition] = useState({ x: 10, y: 20 })
  const [isCustomDragging, setIsCustomDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [currentPage, setCurrentPage] = useState(0);

  // Safely disable/enable flip book
  const disableFlipBook = useCallback(() => {
    if (bookRef.current && bookRef.current.style) {
      bookRef.current.style.pointerEvents = "none"
      bookRef.current.style.touchAction = "none"
    }
  }, [])

  const handleFlip = (e) => {
    setCurrentPage(e.data);
    console.log(currentPage) // ✅ Update page number on flip
  };

  const enableFlipBook = useCallback(() => {
    if (bookRef.current && bookRef.current.style) {
      bookRef.current.style.pointerEvents = "auto"
      bookRef.current.style.touchAction = "auto"
    }
  }, [])

  const handleHammerMouseDown = useCallback(
    (e) => {
      console.log("Hammer mouse down - starting custom drag")
      e.stopPropagation()

      const rect = e.currentTarget.getBoundingClientRect()
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      setIsCustomDragging(true)
      setIsDragging(true)
      disableFlipBook()
    },
    [disableFlipBook],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isCustomDragging) return

      e.preventDefault()
      e.stopPropagation()

      const interactiveZone = document.querySelector(".interactive-zone")
      if (!interactiveZone) return

      const rect = interactiveZone.getBoundingClientRect()
      const newX = ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100
      const newY = ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100

      const clampedX = Math.max(0, Math.min(85, newX))
      const clampedY = Math.max(0, Math.min(85, newY))

      setHammerPosition({ x: clampedX, y: clampedY })
    },
    [isCustomDragging],
  )

  const handleMouseUp = useCallback(
    (e) => {
      if (!isCustomDragging) return

      console.log("Mouse up - checking drop")
      setIsCustomDragging(false)
      setIsDragging(false)

      // Check if dropped anywhere on the glass image (page3.jpg)
      const page3Background = document.querySelector(".page3-background")
      if (page3Background) {
        const backgroundRect = page3Background.getBoundingClientRect()
        const hammerElement = document.querySelector(".draggable-hammer")

        if (hammerElement) {
          const hammerRect = hammerElement.getBoundingClientRect()
          const hammerCenterX = hammerRect.left + hammerRect.width / 2
          const hammerCenterY = hammerRect.top + hammerRect.height / 2

          // Check if hammer touches any part of the glass image
          if (
            hammerCenterX >= backgroundRect.left &&
            hammerCenterX <= backgroundRect.right &&
            hammerCenterY >= backgroundRect.top &&
            hammerCenterY <= backgroundRect.bottom
          ) {
            console.log("Hammer touched the glass image!")
            setGlassBreakVisible(true)
            // Glass crack stays visible - no auto-hide
          }
        }
      }

      enableFlipBook()
    },
    [isCustomDragging, enableFlipBook],
  )

  const handleTouchStart = useCallback(
    (e) => {
      console.log("Touch start - starting custom drag")
      e.stopPropagation()

      const touch = e.touches[0]
      const rect = e.currentTarget.getBoundingClientRect()

      dragOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }

      setIsCustomDragging(true)
      setIsDragging(true)
      disableFlipBook()
    },
    [disableFlipBook],
  )

  const handleTouchMove = useCallback(
    (e) => {
      if (!isCustomDragging) return

      e.stopPropagation()

      const touch = e.touches[0]
      const interactiveZone = document.querySelector(".interactive-zone")
      if (!interactiveZone) return

      const rect = interactiveZone.getBoundingClientRect()
      const newX = ((touch.clientX - rect.left - dragOffset.current.x) / rect.width) * 100
      const newY = ((touch.clientY - rect.top - dragOffset.current.y) / rect.height) * 100

      const clampedX = Math.max(0, Math.min(85, newX))
      const clampedY = Math.max(0, Math.min(85, newY))

      setHammerPosition({ x: clampedX, y: clampedY })
    },
    [isCustomDragging],
  )

  const handleTouchEnd = useCallback(
    (e) => {
      if (!isCustomDragging) return

      console.log("Touch end - checking drop")
      setIsCustomDragging(false)
      setIsDragging(false)

      // Check if dropped anywhere on the glass image
      const page3Background = document.querySelector(".page3-background")
      if (page3Background) {
        const backgroundRect = page3Background.getBoundingClientRect()
        const hammerElement = document.querySelector(".draggable-hammer")

        if (hammerElement) {
          const hammerRect = hammerElement.getBoundingClientRect()
          const hammerCenterX = hammerRect.left + hammerRect.width / 2
          const hammerCenterY = hammerRect.top + hammerRect.height / 2

          if (
            hammerCenterX >= backgroundRect.left &&
            hammerCenterX <= backgroundRect.right &&
            hammerCenterY >= backgroundRect.top &&
            hammerCenterY <= backgroundRect.bottom
          ) {
            console.log("Hammer touched the glass image via touch!")
            setGlassBreakVisible(true)
            // Glass crack stays visible - no auto-hide
          }
        }
      }

      enableFlipBook()
    },
    [isCustomDragging, enableFlipBook],
  )

  // Prevent any page flip events during drag
  const handleInteractiveZoneEvents = useCallback(
    (e) => {
      if (isDragging) {
        e.stopPropagation()
        e.preventDefault()
      }
    },
    [isDragging],
  )

  return (
    <div
      className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden relative bg-gradient-to-br from-pink-200 via-white to-pink-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full screen overlay during drag to prevent any page interactions */}
      {isDragging && <div className="fixed inset-0 z-[9998] bg-transparent pointer-events-auto" />}

      <HTMLFlipBook
        ref={bookRef}
        className="absolute inset-0 m-auto"
        width={500}
        height={600}
        size="fixed"
        drawShadow={true}
        maxShadowOpacity={0.5}
        showCover={true}
        onFlip={handleFlip}
        disableFlipByClick={true}


      >
        {/* Page 1 */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/book-pages/page1.jpg" alt="Page 1" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Page 2 */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/book-pages/page2.jpg" alt="Page 2" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Page 3 - Interactive */}
        <div className="demoPage bg-white border-1 relative overflow-hidden">
          {/* Background Glass Image - This is the drop target */}
          <img
            src="/book-pages/page3.jpg"
            alt="Page 3"
            className="page3-background w-full h-full object-cover absolute inset-0 z-0"
          />

          {/* Full Page Glass Break Animation - Replaces entire page when cracked */}
          {glassBreakVisible && (
            <div className="absolute inset-0 z-50 pointer-events-none ">
              <img
                src="/book-pages/glass crack.gif"
                alt="Glass Breaking"
                className="w-[73%] h-[33%] mx-auto top-57 relative"
                style={{
                  opacity: 1,
                }}
              />
            </div>
          )}

          {/* Interactive Zone - Only visible when glass is NOT cracked */}
          {!glassBreakVisible && (
            <div
              className="interactive-zone absolute inset-0 z-5"
              onMouseDown={handleInteractiveZoneEvents}
              onTouchStart={handleInteractiveZoneEvents}
              onMouseMove={handleInteractiveZoneEvents}
              onTouchMove={handleInteractiveZoneEvents}
            >
              {/* Draggable Hammer */}
              <img
                src="/book-pages/hammer.png"
                alt="Hammer"
                className={`draggable-hammer absolute w-20 z-20 transition-all duration-200 ${isDragging ? "cursor-grabbing scale-110 " : "cursor-grab hover:scale-105"
                  }`}
                style={{
                  left: `${hammerPosition.x}%`,
                  top: `${hammerPosition.y}%`,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  pointerEvents: "auto",
                  filter: isDragging ? "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" : "none",
                }}
                onMouseDown={handleHammerMouseDown}
                onTouchStart={handleTouchStart}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Pages 4-18 */}
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i + 4} className="demoPage bg-blue-50 border-1">
            <div className="flex justify-center items-center w-full h-full">
              <img src={`/book-pages/page${i + 4}.jpg`} alt={`Page ${i + 4}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  )
}

export default Book
