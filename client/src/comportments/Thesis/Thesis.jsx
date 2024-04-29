import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';

const Thesis = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const ThesisData = [
        {id: 1, btnValue: "Thesis", name: "Thesis", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "ThesisBorrow", name: "Thesis Borrowed", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        {id: 3, btnValue: "ThesisSelected", name: "Thesis Selected", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 4, btnValue: "add_Thesis", name: "Add New Thesis", icon: <Icons name="add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">Thesis</h1>
                </div>
                <div className="">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            ThesisData.map((Thesis) => {
                                if(Thesis.id !== 4){
                                    return (
                                        <div onClick={() => HeadleButtonClick(Thesis.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Thesis.style}`}>                                       
                                            <p className="font-semibold text-xl">{Thesis.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Thesis.name}</p>
                                            <p className="font-semibold text-3xl pl-2 pt-1">{Thesis.value}</p>
                                        </div>  
                                    )
                                }
                                else{
                                    return (
                                        <div onClick={() => HeadleButtonClick(Thesis.btnValue)} className={`cursor-pointer text-center shadow-md border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Thesis.style}`}>                                       
                                            <p className="font-bold text-xl">{Thesis.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Thesis.name}</p>
                                        </div>  
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {/* <p>{buttonValue}</p> */}
                {/* {
                    (() => {
                        if(buttonValue === "add_Thesis"){
                            return (
                                <AddMagazine />
                            )
                        }
                    })()
                } */}
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

export default Thesis