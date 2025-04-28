import { API_BASE_URL } from "../api"

export const login = async(emailOrUsername, password) => {
    const response = await fetch(
        `${API_BASE_URL}/auth/login?email=${encodeURIComponent(emailOrUsername)}&password=${encodeURIComponent(password)})`,
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
        }    
    );

    if (!response.ok){
        throw new Error('Login Failed');
    }

    const data = await response.json();
    return {token : data.token};    
}