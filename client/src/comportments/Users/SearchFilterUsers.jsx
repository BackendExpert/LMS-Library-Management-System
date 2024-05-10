import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import axios from "axios";

const SearchFilterUsers = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // user radio input data
    const [RadioInputData, SetRadioInputData] = useState('')

    // search and Filter data
    const [UserSearchData, SetUserSearchData] = useState({
        email:''
    })

    if(RoleUser === "SuperAdmin"){
        return (
            <div>
                <div className="my-4">
                    <form>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Enter Email Address"/>
                            </div>
                            <div className="my-2">
                                <div className="">
                                    <input type="radio" name="" id="" className="rounded bg-gray-200 pl-2 my-2" value="SuperAdmins" checked={SetRadioInputData === 'SuperAdmins'}/>
                                    <label htmlFor="" className="mx-2">SuperAdmins</label>
                                </div>
                                <div className="">
                                    <input type="radio" name="" id="" className="rounded bg-gray-200 pl-2 my-2" value="Users" checked={SetRadioInputData === 'Users'}/>
                                    <label htmlFor="" className="mx-2">Users</label>
                                </div>
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

export default SearchFilterUsers