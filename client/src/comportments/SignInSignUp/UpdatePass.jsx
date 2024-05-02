import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"


const UpdatePass = () => {
  const navigate = useNavigate()
  const Email = secureLocalStorage.getItem("Token1");
  
  // update password
  const [PassUpdate, SetPassUpdate] = useState({
    email: '',
    newPass: '',
    cnewPass: ''
  })

  const headleSubmit = (e) => {

  }

  if(Email !== null){
    return (
      <div className='bg-gray-200 py-24'>
          <div className='lg:mx-20 mx-8'>
              <div className="lg:flex bg-white shadow-md rounded w-full h-auto">
              <div className="lg:mx-5 mx-0 py-12 px-10 w-full">
                      <form onSubmit={headleSubmit}>
                          <div className="my-5">
                              <label htmlFor="">Email : </label>
                              <input type="email" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Email'
                              onChange={e => SetPassUpdate({...PassUpdate, email:e.target.value})}/>
                          </div>
                          <div className="my-5">
                              <label htmlFor="">New Password : </label>
                              <input type="password" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter New Password'
                              onChange={e => SetPassUpdate({...PassUpdate, newPass:e.target.value})}/>
                          </div>
                          <div className="my-5">
                              <label htmlFor="">Again Password : </label>
                              <input type="password" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Again New Password'
                              onChange={e => SetPassUpdate({...PassUpdate, cnewPass:e.target.value})}/>
                          </div>
                          <div className="">
                              <button type='submit' className='w-full bg-red-500 rounded py-4 px-8 text-white duration-500 hover:bg-red-600 hover:shadow-md'>Reset Password</button>
                          </div>
                      </form>                    
                  </div>
                  <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://c1.wallpaperflare.com/preview/245/572/46/hacking-cyber-hacker-crime.jpg)] bg-center bg-cover h-auto w-full'>
                      <div className="text-white font-semibold text-3xl text-center my-16">Reset Password</div>                    
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

export default UpdatePass