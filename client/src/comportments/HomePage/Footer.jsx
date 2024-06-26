import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import NIFSLogo from '../../assets/nifs_logo.png'

const Footer = () => {
    const footerData = [
        // for our services
        {name: "History", link: "/History"},
        {name: "Gallery", link: "#"},
        {name: "Events", link: "#"},
        {name: "Friends", link: "#"},
        {name: "Link", link: "#"},
    
    ]

    const [EmailSub, SetEmailSub] = useState({
        email: ''
    })


    const headleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/EmailSubscribe', EmailSub)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Your are Successfully Subscribe for Updates")
            }
            else{
                alert(res.data.Error)
            }
        })
    }
  return (
    <footer className='bg-[#1e293b] px-16 pt-12 pb-4 text-white'>
        <div className="lg:flex">
            <div className="lg:px-4 px-0 w-full">
                <h1 className="text-xl font-semibold font-semibold my-4 lg:text-gray-400 text-white">About us</h1>
                <img src={NIFSLogo} alt="" />
                <p className="text-md lg:text-white text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate iste suscipit nesciunt, dolore inventore provident fuga incidunt quibusdam nobis tenetur culpa at! Facilis, rerum illo? Pariatur aperiam error corporis fuga.</p>
            </div>
            <div className="lg:px-4 px-0 w-full">
                <h1 className="text-xl font-semibold font-semibold lg:text-gray-400 text-white my-4 ">Our Services</h1>
                <div className="lg:text-white text-gray-400">
                    <p className="my-5">Book Borrowing</p>   
                    <p className="my-5">Online Book Selection</p>  
                </div>
                
            </div>
            <div className="lg:px-4 px-0 w-full">
                <h1 className="text-xl font-semibold font-semibold lg:text-gray-400 text-white my-4 ">More About</h1>
                <div className="">
                {
                    footerData.map((data) => {
                        return (
                            <Link to={data.link}>
                                <p className="my-5 lg:text-white text-gray-400">{data.name}</p>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
            <div className="lg:px-4 px-0 w-full">
                <h1 className="text-xl font-semibold font-semibold my-4 lg:text-gray-400 text-white">Contact</h1>
                <p className="my-5 lg:text-white text-gray-400">lib@123.com</p>   
                <p className="my-5 lg:text-white text-gray-400">+94 XXXXXXXXX</p>  
                <p className="my-5 lg:text-white text-gray-400">Hanthana Road, kandy, Sri Lanka</p> 

                <h1 className='mt-8 font-semibold'></h1>
                <div className="flex">
                    <form onSubmit={headleSubmit}>
                        <input type="email" name="" id="" className='w-full bg-[#334155] my-2 h-14 rounded-xl pl-4 shadow-md duration-500' required placeholder='Email Address'
                        onChange={e => SetEmailSub({...EmailSub, email:e.target.value})}/>
                        <button type="submit" className='bg-blue-500 text-white shadow-md rounded-full py-2 px-4 w-full text-md text-center duration-500 hover:bg-blue-600'>Subscribe for latest Update</button>
                    </form>
                </div> 
            </div>
        </div>

        <hr className='border-t-2 border-gray-400 mt-8'/>
        <div className="text-center my-2">
            &copy; The Library System - 2024 
        </div>
    </footer>
  )
}

export default Footer