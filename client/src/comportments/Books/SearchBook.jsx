import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const SearchBook = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Search Book</h1>
                <Link>
                    <button className="text-blue-500 font-semibold my-4 py-2 rounded px-8  duration-500 hover:ml-2 hover:text-white hover:bg-blue-500">Search More Books</button>
                </Link>
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

export default SearchBook