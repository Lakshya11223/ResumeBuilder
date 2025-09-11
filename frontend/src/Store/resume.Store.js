import { create } from "zustand";
import { toast, ToastBar } from "react-hot-toast";

export const useResumeStore = create((set, get) => ({
  title: "",
  info:"",
  single:{},
  loading:false,
  resumes:[],
  setTitle: (value) => set({ title: value }), // 
  setLoading:(value)=>set({loading:value}),


create: async (title, data) => {
  try {
    if (!title) {
      toast.error("Title is required!");
      return;
    }
      console.log(' Sending to backend - Title:', title);
      console.log(' Sending to backend - Resume Data:', data);

    const res = await fetch("http://localhost:4000/api/v1/resumes/create", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ title, ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      toast.error("Resume not saved (Server Error)");
      return;
    }
    console.log("coming data",data);
    const val = await res.json();
    console.log("res.json->",val);
    set({ info: val });
    toast.success("Your resume has been saved!");
  } catch (error) {
    console.error("Error in create resume:", error);
    
    }
    },

getall: async () => {
  set({loading:true})
  console.log("get all is called from frontend")
  try{
    const res=await fetch('http://localhost:4000/api/v1/resumes/all',{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
    })
    console.log("All request is fetched from frontend")
    if(!res.ok){
      set({ loading: false });
      console.log("Error in fetching old resume")
      return;
    }
    
    const data = await res.json();
    set({resumes : data.data, loading:false});
    
  }catch (error) {
    set({loading:false});
    console.error("Error in fetching all resume:", error);
    toast.error("Error in fetching your old documents...[Server]")
  }
},

 Delete:async (id)=>{
  try {
    const res = await fetch(`http://localhost:4000/api/v1/resumes/delete/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
    })
    if(!res.ok){
      toast.error("Server is not responding")
      return;
    }
    set((state) => ({
          resumes: state.resumes.filter(resume => resume._id !== id)
      }));
    await get().getall();
    console.log("deleted")
  } catch (error) {
    console.error("Error in deleting  resume:", error);
  }
 },
 getresume:async (id)=>{
  try{
      const res =await fetch(`http://localhost:4000/api/v1/resumes/get/${id}`,{
        credentials:"include",
        method:"GET",
        headers:{
        "Content-Type":"application/json",
      },
      })
      if(!res.ok){
        toast.error("Server error")
        throw new Error("Error in frtching one resume") 
      }
      const val =await res.json();
      set({single : val.data[0]})
      
      console.log(get().single)

  } catch (error) {
     
    console.error("Error in getresume:", error);
    throw error;
  }
 },
  update:async (id,resumedata)=>{
  try{
     const res =await fetch(`http://localhost:4000/api/v1/resumes/update/${id}`,{
        credentials:"include",
        method:"PUT",
        headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({ resumedata }),
      })
      if(!res.ok){
        console.log("Error in updating ")
        toast.error("Updation failed")
      }
      const val =await res.json();
      set({single : val.data})
      toast.success("Done!")
      console.log(get().single)

  } catch (error) {
     
    console.error("Error in update:", error);
    throw error;
  }
 },
 

}));
