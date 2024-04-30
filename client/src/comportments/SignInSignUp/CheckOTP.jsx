import React, {useEffect, useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"


const CheckOTP = () => {
    const navigate = useNavigate()
    const Email = secureLocalStorage.getItem("Token1");

    const [OTPNo, SetOTPNo] = useState({
        otp: ''
    })
    // 622220
    const headleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/OTPCheck/' + Email, OTPNo)
        .then(res => {
            if(res.data.Status === "Success"){
                const Token1 = res.data.token;
                localStorage.setItem('NewToken1', Token1)
                alert("OTP Check Successful")
                navigate('/UpdatePass')
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(Email !== null){
        return (
            <div className='bg-gray-200 py-24'>
                <div className='lg:mx-20 mx-8'>
                    <div className="lg:flex bg-white shadow-md rounded w-full h-auto">       
                    <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://c1.wallpaperflare.com/preview/245/572/46/hacking-cyber-hacker-crime.jpg)] bg-center bg-cover h-auto w-full'>
                        <div className="text-white font-semibold text-3xl text-center my-16">Verify OTP</div>                    
                    </div>         
                    <div className="lg:mx-5 mx-0 py-12 px-10 w-full">
                            <form onSubmit={headleSubmit}>
                                <div className="my-5">
                                    <label htmlFor="">OTP Number : </label>
                                    <input type="number" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Email for Reset Password'
                                    onChange={e => SetOTPNo({...OTPNo, otp:e.target.value})}/>
                                </div>
                                <div className="">
                                    <button type='submit' className='w-full bg-red-500 rounded py-4 px-8 text-white duration-500 hover:bg-red-600 hover:shadow-md'>Verify OTP</button>
                                </div>
                            </form>
                            <p>Enter the OTP that you reseved in Email</p>
                        </div>
                    </div>
                    <div className="my-1 text-center">
                        &copy; Developed and Design by : National Institute of Fundamental Studies
                    </div>
                </div>
            </div>
          )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }

}

export default CheckOTP