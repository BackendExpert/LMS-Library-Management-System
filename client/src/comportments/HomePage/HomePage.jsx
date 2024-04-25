import React from 'react'
import Navbar from './Navbar'

const HomePage = () => {
  return (
    <div>
        <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://wallpapercave.com/wp/wp10890262.jpg)] bg-center bg-cover lg:h-[80vh] h-screen w-full'>
            <Navbar />
            <div className="text-white text-center my-12">
                <h1 className="text-3xl font-semibold">Welcome to Library of NIFS</h1>
            </div>
        </div>
        <div className="bg-white lg:mx-24 mx-8 py-16 px-12 lg:mt-[-100px] mt-[-280px] rounded shadow-2xl lg:mb-40 mb-20">
            Library
        </div>
    </div>
  )
}

export default HomePage