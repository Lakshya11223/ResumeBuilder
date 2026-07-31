import React, { useState } from 'react';
import { FileText, X, Menu, LogOut, User,Blocks } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/auth.Store.js";
import { toast } from "react-hot-toast";

function Navbar() {
  const { display, setdisplay, authUser, setregisterdisp, logout } = useAuthStore(); 
  const [isMobileopen, setisMobileopen] = useState(false);
  
  const handleclick = () => {
    if (!authUser) {
      toast.error("Please login first");
      setdisplay(true);
    }
  };

  const handlelogout = async () => {
    await logout();
    setisMobileopen(false);
  };

  const toggleMobileMenu = () => {
    setisMobileopen(!isMobileopen);
  };

  return (
    <>
      <div className='fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 shadow-sm'>
        <div className='flex justify-between items-center px-4 sm:px-10 py-4'>
          <div className='flex items-center gap-1 sm:gap-3 group cursor-pointer'>
            <div className='p-2 bg-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300'>
              <FileText className='size-4 sm:size-6 text-white'/>
            </div>
            <Link to="/home">
              <h1 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                ResumeAnalyst
              </h1>
            </Link>
          </div>

          <div className='hidden md:flex gap-1 lg:gap-6 items-center'>
        
        <Link
          to="/calculate-score"
          className='px-4 lg:px-6 py-2.5 text-slate-700 font-medium hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 ease-in-out'
        >
          Calculate Score
        </Link>

        
            
            <Link
              to="/build"
              onClick={handleclick}
              className="px-4 lg:px-6 py-2.5 text-slate-700 font-medium hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 ease-in-out"
            >
              Build Resume
            </Link>

            {authUser ? (
              <div className="flex items-center gap-4">
                <button 
                  className='px-4 lg:px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2'
                  onClick={() => setdisplay(true)}
                >
                  <User size={18} />
                  My Account
                </button>
                <button 
                  className='px-4 lg:px-6 py-3 rounded-2xl cursor-pointer text-white font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2'
                  onClick={handlelogout}
                > 
                  <LogOut size={18} />
                  Logout 
                </button>
              </div>
            ) : (
              <button 
                className='px-4 lg:px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out'
                onClick={() => setdisplay(true)}
              >
                My Account
              </button>
            )}
          </div>

          <button 
            className='md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors duration-200 cursor-pointer'
            onClick={toggleMobileMenu}
          >
            {isMobileopen ? (
              <X className='size-6 text-slate-700' />
            ) : (
              <Menu className='size-6 text-slate-700' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full z-40 transition-all duration-300 ease-in-out ${
            isMobileopen 
              ? 'opacity-100 visible translate-y-0' 
              : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <div className='bg-white/95 backdrop-blur-sm shadow-lg border-t border-slate-200 rounded-b-2xl'>
            <div className='flex flex-col space-y-1 p-4'>
              <button 
                className="w-full text-left px-6 py-3 text-slate-700 font-medium hover:text-white hover:bg-blue-600 hover:shadow-md rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3"
              >
                <FileText size={18}/>
                Calculate Score
              </button>
              
              <Link
                to="/build"
                onClick={() => { handleclick(); toggleMobileMenu(); }}
                 className="w-full text-left px-6 py-3 text-slate-700 font-medium hover:text-white hover:bg-blue-600 hover:shadow-md rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3">
                <Blocks size={18} />
                Build Resume
              </Link>
              
              {authUser ? (
                <>
                  <button 
                    className="w-full text-left px-6 py-3 text-slate-700 font-medium hover:text-white hover:bg-blue-600 hover:shadow-md rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3"
                    onClick={() => { setdisplay(true); toggleMobileMenu(); }}
                  >
                    <User size={18} />
                    My Account
                  </button>
                  <button 
                    className="w-full text-left px-6 py-3 text-slate-700 font-medium hover:text-white hover:bg-red-600 hover:shadow-md rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3"
                    onClick={handlelogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  className="w-full text-left px-6 py-3 text-slate-700 font-medium hover:text-white hover:bg-blue-600 hover:shadow-md rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3"
                  onClick={() => { setdisplay(true); toggleMobileMenu(); }}
                >
                  <User size={18} />
                  My Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add spacing for content below fixed navbar */}
      
    </>
  );
}

export default Navbar;