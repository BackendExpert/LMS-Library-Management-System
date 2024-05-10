import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyIcons from '@reacticons/ionicons'
import axios from 'axios'
import  secureLocalStorage  from  "react-secure-storage";
import NIFSLogo from '../../assets/nifs_logo.png';

const Navbar = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const logout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

  return (
    <div className='mb-20'>
        <div className="bg-none text-white mt-[-20px]">
            <div className="lg:flex justify-between mx-16">
                <div className="flex">
                    <div className="lg:flex">
                        <div className="lg:flex">
                            <span className='mr-4'><img src={NIFSLogo} alt="" className='h-12 w-auto'/></span>
                            <h1 className="my-4 whitespace-nowrap">NIFS Library</h1>
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

                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar