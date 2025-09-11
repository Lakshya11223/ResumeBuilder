import React from 'react'
import { useState } from 'react';
import {useAuthStore} from '../Store/auth.Store.js';
import {UserRound,Mail,Eye,EyeOff,FileText,X} from 'lucide-react'

function Signuppage() {
  const [showPassword,setshowPassword] = useState(false);
  const [formData,setformData] = useState({name:"",email:"",password:""})

  const {registerdisp,setregisterdisp,isloading,register} = useAuthStore(); 
    
const handleSubmit =async (e)=>{
    e.preventDefault();
    await register(formData)
}

  return (
    <div className='w-full flex justify-center items-center py-10 px-4'>
    <div className='bg-amber-50 shadow-lg rounded-xl p-4 max-w-md w-full'>
      <div className='flex justify-end'> 
      <button onClick={()=>{setregisterdisp(false)}}
        className='bg-gray-200 p-1 hover:scale-110 transition-transform duration-300 cursor-pointer rounded-xl'
      >
        <X className='size-5'/>
      </button> 
      </div>
      <div className='flex flex-col justify-center items-center gap-5'>
        {/* 1 */}
        <div className='flex flex-col items-center gap-2 text-center'>
         <div className='p-2 bg-blue-600 rounded-xl shadow-lg text-white'><FileText className='size-8'/></div> 
          <h1 className='text-xl font-semibold'>Welcome</h1>
          <h2 className='text-sm'>Signup to access the features</h2>
        </div>
        {/* 2 */}
        <div className='w-full'>
          
          <form onSubmit={handleSubmit}>

          <div>
              <label className='block pb-2 text-sm'>
                <span className='text-black opacity-90'>Full Name</span>
              </label>
              <div className='flex items-center border-2 border-gray-200 rounded-md px-2'>
              <UserRound className='size-5 text-gray-500'/>
              <input
              type="text"
              placeholder='Lakshya'
              className='p-2 w-full focus:outline-none text-sm'
              value={formData.name}
              onChange={(e) => setformData({ ...formData,name: e.target.value })}
              /> 
              </div>
          </div>  
              
            <div className='pt-4'>
              <label className='block pb-2 text-sm'>
              <span className='text-black opacity-90'>Email</span>
              </label>
              <div className='flex items-center border-2 border-gray-200 rounded-md px-2'>
                <Mail className='size-5 text-gray-500'/>
                <input
                type="email"
                placeholder='email@gmail.com'
                className='p-2 w-full focus:outline-none text-sm'
                value={formData.email}
                onChange={(e) => setformData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='pt-4'>
               <label className='block pb-2 text-sm'>
               <span className='text-black opacity-90'>Password</span>
               </label>
              <div className='flex items-center border-2 border-gray-200 rounded-md px-2'>
                <input
                type={showPassword?"text":"password"}
                placeholder='********'
                className='p-2 w-full focus:outline-none text-sm'
                value={formData.password}
                onChange={(e) => setformData({ ...formData, password: e.target.value })}
              />
                <button 
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className='text-gray-500'
                >
                  { showPassword ? <EyeOff className='size-5'/> : <Eye className='size-5'/>}
                </button>
              </div>

              <div className='flex justify-center items-center pt-6'>
                <button 
                  className='bg-blue-600 w-full p-3 text-white rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-sm' 
                  type="submit"
                  disabled={isloading}
                >
                {isloading ? "Creating account..." : "Signup"}
                </button>
              </div>
            </div>
          </form>
        </div>
        
     </div>
    </div>
    </div>
  )
}

export default Signuppage;