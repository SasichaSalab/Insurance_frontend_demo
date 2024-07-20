// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      console.log(res.data);
      alert('Password reset link sent to your email');
    } catch (err) {
      console.error(err.response.data);
      alert('Error sending password reset email');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          borderRadius: 1,
          boxShadow: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Send Reset Link
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate('/login')}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
