import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import BorrowRequests from "./BorrowRequests"

const SearchBookRequest = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    if(RoleUser === "SuperAdmin") {
        return (
            <div className="">
                <div className="bg-white py-8 px-10 mt-6">
                    <h1 className="font-semibold text-gray-500 text-xl">Search Book</h1>
                    <button className="bg-red-500 py-2 px-8 rounded text-white duration-500 hover:bg-red--600">Close</button>
                    {
                        (() => {
                            if(buttonValue === "back"){
                                return (
                                    <BorrowRequests />
                                )
                            }
                            else if(buttonValue === 0){
                                return (
                                    <div className="">asd</div>
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

export default SearchBookRequest