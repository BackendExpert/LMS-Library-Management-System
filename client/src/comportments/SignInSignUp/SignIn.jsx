import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"

const SignIn = () => {
    const navigate = useNavigate()

    const [LoginData, SetLoginData] = useState({
        email: '',
        password: ''
    }) 

    const headleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8081/SignIn', LoginData)
            
            const loginToken = res.data.Token;

            //store token in localstorage
            localStorage.setItem('LoginToken', loginToken)
            
            // //get and store login user role and email
            // const userRole = res.data.LoginUser[0].role;
            // const userEmail = res.data.LoginUser[0].email;

            // //store data in localstore so that use secureLocalStorage
            // secureLocalStorage.setItem("Login1", userRole);
            // secureLocalStorage.setItem("login2", userEmail);

            //login to system

            if(res.data.Msg === "Success"){
                if(res.data.LoginUser[0].is_active === 0 && res.data.LoginUser[0].is_lock === 1){
                    alert('Your Account has been locked. Unauthorized activity has been detected.')
                    localStorage.clear()
                    navigate('/')
                }
                else if(res.data.LoginUser[0].is_active === 0){
                    alert('Your Account is still not Activate Wait for Activate from Admin')
                    localStorage.clear()
                    navigate('/')
                }
                else{
                    //get and store login user role and email
                    const userRole = res.data.LoginUser[0].Role;
                    const userEmail = res.data.LoginUser[0].Email;

                    //store data in localstore so that use secureLocalStorage
                    secureLocalStorage.setItem("Login1", userRole);
                    secureLocalStorage.setItem("login2", userEmail);
                    navigate('/Dashboard');
                }
            }
            else{
                alert(res.data.Error)
            }

        }        
        catch(err){
            console.log(err)
        }

    }

  return (
    <div className='bg-none py-8 rounded text-white'>
        <div className=''>
            <div className="mx-0 py-12 px-10 w-full">
                    <h1 className="text-gray-500 font-semibold">WELCOME TO LIBRARY</h1>
                    <h1 className="">Create New Account</h1>
                    <form onSubmit={headleSubmit}>
                        <div className="my-5">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className='bg-transparent w-full border border-gray-300 my-2 h-12 rounded-xl pl-4 shadow-md' required placeholder='Enter Email'
                            onChange={e => SetLoginData({...LoginData, email:e.target.value})}/>
                        </div>
                        <div className="my-5">
                            <label htmlFor="">Password : </label>
                            <input type="password" name="" id="" className='bg-transparent w-full border border-gray-300 my-2 h-12 rounded-xl pl-4 shadow-md' required placeholder='Enter Password'
                            onChange={e => SetLoginData({...LoginData, password:e.target.value})}/>
                        </div>
                        <div className="">
                            <button type='submit' className='w-full bg-blue-500 rounded py-4 px-8 text-white duration-500 hover:bg-blue-600 hover:shadow-md'>SignIn</button>
                        </div>
                    </form>
                    <span className="text-blue-500"><Link to={'/ForgetPass'}>Forget Password</Link></span>
                </div>
            </div>
        </div>
  )
}

export default SignIn