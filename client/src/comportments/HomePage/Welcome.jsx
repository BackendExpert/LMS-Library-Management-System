import React from 'react'
import NIFSLogo from '../../assets/nifs_logo.png'

const Welcome = () => {
  return (
    <div>
        <div className="text-center text-white">
            <img src={NIFSLogo} alt="" className='lg:mx-16 mx-4 my-4 h-40 w-auto'/>
            <p className="text-5xl lib-title">Welcome to Library <br />  NIFS</p>
           
        </div>
    </div>
  )
}

export default Welcome