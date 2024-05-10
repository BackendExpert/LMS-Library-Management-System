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

    if(RoleUser === "SuperAdmin"){
        return (
            <div>SearchFilterUsers</div>
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