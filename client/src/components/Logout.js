import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Logout component handles logging out the user
const Logout = () => {
    const navigate = useNavigate();

    // Function to handle logout when button is clicked
    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3001/api/auth/logout', {}, {
            // withCredentials: true, // for cookies
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
