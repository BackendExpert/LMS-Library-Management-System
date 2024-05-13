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

    const [bookReqSearch, SetbookReqSearch] = useState({
        email:'',
    })

    // for fetch search data
    const [bookreqData, SetBookReqData] = useState([])

    const headleSearch = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/SearchBookRequest', bookReqSearch)
        .then(res => {
            if(res.data.Status === "Success"){
                SetBookReqData(res.data)                
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
                            <input type="email" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Enter Email Address"
                            onChange={e => SetbookReqSearch({...bookReqSearch, email:e.target.value})}/>

                            <div className="">
                                <button type="submit" className="bg-green-500 rounded text-white py-2 px-8 duration-500 hover:bg-green-600">Search</button>
                            </div>
                        </form>
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

export default SearchBookRequest