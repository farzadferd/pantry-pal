import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            alert('Login successful!');
            navigate('/');
        } catch (err) {
            setError('Login failed');
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="login-page">
            {/* Left Section: Login Form */}
            <div className="login-left">
                <h2>Welcome back! <span role="img" aria-label="wave">👋</span></h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <label>Sign In</label>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="login-btn">Sign In</button>
                    {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
                </form>

                {/* <div className="divider">Or Sign In With</div>
                <div className="social-login">
                    <button className="social-btn facebook">f</button>
                    <button className="social-btn google">G</button>
                </div> */}

                <p className="signup-text">
                    Don’t have an account? <a href="/signup">Sign up.</a> 
                </p>

                <footer>© 2025 Pantry Pal. All rights reserved.</footer>
            </div>

            {/* Right Section: Image */}
            <div className="login-right">
                <div className="image-overlay">
                    <h1>Pantry<br />Pal</h1>
                </div>
            </div>
        </div>
    );
};

export default Login;
