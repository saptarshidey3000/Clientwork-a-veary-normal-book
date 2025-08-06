import React, { useState } from 'react';
import ElephantPage62 from './ElephantPage62';
import ElephantPage63 from './ElephantPage63';

const ElephantPageWrapper = () => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      {/* Page 62 */}
      <div className="demoPage bg-blue-50 border-1">
        <ElephantPage62
          showMagnifier={showMagnifier}
          setShowMagnifier={setShowMagnifier}
          magnifierPosition={magnifierPosition}
          setMagnifierPosition={setMagnifierPosition}
        />
      </div>

      {/* Page 63 */}
      <div className="demoPage bg-blue-50 border-1">
        <ElephantPage63
          showMagnifier={showMagnifier}
          magnifierPosition={magnifierPosition}
        />
      </div>
    </>
  );
};

export default ElephantPageWrapper;
