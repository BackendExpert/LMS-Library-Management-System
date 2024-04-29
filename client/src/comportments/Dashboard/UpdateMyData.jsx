import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const UpdateMyData = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Update My Data</h1>
                <button onClick={() => HeadleButtonClick('GoBack')} className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl my-2">Back</button>

                {
                    (() => {
                        if(buttonValue === "GoBack"){
                            window.location.reload()
                        }
                    })()
                }


                <div className="my-4">
                    <form>
                        <div className="my-2">
                            <label htmlFor="">Username : </label>
                            <input type="text" name="" id="" className="w-full border border-blue-500 rounded h-12 pl-2 my-2"  required placeholder="Enter New Username"/>
                        </div>
                        <div className="my-2">
                            <button type="submit" className="text-green-500 font-semibold rounded py-2 px-4 duration-500 hover:ml-2 hover:bg-green-500 hover:text-white">Update Data</button>
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

export default UpdateMyData