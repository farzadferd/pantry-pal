import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Singup component handles user signup functionality and UI
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission when user clicks signup button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:3001/api/auth/signup', { email, password });
            alert('Signup successful!');
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response.data.message;
            alert(errorMessage);
            setError('Signup failed: ' + errorMessage);
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
                    <button type="submit" className="login-btn">Sign Up</button>
                </form>

                {/* <div className="divider">Or Sign Up With</div>
                <div className="social-login">
                    <button className="social-btn facebook">f</button>
                    <button className="social-btn google">G</button>
                </div> */}

                <p className="signup-text">
                    Already have an account? <a href="/login">Log in.</a>
                </p>

                <footer>© 2025 Pantry Pal. All rights reserved.</footer>
            </div>
        </div>
    );
};

export default Signup;
