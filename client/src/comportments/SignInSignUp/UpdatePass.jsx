import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"


const UpdatePass = () => {
  const navigate = useNavigate()
  const Email = secureLocalStorage.getItem("Token1");
  
  // update password
  const [PassUpdate, SetPassUpdate] = useState({
    newPass: '',
    cnewPass: ''
  })
  

  return (
    <div>UpdatePass</div>
  )
}

export default UpdatePass