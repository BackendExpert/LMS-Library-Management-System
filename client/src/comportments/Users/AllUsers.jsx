import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";
import SearchFilterUsers from "./SearchFilterUsers";


const AllUsers = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const [AllUser, SetAllUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/AllUsers')
        .then(res => SetAllUsers(res.data))
        .catch(err => console.log(err))
    }, [])


    // reject user Request

    const headleRejectRequest = (id) => {
        axios.post('http://localhost:8081/RejectUserRequest/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("User Request has been Rejected")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // accept user Request

    const headleAcceptRequest = (id) => {
        axios.post('http://localhost:8081/AcceptUserRequest/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("User Request has been Approved")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // to lock account

    const headleLockAccount = (id) => {
        axios.post('http://localhost:8081/LockUserAccount/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Account has been Locked Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        }) 
    }

    // unlock account

    const headleUnLockAccount = (id) => {
        axios.post('http://localhost:8081/UnLockAccount/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Account has been Unlocked Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // reject account
    const headleRejectAccount = (id) => {
        axios.post('http://localhost:8081/RejectAccount/' + id)
        .then(res => {
            if(res.data.Status === "Succcess"){
                alert("Account has been Rejected Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // set as superAdmins

    const headleSetSuperAdmin = (id) => {
        axios.post('http://localhost:8081/SetAsSuperAdmin/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Set As SuperAdmin Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleRollBack
    // this is use for rollback (set SuperAdmin again to user role)

    const headleRollBack = () => {
        axios.post('http://localhost:8081/UserRollBack/' + EmailUser)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("The User Rollback Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin"){ 
        return (
            <div className='bg-white py-4 px-8 my-8 rounded-2xl shadow-md'>
            <h1 className='text-gray-500 text-2xl font-semibold my-4'>All Users</h1>
    
            <div className="">
                    <div className="my-2">
                        {
                            (() => {
                                if(buttonValue === "FilterUsers"){
                                    return (
                                        <button onClick={() => HeadleButtonClick(0)} className="bg-red-500 py-4 px-8 rounded text-white duration-500 hover:bg-red-600">Close Filter Users</button>                        
                                    )
                                }
                                if(buttonValue === 0){
                                    return (
                                        <button onClick={() => HeadleButtonClick("FilterUsers")} className="bg-blue-500 py-4 px-8 rounded text-white duration-500 hover:bg-blue-600">Filter Users</button>                        
                                    )
                                }
                            })()
                        }
                        
                    </div>
                    {
                        (() => {
                            if(buttonValue === "FilterUsers"){
                                return (
                                    <SearchFilterUsers />
                                )
                            }
                            if(buttonValue === 0){
                                return (
                                    
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
                                                                                <div className="flex">
                                                                                    <p className="mt-2 text-red-500 font-semibold">SuperAdmin</p>
                                                                                    <button onClick={() => headleRollBack(users.Email)} className="mx-2 bg-red-500 text-white rounded py-2 px-8 duration-500 hover:bg-red-600">RollBack</button>
                                                                                </div>                                                                               
                                                                            )
                                                                        }
                                                                        if(users.is_active === 0){
                                                                            return (
                                                                                <div className="flex">
                                                                                    <button onClick={() => headleRejectRequest(users.Email)} className="py-2 px-4 rounded bg-red-500 text-white duration-500 hover:bg-red-600">Reject Request</button>
                                                                                    <button onClick={() => headleAcceptRequest(users.Email)} className="mx-2 py-2 px-4 rounded bg-green-500 text-white duration-500 hover:bg-green-600">Accept Request</button>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        else{
                                                                            return (
                                                                                <div className="flex">
                                                                                    <button onClick={() => headleSetSuperAdmin(users.Email)} className="text-white bg-red-500 py-2 px-4 rounded duration-500 hover:bg-red-600 hover:text-white hover:shadow-md">
                                                                                        Set as SuperAdmin
                                                                                    </button>
                                                                                    {
                                                                                        (() => {
                                                                                            if(users.is_lock === 0){
                                                                                                return (
                                                                                                    <button onClick={() => headleLockAccount(users.Email)} className="mx-2 text-white bg-red-500 py-2 px-4 rounded duration-500 hover:bg-red-600 hover:text-white hover:shadow-md">
                                                                                                        Lock Account
                                                                                                    </button> 
                                                                                                )
                                                                                            }
                                                                                            if(users.is_lock === 1){
                                                                                                return (
                                                                                                    <div className="">
                                                                                                        <button  onClick={() => headleUnLockAccount(users.Email)} className="mx-2 text-white bg-green-500 py-2 px-4 rounded duration-500 hover:bg-green-600 hover:text-white hover:shadow-md">
                                                                                                            Unlock Account
                                                                                                        </button>
                                                                                                        <button  onClick={() => headleRejectAccount(users.Email)}className="mx-2 text-white bg-red-500 py-2 px-4 rounded duration-500 hover:bg-red-600 hover:text-white hover:shadow-md">
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
                                )
                            }
                        })()
                    }

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