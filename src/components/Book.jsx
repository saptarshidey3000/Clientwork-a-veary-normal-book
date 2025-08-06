"use client"

import { useRef, useState, useCallback, useContext, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import BookPage from "./BookPage"
import RandomizerPage from "./RandomizerPage"
import { SpillTheBeansFirstPage, SpillTheBeansSecondPage } from "./SpillTheBeans"
import AppleEyeReflection from "./AppleEyeReflection"
import EarPage74 from "./EarPage74"
import EarDropPage75 from "./EarDropPage75"
import { EarContext } from "./EarContext"
import ElephantPage62 from './ElephantPage62';
import ElephantPage63 from './ElephantPage63';




const Book = () => {
  const bookRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [glassBreakVisible, setGlassBreakVisible] = useState(false)
  const hammerRef = useRef(null)
  const [hammerPosition, setHammerPosition] = useState({ x: 39, y: 75 })
  const [isCustomDragging, setIsCustomDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [currentPage, setCurrentPage] = useState(0)
  const [clickedBeans, setClickedBeans] = useState([])
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });


  // Add ear context and drag position state
  const { draggingEar, isEarDragging, setIsEarDragging, setDraggingEar } = useContext(EarContext)
  const [earDragPosition, setEarDragPosition] = useState({ x: 0, y: 0 })

  // Update the combined dragging state
  const isAnyDragging = isDragging || isCustomDragging || isEarDragging




  const bounceOffVariant = {
    initial: { opacity: 1, scale: 1, y: 0 },
    exit: {
      y: -200,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.27, 1.55], // bounce-like easing
      },
    },
  }


  // Safely disable/enable flip book
  const disableFlipBook = useCallback(() => {
    if (bookRef.current && bookRef.current.style) {
      bookRef.current.style.pointerEvents = "none"
      bookRef.current.style.touchAction = "none"
    }
  }, [])

  const handleFlip = (e) => {
    setCurrentPage(e.data)
    console.log(currentPage) // ✅ Update page number on flip
  }

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

  // Update handleMouseMove with ear dragging logic
  const handleMouseMove = useCallback(
    (e) => {
      // Add ear dragging logic at the start
      if (draggingEar) {
        setEarDragPosition({
          x: e.clientX - draggingEar.offsetX,
          y: e.clientY - draggingEar.offsetY,
        })
      }

      // Keep existing hammer dragging logic
      if (!isCustomDragging) return
      e.stopPropagation()
      const interactiveZone = document.querySelector(".interactive-zone")
      if (!interactiveZone) return
      const rect = interactiveZone.getBoundingClientRect()
      const newX = ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100
      const newY = ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100
      const clampedX = Math.max(0, Math.min(85, newX))
      const clampedY = Math.max(0, Math.min(85, newY))
      // Set the style directly
      hammerRef.current.style.left = `${clampedX}%`
      hammerRef.current.style.top = `${clampedY}%`
    },
    [isCustomDragging, draggingEar], // Add draggingEar to dependencies
  )

  const handleMouseUp = useCallback(
    (e) => {
      if (!isCustomDragging) return
      console.log("Mouse up - checking drop")
      setIsCustomDragging(false)
      setIsDragging(false)
      // Check if dropped anywhere on the glass image (page3.jpg)
      const page3Background = document.querySelector(".page3-background")
      console.log(page3Background.getBoundingClientRect())
      if (page3Background) {
        const backgroundRect = page3Background.getBoundingClientRect()
        const hammerElement = document.querySelector(".draggable-hammer")
        if (hammerElement) {
          const hammerRect = hammerElement.getBoundingClientRect()
          const hammerCenterX = hammerRect.left + hammerRect.width / 2
          const hammerCenterY = hammerRect.top + hammerRect.height / 2
          const adjustedTop = 247.87
          const adjustedBottom = 500
          const adjustedLeft = 818.64
          const adjustedRight = 1217.36
          // Check if hammer touches any part of the glass image
          if (
            hammerCenterX >= adjustedLeft &&
            hammerCenterX <= adjustedRight &&
            hammerCenterY >= adjustedTop &&
            hammerCenterY <= adjustedBottom
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

  // Update handleTouchMove with ear dragging logic
  const handleTouchMove = useCallback(
    (e) => {
      // Add ear dragging logic at the start
      if (draggingEar) {
        e.preventDefault()
        const touch = e.touches[0]
        setEarDragPosition({
          x: touch.clientX - draggingEar.offsetX,
          y: touch.clientY - draggingEar.offsetY,
        })
      }

      // Keep existing hammer touch logic
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
      hammerRef.current.style.left = `${clampedX}%`
      hammerRef.current.style.top = `${clampedY}%`
    },
    [isCustomDragging, draggingEar], // Add draggingEar to dependencies
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

  // Add global mouse/touch end handlers for ears
  const handleGlobalMouseUp = useCallback(() => {
    if (draggingEar) {
      setDraggingEar(null)
      setIsEarDragging(false)
    }
  }, [draggingEar, setDraggingEar, setIsEarDragging])

  const handleGlobalTouchEnd = useCallback(() => {
    if (draggingEar) {
      setDraggingEar(null)
      setIsEarDragging(false)
    }
  }, [draggingEar, setDraggingEar, setIsEarDragging])

  // Add useEffect to attach global listeners
  useEffect(() => {
    if (isEarDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.addEventListener("touchend", handleGlobalTouchEnd)

      return () => {
        document.removeEventListener("mouseup", handleGlobalMouseUp)
        document.removeEventListener("touchend", handleGlobalTouchEnd)
      }
    }
  }, [isEarDragging, handleGlobalMouseUp, handleGlobalTouchEnd])

  // Prevent any page flip events during drag
  const handleInteractiveZoneEvents = useCallback(
    (e) => {
      if (isDragging) {
        e.stopPropagation()
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
      {/* Update dragging overlay condition */}
      {isAnyDragging && <div className="fixed inset-0 z-[9998] bg-transparent pointer-events-auto" />}

      {/* Add dragging ear visualization */}
      {draggingEar && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <img
            src={draggingEar.src || "/placeholder.svg"}
            alt="Dragging ear"
            className="absolute w-12 h-auto pointer-events-none opacity-80 scale-110 drop-shadow-lg"
            style={{
              left: earDragPosition.x,
              top: earDragPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}

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
        useMouseEvents={false}


      >
        {/* Page 1 */}
        <div className="demoPage bg-blue-50 border-1">
          <BookPage pageNo={1} />
        </div>
        {/* Page 2 */}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={2} />
        </div>
        {/* Page 3 - Interactive */}
        <div className="demoPage bg-white border-l relative overflow-hidden">
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
                ref={hammerRef}
                src="/book-pages/hammer.png"
                alt="Hammer"
                className={`draggable-hammer absolute w-20 z-20  ${isDragging ? "cursor-grabbing scale-130 " : "cursor-grab hover:scale-105"
                  }`}
                style={{
                  left: `${hammerPosition.x}%`,
                  top: `${hammerPosition.y}%`,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  pointerEvents: "auto",
                  filter: isDragging ? "none" : "none",
                }}
                onMouseDown={handleHammerMouseDown}
                onTouchStart={handleTouchStart}
              />
            </div>
          )}
        </div>
        {/* Pages 4-18 */}
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i + 4} className={`demoPage bg-blue-50  ${(i + 4) % 2 !== 0 ? "border-l" : ""}`}>
            <BookPage pageNo={i + 4} />
          </div>
        ))}
        {/*page 19*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/CATFISH.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 20*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={20} />
        </div>
        {/*page 21*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/CHEESECAKE.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 22*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={22} />
        </div>
        {/*page 23*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/DOUGHNUT.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 24*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={24} />
        </div>
        {/*page 25*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/EARWORM.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 26*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={26} />
        </div>
        {/*page 27*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/GREYSCALE.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 28*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={28} />
        </div>
        {/*page 29*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/RAINBOW.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 30*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={30} />
        </div>
        {/*page 31*/}
        <div className="demoPage bg-blue-50 border-l">
          <div className="flex justify-center items-center w-full h-full">
            <img src="/idioms/JELLYFISH.gif" alt="Page 19" className="w-full h-full object-cover" />
          </div>
        </div>
        {/*page 32*/}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={32} />
        </div>
        {/*page 33*/}
        <div className="demoPage bg-blue-50 border-l">
          <BookPage pageNo={33} />
        </div>
        {/*page 34 - 52*/}
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i + 34} className={`demoPage bg-blue-50  ${(i + 34) % 2 !== 0 ? "border-l" : ""}`}>
            <BookPage pageNo={i + 34} />
          </div>
        ))}
        {/*page 52*/}
        {/* Page 52 with clean background and layered beans */}
        <div className="demoPage bg-white  relative overflow-hidden">
          <SpillTheBeansFirstPage clickedBeans={clickedBeans} setClickedBeans={setClickedBeans} />
        </div>
        {/*page 53*/}
        <div className="demoPage bg-blue-50 border-l">
          <SpillTheBeansSecondPage clickedBeans={clickedBeans} />
        </div>
        {/*page 54 - 61*/}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i + 54} className={`demoPage bg-blue-50  ${(i + 54) % 2 !== 0 ? "border-l" : ""}`}>
            <BookPage pageNo={i + 54} />
          </div>
        ))}
        <div className="demoPage bg-blue-50 border-1">
          <ElephantPage62 setShowMagnifier={setShowMagnifier} />
        </div>
        <div className="demoPage bg-blue-50 border-1">
          <ElephantPage63 showMagnifier={showMagnifier} />
        </div>
        {/*page 64 - 73*/}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i + 64} className={`demoPage bg-blue-50  ${(i + 64) % 2 !== 0 ? "border-l" : ""}`}>
            <BookPage pageNo={i + 64} />
          </div>
        ))}
        {/*page 74-75 ear section*/}
        {/* 🧠 Page 74 - draggable ears */}
        <div className="demoPage bg-[#fdf1d7] ">
          <EarPage74 setIsDragging={setIsDragging} />
        </div>
        {/* 🧍 Page 75 - drop target (human body) */}
        <div className="demoPage bg-[#fdf1d7] border-l">
          <EarDropPage75 />
        </div>
        {/*page 76-77 randomizer section*/}
        <div className="demoPage bg-blue-50 ">
          <div className="flex justify-center items-center w-full h-full">
            {/* <button
              onClick={getRandomNumbers}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Randomize
            </button> */}
          </div>
        </div>
        <div className="demoPage bg-blue-50 border-l">
          <RandomizerPage />
        </div>
        {/*page 78-79 apple eye */}
        <div className="demoPage bg-blue-50 ">
          <BookPage pageNo={104} />
        </div>
        <div className="demoPage bg-blue-50 border-l">

          <AppleEyeReflection currentPage={currentPage} />
        </div>

      </HTMLFlipBook>

      {/* Navigation Buttons */}

      <button
        className="px-4 py-2 absolute  left-0 w-[20rem] h-[100rem]  max-md:w-[3rem] max-xl:w-[7rem] "
        onClick={() => bookRef.current.pageFlip().flipPrev()}
      >

      </button>
      <button
        className="px-4 py-2  absolute  right-0 w-[20rem] h-[100rem]  max-md:w-[3rem] max-xl:w-[7rem] "
        onClick={() => bookRef.current.pageFlip().flipNext()}
      >

      </button>

    </div>
  )
}

export default Book
