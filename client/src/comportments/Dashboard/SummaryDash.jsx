import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";
import UpdateMyData from "./UpdateMyData";
import AllUsers from "../Users/AllUsers";
import SearchBook from "../Books/SearchBook";
import MyBorrowRequests from "../MyProfile/MyBorrowRequests";
import BorrowRequests from "../Books/BorrowRequests";


const SummaryDash = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    
    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    
    const [AllUserCount, SetAllUserCount] = useState(0)
    const [CountBook, SetCoutBooks] = useState(0)
    const [MyBookReqeusts, SetMyBookReqeusts] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const UsersCount = await axios.get('http://localhost:8081/AllCountUsers');
                SetAllUserCount(UsersCount.data.UserAll);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const BKCount = await axios.get('http://localhost:8081/BooksCount');
                SetCoutBooks(BKCount.data.BKCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            // count my book requests
            try {
                const MyRequests = await axios.get('http://localhost:8081/CountMyRequests/' + EmailUser);
                SetMyBookReqeusts(MyRequests.data.CountMyBooks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();
    }, [])


    const dataCount = [
        {id: 1, btnvalue: "SearchBooks", name: "Books", link: "#", value: <CountUp end={CountBook}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-purple-500"},
        {id: 2, btnvalue: "", name: "Journals", link: "#", value: <CountUp end={20}/>, icon: <Icons name="document-text" size="large"></Icons>, style: "text-green-500"},     
        {id: 3, btnvalue: "", name: "Magazine", link: "#", value: <CountUp end={20}/>, icon: <Icons name="newspaper" size="large"></Icons>, style: "text-yellow-500"},      
        {id: 4, btnvalue: "", name: "Articles", link: "#", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-red-500"},
        {id: 5, btnvalue: "", name: "Thesis", link: "#", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-blue-500"},
        {id: 6, btnvalue: "", name: "Borrowed Books", link: "#", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-yellow-500"}, 
        {id: 7, btnvalue: "", name: "My Borrowed", link: "#", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-green-500"},
        {id: 8, btnvalue: "Users", name: "Users", link: "#", value: <CountUp end={AllUserCount}/>, icon: <Icons name="people" size="large"></Icons>, style: "text-green-500"}, 
        {id: 9, btnvalue: "myRequests", name: "My Book Requests", link: "#", value: <CountUp end={MyBookReqeusts}/>, icon: <Icons name="help-circle" size="large"></Icons>, style: "text-blue-500"}, 
    ]

    const [UserData, SetUserData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/GetCurrentUser/' + EmailUser)
        .then(res => SetUserData(res.data))
        .catch(err => console.log(err)) 
    }, [])

    // get last 3 recodes in Book table
    const [LatestBooks, SetLatestBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/GetlastBooks')
        .then(res => SetLatestBooks(res.data))
        .catch(err => console.log(err)) 
    }, [])

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="py-4">
                {
                    (() => {
                        if(RoleUser === "SuperAdmin"){
                            return (
                                <h1 className="px-8 text-xl font-semibold">SuperAdmin Dashbord</h1>
                            )                            
                        }
                        else if(RoleUser === "user"){
                            return (
                                <h1 className="px-8 text-xl font-semibold">User Dashbord</h1>
                            )    
                        }
                    })()
                }
                
                <div className="mt-4 rounded pr-5">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            dataCount.map((data) => {
                                if(RoleUser === "SuperAdmin"){
                                    if(data.id !== 11){
                                        return (
                                            <Link to={data.link}>
                                                <div onClick={() => HeadleButtonClick(data.btnvalue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${data.style}`}>                                       
                                                    <p className="font-semibold text-xl">{data.icon}</p>   
                                                    <p className="font-semibold pl-2 pt-2">{data.name}</p>
                                                    <p className="font-semibold text-3xl pl-2 pt-1">{data.value}</p>
                                                </div>  
                                            </Link>
                                        )
                                    }
                                }
                                if(RoleUser === "user"){
                                    if(data.id === 1 || data.id === 9){
                                        return (                                    
                                            <Link to={data.link}>
                                                <div onClick={() => HeadleButtonClick(data.btnvalue)} className={`cursor-pointer text-center shadow-2xl bg-white border-2 border-gray-200 rounded py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${data.style}`}>                                       
                                                    <p className="font-semibold text-xl">{data.icon}</p>   
                                                    <p className="font-semibold pl-2 pt-2">{data.name}</p>
                                                    <p className="font-semibold text-3xl pl-2 pt-1">{data.value}</p>
                                                </div>  
                                            </Link>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </div>
                {/* <p className="">{buttonValue}</p> */}
                
                {
                    (() => {
                        if(buttonValue === "Users"){
                            return (
                                <AllUsers />
                            )
                        }
                        if(buttonValue === "SearchBooks"){
                            return (
                                <SearchBook />
                            )
                        }
                        if(buttonValue === "myRequests"){
                            return (
                                <MyBorrowRequests />
                            )
                        }

                    })()
                }

                <h1 className="px-8 py-8 text-xl font-semibold">Personal Data</h1>
                <div className="mb-8 mx-2">
                    <div className="lg:grid grid-cols-2 gap-4">
                        {
                            UserData.map((data) => {
                                return (
                                    <div className="w-full shadow-md rounded-2xl bg-white py-6 px-4 lg:mr-5 mr-0 lg:my-0 my-2">
                                    <h1 className="">My Info</h1>
                                    <div className="lg:grid grid-cols-2 gap-4">
                                        <div className="mx-4 my-6">
                                            <div className="">
                                                <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />
                                            </div>
                                            <div className="">
                                                <p className="py-2">Name : {UserData[0].username} </p>
                                                <p className="py-2">Email : {UserData[0].Email}</p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className="py-2">Role : {
                                                (() => {
                                                    if(UserData[0].Role === "user"){
                                                        return (
                                                            <span className="text-yellow-500 font-semibold">User</span>
                                                        )
                                                    }
                                                    else if(UserData[0].Role === "SuperAdmin"){
                                                        return (
                                                            <span className="text-red-500 font-semibold">SuperAdmin</span>
                                                        )
                                                    }
                                                })()
                                            } </p>
                                            <p className="py-2">Account Status : <span className="text-green-500 font-semibold">Active</span>
                                            </p>
        
                                            <button onClick={() => HeadleButtonClick('UpdateMyData')} className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Update</button>
                                            {/* <p className="">{buttonValue}</p> */}
        
        
                                        </div>                                
                                    </div>
                                    
                                </div>  
                                )
                            })
                        }
                            {
                                (() => {
                                    if(buttonValue === "UpdateMyData"){
                                        return (
                                            <UpdateMyData />
                                        )
                                    }
                                })()
                            }
                        <div className="shadow-md rounded-2xl w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Borrowed Book Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Computer Science
                                        </th>
                                        <td className="px-6 py-4">
                                            <Link to={'/MyBookBorrow'}>
                                                <button className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View</button>
                                            </Link>
                                        </td>
                                    </tr>                                
                                </tbody>
                            </table>
                        </div>
                    </div>  

                    <h1 className="px-8 py-8 text-xl font-semibold">Newly Added Books</h1>   

                    <div className="mb-8 mx-0">
                       <div className="lg:flex">
                            {
                                LatestBooks.map((lastBooks) => {
                                    return (
                                        <div className="bg-white rounded-2xl lg:mx-8 mx-0 shadow-md w-full">
                                            <div className="mt-8 mx-4">
                                                <h1 className="lg:py-0 pt-10"><span className="font-semibold">Book Name</span> : {lastBooks.BookTitle}</h1>
                                                <p className=""><span className="font-semibold">Class No</span> : {lastBooks.ClassNo}</p>
                                                <p className=""><span className="font-semibold">Authors</span> : {lastBooks.AuthorEditor}, {lastBooks.AuthorEditor2}</p>
                                            </div>
                                            <div className="my-8 text-center">
                                                <Link to={'/ViewAllBooks'}>
                                                    <button className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View more</button>
                                                </Link>
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                       </div>     
                    </div>          


                </div>

            </div>
        )
    }

}

export default SummaryDash