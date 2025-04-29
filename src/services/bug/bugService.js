import toast from "react-hot-toast";
import { API_BASE_URL } from "../api"
import axios from "axios";

export const fetchBugsByUser = async(token) => {
    const response = await fetch(`${API_BASE_URL}/Bug/get-by-userid`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok){
        toast.error(data.message);
        return [];
    }

    
    return data;    
}

export const createBugReport = async (bugData) =>{
    const formData = new FormData();
    formData.append('title', bugData.title);
    formData.append('description', bugData.description);
    formData.append('severityLevel', bugData.severityLevel);
    formData.append('reproductionSteps', bugData.reproductionSteps);

    if(bugData.file) {
        formData.append('file', bugData.file);
    }
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await axios.post(`${API_BASE_URL}/Bug/create-bugreport`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.data;
}