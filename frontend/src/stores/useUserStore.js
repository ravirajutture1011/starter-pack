import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios.js";





export const useUserStore = create((set, get) => ({
  user: null,
  login: async ({name,password}) => {
    try {
      const response = await axiosInstance.post('/login',{name,password});  
      set({ user: response.data });  
      toast.success("Login successful", { toastId: "uniqueToastId" });
    } catch (error) {
      toast.error("Failed to login", { toastId: "uniqueToastId" });
    }
  },
  getData : async({name})=>{
    try {
      const response = await axiosInstance.post('/getdata',{name});  
      console.log("user dataaaa " + JSON.stringify(response.data, null, 2)); // ✅ formatted
    }
    catch (error) {
      toast.error("Failed to get data", { toastId: "uniqueToastId" });
    }
  }
}));
