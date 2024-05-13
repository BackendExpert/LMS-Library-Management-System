import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import BorrowRequests from "./BorrowRequests"

const SearchBookRequest = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // check the form is submited or not
    const [IsFormSubmited, SetIsFormSubmited] = useState(false)

    // for fetch search data
    const [bookreqData, SetBookReqData] = useState([])

    const [bookReqSearch, SetbookReqSearch] = useState({
        email:'',
    })


    const headleSearch = (e) => {
        e.preventDefault();
        SetIsFormSubmited(false)    

        axios.post('http://localhost:8081/SearchBookRequest', bookReqSearch)
        .then(res => {
            if(res.data.Status === "Success"){
                SetBookReqData(res.data.Result)    
                SetIsFormSubmited(true)            
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin") {
        return (
            <div className="">
                <div className="bg-white py-4 px-10 mt-6">
                    <div className="">
                        <form onSubmit={headleSearch}>
                            <label htmlFor="">Email</label>
                            <input type="email" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Enter Email Address" required
                            onChange={e => SetbookReqSearch({...bookReqSearch, email:e.target.value})}/>

                            <div className="">
                                <button type="submit" className="bg-green-500 rounded text-white py-2 px-8 duration-500 hover:bg-green-600">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    (() => {
                        if(IsFormSubmited === true){
                            return (
                                <div className="">
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
                                                                    Action
                                                                </th>
                                                            </tr>
                            
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                bookreqData.map((bookData, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                {bookData.bookISBN}
                                                                            </th>
                                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                {bookData.borrowEmail}
                                                                            </th>
                                                                        </tr>
                                                                    )
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
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }

}

export default SearchBookRequest