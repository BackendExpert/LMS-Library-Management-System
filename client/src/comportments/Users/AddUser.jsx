import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";


const AddUser = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Add New User</h1>
                
                <div className="my-2">
                    <form>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Username : </label>
                                <input type="text" name="" id="" required placeholder="Enter Username" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Email : </label>
                                <input type="email" name="" id="" required placeholder="Enter Email" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Password : </label>
                                <input type="password" name="" id="" required placeholder="Enter Password" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Password : </label>
                               
                            </div>
                        </div>
                    </form>
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

export default AddUser