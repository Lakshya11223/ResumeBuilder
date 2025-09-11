import { Toaster, toast } from 'react-hot-toast'
import Navbar from "./Components/Navbar.jsx"
import Home from "./Components/Home.jsx"
import { useAuthStore } from "./Store/auth.Store.js"
import Notsomething from "./Components/Notsomething.jsx"
import Something from "./Components/Something.jsx"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import ResumeSection from './Components/ResumeSection.jsx'
import { useResumeStore } from './Store/resume.Store.js'
import Signuppage from './Components/Signuppage.jsx'
import { useEffect } from "react"

function App() {
  const { isloading, authUser, registerdisp, check, logout } = useAuthStore();
  
  useEffect(() => {
    check();
  }, [check]);

  if (isloading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  } 

  return (
    <div className='relative'>
      <Toaster position='top-center' reverseOrder={false} />
      <Navbar />
      
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route 
          path="/build" 
          element={authUser ? <Something/> : <Navigate to="/home" replace />} 
        />
        <Route path="/resume" element={authUser ? <ResumeSection/> : <Navigate to="/home" replace />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App