import React from 'react';

const ElephantPage62 = ({ setShowMagnifier }) => {
  return (
    <div
      className="w-full h-full relative"
      onClick={() => setShowMagnifier(true)}
    >
      <img
        src="/Elephant-in-the-Room/normalpage.png"
        alt="Page 62"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ElephantPage62;
