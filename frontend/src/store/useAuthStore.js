import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check'); 
            set({authUser : res.data}); 
        } catch (error) {
            console.log("Error in authCheck:",error); 
            set({authUser : null}); 
        } finally {
            set({isCheckingAuth:false}); 
        }
    },

    signup: async(data)=>{
        try {
            set({isSigningUp: true});

            const res = await axiosInstance.post("/auth/signup", data); 

            set({authUser:res.data})

            toast.success("Accout created successfully"); 
            
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSigningUp: false});
        }
    },

    login: async(data)=>{
        try {
            set({isLoggingIn: true});

            const res = await axiosInstance.post("/auth/login", data); 

            set({authUser:res.data})

            toast.success("Logged in successfully"); 
            
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isLoggingIn: false});
        }
    }
}));