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
                                                                <p className="text-red-500 font-semibold">Deactive</p>
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