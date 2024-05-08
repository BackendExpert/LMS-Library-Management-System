import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const ViewAllBooks = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [allBooks, SetAllBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/AllBooks')
        .then(res => SetLatestBooks(res.data))
        .catch(err => console.log(err)) 
    }, [])

  return (
    <div className="bg-gray-200 w-auto py-8 px-16">
      <div className="lg:grid grid-cols-4 gap-4">
        <div className="bg-white py-4 px-10 rounded shadow-md">
          asdasdasd
        </div>
      </div>
    </div>
  )
}

export default ViewAllBooks