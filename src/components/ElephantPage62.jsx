import React from 'react';

const ElephantPage62 = ({
  showMagnifier,
  setShowMagnifier,
  magnifierPosition,
  setMagnifierPosition,
}) => {
  const handleClick = (e) => {
    setShowMagnifier(true);
    const rect = e.target.getBoundingClientRect();
    setMagnifierPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full h-full relative" onClick={handleClick}>
      <img
        src="/Elephant-in-the-Room/normalpage.png"
        alt="Page 62"
        className="w-full h-full object-cover"
      />

      {showMagnifier && (
        <img
          src="/Elephant-in-the-Room/magnifier-min.png"
          className="absolute w-24 h-24 pointer-events-none"
          style={{
            left: magnifierPosition.x - 48,
            top: magnifierPosition.y - 48,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default ElephantPage62;
