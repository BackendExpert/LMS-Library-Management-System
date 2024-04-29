import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";


const AddUser = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [AddNewUser, SetAddNewUser] = useState({
        username: '',
        email:'',
        password:'',
        role:'',        
    })

    const headleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/AddUser', AddNewUser)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("User Added Successful")
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
                <h1 className="font-semibold text-gray-500 text-xl">Add New User</h1>
                
                <div className="my-2">
                    <form onSubmit={headleSubmit}>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="">Username : </label>
                                <input type="text" name="" id="" required placeholder="Enter Username" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Email : </label>
                                <input type="email" name="" id="" required placeholder="Enter Email" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">Password : </label>
                                <input type="password" name="" id="" required placeholder="Enter Password" className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">User Type : </label>
                                <select className="w-full h-12 rounded shadow-md border border-blue-500 pl-2 my-2" required>
                                    <option value="">Select User</option>
                                    <option value="user">User</option>
                                    <option value="SuperAdmin">SuperAdmin</option>
                                </select>
                            </div>
                        </div>
                        <div className="my-2">
                            <button type="submit" className="py-4 px-8 rounded text-green-500 font-semibold duration-500 hover:ml-2 hover:text-white hover:bg-green-600">Add User</button>
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

export default AddUser