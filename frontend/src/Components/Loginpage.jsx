import React, { useState } from 'react'
import {UserRound,Mail,Eye,EyeOff,FileText,X} from 'lucide-react'
import {useAuthStore} from "../Store/auth.Store.js"
import Signuppage from "./Signuppage.jsx"

function Loginpage() {
    const [showPassword,setshowPassword] = useState(false);
    const [formData,setformData] = useState({email:"",password:""})
    const {display,setdisplay,setregisterdisp,isloading,login} = useAuthStore(); 
      
    const handleSubmit =async (e)=>{
     e.preventDefault();
     await login(formData)
    }

  return (
    
    <div className='bg-amber-50 shadow-lg max-w-md mx-4 rounded-xl p-4 sm:p-6'>
      <div className='flex justify-end'> 
      <button onClick={()=>{setdisplay(false)}}
        className='bg-gray-200 p-1 hover:scale-110 transition-transform duration-300 cursor-pointer rounded-xl'
      >
        <X className='size-5' />
      </button> 
      </div>
      <div className='flex flex-col justify-center items-center gap-5 sm:gap-7'>
        {/* 1 */}
        <div className='flex flex-col items-center gap-2 text-center'>
         <div className='p-2 bg-blue-600 rounded-xl shadow-lg text-white'><FileText className='size-8 sm:size-10'/></div> 
          <h1 className='text-xl sm:text-2xl font-semibold'>Sign In</h1>
          <h2 className='text-sm sm:text-base'>To continue building your amazing resume</h2>
        </div>
        {/* 2 */}
        <div className='w-full'>
          
          <form onSubmit={handleSubmit}>
                
            <div className='pt-4'>
              <label className='block pb-2 text-sm'>
                <span className='text-primary opacity-90'>Email</span>
              </label>
              <div className='flex items-center border-2 border-gray-200 rounded-md px-2'>
                <Mail className='size-5 sm:size-6 text-gray-500'/>
                <input
                  type="email"
                  placeholder='email@gmail.com'
                  className='p-2 w-full focus:outline-none text-sm sm:text-base'
                  value={formData.email}
                  onChange={(e) => setformData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='pt-4'>
               <label className='block pb-2 text-sm'>
                 <span className='text-primary opacity-90'>Password</span>
               </label>
              <div className='flex items-center border-2 border-gray-200 rounded-md px-2'>
                <input
                  type={showPassword?"text":"password"}
                  placeholder='********'
                  className='p-2 w-full focus:outline-none text-sm sm:text-base'
                  value={formData.password}
                  onChange={(e) => setformData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className='text-gray-500'
                >
                  {showPassword ? <EyeOff className='size-5 sm:size-6'/> : <Eye className='size-5 sm:size-6'/>}
                </button>
              </div>

              <div className='flex justify-center items-center pt-6'>
                <button 
                  className='bg-blue-600 w-full p-3 text-white rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-sm sm:text-base' 
                  type="submit"
                  disabled={isloading}
                >
                  {isloading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
    {/* {3} */}
          <div className='text-center'>
            <p className="text-xs sm:text-sm">
              Don't have an account?{" "}
              <button 
                onClick={() => {setregisterdisp(true);setdisplay(false)}} 
                className="font-semibold text-blue-500 hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
        </div>
    </div>
    </div>

  )
}

export default Loginpage