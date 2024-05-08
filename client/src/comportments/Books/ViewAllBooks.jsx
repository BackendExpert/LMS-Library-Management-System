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

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }


    const [allBooks, SetAllBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/AllBooks')
        .then(res => SetAllBooks(res.data))
        .catch(err => console.log(err)) 
    }, [])

  return (
    <div className="bg-gray-200 w-auto py-8 lg:px-16 px-8">
      <div className="lg:flex justify-between">
        <div className="my-4 ">
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
        <div className="my-4">
          <div className="lg:visible invisible">
            <div className="flex">
              <p onClick={() => HeadleButtonClick('gridData')} className="mx-2 text-gray-500 cursor-pointer duration-500 hover:text-gray-600 "><Icons name="grid" size="large"></Icons></p>
              <p onClick={() => HeadleButtonClick('listData')} className="mx-2 text-gray-500 cursor-pointer duration-500 hover:text-gray-600 "><Icons name="list" size="large"></Icons></p>              
            </div>            
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-3 gap-3">
        {
          allBooks.map((Books) => {
            return (
              <div className="bg-white py-4 px-10 rounded shadow-md lg:my-0 my-4">
                <div className="lg:flex">
                  <div className="">
                    <h1 className="font-semibold">{Books.BookTitle}</h1>
                    <p className="my-3"><span className="font-semibold">ISBN : </span> <span className="text-red-500">{Books.ISBNNumber} </span></p>
                    <p className="my-3"><span className="font-semibold">Class No : </span> {Books.ClassNo}</p>
                    <p className="my-3"><span className="font-semibold">Authors : </span> {Books.AuthorEditor}, {Books.AuthorEditor2}</p>

                  </div>
                  <div className="">
                  <p className="mx-4">
                    {
                      (() => {
                        if(Books.Status === "Available"){
                          return (
                            <span className="font-semibold pl-2 text-green-500">Available</span>
                          )
                        }
                      })()
                    }

                    {
                      (() => {
                        if(RoleUser !== null && EmailUser !== null){
                          if(Books.Status === "Available"){
                            return (
                              <button className="my-2 mx-3 bg-yellow-500 text-white font-semibold rounded py-2 px-4 duration-500 hover:bg-yellow-600">Select Book</button>
                            )
                          }
                        }
                        else{
                          return (
                            <Link to={'/'}>
                              <p className="text-blue-500">Please Login to System</p>
                            </Link>
                          )
                        }

                      })()
                    }

                    
                  </p>

                  </div>
                </div>
                    <p className="my-3"><span className="font-semibold">Description : </span> {Books.Discription}</p>
                    <p className="my-3"><span className="font-semibold">Publisher : </span>{Books.Publisher}</p>
                    <p className="my-3"><span className="font-semibold">Publish Year : </span>{Books.PubYear}</p>
                    <p className="my-3"><span className="font-semibold">Publish Place : </span>{Books.PubPlace}</p>
                <div className="my-8">

                </div>

              </div>
            )
          })
        }


      </div>
    </div>
  )
}

export default ViewAllBooks