import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';


const MyBorrowRequests = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    // fetch data from book requst according to login email
    const [BookData, SetBookData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/MyRequestsBook/' + EmailUser)
        .then(res => SetBookData(res.data))
        .catch(err => console.log(err)) 
    }, [])


    if(RoleUser !== null && EmailUser !== null){
        return (
            <div>
                <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                    <h1 className="font-semibold text-gray-500 text-xl">My Borrow Requests</h1>

                    {
                        BookData.map((books, index) => {
                            if(books.status == "Request"){
                                return (
                                    <tr key={index}>
                                        
                                    </tr>
                                )
                            }
                        })
                    }

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

export default MyBorrowRequests