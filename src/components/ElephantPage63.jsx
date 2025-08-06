import React, { useRef, useState, useEffect } from 'react';


const ElephantPage63 = ({ showMagnifier }) => {
  const ref = useRef(null);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [showElephant, setShowElephant] = useState(false);


  const elephantBounds = {
    x: 355,
    y: 345,
    width: 80,
    height: 80,
  };

  // Handle start of drag
  const handleMouseDown = (e) => {
    if (!showMagnifier) return;
    e.preventDefault();
    setDragging(true);

  };

  // Handle drag movement
  const handleMouseMove = (e) => {
    if (!dragging || !showMagnifier || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(false);

  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden select-none"
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
          <img
            src="/Elephant-in-the-Room/redimage.png"
            className="w-full h-full object-cover"
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
          onMouseDown={handleMouseDown}
          alt="Magnifier Frame"
          draggable={false}
        />
      )}
    </div>
  );
};

export default ElephantPage63;

