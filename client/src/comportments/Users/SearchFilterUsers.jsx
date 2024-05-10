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
    const [UserSearchData, SetUserSearchData] = useState('')

    const handleOptionChange = (event) => {
        SetRadioInputData(event.target.value);
    };

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
                            <div className="my-6">
                                <div className="">
                                    <label htmlFor="" >
                                    <input type="radio" name="" id="" className="mr-2 rounded bg-gray-200 pl-2 my-2" value="SuperAdmins" checked={RadioInputData === 'SuperAdmins'} onChange={handleOptionChange}/>
                                    
                                    SuperAdmins</label>
                                </div>
                                <div className="">                                    
                                    <label htmlFor="" className="">
                                    <input type="radio" name="" id="" className="mr-2 rounded bg-gray-200 pl-2 my-2" value="Users" checked={RadioInputData === 'Users'} onChange={handleOptionChange}/>    
                                    Users</label>
                                </div>
                            </div>
                            <div className="my-6">
                                <div className="">                                    
                                    <label htmlFor="" className="">
                                    <input type="radio" name="" id="" className="mr-2 rounded bg-gray-200 pl-2 my-2" value="is_lock" checked={RadioInputData === 'is_lock'} onChange={handleOptionChange}/>    
                                    Locked User</label>
                                </div>
                                <div className="">                                    
                                    <label htmlFor="" className="">
                                    <input type="radio" name="" id="" className="mr-2 rounded bg-gray-200 pl-2 my-2" value="userRequests" checked={RadioInputData === 'userRequests'} onChange={handleOptionChange}/>    
                                    User Requests</label>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="bg-blue-500 text-white rounded py-4 px-8 duration-500 hover:bg-blue-600">Search</button>
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