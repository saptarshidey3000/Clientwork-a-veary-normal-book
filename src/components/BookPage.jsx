import React from 'react'

const BookPage = ({ pageNo }) => {
    return (

        <div className="flex justify-center items-center w-full h-full">

            <img src={`/book-pages/page${pageNo}.jpg`} alt="Page 1" className="w-full h-full object-cover" />

        </div>

    )
}



export default BookPage
