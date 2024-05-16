import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const SystemStatus = () => {
  const navigate = useNavigate() 
  //curent login user
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");

  if(RoleUser === "SuperAdmin"){
    return (
      <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
          <h1 className="font-semibold text-gray-500 text-xl">System Status</h1>
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

export default SystemStatus