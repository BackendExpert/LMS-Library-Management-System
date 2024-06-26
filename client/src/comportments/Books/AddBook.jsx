import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const AddBook = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [BookData, SetBookData] = useState({
        title: '',
        classNo: '',
        Author1: '',
        Author2: '',
        Description: '',
        isbnNo: '',
        KeyWord1: '',
        KeyWord2: '',
        Publisher: '',
        pubYear: '',
        pubPlace: ''
    })

    const headleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/AddBook', BookData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("New Book Added Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Add New Book</h1>

                <div className="my-5">
                    <form onSubmit={headleSubmit}>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Book Title</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Book Title"
                                onChange={e => SetBookData({...BookData, title:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Class No</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Class No"
                                onChange={e => SetBookData({...BookData, classNo:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Author 1</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Author 1"
                                onChange={e => SetBookData({...BookData, Author1:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Author 2</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Author 2"
                                onChange={e => SetBookData({...BookData, Author2:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Description</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Description"
                                onChange={e => SetBookData({...BookData, Description:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">ISBN Number</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Description"
                                onChange={e => SetBookData({...BookData, isbnNo:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">KeyWord 1</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter KeyWord 1"
                                onChange={e => SetBookData({...BookData, KeyWord1:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">KeyWord 2</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter KeyWord 2"
                                onChange={e => SetBookData({...BookData, KeyWord2:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Publisher</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Publisher"
                                onChange={e => SetBookData({...BookData, Publisher:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Publish Year</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Publish Year"
                                onChange={e => SetBookData({...BookData, pubYear:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Publish Place</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Publish Place"
                                onChange={e => SetBookData({...BookData, pubPlace:e.target.value})}/>
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="py-4 px-8 bg-green-500 rounded text-white duration-500 hover:ml-2">Add New Book</button>
                        </div>
                    </form>
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

export default AddBook