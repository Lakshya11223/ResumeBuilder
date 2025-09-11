import React from 'react'
import {CirclePlus} from "lucide-react"
import { useAuthStore } from '../Store/auth.Store'
import Titlepage from '../Components/Titlepage.jsx'
function Notsomething() {
   const {addnewResume,setaddnewResume} = useAuthStore();
  return ( 
    <>  
    <div className= 'realtive flex pt-20 h-screen w-full bg-gradient-to-r from-slate-50 via-amber-50 to-blue-50 '>
        {addnewResume && <div className='fixed inset-0 bg-black/30 flex justify-center items-center backdrop-blur-sm z-50'>
        <Titlepage/>
        </div> }
      <div 
      className='m-10 flex flex-col justify-center items-center h-70 w-70 gap-2 border-2 border-dashed rounded-xl shadow-lg  bg-gradient-to-r from-slate-50 to-blue-50 hover:-translate-y-1 transition-transparent duration-500'>
        <button onClick={()=>setaddnewResume(true)}>
        <div
        className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-2 rounded-xl mb-5 cursor-pointer'
        >
        <CirclePlus className='size-14 text-white hover:animate-pulse'/>
        </div>
        </button>
        <h1 className="text-xl font-bold ">Create New Resume</h1>
        <div className='max-w-60'>
          <p className='opacity-90 text-sm' >Build a professional resume that gets you hired</p>
        </div>
      </div>
    
      <div className='flex flex-col w-250 justify-center items-center'>
        <h1 className='font-semibold text-lg'>No Resume Yet...</h1>
        <h2>Click the add sign to create resume</h2>
      </div>

    </div>

    </>
  )
}

export default Notsomething