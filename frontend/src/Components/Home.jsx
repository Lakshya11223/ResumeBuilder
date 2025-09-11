import React, { useState } from 'react'
import {ChartNoAxesCombined,Zap,Target} from "lucide-react"
import Loginpage from './Loginpage.jsx'
import {Link} from "react-router-dom"
import {useAuthStore} from "../Store/auth.Store.js"
import Signuppage from "../Components/Signuppage.jsx"
import OtpBox from './OtpBox.jsx'
function Home() {

const {display,setdisplay,registerdisp,setregisterdisp,isRegister} = useAuthStore();

return (
<div className='pt-20 h-400 w-full'>
<header className='flex flex-col lg:flex-row bg-amber-50 p-10 relative'>

        {display && 
           <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
              <Loginpage/>
          </div>
        }
        {registerdisp && 
          <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
              <Signuppage/>
          </div>
        }
        {
          isRegister &&
          <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
              <OtpBox/>
          </div>
        }
             
          <div className="flex w-full flex-col items-center text-center px-3 sm:px-6 py-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent leading-tight">
              Craft Your Resume Here
            </h1>
            <p className="mt-3 sm:mt-6 max-w-2xl text-sm md:text-xl text-gray-600">
              Build job-winning resumes with expertly designed templates — ATS-friendly, recruiter-approved, and tailored to your career goals.
            </p>
        <div className="mt-10 flex flex-wrap gap-6 justify-center">
        
          <button 
          className="px-6 py-3  rounded-2xl cursor-pointer bg-blue-600 text-white  font-medium shadow-md hover:-translate-y-1 transition-transform duration-500 ease-in-out"
          onClick={()=>setregisterdisp(true)}
          >
          Get Started
          </button>
         
          <button className="px-6 py-3 rounded-2xl border cursor-pointer border-blue-600 text-blue-600 font-medium hover:-translate-y-1 transition-transform duration-500 ease-in-out">
            Check Your Score
          </button>
        </div>

        <div className='flex  mt-6'>
        <div className='p-3 sm:p-10'>
              <h1 className='font-bold text-xl sm:text-3xl '>50k+</h1>
              <p className='text-sm sm:text-xl'>Resume Created</p>
        </div>
        <div className='p-3 sm:p-10'>
            <h1 className='font-bold text-xl sm:text-3xl'>5min</h1>
            <p className='text-sm sm:text-xl'>Build Time</p>
        </div>
        <div className='p-3 sm:p-10'>
            <h1 className='font-bold text-xl sm:text-3xl'>4.9</h1>
            <p className='text-sm sm:text-xl'>User rating</p>
        </div>
        </div>
     </div >
      
      <div className='  sm:h-130 w-full mt-7 flex justify-center align-center '>
        <img 
        src="/src/assets/image.webp"
        alt="Hero" 
        className="hidden sm:block h-full w-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
      />

      </div>
</header>

<section className='flex flex-col items-center justify-center bg-gradient-to-r from-slate-50 to-blue-50 p-10'>
    {/* cards */}
   
   
   <div className='pt-5 sm:pt-10 pb-12' >
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl  text-center leading-snug">
      Why you Choose Our{" "}
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Resume Analyst?
      </span>
    </h1>
      <p className='hidden sm:text-lg'> Everything you need to create a professional resume that stands out</p>
    </div>
    
    <div className='flex flex-wrap gap-10 sm:gap-20'>

    <div className='h-60 sm:h-70 flex flex-col items-center  p-2 w-80 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-cyan-100 hover:shadow-xl'>
      <div className='flex flex-col items-center'>
        <div className='p-3 bg-gradient-to-r from-blue-500 to-cyan-500  shadow-lg mb-6 hover:scale-110 transition-transform duration-300 rounded-2xl'><ChartNoAxesCombined /></div>
        <h1 className='font-bold text-xl'>Optimal length</h1>
      </div>
      <div className='p-2 text-1.5sm '>
        <p className='text-sm sm:text-lg'>Most employers prefer a resume that fits on one page. Our ATS checker gives you tips to help you highlight your top strengths clearly and concisely.</p>
      </div>
    </div>

    <div className='h-60 sm:h-70 flex flex-col items-center p-2 w-80 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-pink-100 hover:shadow-xl'>
      <div className='flex flex-col items-center'>
        <div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mb-6 rounded-2xl hover:scale-110 transition-transform duration-300'><Target /></div>
        <h1 className='font-bold text-xl'>ATS Optimization</h1>
      </div>
      <div className='p-2 text-1.5sm '>
        <p className='text-sm sm:text-lg'>Ensure your resume passes through Applicant Tracking Systems with our advanced scanning technology and keyword optimization suggestions</p>
      </div>
    </div>

     <div className='h-60 sm:h-70 flex flex-col items-centerp-2 w-80 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-emerald-50 to-teal-50 hover:shadow-teal-100 hover:shadow-xl'>
      <div className='flex flex-col items-center'>
        <div className='p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg mb-6 hover:scale-110 transition-transform duration-300'><Zap /></div>
        <h1 className='font-bold text-xl'>Instant Results</h1>
      </div>
      <div className='p-2 text-1.5sm '>
        <p className='text-sm sm:text-lg'>Get comprehensive feedback on your resume within seconds. Our AI-powered system provides actionable insights to improve your chances.</p>
      </div>
    </div>
   </div>
</section>

<div className="flex flex-col justify-center items-center p-6 sm:p-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl  font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
          Why Are You Waiting For?
        </h1>
        <h2 className="mt-6 text-sm sm:text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
          Transform your career with a professional resume that gets noticed ✨
        </h2>
      </div>
      <Link to="/build">
      <div className="mt-12 relative">
        <button
          className="px-2 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-2xl font-bold text-white text-sm sm:text-lg
                     bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 
                     hover:from-blue-700 cursor-pointer hover:scale-105 transition-tansparent duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Building Now
            <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
          </span>
        </button>
        
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
      </div>
      </Link>
    </div>
  </div>



  
  )
}

export default Home