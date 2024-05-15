import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"


const MyBorroedBooks = () => {
  const navigate = useNavigate() 
  //curent login user
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");

  // fetch borrowed data
  const [MyBorrowed, SetMyBorrowed] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8081/BorrowedMyBooks/' + EmailUser)
    .then(res => SetMyBorrowed(res.data))
    .catch(err => console.log(err))
  }, [])


  if(RoleUser !== null && EmailUser !== null) {
    return (
        <div>
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">My Borrowed Books</h1>
                    <div class="relative overflow-x-auto my-8">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Book ISBN Number
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Borrower Email
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Borrow at
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Days to Return
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                To return at
                                            </th>
                                        </tr>
        
                                    </thead>
                                    <tbody>
                                        {
                                          MyBorrowed.map((myBooks, index) => {
                                            return (
                                              <tr key={index}>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {myBooks.bookISBN}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {myBooks.borrowEmail}
                                                </td>     
                                                <td class="px-6 py-4">
                                                    {myBooks.borrow_at}
                                                </td>   
                                                <td class="px-6 py-4">
                                                    <p className="text-blue-500 font-semibold">{myBooks.status}</p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {/* {myBooks.borrow_at} */}

                                                    {                                                      
                                                      (() => {
                                                          // const ReturntoAt = new Date(myBooks.confarmRetuenDate)
                                                          // ReturntoAt.setHours(0,0,0,0)

                                                          const ReturntoAt = new Date()
                                                          ReturntoAt.setHours(0,0,0,0)

                                                          const today = new Date()
                                                          today.setHours(0,0,0,0)

                                                          const haveDays = ReturntoAt.getTime() - today.getTime()

                                                          // convert to days
                                                          const deffInDays = Math.ceil(haveDays / (1000 * 60 * 60 * 24))
                                                          // const deffInDays = 5

                                                          if(deffInDays === 0) {
                                                            return(
                                                              <p className="text-red-500 font-semibold">You have to Retun Book within Today</p>
                                                            )
                                                          }
                                                          else{
                                                            if(deffInDays >= 22){
                                                              return (
                                                                <div className="text-green-500 font-semibold">{deffInDays}</div>
                                                              )
                                                            }
                                                            else if(deffInDays <= 21 && deffInDays >= 15){
                                                              return (
                                                                <div className="text-blue-500 font-semibold">{deffInDays}</div>
                                                              )
                                                            }
                                                            else if(deffInDays <= 14 && deffInDays >= 8){
                                                              return (
                                                                <div className="text-yellow-500 font-semibold">{deffInDays}</div>
                                                              )
                                                            }
                                                            else if(deffInDays <= 7){
                                                              return (
                                                                <div className="text-red-500 font-semibold">{deffInDays}</div>
                                                              )
                                                            }
      
                                                          }
                                                          
                                                        
                                                      })()                                                      
                                                    }


                                                 </td>   
                                                <td class="px-6 py-4">
                                                    {myBooks.confarmRetuenDate}
                                                </td>       

                                              </tr>
                                            )
                                          })
                                        }
                                    </tbody>  
                                </table>
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


// only borrowed status + return date + conframretrun data + still dates to retun book
// check date to retrun date 7,17,21 and last data tommrow -> sending emails



export default MyBorroedBooks