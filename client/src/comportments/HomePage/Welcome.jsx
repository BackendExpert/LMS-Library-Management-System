import React from 'react'
import NIFSLogo from '../../assets/nifs_logo.png'

const Welcome = () => {
  return (
    <div>
        <div className="text-center text-white">
            <p className="text-5xl lib-title">Welcome to Library <br /> of</p>
            <p className="my-4 text-3xl">National Institute of Fundamental Studies</p>
            <img src={NIFSLogo} alt="" className='lg:mx-16 mx-4 my-4'/>
        </div>
    </div>
  )
}

export default Welcome