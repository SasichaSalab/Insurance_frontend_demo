import React, { useState, useEffect } from 'react';
import { Switch, TextField, Button, Typography, FormControlLabel } from '@mui/material';
import axios from 'axios';

const Setting = () => {
  const [settings, setSettings] = useState({
    verifyUser: false,
    paymentNumber: '',
    paymentName: ''
  });

  useEffect(() => {
    // Fetch settings from the server when the component mounts
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        const { verifyUser, paymentNumber, paymentName } = response.data;
        setSettings({
          verifyUser: verifyUser || false,
          paymentNumber: paymentNumber || '',
          paymentName: paymentName || ''
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put('/api/settings', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className='w-full flex flex-col lg:flex-col gap-2 p-5'>
      <Typography variant='h4'>Settings</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={settings.verifyUser}
            onChange={handleChange}
            name='verifyUser'
          />
        }
        label='Verify User'
      />
      <TextField
        label='Payment Number'
        name='paymentNumber'
        value={settings.paymentNumber}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Payment Name'
        name='paymentName'
        value={settings.paymentName}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' color='primary' onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default Setting;
