import toast from "react-hot-toast";
import { API_BASE_URL } from "../api"
import axios from "axios";

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/Auth/login`,
            {
                username,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error)
            toast.error('Login Failed');
        } else if (error.request) {
            toast.error('No response from the server');
        } else {
            toast.error('Something went wrong');
        }
        return null;
    }
};