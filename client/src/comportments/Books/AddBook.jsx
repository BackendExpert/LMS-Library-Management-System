import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const AddBook = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Add New Book</h1>

                <div className="my-5">
                    <form>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Book Title</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Book Title"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Class No</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Class No"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Author 1</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Author 1"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Author 2</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Author 2"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Description</label>
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" required placeholder="Enter Description"/>
                            </div>
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