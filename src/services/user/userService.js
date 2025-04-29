import axios from 'axios';
import { API_BASE_URL } from "../api"

export const fetchDevelopers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/User/get-devs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/User/create-user`, userData);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        let message = "Registration failed.";
        if (error.response?.data?.message) {
            message = error.response.data.message;
        }
        return {
            success: false,
            error: message
        };
    }
};