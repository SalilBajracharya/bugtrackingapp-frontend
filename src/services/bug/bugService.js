import toast from "react-hot-toast";
import { API_BASE_URL } from "../api"
import axios from "axios";

export const fetchAllBugs = async (token, search = "", severity = "", status = "") => {
    const response = await fetch(`${API_BASE_URL}/Bug/get-all?search=${search}&severity=${severity}&status=${status}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch bugs");
    }
    return await response.json();
};

export const fetchBugsByUser =  async (token, search = "", severity = "", status = "") => {
    const response = await fetch(`${API_BASE_URL}/Bug/get-by-userid?search=${search}&severity=${severity}&status=${status}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        toast.error(data.message);
        return [];
    }
    return data;
}

export const deleteBug = async (token, bugId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Bug/delete-bugreport?Id=${bugId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        const responseData = await response.json().catch(() => null); 

        if (!response.ok) {
            const errorMessage = responseData?.message || `Failed to delete bug. (${response.status})`;
            toast.error(errorMessage);
            return null;
        }
        return response;

    } catch (error) {
        toast.error('Failed to delete bug (network/server error).');
        return null;
    }
};


export const createBugReport = async (bugData) => {
    const formData = new FormData();
    formData.append('title', bugData.title);
    formData.append('description', bugData.description);
    formData.append('severityLevel', bugData.severityLevel);
    formData.append('reproductionSteps', bugData.reproductionSteps);

    if (bugData.file) {
        formData.append('file', bugData.file);
    }
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_BASE_URL}/Bug/create-bugreport`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateBug = async (bugData) => {
    const formData = new FormData();
    formData.append('id', bugData.id);
    formData.append('title', bugData.title);
    formData.append('description', bugData.description);
    formData.append('severityLevel', bugData.severityLevel);
    formData.append('reproductionSteps', bugData.reproductionSteps);
    formData.append('status', bugData.status);
    formData.append('developerId', bugData.developerId || ''); 

    if (bugData.file) {
        formData.append('file', bugData.file);
    }

    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_BASE_URL}/Bug/update-bugreport`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.data;
};