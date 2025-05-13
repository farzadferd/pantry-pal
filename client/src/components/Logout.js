import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3001/api/auth/logout', {}, {
          //   withCredentials: true, // if using cookies
          });
          navigate('/login');
        } catch (err) {
          const errorMessage = err.response.data.message;
          alert(errorMessage);
        }
      };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};




export default Logout;
