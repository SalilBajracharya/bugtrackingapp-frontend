import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/user/userService"
import toast from "react-hot-toast";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        role: 'User'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const result = await createUser(formData);
        if (result.success) {
            toast.success("User registered successfully!");
            navigate("/"); 
        } else {
            toast.error(result.error || "Registration failed.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        name="fullname"
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="User">User</option>
                        <option value="Developer">Developer</option>
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>

            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
