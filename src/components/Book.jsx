import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Book = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden relative bg-gradient-to-br from-pink-200 via-white to-pink-100">
      <HTMLFlipBook
        className="absolute inset-0 m-auto"
        width={500}
        height={600}
        size="fixed"
        drawShadow={true}
        maxShadowOpacity={0.5}
        showCover={true}
      >
        {/* Page 1 - img */}
<div className="demoPage bg-blue-50 border-1">
  <div className="flex justify-center items-center w-full h-full">
    <img
      src="/book-pages/page1.jpg"
      alt="Page 1"
      className="w-full h-full object-center"
      onError={(e) => { e.target.src = "/book-pages/placeholder.jpg"; }}
    />
  </div>
</div>



        {/* Page 2 - img */}
<div className="demoPage bg-blue-50 border-1">
  <div className="flex justify-center items-center w-full h-full">
    <img
      src="/book-pages/page2.jpg"
      alt="Page 2"
      className="w-full h-full object-center"
      onError={(e) => { e.target.src = "/book-pages/placeholder.jpg"; }}
    />
  </div>
</div>

        {/* Page 3 - img */}
  <div className="demoPage bg-blue-50 border-1">
  <div className="flex justify-center items-center w-full h-full">
    <img
      src="/book-pages/page3.jpg"
      alt="Page 3"
      className="w-full h-full object-center"
      onError={(e) => { e.target.src = "/book-pages/placeholder.jpg"; }}
    />
  </div>
</div>

        {/* Page 4 - Text */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            Page 4
          </div>
        </div>

        {/* Page 5 - Text */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            Page 5
          </div>
        </div>

        {/* Page 6 - Text */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            Page 6
          </div>
        </div>

        {/* Page 7 - Text */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            Page 7
          </div>
        </div>

        {/* Page 8 - Text */}
        <div className="demoPage bg-blue-50 border-1">
          <div className="flex justify-center items-center w-full h-full">
            Page 8
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
