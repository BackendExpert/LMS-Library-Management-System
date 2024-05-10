import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyIcons from '@reacticons/ionicons'
import axios from 'axios'
import  secureLocalStorage  from  "react-secure-storage";


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

    </div>
  )
}

export default Navbar