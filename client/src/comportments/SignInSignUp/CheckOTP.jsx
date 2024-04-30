import React, {useState } from 'react'
import MyIcons from '@reacticons/ionicons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage"


const CheckOTP = () => {
    const Email = secureLocalStorage.getItem("Token1");

  return (
    <div>CheckOTP
        {Email}
    </div>
  )
}

export default CheckOTP