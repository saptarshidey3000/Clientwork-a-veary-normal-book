import React, { useRef, useState } from 'react';

const ElephantPage63 = ({ showMagnifier }) => {
  const ref = useRef(null);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showElephant, setShowElephant] = useState(false);

  // Adjust this based on elephant's location
  const elephantBounds = {
    x: 355,
    y: 345,
    width: 80,
    height: 80,
  };

  const handleMouseMove = (e) => {
    if (!showMagnifier) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMagnifierPosition({ x, y });

    // Check if magnifier is over the elephant
    if (
      x >= elephantBounds.x &&
      x <= elephantBounds.x + elephantBounds.width &&
      y >= elephantBounds.y &&
      y <= elephantBounds.y + elephantBounds.height
    ) {
      setShowElephant(true);
    } else {
      setShowElephant(false);
    }
  };

  return (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
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

      {/* Magnifier red reveal clipped inside circle */}
      {showMagnifier && (
        <div
          className="absolute w-full h-full pointer-events-none z-20"
          style={{
            clipPath: `circle(60px at ${magnifierPosition.x}px ${magnifierPosition.y}px)`,
          }}
        >
          <img
            src="/Elephant-in-the-Room/redimage.png"
            className="w-full h-full object-cover"
            alt="Red Reveal"
          />
        </div>
      )}

      {/* Elephant reveal */}
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

      {/* Magnifier frame on top */}
      {showMagnifier && (
        <img
          src="/Elephant-in-the-Room/magnifier - without the red-min.png"
          className="absolute w-[120px] h-[120px] pointer-events-none z-40"
          style={{
            left: magnifierPosition.x - 60,
            top: magnifierPosition.y - 60,
          }}
          alt="Magnifier Frame"
        />
      )}
    </div>
  );
};

export default ElephantPage63;
