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
            <div>BorrowBookSearch</div>
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