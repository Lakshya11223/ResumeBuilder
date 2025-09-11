import React, { useEffect } from 'react'
import { CirclePlus, FileText, Trash2,SquarePen } from "lucide-react"
import { useAuthStore } from '../Store/auth.Store'
import Titlepage from '../Components/Titlepage.jsx'
import { useResumeStore } from '../Store/resume.Store.js'
import { useNavigate } from 'react-router-dom'

function Something() {
  const { addnewResume, setaddnewResume } = useAuthStore();
  const { loading, setLoading, getall, resumes,Delete,getresume} = useResumeStore();
 const navigate = useNavigate();
useEffect(() => {
  const fetchData = async () => {
    await getall(); 
  };
  fetchData();
}, [getall,Delete]);

const handledelete=async (id)=>{
   if (window.confirm("Are you sure you want to delete this resume?")) {
      await Delete(id);
    }
}
const getresumehandler=async(id)=>{
    await getresume(id)
    navigate("/resume"); 
}
  

  if(loading) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <h1 className='text-xl font-semibold'>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className='relative flex pt-25 sm:pt-20  min-h-screen w-full bg-gradient-to-r from-slate-50 via-amber-50 to-blue-50 overflow-y-scroll'>
        {addnewResume && (
          <div className='fixed inset-0 bg-black/30 flex justify-center items-center backdrop-blur-sm z-50'>
            <Titlepage />
          </div>
        )}

        <div className='flex flex-wrap '>
         
          <div
            className=' m-5 sm:m-10 flex flex-col justify-center items-center h-60 sm:h-70 w-65 sm:w-70 gap-2 border-2 border-dashed rounded-xl shadow-lg bg-gradient-to-r from-slate-50 to-blue-50 hover:-translate-y-1 transition-transform duration-500'
          >
            <button onClick={() => setaddnewResume(true)}>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-2 rounded-xl mb-5 cursor-pointer'>
                <CirclePlus className='size-10 sm:size-14 text-white hover:animate-pulse' />
              </div>
            </button>
            <h1 className= "text-xl sm:text-xl font-bold">Create New Resume</h1>
            <div className='max-w-60'>
              <p className='opacity-90 text-sm'>Build a professional resume that gets you hired</p>
            </div>
          </div>

          {resumes.map((data, idx) => (
            <div
              key={idx}
              className='m-5 sm:m-10 flex flex-col justify-center items-center h-60 sm:h-70 w-65 sm:w-70 gap-2 border-2 border-dashed rounded-xl shadow-lg bg-gradient-to-r from-slate-50 to-blue-50 hover:-translate-y-1 transition-transform duration-500'
            >
              <button onClick={()=>{getresumehandler(data._id);console.log("resume handler clicked")}} className='hover:opacity-80 cursor-pointer'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-2 rounded-xl mb-5 cursor-pointer'>
                <FileText className='size-10 sm:size-14 text-white hover:animate-pulse' />
              </div>
              </button>

              <h1 className="text-xl font-bold">{data.title}</h1>
              <div className='max-w-60 flex gap-3'>
                
                <button className='p-1' onClick={()=>getresumehandler(data._id)}>
                  <SquarePen className='size-7 cursor-pointer text-blue-500 hover:opacity-70'/>
                </button>

                <button onClick={()=>handledelete(data._id)} >
                <Trash2 className="cursor-pointer text-red-500 hover:opacity-70 " />
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Something
