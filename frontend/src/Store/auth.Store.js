import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware"; 


const API = import.meta.env.VITE_API_URL;

export const useAuthStore = create(
  (set, get) => ({
  
  display: false,
  registerdisp: false,
  addnewResume: false,
  authUser: false,
  isloading: false,
  isRegister: false,
  isloggedOut: true,

 
  setdisplay: (value) => set({ display: value }),
  setregisterdisp: (value) => set({ registerdisp: value }),
  setaddnewResume: (value) => set({ addnewResume: value }),
  setauthUser: (value) => set({ authUser: value }), 
  setisloading: (value) => set({ isloading: value }),
  setisRegister: (value) => set({ isRegister: value }),

  // Check Auth
  check: async () => {
    set({ authUser: false, isloading: true });
    try {
      const res = await fetch(`${API}/api/v1/users/check`, {
        credentials: "include",
        method: "GET",
      });

      if (!res.ok) {
        set({authUser:false,isloading:false})
        toast.error("User is not authenticated");
        return ;
      }

      set({ isloading: false, authUser: true });
    } catch (err) {
      
      set({ isloading: false, authUser: false });
      console.log("Error in check auth:", err);
    }
  },
verify:async (data)=>{
    set({isloading:true})
    try {
    const res = await fetch(`${API}/api/v1/users/verify`, {
    credentials: "include",
    method: "POST",
    body:JSON.stringify(data),
     headers: {
        "Content-Type": "application/json",   
      },
    });

    if (!res.ok) {
    toast.error("Your otp may be not correct"); 
    throw new Error("You enter invallied Otp");
    }
    toast.success("You are verified")
    set({ isloading: false, authUser: true });
    } catch (error) {
      toast.error("Server Error"); 
      set({ isloading: false, authUser: false });
      console.log("Error in check auth:", error);
    }
  },

  // Register
  register: async (data) => {
    set({ isloading: true });
    try {
      const res = await fetch(`${API}/api/v1/users/Signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("you are not registered [Error occur]")
        throw new Error("Something went wrong in register route");
      }

      toast.success("User Registered Successfully");
      set({ isloading: false, isRegister: true, isloggedOut: false });
    } catch (error) {
       toast.error("Server Error"); 
      set({ authUser: false, isloading: false, isRegister: false });
      console.log("Error in catch block of register:", error);
    }
  },

  // Login
  login: async (data) => {
    set({ isloading: true });
    try {
      const res = await fetch(`${API}/api/v1/users/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("you are not logged-in [Error occur]")
        throw new Error("Something went wrong in login route");
      }

      toast.success("You are logged in");
      set({ isloading: false, isloggedOut: false, authUser: true });
    } catch (error) {
      toast.error("Server Error"); 
      set({ authUser: false, isloading: false, isloggedOut: true });
      console.log("Error in catch block of login:", error);
    }
  },

  // Logout
 logout: async () => {
  set({ isloading: true });
  try {
    const res = await fetch(`${API}/api/v1/users/logout`, {                                                                                                                          
      credentials: "include",
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Something went wrong in logout route");
    }

    const data = await res.json(); 
    console.log("Logout response:", data); // Debug logging
    
    toast.success("Logged out successfully");
    set({ isloading: false, isloggedOut: true, authUser: false });
    
    // Force a hard redirect to ensure clean state
    window.location.href = "/home";
    
  } catch (error) {
    set({ authUser: false, isloading: false, isloggedOut: true });
    console.log("Error in catch block of logout:", error);
  }
},
}));
