import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import AddBook from "./AddBook";
import SearchBook from "./SearchBook";
import BorrowedBooks from "./BorrowedBooks";
import SelectedBooks from "./SelectedBooks";
import axios from "axios";
import BorrowRequests from "./BorrowRequests";


const Books = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const [CountBook, SetCoutBooks] = useState(0)
    const [BookBorrowRequests, SetBorrowRequests] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const BKCount = await axios.get('http://localhost:8081/BooksCount');
                SetCoutBooks(BKCount.data.BKCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            // / count book borrow request
            try {
                const BKBorrowRequests = await axios.get('http://localhost:8081/CountBorrowRequests');
                SetBorrowRequests(BKBorrowRequests.data.BorrowRequestBooks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();
    }, [])

    const BookData = [
        {id: 1, btnValue: "Books", name: "Books", value: <CountUp end={CountBook}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "bkBorrow", name: "Books Borrowed", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        // {id: 3, btnValue: "bkSelected", name: "Books Selected", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 3, btnValue: "BorrowRequest", name: "Borrow Requests", value: <CountUp end={BookBorrowRequests}/>, icon: <Icons name="help-circle" size="large"></Icons>, style: 'text-blue-500'},
        {id: 4, btnValue: "add_book", name: "Add New Book", icon: <Icons name="add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]

    if(RoleUser === "SuperAdmin" || RoleUser === "user"){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">Books</h1>
                </div>
                <div className="">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            BookData.map((Book) => {
                                if(RoleUser === "SuperAdmin"){
                                    if(Book.id !== 4){
                                        return (
                                            <div onClick={() => HeadleButtonClick(Book.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Book.style}`}>                                       
                                                <p className="font-semibold text-xl">{Book.icon}</p>   
                                                <p className="font-semibold pl-2 pt-2">{Book.name}</p>
                                                <p className="font-semibold text-3xl pl-2 pt-1">{Book.value}</p>
                                            </div>  
                                        )
                                    }
                                    else{
                                        return (
                                            <div onClick={() => HeadleButtonClick(Book.btnValue)} className={`cursor-pointer text-center shadow-md border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Book.style}`}>                                       
                                                <p className="font-bold text-xl">{Book.icon}</p>   
                                                <p className="font-semibold pl-2 pt-2">{Book.name}</p>
                                            </div>  
                                        )
                                    }
                                }
                                else if(RoleUser === "user"){
                                    if(Book.id === 1){
                                        return (
                                            <div onClick={() => HeadleButtonClick(Book.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Book.style}`}>                                       
                                                <p className="font-semibold text-xl">{Book.icon}</p>   
                                                <p className="font-semibold pl-2 pt-2">{Book.name}</p>
                                                <p className="font-semibold text-3xl pl-2 pt-1">{Book.value}</p>
                                            </div>  
                                        )
                                    }
                                }

                            })
                        }
                    </div>
                </div>
                {/* <p>{buttonValue}</p> */}
                {
                    (() => {
                        if(buttonValue === "add_book"){
                            return (
                                <AddBook />
                            )
                        }
                        if(buttonValue === "Books"){
                            return (
                                <SearchBook />
                            )
                        }
                        if(buttonValue === "bkBorrow"){
                            return (
                                <BorrowedBooks />
                            )
                        }
                        if(buttonValue === "bkSelected"){
                            return (
                                <SelectedBooks />
                            )
                        }
                        if(buttonValue === "BorrowRequest"){
                            return (
                                <BorrowRequests />
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

export default Books