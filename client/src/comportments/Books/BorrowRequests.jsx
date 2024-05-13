import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const BorrowRequests = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [BookBorrowRequests, SetBookBorrowRequests] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/BookBorrowRequest')
        .then(res => SetBookBorrowRequests(res.data))
        .catch(err => console.log(err)) 
    }, [])

    // headleAccept

    const headleAccept = (id, Email) => {
        axios.post('http://localhost:8081/AcceptBookRequest/' + id, {Email})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Request has been Accepted")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleReject

    const headleReject = (id, Email) => {
        axios.post('http://localhost:8081/RejecttBookRequest/' + id, {Email})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Request has been Rejected")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleBorrow

    const headleBorrow = (id, Email) => {
        axios.post('http://localhost:8081/BorrowAcceptBook/' + id, {Email})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book has been Borrowed")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    // headleCancelRequest

    const headleCancelRequest = (id, Email) => {
        axios.post('http://localhost:8081/BorrowCancelBook/' + id, {Email})
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Request has been Cancelled")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Borrow Requests</h1>
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
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    BookBorrowRequests.map((BookBorrow, index) => {
                                        if(BookBorrow.status === "Request" || BookBorrow.status === "Accept"){
                                            return (
                                                <tr key={index}>
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {BookBorrow.bookISBN}
                                                    </th>
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {BookBorrow.borrowEmail}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {BookBorrow.borrow_at}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            (() => {
                                                                if(BookBorrow.status === "Request"){
                                                                    return (
                                                                        <span className="text-yellow-500 font-semibold">Waiting for Approve</span>
                                                                    )
                                                                }
                                                                else if(BookBorrow.status === "Accept"){
                                                                    return (
                                                                        <span className="text-green-500 font-semibold">Approved, Waiting for Borrow</span>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            (() => {
                                                                if(BookBorrow.status === "Request"){
                                                                    return(
                                                                        <div className="flex">
                                                                            <button onClick={() => headleAccept(BookBorrow.bookISBN, BookBorrow.borrowEmail)} className="py-2 px-8 bg-green-500 text-white rounded duration-500 hover:bg-green-600">Accept Request</button>
                                                                            <button onClick={() => headleReject(BookBorrow.bookISBN, BookBorrow.borrowEmail)} className="mx-2 py-2 px-8 bg-red-500 text-white rounded duration-500 hover:bg-red-600">Reject Request</button>
                                                                        </div>
                                                                        // continue from headleReject                                                                        
                                                                        // request search function
                                                                    )
                                                                }
                                                                if(BookBorrow.status === "Accept"){
                                                                    return(
                                                                        <div className="flex">
                                                                            <button onClick={() => headleBorrow(BookBorrow.bookISBN, BookBorrow.borrowEmail)} className="py-2 px-8 bg-blue-500 text-white rounded duration-500 hover:bg-blue-600">Borrow</button>
                                                                            <button onClick={() => headleCancelRequest(BookBorrow.bookISBN, BookBorrow.borrowEmail)} className="mx-2 py-2 px-8 bg-red-500 text-white rounded duration-500 hover:bg-red-600">Cancel Request</button>
                                                                        </div>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </td>                                            
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
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

export default BorrowRequests