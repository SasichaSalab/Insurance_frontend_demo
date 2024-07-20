// src/components/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const res = await axios.get(`${API_URL}/users`, {
          headers: {
            'x-auth-token': token // Set the x-auth-token header
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <p>Email: {user.email}</p>
              <p>Name: {user.name}</p>
              <p>Position: {user.position}</p>
              <p>Company: {user.company_name}</p>
              <p>Phone: {user.phone_number}</p>
              <p>Link: {user.link}</p>
              <p>Introduction: {user.intro_description}</p>
              <p>Payment Date: {new Date(user.payment_date).toLocaleDateString()}</p>
              <p>Payment Expire: {new Date(user.payment_expire).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
