import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const SearchBook = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [SearchBook, SetSearchBook] = useState({
        title: '',
        author: '',
        isbn: '',
        KeyWord: '',
        Publisher: '',
        pubYear: '',
        pubplace: ''
    })

    const headleSubmit = (e) => {
        e.preventDefault();
        // alert("hellow Work")
    }

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Search Book</h1>

                <div className="my-5">
                    <form onSubmit={headleSubmit}>
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
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book KeyWord"/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publisher"/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publish Year"/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publish place"/>
                            </div>
                        </div>
                        <div className="my-3">
                            <button type="submit" className="py-4 px-8 bg-green-500 rounded text-white duration-500 hover:ml-2">Search Books</button>
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