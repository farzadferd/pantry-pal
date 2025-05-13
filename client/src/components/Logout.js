import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3001/api/auth/logout', {}, {
          //   withCredentials: true, // if using cookies
          });
          navigate('/login');
        } catch (err) {
          setError('Logout failed');
          console.error('Logout failed', err);
        }
      };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};




export default Logout;
