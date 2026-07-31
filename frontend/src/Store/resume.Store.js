import { create } from "zustand";
import { toast } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const useResumeStore = create((set, get) => ({
  title: "",
  info: "",
  single: {},
  loading: false,
  resumes: [],
  scoreData: null,       // Holds the score and report result
  scoreLoading: false,

  setTitle: (value) => set({ title: value }),
  setLoading: (value) => set({ loading: value }),

  // Action A: Get score of a saved resume by database ID
  getScore: async (id) => {
    set({ scoreLoading: true, scoreData: null });
    try {
      const res = await fetch(`${API}/api/v1/resumes/score/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to calculate score");
        set({ scoreLoading: false });
        return;
      }

      const data = await res.json();
      set({ scoreData: data.data, scoreLoading: false });
    } catch (error) {
      set({ scoreLoading: false });
      console.error("Error fetching score:", error);
      toast.error("Server error while generating score report");
    }
  },

  // Action B: Send parsed PDF text directly to backend (For uploaded files)
  scoreText: async (text, designation) => {
    set({ scoreLoading: true, scoreData: null });
    try {
      const res = await fetch(`${API}/api/v1/resumes/score-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text, designation }),
      });

      if (!res.ok) {
        toast.error("Failed to analyze resume text");
        set({ scoreLoading: false });
        return;
      }

      const data = await res.json();
      set({ scoreData: data.data, scoreLoading: false });
    } catch (error) {
      set({ scoreLoading: false });
      console.error("Error analyzing resume text:", error);
      toast.error("Server error while generating score report");
    }
  },

  create: async (title, data) => {
    try {
      if (!title) {
        toast.error("Title is required!");
        return;
      }
      const res = await fetch(`${API}/api/v1/resumes/create`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ title, ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        toast.error("Resume not saved");
        return;
      }
      const val = await res.json();
      set({ info: val });
      toast.success("Your resume has been saved!");
    } catch (error) {
      console.error(error);
    }
  },

  getall: async () => {
    set({loading:true})
    try{
      const res=await fetch(`${API}/api/v1/resumes/all`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
      })
      if(!res.ok){
        set({ loading: false });
        return;
      }
      const data = await res.json();
      set({resumes : data.data, loading:false});
    }catch (error) {
      set({loading:false});
    }
  },

  Delete:async (id)=>{
    try {
      const res = await fetch(`${API}/api/v1/resumes/delete/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
      })
      if(!res.ok){
        toast.error("Server error")
        return;
      }
      set((state) => ({
        resumes: state.resumes.filter(resume => resume._id !== id)
      }));
      await get().getall();
    } catch (error) {
      console.error(error);
    }
  },

  getresume:async (id)=>{
    try{
      const res =await fetch(`${API}/api/v1/resumes/get/${id}`,{
        credentials:"include",
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
      })
      if(!res.ok){
        toast.error("Server error")
        throw new Error("Error") 
      }
      const val =await res.json();
      set({single : val.data[0]})
    } catch (error) {
      console.error(error);
    }
  },

  update:async (id,resumedata)=>{
    try{
      const res =await fetch(`${API}/api/v1/resumes/update/${id}`,{
        credentials:"include",
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({ resumedata }),
      })
      if(!res.ok){
        toast.error("Updation failed")
      }
      const val =await res.json();
      set({single : val.data})
      toast.success("Done!")
    } catch (error) {
      console.error(error);
    }
  },
}));