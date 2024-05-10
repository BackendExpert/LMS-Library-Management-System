import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import SearchBook from "./SearchBook"

const ViewAllBooks = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    const [myBkRequest, SetmyBkRequest] = useState(0)

    useEffect(() => {
      const fetchData = async () => {
          try {
              const BookMy = await axios.get('http://localhost:8081/MyCountRequests');
              SetmyBkRequest(BookMy.data.BKCount);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }
      fetchData();
  }, [])

    const [allBooks, SetAllBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/AllBooks')
        .then(res => SetAllBooks(res.data))
        .catch(err => console.log(err)) 
    }, [])

    // Borrow Book
    const headleBorrowBook = (id) => {
      axios.post('http://localhost:8081/BorrowBook/' + id, {EmailUser})
      .then(res => {
        if(res.data.Status === "Success"){
          alert("The Borrow Request Send to Admin Successful")
          window.location.reload()
        }
        else{
          alert(res.data.Error)
        }
      })
    }
  return (
    <div className="bg-gray-200 w-auto py-8 lg:px-16 px-8">
      <div className="lg:flex justify-between">
        <div className="my-4 flex">
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

          <div className="mx-4">
            <button onClick={() => HeadleButtonClick('Search')} className="py-4 px-8 bg-green-500 text-white rounded duration-500 hover:ml-2">Seach</button>
          </div>     



        </div>
        <div className="my-4">
          <div className="lg:visible invisible">
            <div className="flex">
              <p onClick={() => HeadleButtonClick(0)} className="mx-2 text-gray-500 cursor-pointer duration-500 hover:text-gray-600 "><Icons name="grid" size="large"></Icons></p>
              <p onClick={() => HeadleButtonClick('listData')} className="mx-2 text-gray-500 cursor-pointer duration-500 hover:text-gray-600 "><Icons name="list" size="large"></Icons></p>              
            </div>            
          </div>
        </div>
      </div>
      {
            (() => {
              if(buttonValue === "Search"){
                return (
                  <SearchBook />
                )
              }
            })()
          }    
      <div className="">
        {
          (() => {
            if(buttonValue === 0){
              return (
                <div className="lg:grid grid-cols-3 gap-4">
                {
                  allBooks.map((Books, index) => {
                    if(Books.Status !== "Disabled"){
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
                                  if(Books.Status === "Requested"){
                                    return (
                                      <span className="font-semibold pl-2 text-yellow-500">Seleted</span>
                                    )
                                  }
                                })()
                              }
      
                              {
                                (() => {
                                  if(RoleUser !== null && EmailUser !== null){
                                    if(Books.Status === "Available"){
                                      return (
                                        <button onClick={() => headleBorrowBook(Books.ISBNNumber)} className="my-2 mx-3 bg-blue-500 text-white font-semibold rounded py-2 px-4 duration-500 hover:bg-blue-600">Request to Borrow</button>
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
                  
                    }
                  })
                }
                </div>
              )              
            }

            else if(buttonValue === "listData"){
              
              return (
                <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                  <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" class="px-6 py-3">
                                Book Title
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Class No
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Authors 
                              </th>
                              <th scope="col" class="px-6 py-3">
                                ISBN Number
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Publisher
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Status
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Action
                              </th>
                            </tr>
                        </thead>
                    <tbody>
                      {
                        allBooks.map((Books, index) => {
                          if(Books.Status !== "Disabled"){
                            return (
                              <tr key={index}>
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {Books.BookTitle}
                              </th>
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {Books.ClassNo}
                              </th>
                              <td class="px-6 py-4">
                                  {Books.AuthorEditor}, {Books.AuthorEditor2}
                              </td>
                              <td class="px-6 py-4">
                                  {Books.ISBNNumber}
                              </td>
                              <td class="px-6 py-4">
                                  {Books.Publisher}
                              </td>
                              <td class="px-6 py-4">
                                  {
                                      (() => {
                                          if(Books.Status === "Available"){
                                              return(
                                                  <span className="py-2 px-6 bg-green-500 text-white rounded">Available</span>
                                              )
                                          }
                                          if(Books.Status === "Requested"){
                                            return(
                                                <span className="py-2 px-6 bg-yellow-500 text-white rounded">Selected</span>
                                            )
                                        }
                                      })()
                                  }
                              </td>
                              <td class="px-6 py-4">
                                {
                                  (() => {
                                    if(RoleUser !== null && EmailUser !== null){
                                      if(Books.Status === "Requested"){
                                        return (
                                          <span className="font-semibold pl-2 text-yellow-500">Seleted</span>
                                        )
                                      }
                                      else if(Books.Status === "Available"){
                                        return (
                                          <div className="">
                                            <button onClick={() => headleBorrowBook(Books.ISBNNumber)} className="bg-blue-500 text-white rounded py-2 px-6 duration-500 hover:bg-blue-600">Request to Borrow</button>
                                          </div>
                                        )
                                      }
                                    }
                                    else{
                                      return (
                                        <p className="text-blue-500 font-semibold">Please login to System</p>
                                      )
                                    }
                                  })()
                                }
                              </td>
                          </tr>
                            )
                          }
                        })
                      }                                 
                    </tbody>
                </table>
            </div>  
            </div>              
              )
            }
          })()
        }
      </div>
    </div>
  )
}

export default ViewAllBooks