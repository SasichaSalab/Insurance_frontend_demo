// LogoutButton.jsx (example React component)

import React from 'react';
import axios from 'axios';
import API_URL from '../config';
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`); // Adjust endpoint as per your backend setup
      localStorage.removeItem('token'); // Clear token from localStorage
      // Redirect or handle logout success
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
