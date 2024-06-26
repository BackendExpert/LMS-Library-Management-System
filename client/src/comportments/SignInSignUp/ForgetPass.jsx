import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"


const ForgetPass = () => {
    const navigate = useNavigate()

    const [ForgetPassword, SetForgetPassword] = useState({
        email: ''
    })

    secureLocalStorage.setItem("Token1", ForgetPassword.email);

    const headleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/PassForget', ForgetPassword)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The OTP has been send to Email")
                navigate('/CheckOTP')
            }
            else{
                alert(res.data.Error)
                localStorage.clear()
            }
        })
    }

    const headleBack = () => {
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className='bg-gray-200 py-24'>
        <div className='lg:mx-20 mx-8'>
                <div onClick={headleBack} className='cursor-pointer mb-1 mx-4 flex duration-500 hover:mx-2'>
                    <span className='mt-[1px] mx-2'><MyIcons name='arrow-back'></MyIcons></span>
                    <p className="">Back to Login</p>
                </div>

            <div className="lg:flex bg-white shadow-md rounded w-full h-auto">                
            <div className="lg:mx-5 mx-0 py-12 px-10 w-full">
                    <form onSubmit={headleSubmit}>
                        <div className="my-5">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Email for Reset Password'
                            onChange={e => SetForgetPassword({...ForgetPassword, email:e.target.value})}/>
                        </div>
                        <div className="">
                            <button type='submit' className='w-full bg-red-500 rounded py-4 px-8 text-white duration-500 hover:bg-red-600 hover:shadow-md'>Request OTP</button>
                        </div>
                    </form>
                    <p>The OTP send to the Given Email Address</p>
                </div>
                <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://c1.wallpaperflare.com/preview/245/572/46/hacking-cyber-hacker-crime.jpg)] bg-center bg-cover h-auto w-full'>
                    <div className="text-white font-semibold text-3xl text-center my-16">Password Reset</div>                    
                </div>
            </div>
            <div className="my-1 text-center">
                &copy; Developed and Design by : National Institute of Fundamental Studies
            </div>
        </div>
    </div>
  )
}

export default ForgetPass