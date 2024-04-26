import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import AddMagazine from "./AddMagazine";

const Magazine = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const MagazineData = [
        {id: 1, btnValue: "Magazine", name: "Journals", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "MagazineBorrow", name: "Journals Borrowed", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        {id: 3, btnValue: "MagazineSelected", name: "Journals Selected", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 4, btnValue: "add_Magazine", name: "Add New Journals", icon: <Icons name="add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">Magazine</h1>
                </div>
                <div className="">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            MagazineData.map((Magazine) => {
                                if(Magazine.id !== 4){
                                    return (
                                        <div onClick={() => HeadleButtonClick(Magazine.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Magazine.style}`}>                                       
                                            <p className="font-semibold text-xl">{Magazine.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Magazine.name}</p>
                                            <p className="font-semibold text-3xl pl-2 pt-1">{Magazine.value}</p>
                                        </div>  
                                    )
                                }
                                else{
                                    return (
                                        <div onClick={() => HeadleButtonClick(Magazine.btnValue)} className={`cursor-pointer text-center shadow-md border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Magazine.style}`}>                                       
                                            <p className="font-bold text-xl">{Magazine.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Magazine.name}</p>
                                        </div>  
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {/* <p>{buttonValue}</p> */}
                {
                    (() => {
                        if(buttonValue === "add_Magazine"){
                            return (
                                <AddMagazine />
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

export default Magazine