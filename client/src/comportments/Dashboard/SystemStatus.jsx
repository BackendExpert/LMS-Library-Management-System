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

  // download all books data as csv
  const headleDownloadBooks = () => {
    axios.get('http://localhost:8081/DownloadBooks', { responseType: 'blob' })
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AllBooks.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }) 

    .catch(err => {
      console.log(err)
    }) 
  }

  // download users data as csv
  const headleDownloadUsers = () => {
    axios.get('http://localhost:8081/DownloadUsers', { responseType: 'blob' })
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AllUsers.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }) 

    .catch(err => {
      console.log(err)
    }) 
  }


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

              <div className="my-2">
                <h1 className="text-gray-500">Users</h1>
                <div className="m-2">
                  <button onClick={() => headleDownloadUsers()} className='py-2 px-8 bg-blue-500 rounded text-white duration-500 hover:bg-blue-600'>Download Data</button>
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