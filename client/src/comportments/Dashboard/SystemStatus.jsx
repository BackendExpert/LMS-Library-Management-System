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

          <div className="my-8">
            <div className="lg:grid grid-cols-3 gap-4">
              <div className="my-2">
                <h1 className="text-gray-500">Books</h1>
                <div className="m-2">
                  <button onClick={() => headleDownloadBooks()} className='py-2 px-8 bg-blue-500 rounded text-white duration-500 hover:bg-blue-600'>Download Data</button>
                </div>
              </div>
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

export default SystemStatus