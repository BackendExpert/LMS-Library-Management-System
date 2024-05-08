import Icons from "@reacticons/ionicons"
import axios from "axios"
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

    // search Books  

    // search book data
    const [SearchBookData, SetSearchBookData] = useState([])
    const [isFormSubmited, SetisFormSubmited] = useState(false)

    const headleSubmit = (e) => {
        e.preventDefault();
        SetisFormSubmited(false)
        // alert("hellow Work")        

        axios.post('http://localhost:8081/SearchBook', SearchBook)
        .then(res => {
            if(res.data.Status === "Success"){
                SetSearchBookData(res.data.BookData)
                SetisFormSubmited(true)
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="">
                <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Search Book</h1>
                    <div className="">
                        <Link to={'/ViewAllBooks'}>
                            <button className="py-4 px-8 bg-blue-500 rounded text-white duration-500 hover:ml-2">View All Books</button>
                        </Link>
                    </div>  

                <div className="my-5">
                    <form onSubmit={headleSubmit}>
                        <div className="lg:grid grid-cols-4 gap-3">
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Title"
                                onChange={e => SetSearchBook({...SearchBook, title:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Author"
                                onChange={e => SetSearchBook({...SearchBook, author:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book ISBN Number"
                                onChange={e => SetSearchBook({...SearchBook, isbn:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book KeyWord"
                                onChange={e => SetSearchBook({...SearchBook, KeyWord:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publisher"
                                onChange={e => SetSearchBook({...SearchBook, Publisher:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publish Year"
                                onChange={e => SetSearchBook({...SearchBook, pubYear:e.target.value})}/>
                            </div>
                            <div className="">
                                <input type="text" name="" id="" className="w-full h-12 rounded bg-gray-200 pl-2 my-2" placeholder="Book Publish place"
                                onChange={e => SetSearchBook({...SearchBook, pubplace:e.target.value})}/>
                            </div>
                        </div>
                        <div className="my-3">
                            <button type="submit" className="py-4 px-8 bg-green-500 rounded text-white duration-500 hover:ml-2">Search Books</button>
                        </div>
                    </form>
                </div>
            </div>

                                {
                                    (() => {
                                        if(isFormSubmited === true){
                                            return (
                                                <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                                                <div className="">
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
                                                            SearchBookData.map((BookData, index) => {
                                                                return (
                                                                    
                                                                    <tr key={index}>
                                                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {BookData.BookTitle}
                                                                        </th>
                                                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {BookData.ClassNo}
                                                                        </th>
                                                                        <td class="px-6 py-4">
                                                                            {BookData.AuthorEditor}, {BookData.AuthorEditor2}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {BookData.ISBNNumber}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {BookData.Publisher}
                                                                        </td>
                                                                        <td class="px-6 py-4">
                                                                            {
                                                                                (() => {
                                                                                    if(BookData.Status === "Available"){
                                                                                        return(
                                                                                            <span className="py-2 px-6 bg-green-500 text-white rounded">Available</span>
                                                                                        )
                                                                                    }
                                                                                })()
                                                                            }
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
                                            return (
                                                <div className=""></div>
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

export default SearchBook