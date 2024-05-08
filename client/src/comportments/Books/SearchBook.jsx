import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const SearchBook = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Search Book</h1>

                <div className="my-5">
                    <form>
                        <div className="lg:grid grid-cols-4 gap-3">
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Title"/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Author"/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book ISBN Number"/>
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

export default SearchBook