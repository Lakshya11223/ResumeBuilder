import React from 'react'
import {File,X} from 'lucide-react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuthStore } from '../Store/auth.Store'
import { useResumeStore } from '../Store/resume.Store'
function Titlepage() {
 
    const { title, setTitle } = useResumeStore();
    const {addnewResume,setaddnewResume} = useAuthStore();
  return (
    <>
    <div className='bg-white h-75 sm:h-90 w-65 sm:w-100 rounded-xl shadow-lg'>

        <div className='flex justify-end'> 
             <button onClick={()=>{setaddnewResume(false)}}
               className='bg-gray-200 p-1 hover:scale-110 transition-transform duration-400 cursor-pointer rounded-xl'
             >
               <X  />
             </button> 
        </div>

        <div className='flex flex-col items-center justify-center bg-white pt-3 gap-2'>
           <div className='bg-gradient-to-r from-blue-600 to-purple-600  rounded-xl shadow-lg p-2'> 
                <File className='text-white size-9 sm:size-14'/>
           </div>
           <div className='flex flex-col justify-center items-center m-2 gap-2'>
            <h1 className='font-semibold sm:font-bold text-xl'>Create New Resume</h1>
            <h2 className='text-sm opacity-80'>Enter Your title here</h2>
               <input
                className='p-2 sm:p-4 w-full  transition-all text-center border-2 rounded-xl '
                placeholder="e.g: Software Engineer "
                value={title}
                 onChange={(e) => setTitle(e.target.value)}
               />
           </div>
        
         <Link to='/resume'>
          <button
          className="px-7 sm:px-20 py-2 rounded-2xl font-bold text-white text-lg bg-red-500
                  cursor-pointer hover:scale-105 transition-tansparent duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
          Create
            <span className="group-hover:translate-x-1 transition-transform duration-300">📄</span>
          </span>
        </button>
        </Link>

        </div>
    </div>
    </>
  )
}

export default Titlepage