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
                    alert('Your Account has been Deactive by Administration.')
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
    <div className='bg-gray-200 py-24'>
        <div className='lg:mx-20 mx-8'>
            <Link to={'/'}>
                <div className='mb-1 mx-4 flex duration-500 hover:mx-2'>
                    <span className='mt-[1px] mx-2'><MyIcons name='arrow-back'></MyIcons></span>
                    <p className="">Back to Home</p>
                </div>
            </Link>
            <div className="lg:flex bg-white shadow-md rounded w-full h-auto">
            <div className="lg:mx-5 mx-0 py-12 px-10 w-full">
                    <form onSubmit={headleSubmit}>
                        <div className="my-5">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Email'
                            onChange={e => SetLoginData({...LoginData, email:e.target.value})}/>
                        </div>
                        <div className="my-5">
                            <label htmlFor="">Password : </label>
                            <input type="password" name="" id="" className='w-full border border-gray-300 my-2 h-12 rounded pl-4 shadow-md' required placeholder='Enter Password'
                            onChange={e => SetLoginData({...LoginData, password:e.target.value})}/>
                        </div>
                        <div className="">
                            <button type='submit' className='w-full bg-blue-500 rounded py-4 px-8 text-white duration-500 hover:bg-blue-600 hover:shadow-md'>SignIn</button>
                        </div>
                    </form>
                    <p>Don't have an Account ? <Link to={'/SignUp'}><span className='text-blue-500'>SignUp</span></Link></p>
                </div>
                <div className='lg:py-[4%] py-12 lg:px-16 bg-[url(https://wallpapercave.com/wp/wp10395058.jpg)] bg-center bg-cover h-auto w-full'>
                    <div className="text-white font-semibold text-3xl text-center my-16">Welcome Back</div>                    
                </div>
            </div>
            <div className="my-1 text-center">
                &copy; Developed and Design by : National Institute of Fundamental Studies
            </div>
        </div>
    </div>
  )
}

export default SignIn