import React from 'react'

const MyStatus = () => {
  return (
    <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
        <h1 className="font-semibold text-gray-500 text-xl">Download My Status</h1>

        <div className="lg:grid grid-cols-3 gap-4 my-8">
            <div className="">
              <h1 className="text-gray-500">My All Borrowed Books</h1>
              <div className="m-2">
                <button className='py-2 px-8 bg-blue-500 rounded text-white duration-500 hover:bg-blue-600'>Download Data</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MyStatus