import React, { useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import Footer from './Footer'
import  secureLocalStorage  from  "react-secure-storage";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from '../SignInSignUp/SignUp';
import SignIn from '../SignInSignUp/SignIn';
import HomeQuote from './HomeQuote';
import NIFSLogo from '../../assets/nifs_logo.png';

// import styles
import '../../styles/app.css'

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

    const logout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    // use for all sites to set dark mode
    localStorage.setItem("darkMode", Darkmode)

    
    // https://wallpapercave.com/wp/wp12420121.jpg

    // change to dark mode
    const [Darkmode, SerDarkmode] = useState(false)

    const styles = {
        background: 'linear-gradient(to right, #001B3A, rgba(0,0,0,0.9)), url("https://wallpapercave.com/wp/wp12420121.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
  return (
    <div>
        <div className='py-14 lg:px-16 px-4 h-full lg:h-auto h-auto' style={styles}>
            <div className="bg-none text-white mt-[-20px]">
                <div className="lg:flex justify-between mx-16">
                    <div className="flex">
                        <div className="lg:flex">
                            <div className="lg:flex text-gray-300">
                                <span className='mr-4'><img src={NIFSLogo} alt="" className='h-12 w-auto'/></span>
                                <h1 className="my-4 whitespace-nowrap">NIFS Library</h1>

                                {
                                    (() => {
                                        if(RoleUser !== null && EmailUser !== null){
                                            return (
                                                <div className="">
                                                    <Link to={'/Dashboard'}>
                                                        <h1 className="my-4 mx-8">Dashboard</h1>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        else{
                                            return (
                                                <div className="lg:flex my-4 mx-8 ">
                                                    <div className="">
                                                        <h1 onClick={() => HeadleButtonClick(0)} className="mx-4 cursor-pointer duration-500 hover:text-white">Home</h1>
                                                    </div>
                                                    <div className="">
                                                        <h1 onClick={() => HeadleButtonClick('SignUp')} className="mx-4 cursor-pointer duration-500 hover:text-white">Join</h1>
                                                    </div>
                                                    <div className="">
                                                        <h1 onClick={() => HeadleButtonClick('SignIn')} className="mx-4 cursor-pointer duration-500 hover:text-white">SignIn</h1>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </div>
                        

                    </div>
                    <div className="my-1">                   
                        <div className="">    
                        {
                            (() => {
                                if(RoleUser !== null && EmailUser !== null){
                                    return (
                                        <div className="flex">
                                            <p className="mx-2">{EmailUser}</p>
                                            <p className="font-semibold duration-500 hover:mr-2 cursor-pointer" onClick={logout}>Logout</p>
                                        </div>
                                        
                                    )
                                }
                                else{
                                    return (
                                        <div className=""></div>
                                    )
                                }
                            })()
                        }                 
                            <div className="my-4">
                                {
                                    Darkmode === false ? 
                                        <button onClick={() => SerDarkmode(true)}><MyIcons name='moon'></MyIcons></button>
                                    : 
                                        <button onClick={() => SerDarkmode(false)}><MyIcons name='sunny'></MyIcons></button>
                                }
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="lg:grid grid-cols-2 gap-4 lg:mx-8 mx-8 ">
                <div className="lg:my-0 my-12">
                    {/* <p className="text-white text-2xl">{buttonValue}</p> */}
                    {
                        (() => {
                            if(buttonValue === 0){
                                return (
                                    <HomeQuote />
                                )
                            }
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
        <hr />
        <div className={`lg:py-16 py-20 text-center ${Darkmode === true ? 'dark-mode duration-500' : 'light-mode duration-500'}`}>
            <h1 className={`text-4xl font-semibold ${Darkmode === false ? 'text-gray-500' : 'text-white'}`}>The Library of NIFS</h1>
            <p className="lg:mx-36 mx-8 my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium exercitationem quis cupiditate veniam eligendi ut magnam expedita, similique consectetur, amet ratione sequi eos voluptatibus repellat cumque. Maiores, deserunt cumque. Laboriosam?
            </p>
        </div>
        <div className={`lg:px-24 px-10 py-20 ${Darkmode === true ? 'dark-mode duration-500' : 'light-mode bg-gray-200 duration-500'}`}>
            <h1 className={`text-center text-4xl font-semibold text-gray-500 mb-16 ${Darkmode === false ? 'text-gray-500' : 'text-white'}`}>Our Services</h1>
            <div className="lg:flex justify-between my-4">
                <div className={`bg-white rounded py-10 px-8 shadow-md mx-2 lg:my-0 my-2 w-full  ${Darkmode === false ? 'text-gray-500' : 'text-gray-200 bg-[#2c3646]'}`}>
                    <div className="flex">
                        <span className='my-4 mr-4'><MyIcons name='book' size='large'></MyIcons></span>
                        <div className="">
                            <h1 className='text-xl font-semibold'>Book Borrowing</h1>
                            <p className="py-2">Easy to Find and Borrow Books</p> 
                        </div>
                    </div>
                </div>
                <div className={`bg-white rounded py-10 px-8 shadow-md mx-2 lg:my-0 my-2 w-full  ${Darkmode === false ? 'text-gray-500' : 'text-gray-200 bg-[#2c3646]'}`}>
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
        <div className={`lg:px-20 px-6 py-24  ${Darkmode === true ? 'dark-mode duration-500' : 'bg-white light-mode duration-500'}`}>
            <h1 className={`text-center text-4xl font-semibold text-gray-500 my-8 ${Darkmode === false ? 'text-gray-500' : 'text-white'}`}>Latest Books</h1>
            <div className="lg:flex my-24">
                <div className={`bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full ${Darkmode === false ? 'text-gray-500' : 'text-gray-200 bg-[#2c3646]'}`}>
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
                <div className={`bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full ${Darkmode === false ? 'text-gray-500' : 'text-gray-200 bg-[#2c3646]'}`}>
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
                <div className={`bg-gray-200 py-8 px-4 mx-4 lg:my-0 my-12 rounded-lg shadow-xl lg:w-full ${Darkmode === false ? 'text-gray-500' : 'text-gray-200 bg-[#2c3646]'}`}>
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
                <Link to={'/ViewAllBooks'}>
                    <button className={`py-2 px-8 rounded shadow-md duration-500 ${Darkmode === true ? "bg-[#2c3646]" : "bg-gray-300 hover:bg-gray-400"}`}>Browse more books</button>    
                </Link>
            </div>       
        </div>
        <Footer />
    </div>
  )
}

export default HomePage