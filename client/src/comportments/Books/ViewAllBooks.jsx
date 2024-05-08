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
      <div className="my-4">
        {
          (() => {
            if(RoleUser !== null && EmailUser !== null){
              return (
                <div className="">
                  <Link to={'/Dashboard'}>
                    <button className="bg-blue-500 text-white py-4 px-8 rounded duration-500 hover:ml-2">Back</button>
                  </Link>
                </div>
              )
            }
            else{
              return (
                <div className="">
                  <Link to={'/'}>
                    <button className="bg-blue-500 text-white py-4 px-8 rounded duration-500 hover:ml-2">Back</button>
                  </Link>
                </div>
              )
            }
          })()
        }

      </div>
      <div className="lg:grid grid-cols-4 gap-4">
        {
          allBooks.map((Books) => {
            return (
              <div className="bg-white py-4 px-10 rounded shadow-md">
                asdasdasd
              </div>
            )
          })
        }


      </div>
    </div>
  )
}

export default ViewAllBooks