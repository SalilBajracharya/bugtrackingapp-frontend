import toast from "react-hot-toast";
import { API_BASE_URL } from "../api"

export const login = async(username, password) => {
    const response = await fetch(
        `${API_BASE_URL}/Auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        }    
    );
    
    if (!response.ok){
        toast.error('Login Failed');
        return;
    }

    const data = await response.json();
    return data;    
}