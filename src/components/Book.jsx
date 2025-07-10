import React from 'react'
import HTMLFlipBook from 'react-pageflip';

const Book = () => {
  return (
    <div className='w-[100vw] flex justify-center h-[100vh] items-center overflow-hidden relative'>
      <HTMLFlipBook className="absolute inset-0 m-auto"width={500} height={600} maxShadowOpacity={0.5} drawShadow={true} showCover={true} size='fixed'>
        <div className="demoPage bg-blue-50  border-1 "> <div className='flex justify-center items-center w-[100%] h-[100%]'> Page 1 </div> </div>
        <div className="demoPage bg-blue-50 border-1"><div className='flex justify-center items-center w-[100%] h-[100%]'>
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2JyNzJwOW93NzJrNDkyeWc4Zm50Z3NjcXdnNHVvOTd3eWlnOWM5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ov9jQX2Ow4bM5xxuM/giphy.gif"
            alt="Funny animation"
            className="w-64 h-auto"
          /> </div></div>
        <div className="demoPage bg-blue-50 border-1" ><div className='flex justify-center items-center w-[100%] h-[100%]'> <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmg5YnFjNzVkOWVtMGp4NWY5ZnptcXU3Mzdndnh3M3VraWFtdGNweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wQclSvQQKtObPx9UKY/giphy.gif"
          alt="Funny animation"
          className="w-64 h-auto"
        /> </div></div>
        <div className="demoPage bg-blue-50 border-1"><div className='flex justify-center items-center w-[100%] h-[100%]'> Page 4 </div></div>
        <div className="demoPage bg-blue-50 border-1" ><div className='flex justify-center items-center w-[100%] h-[100%]'> Page 5 </div></div>
        <div className="demoPage bg-blue-50 border-1"><div className='flex justify-center items-center w-[100%] h-[100%]'> Page 6 </div></div>
        <div className="demoPage bg-blue-50 border-1" ><div className='flex justify-center items-center w-[100%] h-[100%]'> Page 7 </div></div>
        <div className="demoPage bg-blue-50 border-1"><div className='flex justify-center items-center w-[100%] h-[100%]'> Page 8 </div></div>
      </HTMLFlipBook>
      
    </div>
  )
}

export default Book
