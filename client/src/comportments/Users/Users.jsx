import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';

const Users = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const UserData = [
        {id: 1, btnValue: "All_Users", name: "All Users", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "Users", name: "Users", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        {id: 3, btnValue: "SuperAdmins", name: "SuperAdmins", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 4, btnValue: "Add_New_User", name: "Add New User", icon: <Icons name="add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]


    if(RoleUser === "SuperAdmin"){
        return (
            <div>Users</div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }

}

export default Users