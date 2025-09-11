import React, { useState } from 'react'
import { LockKeyholeOpen,X } from "lucide-react"
import { useAuthStore } from "../Store/auth.Store.js"

function OtpBox() {
  const [otp, setOtp] = useState("");  
  const { setisRegister, verify } = useAuthStore();

  const handleSubmit = () => {
    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }
    verify({otp:otp});   
  };

  return (
    <div className='bg-white h-90 w-100 rounded-xl shadow-lg'>
       <div className='flex justify-end'> 
             <button onClick={()=>{setisRegister(false)}}
               className='bg-gray-200 p-1 hover:scale-110 transition-transform duration-400 cursor-pointer rounded-xl'
             >
               <X  />
             </button> 
        </div>
      <div className='flex flex-col items-center justify-center bg-white pt-3 gap-2'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-1'>
          <LockKeyholeOpen className='text-white size-16' />
        </div>
        <div className='flex flex-col justify-center items-center m-2 gap-2'>
          <h1 className='font-bold text-xl'>Enter Your OTP</h1>
          <h2 className='text-sm opacity-80'>Only valid for 10 min</h2>
          <input
            className='p-4 w-full hover:bg-white border-gray-200 transition-all text-center border-2 rounded-xl'
            placeholder="******"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-20 py-2 rounded-2xl font-bold text-white text-lg bg-blue-400
                     cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Submit <span className="group-hover:translate-x-1 transition-transform duration-300">📄</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default OtpBox
