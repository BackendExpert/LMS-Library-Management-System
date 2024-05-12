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
                                        Action
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    BookBorrowRequests.map((BookBorrow, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {books.bookISBN}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {books.borrowEmail}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {books.borrow_at}
                                                </td>
                                            </tr>
                                        )
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