import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/auth/authService";
import { setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        // Validate fields
        if (!emailOrUsername) {
            toast.error('Please enter username!');
            document.getElementById('username').focus();
            return;
        }

        if (!password) {
            toast.error('Please enter password!');
            document.getElementById('password').focus();
            return;
        }

        const data = await login(emailOrUsername, password);

        if (data.token) {
            const decodedToken = jwtDecode(data.token);
            const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);

            dispatch(setCredentials({
                token: data.token,
                user: data.user,
            }));

            navigate('/bugs');
            toast.success('Login successful');
        } else {
            toast.error('Login failed. No token received.');
        }
    };

    return (
        <div className="login-container">
            <h1>Bug Tracking System</h1>
            <h2>Login</h2>

            <div className="form-group">
                <label>Email/Username</label>
                <input
                    id="username"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="Enter your username or email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>

            <button className="submit-login" onClick={handleLogin}>Login</button>
            <p style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/register">Create New User</Link>
            </p>
        </div>
    );
}

export default LoginPage;
