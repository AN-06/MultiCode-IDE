import React from 'react'
import logo from "../images/logos/logo.png";


export const SignUp = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form className='w-[20vw] h-[40vh] flex flex-col justify-center bg-[#0f0e0e] p-[10px] rounded-lg shadow-xl shadow-black/50'>
           <img src={logo} alt="" className="w-full h-auto object-contain"/>
        </form>

      </div>
    </>
  )
}
