import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import MyAllBorrowBooks from "./MyAllBorrowBooks";
import axios from "axios";


const MyStatus = () => {
  const navigate = useNavigate() 
  //curent login user
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");

  // download my data borrowed all book
  const headleDownloadData = (id) => {
    axios.post('http://localhost:8081/DownloadMyAllBooks/' + id, { responseType: 'blob' })
    
  }

  

  if(RoleUser !== null && EmailUser !== null){
    return (
      <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
          <h1 className="font-semibold text-gray-500 text-xl">Download My Status</h1>
  
          <div className="lg:grid grid-cols-3 gap-4 my-8">
              <div className="">
                <h1 className="text-gray-500">My All Borrowed Books</h1>
                <div className="m-2">
                  <button onClick={() => headleDownloadData(EmailUser)} className='py-2 px-8 bg-blue-500 rounded text-white duration-500 hover:bg-blue-600'>Download Data</button>
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

export default MyStatus