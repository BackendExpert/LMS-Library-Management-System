import React, { useState } from 'react'
import Navbar from './Navbar'
import MyIcons from '@reacticons/ionicons'
import Footer from './Footer'
import  secureLocalStorage  from  "react-secure-storage";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from '../SignInSignUp/SignUp';
import SignIn from '../SignInSignUp/SignIn';
import Welcome from './Welcome';

// https://wallpapercave.com/wp/wp10395041.jpg
// https://wallpapercave.com/wp/wp10395058.jpg
const HomePage = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }
    
    // https://wallpapercave.com/wp/wp10055128.jpg

    const styles = {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://wallpapercave.com/wp/wp10055128.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
  return (
    <div>
        <div className='py-14 lg:px-16 px-4 h-full lg:h-auto h-auto' style={styles}>
            <Navbar />
            <div className="lg:grid grid-cols-2 gap-4 lg:mx-8 mx-8 ">
                <div className="lg:my-12 my-auto">
                    <p className="text-white lg:text-5xl text-2xl lib-title text-center">
                        "A library is a house of hope. It's a place where we all, whatever our situation, can feed our ideas and develop our dreams"
                    </p>
                    <p className="text-white my-8 text-xl text-righ text-center">
                        —Doug Wilhelm
                    </p>

                    <div className="">
                        <div className="lg:flex lg:mx-20 mx-2">
                            <button onClick={() => HeadleButtonClick("SignUp")} className='w-full lg:my-0 my-2 bg-white text-black py-4 px-8 rounded-full duration-500 hover:bg-transparent hover:text-white hover:border border-white'>Be a Member</button>
                            <button onClick={() => HeadleButtonClick("SignIn")} className='w-full lg:my-0 my-2 lg:mx-8 mx-0 bg-transparent border border-white text-white py-4 px-8 rounded-full duration-500 hover:bg-white hover:text-black'>Sign IN</button>
                        </div>
                    </div>
                </div>
                <div className="lg:my-0 my-12">
                    {/* <p className="text-white text-2xl">{buttonValue}</p> */}
                    {
                        (() => {
                            if(buttonValue === "SignUp"){
                                return(
                                    <SignUp />
                                )
                            }
                            if(buttonValue === "SignIn"){
                                return (
                                    <SignIn />
                                )
                            }
                        })()
                    }
                </div>
            </div>
        </div>
        {/* <div className="bg-white lg:mx-24 mx-8 py-16 px-12 lg:my-[-100px] my-[-280px] rounded shadow-2xl lg:mb-40 mb-20">

            {
                (() => {
                    if(RoleUser !== null && EmailUser !== null){
                        return (
                            <div className="">

                            </div>
                        )
                    }
                    else{
                        return (
                            <div className="">
                                <h1 className="text-gray-500 text-xl font-semibold">Search Books</h1>
                                <div className="my">
                                        <div className="lg:flex justify-between ">
                                            <div className="w-full">
                                                <input type="text" name="" id="" required placeholder='Book Title' className='w-full h-12 rounded border border-blue-500 shadow-md pl-2'
                                                onChange={e => SetBooksearch({...Booksearch, bookTitle:e.target.value})}/>
                                                <p>(For Advanced Search Login to System)</p>
                                            </div>    
                                            <button type="submit" className='py-2 px-24 text-blue-500 font-semibold w-auto mx-8 rounded duration-500 hover:bg-blue-500 hover:text-white'>SearchBook</button>

                                        </div>

                                </div>
                            </div>
                        )
                    }
                })()
            }
        </div> */}
        <div className="lg:my-16 my-20 text-center">
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
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full">
                    <div className="my-8 mx-8">
                        <div className="">
                            <p className='font-semibold'>Book Name: </p>
                            <p className=''>Introduction to Computing</p>
                        </div>
                        <div className="my-2">
                            <p className='font-semibold'>Authors : </p>
                            <p className=''>Kamal, Nimali, Perera</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full">
                    <div className="my-8 mx-8">
                        <div className="">
                            <p className='font-semibold'>Book Name: </p>
                            <p className=''>Introduction to Computing</p>
                        </div>
                        <div className="my-2">
                            <p className='font-semibold'>Authors : </p>
                            <p className=''>Kamal, Nimali, Perera</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full">
                    <div className="my-8 mx-8">
                        <div className="">
                            <p className='font-semibold'>Book Name: </p>
                            <p className=''>Introduction to Computing</p>
                        </div>
                        <div className="my-2">
                            <p className='font-semibold'>Authors : </p>
                            <p className=''>Kamal, Nimali, Perera</p>
                        </div>
                    </div>
                </div>         
            </div>
            <div className="text-center">
                    <button className='bg-gray-300 py-2 px-8 rounded shadow-md duration-500 hover:bg-gray-400'>Browse more books</button>    
            </div>       
        </div>
        <Footer />
    </div>
  )
}

export default HomePage