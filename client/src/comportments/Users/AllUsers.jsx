import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";


const AllUsers = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [AllUser, SetAllUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/AllUsers')
        .then(res => SetAllUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser === "SuperAdmin"){
        return (
            <div className='bg-white py-4 px-8 my-8 rounded-2xl shadow-md'>
            <h1 className='text-gray-500 text-2xl font-semibold my-4'>All Users</h1>
    
            <div className="">
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllUser.map((users, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {users.username}
                                            </th>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {users.Email}
                                            </th>
                                            <td class="px-6 py-4">
                                                {users.Role}
                                            </td>
                                            <td class="px-6 py-4">
                                                {
                                                    (() => {
                                                        if(users.is_active === 1){
                                                            return (
                                                                <p className="text-green-500 font-semibold">Active</p>
                                                            )
                                                        }
                                                        else if(users.is_active === 0){
                                                            return (
                                                                <p className="text-blue-500 font-semibold">Waiting for Activate</p>
                                                            )
                                                        }

                                                    })()
                                                }
                                                
                                            </td>
                                            <td class="px-6 py-4">
                                                {
                                                    (() => {
                                                        if(users.Email === EmailUser){
                                                            return (
                                                                <div className="text-red-500 font-semibold">Current Login SuperAdmin</div>
                                                            )
                                                        }
                                                        if(users.Role === "SuperAdmin"){
                                                            return (
                                                                <div className=""></div>
                                                            )
                                                        }
                                                        if(users.is_active === 0){
                                                            return (
                                                                <div className="flex">
                                                                    <button className="py-2 px-4 rounded bg-red-500 text-white duration-500 hover:bg-red-600">Reject Request</button>
                                                                    <button className="mx-2 py-2 px-4 rounded bg-green-500 text-white duration-500 hover:bg-green-600">Accept Request</button>
                                                                </div>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <div className="flex">
                                                                    <button className="text-white bg-red-500 py-2 px-4 rounded duration-500 hover:bg-red-600 hover:text-white hover:shadow-md">
                                                                        Set as SuperAdmin
                                                                    </button>
                                                                    {
                                                                        (() => {
                                                                            if(users.is_lock === 0){
                                                                                return (
                                                                                    <button className="mx-2 text-white bg-red-500 py-2 px-4 rounded duration-500 hover:bg-red-600 hover:text-white hover:shadow-md">
                                                                                        Lock Account
                                                                                    </button> 
                                                                                )
                                                                            }
                                                                            if(users.is_lock === 1){
                                                                                return (
                                                                                    <div className="">
                                                                                        <button className="mx-2 text-white bg-green-500 py-2 px-4 rounded duration-500 hover:bg-green-600 hover:text-white hover:shadow-md">
                                                                                            Unlock Account
                                                                                        </button>
                                                                                        <button className="mx-2 text-white bg-green-500 py-2 px-4 rounded duration-500 hover:bg-green-600 hover:text-white hover:shadow-md">
                                                                                            Reject Account
                                                                                        </button>  
                                                                                    </div>
                                                                                    
                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                </div>

                                                            )
                                                        }
                                                    })()
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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

export default AllUsers