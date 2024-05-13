import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import BorrowRequests from "./BorrowRequests"

const BorrowBookSearch = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    // check form is submit or not
    const [IsFormSubmited, SetIsFormSubmited] = useState(false)

    // book borrow Search
    const [bookBorrowData, SetbookBorrowData] = useState({
        bookISBN: '',
        borrower: '',
    })


    if(RoleUser === "SuperAdmin"){
        return (
            <div>
                <div className="my-3">
                    <form>
                        <div className="lg:grid grid-cols-2 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Book ISBN : </label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2"  required placeholder="Enter Book ISBN Number"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Borrower Email : </label>
                                <input type="email" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2"  required placeholder="Enter Book Borrower Email"/>
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

export default BorrowBookSearch