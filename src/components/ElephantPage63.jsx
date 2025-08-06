import React, { useRef, useState } from 'react';

const ElephantPage63 = ({ showMagnifier, magnifierPosition }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const rightPageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!showMagnifier) return;

    const rect = rightPageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Detect if in elephant area
    if (
      x >= 300 && x <= 450 && // adjust these values
      y >= 150 && y <= 300
    ) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  };

  return (
    <div
      ref={rightPageRef}
      className="w-full h-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Normal layer */}
      <img
        src="/Elephant-in-the-Room/normalpage.png"
        className="w-full h-full object-cover absolute"
        alt="Normal"
      />

      {/* Scribble layer */}
      <img
        src="/Elephant-in-the-Room/background.png"
        className="w-full h-full object-cover absolute"
        alt="Scribble"
      />

      {/* Red reveal inside magnifier circle */}
      {showMagnifier && (
        <div
          className="absolute w-full h-full pointer-events-none"
          style={{
            clipPath: `circle(60px at ${magnifierPosition.x}px ${magnifierPosition.y}px)`,
          }}
        >
          <img
            src="/Elephant-in-the-Room/redimage.png"
            className="w-full h-full object-cover"
            alt="Red"
          />
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="absolute top-5 right-5 bg-green-600 text-white p-3 rounded shadow-lg z-50 text-lg">
          🎉 You found the elephant!
        </div>
      )}
    </div>
  );
};

export default ElephantPage63;
