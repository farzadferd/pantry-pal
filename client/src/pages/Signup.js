import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        // Replace with real API call
        if (email && password) {
            navigate('/landing'); // Replace with actual dashboard route
        }
    };

    return (
        <div className="login-page">
            {/* Left Section: Image */}
            <div className="signup-left">
                <div className="image-overlay">
                </div>
            </div>

            {/* Right Section: Sign Up Form */}
            <div className="login-left">
                <form onSubmit={handleSubmit} className="login-form">
                    <label>Sign Up</label>
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
                    <div className="input-group">
                        {/* <i className="fas fa-lock icon" /> */}
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="login-btn">Sign Up</button>
                </form>

                <div className="divider">Or Sign Up With</div>
                <div className="social-login">
                    <button className="social-btn facebook">f</button>
                    <button className="social-btn google">G</button>
                </div>

                <p className="signup-text">
                    Already have an account? <a href="/login">Log in.</a>
                </p>

                <footer>© 2025 Pantry Pal. All rights reserved.</footer>
            </div>
        </div>
    );
};

export default Signup;
