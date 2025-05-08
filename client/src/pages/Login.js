import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Simulate an API call for login
        // Replace this with actual API call
        // For example: 
        // const response = await api.login(email, password);
        // if (response.success) {
        //     navigate('/dashboard');
        // } else {
        //     setError(response.message);
        // }
        if (email === 'test@example.com' && password === 'password') {
            navigate('/landing'); // Replace with actual dashboard route
        } else {
            setError('Invalid email or password');
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
                        {/* <i className="fas fa-envelope icon" /> */}
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        {/* <i className="fas fa-lock icon" /> */}
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
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </form>

                <div className="divider">Or Sign In With</div>
                <div className="social-login">
                    <button className="social-btn facebook">f</button>
                    <button className="social-btn google">G</button>
                </div>

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
