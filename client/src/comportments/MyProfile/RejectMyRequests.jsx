import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const RejectMyRequests = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    // fetch data rejected or Cancelled requests
    const [RejectMy, SetRejectMy] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/ReqCancelledorRejectMy/' + EmailUser)
        .then(res => SetRejectMy(res.data))
        .catch(err => console.log(err))
    }, [])

    if(RoleUser !== null && EmailUser !== null) {
        return (
            <div>
                <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                    <h1 className="font-semibold text-gray-500 text-xl">My Processing Book Requests</h1>

                        <div class="relative overflow-x-auto my-8">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Book ISBN Number
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Borrower Email
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Borrow at
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Status
                                                </th>
                                            </tr>
            
                                        </thead>
                                        <tbody>
                                            {/* {
                                                PorcessingReqs.map((Requests, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {Requests.bookISBN}
                                                            </th>
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {Requests.borrowEmail}
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {Requests.borrow_at}
                                                            </td>   
                                                            <td class="px-6 py-4">
                                                                {
                                                                    (() => {
                                                                        if(Requests.status === "Request"){
                                                                            return (
                                                                                <p className="text-blue-500 font-semibold">Requested</p>
                                                                            )
                                                                        }
                                                                        if(Requests.status === "Accept"){
                                                                            return (
                                                                                <p className="text-green-500 font-semibold">Accept</p>
                                                                            )
                                                                        }
                                                                        if(Requests.status === "Waiting"){
                                                                            return (
                                                                                <p className="text-yellow-500 font-semibold">Waiting</p>
                                                                            )
                                                                        }
                                                                    })()
                                                                }
                                                            </td>                                                          
                                                        </tr>
                                                    )
                                                })
                                            } */}
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

export default RejectMyRequests