import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"


const Dashboard = () => {
    const navigate = useNavigate() 

    //for open and close Side bar
    const [sideOpen, SetsideOpen] = useState();
    const [navOpen, SetNavOpen] = useState();

    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");
    
    const allUserSide = [
        {id: 1, name: "Vehicles", link: "/Vehicles", icon: <Icons name="car" size="large"></Icons>},
        {id: 2, name: "Rented Vehicle", link: "#", icon: <Icons name="car-sport" size="large"></Icons>},
        {id: 3, name: "Own Vehicle ", link: "#", icon: <Icons name="car" size="large"></Icons>},
        {id: 4, name: "Profile", link: "#", icon: <Icons name="person" size="large"></Icons>},
        {id: 5, name: "Users", link: "#", icon: <Icons name="people" size="large"></Icons>},
        {id: 6, name: "Requests", link: "#", icon: <Icons name="help-circle" size="large"></Icons>},
        {id: 7, name: "Report", link: "#", icon: <Icons name="document-text" size="large"></Icons>},
        {id: 8, name: "Suspended", link: "#", icon: <Icons name="person-circle" size="large"></Icons>},        
    ]

    const navBar = [
        {name: "Notifications", link: "#", desc: "notifications", icon: <Icons name="notifications"></Icons>},
        {name: "Logout", desc: "logout", icon: <Icons name="power"></Icons>},        
    ]

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div>Dashboard</div>
        )
    }
    else{
        localStorage.clear()
        navigate('/')
    }

}

export default Dashboard