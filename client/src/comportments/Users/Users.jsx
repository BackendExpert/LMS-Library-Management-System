import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import AllUsers from "./AllUsers";
import axios from "axios";
import ViewUserType from "./ViewUserType";


const Users = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const [AllUserCount, SetAllUserCount] = useState(0)
    const [UserTypeUsersCount, SetUserTypeUsersCount] = useState(0)
    const [CountSuperAdmin, SetCountSuperAdmin] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const UsersCount = await axios.get('http://localhost:8081/AllCountUsers');
                SetAllUserCount(UsersCount.data.UserAll);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const TypeUsersCount = await axios.get('http://localhost:8081/UserTypeUsers');
                SetUserTypeUsersCount(TypeUsersCount.data.CountUserT);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const SuperAdminCount = await axios.get('http://localhost:8081/CountSuperAdmin');
                SetCountSuperAdmin(SuperAdminCount.data.CountUserT);
            } catch (error) {
                console.error('Error fetching data:', error);
            }



        }
        fetchData();
    }, [])


    const UserData = [
        {id: 1, btnValue: "All_Users", name: "All Users", value: <CountUp end={AllUserCount}/>, icon: <Icons name="people" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "Users", name: "Users", value: <CountUp end={UserTypeUsersCount}/>, icon: <Icons name="people-circle" size="large"></Icons>, style: 'text-red-500'},
        {id: 3, btnValue: "SuperAdmins", name: "SuperAdmins", value: <CountUp end={CountSuperAdmin}/>, icon: <Icons name="person" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 4, btnValue: "Add_New_User", name: "Add New User", icon: <Icons name="person-add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]


    if(RoleUser === "SuperAdmin"){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">Users</h1>
                </div>
                <div className="">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            UserData.map((Users) => {
                                if(Users.id !== 4){
                                    return (
                                        <div onClick={() => HeadleButtonClick(Users.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Users.style}`}>                                       
                                            <p className="font-semibold text-xl">{Users.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Users.name}</p>
                                            <p className="font-semibold text-3xl pl-2 pt-1">{Users.value}</p>
                                        </div>  
                                    )
                                }
                                else{
                                    return (
                                        <div onClick={() => HeadleButtonClick(Users.btnValue)} className={`cursor-pointer text-center shadow-md border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Users.style}`}>                                       
                                            <p className="font-bold text-xl">{Users.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Users.name}</p>
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
                        if(buttonValue === "All_Users"){
                            return (
                                <AllUsers />
                            )
                        }
                        if(buttonValue === "Users" || buttonValue === "SuperAdmins"){
                            return (
                                <ViewUserType />
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

export default Users