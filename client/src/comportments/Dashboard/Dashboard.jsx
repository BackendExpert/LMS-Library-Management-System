import Icons from "@reacticons/ionicons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import SummaryDash from "./SummaryDash"
import Books from "../Books/Books"
import DashFooter from "./DashFooter"
import AddBook from "../Books/AddBook"
import Journals from "../Journals/Journals"
import Magazine from "../Magazine/Magazine"


const Dashboard = () => {
    const navigate = useNavigate() 

    //for open and close Side bar
    const [sideOpen, SetsideOpen] = useState();
    const [navOpen, SetNavOpen] = useState();

    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState(0)
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }
    
    const allUserSide = [
        {id: 1, name: "Books", link: "#", icon: <Icons name="book" size="large"></Icons>, btnValue: "Books"},
        {id: 2, name: "Journals", link: "#", icon: <Icons name="document-text" size="large"></Icons>, btnValue: "Journals"},
        {id: 3, name: "Magazine ", link: "#", icon: <Icons name="newspaper" size="large"></Icons>, btnValue: "Magazine"},
        {id: 4, name: "Articles", link: "#", icon: <Icons name="book" size="large"></Icons>, btnValue: "Articles"},
        {id: 5, name: "Thesis", link: "#", icon: <Icons name="book" size="large"></Icons>, btnValue: "Thesis"},
        {id: 6, name: "Borrowed Books", link: "#", icon: <Icons name="book" size="large"></Icons>, btnValue: "Borrowed Books"},
        {id: 7, name: "Users", link: "#", icon: <Icons name="people" size="large"></Icons>, btnValue: "Users"},
        {id: 8, name: "Profile", link: "#", icon: <Icons name="person" size="large"></Icons>, btnValue: "Profile"},        
    ]

    const navBar = [
        {name: "Notifications", link: "#", desc: "notifications", icon: <Icons name="notifications"></Icons>},
        {name: "Logout", desc: "logout", icon: <Icons name="power"></Icons>},        
    ]

    const headlelogout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="bg-gray-200 py-2 h-auto w-full">
            <div className="flex">
                <div className={`duration-500 relative border-r-2 border-blue-300 shadow-md my-1 mx-2 rounded-2xl bg-white h-auto pl-4 py-4 ${sideOpen ? "w-64" : "w-20" }`}>
                    <div className="flex">
                        <div className="text-[#3B71CA] pt-1" onClick={() => SetsideOpen(!sideOpen)}>{sideOpen ? <Icons size="large" name="close"></Icons> : <Icons size="large" name="menu"></Icons>}</div>
                        {/* <div className={`text-2xl pb-4 text-[#3B71CA] font-bold ${!sideOpen && 'scale-0'}`}>SuperAdmin</div>                     */}
                    </div>
                    <div className="">
                        {sideOpen ? <div>
                            <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" className="px-6"/>
                        </div> : <div></div>}
                    </div>
                    <div className={`pl-2 text-xl text-gray-400 duration-500 hover:text-[#3B71CA] cursor-pointer`}>
                            {sideOpen ? <div className="flex pl-2 pt-2">
                                {
                                    (() => {
                                        if(RoleUser === "SuperAdmin"){
                                            return (
                                                <p className="" onClick={() => HeadleButtonClick(0)}>SuperAdmin</p>
                                            )                            
                                        }
                                        else if(RoleUser === "user"){
                                            return (                                               
                                                <p className="" onClick={() => HeadleButtonClick(0)}>User Dashboard</p>
                                            )    
                                        }
                                    })()
                                }
                                
                            </div> : <Icons name="speedometer" onClick={() => HeadleButtonClick(0)}></Icons> }
                    </div>
                    <hr className="mt-2 mr-4 border-b-1 border-blue-300"/>
                    <div className="">
                        {
                            allUserSide.map((sidem) => {
                               if(RoleUser === "SuperAdmin"){
                                    return (
                                        <Link to={sidem.link}>
                                            <div onClick={() => HeadleButtonClick(sidem.btnValue)} className="flex py-2 text-gray-400 duration-500 hover:text-[#3B71CA] ">                        
                                                <p>{sidem.icon}</p>
                                                <p className={`whitespace-nowrap pt-2 pl-2 ${!sideOpen && 'scale-0'}`}>{sidem.name}</p>                        
                                            </div>
                                        </Link>
                                    )
                                }
                                if(RoleUser === "user"){
                                    if(sidem.id === 1 || sidem.id === 2 || sidem.id === 3 || sidem.id === 4){
                                        return (
                                            <Link to={sidem.link}>
                                                <div onClick={() => HeadleButtonClick(sidem.btnValue)} className="flex py-2 text-gray-400 duration-500 hover:text-[#3B71CA]">                        
                                                    <p>{sidem.icon}</p>
                                                    <p className={`whitespace-nowrap pt-2 pl-2 ${!sideOpen && 'scale-0'}`}>{sidem.name}</p>                        
                                                </div>
                                            </Link>
                                        )
                                    }
                                }
                            })
                        }
                    </div>

                </div>
                <div className="w-full mr-2">
                        {/* nav bar start */}
                        <div className="py-4 rounded-2xl bg-white my-1 px-4 w-full mr-2 shadow-xl">
                            
                            <div className="flex justify-between">
                                <p className="">LMS</p>
                                <div className="flex ">
                                    {
                                        navBar.map((nav) => {
                                            if(nav.desc === "logout"){
                                                return (
                                                    <div onClick={headlelogout} className="px-2 text-red-500 flex cursor-pointer">
                                                        <p>{nav.name}</p>
                                                        <p className="pl-2 pt-[2px]">{nav.icon}</p>                                               
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>                      
                        </div>
                        {/* navbar ENd */}
                        {/* <p className="">{buttonValue}</p> */}
      
                        {
                            (() => {
                                if(buttonValue === 0){
                                    return (
                                        <SummaryDash />
                                    )
                                }
                                else if(buttonValue === "Books"){
                                    return (
                                        <Books />
                                    )
                                }
                                else if(buttonValue === "Journals"){
                                    return (
                                        <Journals />
                                    )
                                }
                                else if(buttonValue === "Magazine"){
                                    return (
                                        <Magazine />
                                    )
                                }

                            })()
                        }
                        <DashFooter />
                    </div>
                
            </div>
        </div>
        )
    }
    else{
        localStorage.clear()
        navigate('/')
    }

}

export default Dashboard