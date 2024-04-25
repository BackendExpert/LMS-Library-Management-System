import React from 'react'
import Navbar from './Navbar'
import MyIcons from '@reacticons/ionicons'

// https://wallpapercave.com/wp/wp10395041.jpg
// https://wallpapercave.com/wp/wp10395058.jpg
const HomePage = () => {
  return (
    <div>
        <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://wallpapercave.com/wp/wp10395041.jpg)] bg-center bg-cover lg:h-[80vh] h-screen w-full'>
            <Navbar />
            <div className="text-white text-center my-12">
                <h1 className="text-3xl font-semibold">Welcome to Library of NIFS</h1>
            </div>
        </div>
        <div className="bg-white lg:mx-24 mx-8 py-16 px-12 lg:my-[-100px] my-[-280px] rounded shadow-2xl lg:mb-40 mb-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed ratione possimus quia assumenda, in dicta voluptatibus, deserunt et odio veniam ullam voluptate enim ea sit quasi, blanditiis laborum perspiciatis?
            Deleniti voluptatum eum quod consequatur quas ratione vero illo esse expedita a, architecto totam dolores harum velit molestias non fugit obcaecati quae ipsum at. Suscipit et iste iusto hic eaque.
        </div>
        <div className="lg:my-8  text-center">
            <h1 className="text-4xl font-semibold text-gray-500">The Library of NIFS</h1>
            <p className="lg:mx-36 mx-8 my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium exercitationem quis cupiditate veniam eligendi ut magnam expedita, similique consectetur, amet ratione sequi eos voluptatibus repellat cumque. Maiores, deserunt cumque. Laboriosam?
            </p>
        </div>
        <div className="bg-gray-200 lg:px-24 px-10 py-20 ">
            <h1 className="text-center text-4xl font-semibold text-gray-500 mb-16">Our Services</h1>
            <div className="lg:flex justify-between my-4">
                <div className="bg-white rounded py-10 px-8 shadow-md mx-2 lg:my-0 my-2 w-full">
                    <div className="flex">
                        <span className='my-4 mr-4'><MyIcons name='book' size='large'></MyIcons></span>
                        <div className="">
                            <h1 className='text-xl font-semibold'>Book Borrowing</h1>
                            <p className="py-2">Easy to Find and Borrow Books</p> 
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded py-10 px-8 shadow-md mx-2 lg:my-0 my-2 w-full">
                    <div className="flex">
                        <span className='my-4 mr-2'><MyIcons name='globe' size='large'></MyIcons></span>
                        <div className="">
                            <h1 className='text-xl font-semibold'>Online Book Selection</h1>
                            <p className="py-2">Select any Book Via Online</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white lg:mx-20 mx-6 my-24">
            <h1 className="text-center text-4xl font-semibold text-gray-500 my-8">Latest Books</h1>
            <div className="lg:flex my-24">
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-24 rounded-lg shadow-xl ">
                    <div className="my-8 mx-8">
                        <div className=" w-full">
                            <span className='font-semibold'>Book Name: </span>
                            <span className=''>Introduction to Computing</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-24 rounded-lg shadow-xl">
                   
                    <div className="my-8 mx-8">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi animi quo consequuntur vero possimus, rerum, accusantium asperiores vitae aperiam veritatis deleniti iste id delectus quam eligendi a veniam qui similique?
                    </div>
                </div>
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-24 rounded-lg shadow-xl">
                    
                    <div className="my-8 mx-8">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi animi quo consequuntur vero possimus, rerum, accusantium asperiores vitae aperiam veritatis deleniti iste id delectus quam eligendi a veniam qui similique?
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage