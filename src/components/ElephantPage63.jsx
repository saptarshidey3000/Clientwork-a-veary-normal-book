import React, { useRef, useState, useEffect } from "react";

const ElephantPage63 = ({ showMagnifier }) => {
  const ref = useRef(null);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [showElephant, setShowElephant] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // const elephantBounds = {
  //   x: 355,
  //   y: 345,
  //   width: 80,
  //   height: 80,
  // };

  const getEventPosition = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  const handleStart = (e) => {
    if (!showMagnifier || !ref.current) return;
    e.preventDefault();

    const { clientX, clientY } = getEventPosition(e);
    const rect = ref.current.getBoundingClientRect();

    // Current top-left of magnifier
    const magLeft = magnifierPosition.x - 60;
    const magTop = magnifierPosition.y - 60;

    // Calculate offset of cursor inside the magnifier
    setDragOffset({
      x: clientX - rect.left - magLeft,
      y: clientY - rect.top - magTop,
    });

    setDragging(true);
  };

  const handleMove = (e) => {
    if (!dragging || !showMagnifier || !ref.current) return;

    e.preventDefault();
    const { clientX, clientY } = getEventPosition(e);
    const rect = ref.current.getBoundingClientRect();

    // Position adjusted with drag offset
    const x = clientX - rect.left - dragOffset.x + 60;
    const y = clientY - rect.top - dragOffset.y + 60;

    // Clamp inside the container
    const clampedX = Math.max(60, Math.min(x, rect.width - 60));
    const clampedY = Math.max(60, Math.min(y, rect.height - 60));

    setMagnifierPosition({ x: clampedX, y: clampedY });

    // Show elephant if magnifier is over it
    if (
      clampedX >= elephantBounds.x &&
      clampedX <= elephantBounds.x + elephantBounds.width &&
      clampedY >= elephantBounds.y &&
      clampedY <= elephantBounds.y + elephantBounds.height
    ) {
      setShowElephant(true);
    } else {
      setShowElephant(false);
    }
  };

  const handleEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging]);

  return (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden select-none touch-none"
    >
      {/* Background base image */}
      <img
        src="/Elephant-in-the-Room/normalpage.png"
        className="w-full h-full object-cover absolute"
        alt="Normal Page"
      />

      {/* Scribble background */}
      <img
        src="/Elephant-in-the-Room/background.png"
        className="w-full h-full object-cover absolute"
        alt="Scribble"
      />

      {/* Red reveal clipped circle */}
      {showMagnifier && (
        <div
          className="absolute w-full h-full pointer-events-none z-20"
          style={{
            clipPath: `circle(53px at ${magnifierPosition.x}px ${magnifierPosition.y}px)`,
          }}
        >
          {/* Base inside clip to prevent white box */}
          <img
            src="/Elephant-in-the-Room/normalpage.png"
            className="w-full h-full object-cover absolute"
            alt="Base"
          />
          {/* Red overlay */}
          <img
            src="/Elephant-in-the-Room/redimage.png"
            className="w-full h-full object-cover absolute"
            alt="Red Reveal"
          />
        </div>
      )}

      {/* Elephant image */}
      {showElephant && (
        <img
          src="/Elephant-in-the-Room/elephant.png"
          alt="Elephant"
          className="absolute w-[80px] h-[80px] z-30 animate-bounce"
          style={{
            left: `${elephantBounds.x}px`,
            top: `${elephantBounds.y}px`,
          }}
        />
      )}

      {/* Draggable magnifier frame */}
      {showMagnifier && (
        <img
          src="/Elephant-in-the-Room/magnifier - without the red-min.png"
          className="absolute w-[120px] h-[200px] z-40 cursor-grab"
          style={{
            left: magnifierPosition.x - 60,
            top: magnifierPosition.y - 60,
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          alt="Magnifier Frame"
          draggable={false}
        />
      )}
    </div>
  );
};

export default ElephantPage63;
