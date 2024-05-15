import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"


const MyBorroedBooks = () => {
  const navigate = useNavigate() 
  //curent login user
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");

  return (
    <div>MyBorroedBooks</div>
  )
}


// only borrowed status + return date + conframretrun data + still dates to retun book
// check date to retrun date 7,17,21 and last data tommrow -> sending emails



export default MyBorroedBooks