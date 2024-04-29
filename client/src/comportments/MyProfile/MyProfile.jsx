import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';

const MyProfile = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }


    const MyData = [
        {id: 1, btnValue: "myBorrowd", name: "My Borroed", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "mySelected", name: "My Selected", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        
    ]

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">My Profile</h1>
                </div>
                <div className="my-2">
                    <div className="lg:grid grid-cols-4 gap-4">
                    {
                        MyData.map((data) => {
                            return (
                                <div className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${data.style}`}>                                       
                                    <p className="font-semibold text-xl">{data.icon}</p>   
                                    <p className="font-semibold pl-2 pt-2">{data.name}</p>
                                    <p className="font-semibold text-3xl pl-2 pt-1">{data.value}</p>
                                </div>  
                            )
                        })
                    }
                    </div>
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

export default MyProfile