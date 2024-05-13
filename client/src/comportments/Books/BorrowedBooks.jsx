import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"



const BorrowedBooks = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // fetch data from book_borrowed_request status as borrowed
    const [BookBorroed, SetBookBorrowed] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/BookBorrowedData')
        .then(res => SetBookBorrowed(res.data))
        .catch(err => console.log(err)) 
    }, [])


    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Borrowed Books</h1>

                {
                    (() => {
                        if(buttonValue === 0){
                            return (
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
                                                BookBorroed.map((book, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {book.bookISBN}
                                                            </th>
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {book.borrowEmail}
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {book.borrow_at}
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <span className="text-blue-500 font-semibold">{book.status}</span>
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <button onClick={() => headleReturn(book.bookISBN, book.borrowEmail)} className="bg-blue-500 text-white rounded py-2 px-8 duration-500 hover:bg-blue-600">Return</button>
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
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }
}

export default BorrowedBooks