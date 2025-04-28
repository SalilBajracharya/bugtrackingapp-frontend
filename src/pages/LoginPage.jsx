import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login }  from "../services/auth/authService"
import { setCredentials } from "../features/auth/authSlice"; 
import toast from "react-hot-toast";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try{
            const data = await login(emailOrUsername, password);
            dispatch(setCredentials({
                token: data.token,
                user: data.user,
            }));

            navigate('/bugs');

            toast.success('Login successful');

            } catch (err) {
            console.log(err);
            toast.error("Invalid credentials or network error");
        }
    };
    return(
        <div className="login-container">
            <h1>Bug Tracking System</h1>
            <h2>Login</h2>

            <div className="form-group">
                <label>Email/Username</label>
                <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="Enter your username or email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;