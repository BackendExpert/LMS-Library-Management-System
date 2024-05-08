import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage"
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate()

    const [UserData, SetUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const headleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/SignUp', UserData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Registation Successful")
                navigate('/SignIn')
            }
            else{
                alert(res.data.Error)
            }
        }) 
    }
    const headleBack = () => {
        window.location.reload()
    }

  return (
    <div className='bg-gray-200 py-12'>
        <div className='lg:mx-10'>
                <div onClick={headleBack} className='mb-1 mx-4 flex duration-500 hover:mx-2'>
                    <span className='mt-[1px] mx-2'><MyIcons name='arrow-back'></MyIcons></span>
                    <p className="">Back to Home</p>
                </div>
                <div className="py-2 px-10 w-full">
                    <form onSubmit={headleSubmit}>
                        <div className="my-5">
                            <label htmlFor="">Username : </label>
                            <input type="text" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Username'
                            onChange={e => SetUserData({...UserData, username:e.target.value})}/>
                        </div>
                        <div className="my-5">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Email'
                            onChange={e => SetUserData({...UserData, email:e.target.value})}/>
                        </div>
                        <div className="my-5">
                            <label htmlFor="">Password : </label>
                            <input type="password" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Password'
                            onChange={e => SetUserData({...UserData, password:e.target.value})}/>
                        </div>
                        <div className="">
                            <button type='submit' className='w-full bg-blue-500 rounded py-4 px-8 text-white duration-500 hover:bg-blue-600 hover:shadow-md'>SignUp</button>
                        </div>
                    </form>
                    <p>Already have an Account ? <Link to={'/SignIn'}><span className='text-blue-500'>SignIn</span></Link></p>
                </div>
            </div>

        </div>

  )
}

export default SignUp