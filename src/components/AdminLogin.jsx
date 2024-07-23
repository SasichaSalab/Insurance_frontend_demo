import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, useTheme } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CalculateOutlined } from '@mui/icons-material';
import { useUserRole } from '../context/UserRoleProvider'; // Import the context hook

const AdminLogin = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const { setUserRole } = useUserRole(); // Use the context hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define fixed credentials
    const adminCredentials = { email: 'admin@example.com', password: 'admin123' };
    const superadminCredentials = { email: 'superadmin@example.com', password: 'superadmin123' };

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUserRole('admin');
      navigate('/home-admin');
    } else if (email === superadminCredentials.email && password === superadminCredentials.password) {
      setUserRole('superadmin');
      navigate('/home-admin');
    } else {
      alert('Invalid email or password');
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Number of slides

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);
  const getDescription = (title) => {
    if (title === 'Calculation') {
      return 'ลูกค้าสามารถคำนวณเพื่อดูค่าตอบแทนและความคุ้มครองเองได้';
    } else if (title === 'Export file') {
      return 'สามารถบันทึกไฟล์เป็น PDF และ รูปภาพ เพื่อนำไปเสนอลูกค้าได้';
    } else if (title === 'Dashboard') {
      return 'เก็บข้อมูล การทดลองคำนวณประกันของลูกค้า เพื่อเพิ่มยอดขายให้ได้มากขึ้น';
    } else {
      return 'Default description.';
    }
  };
  return (
    <div className='h-screen bg-white flex flex-row w-screen'>
      <div className='h-full hidden md:block' style={{ backgroundColor: theme.palette.primary.main, width: '50%' }}>
        <div className='w-full h-full flex flex-row items-center justify-center p-5'>
          <div className='h-full w-5/12 flex flex-row items-center justify-center'>
            <div className='h-96 w-72 bg-white rounded-lg'>
              <Carousel
                selectedItem={currentSlide}
                onChange={(index) => setCurrentSlide(index)}
                showThumbs={false}
                showArrows={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                transitionTime={500}
              >
                {['Calculation', 'Export file', 'Dashboard'].map((title, index) => (
                  <div key={index} className="h-96 w-72 flex flex-col items-center justify-center gap-5">
                    <div className='bg-blue-100 p-5 rounded-full'>
                      <CalculateOutlined style={{ fontSize: 60, color: theme.palette.primary.main }} />
                    </div>
                    <div className='flex flex-col'>
                      <Typography variant='h5' sx={{ fontWeight: 'bold', color: theme.palette.primary.main }} className='pb-3'>
                        {title}
                      </Typography>
                      <Typography>
                        {getDescription(title)}
                      </Typography>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div className='h-full w-full lg:w-full xl:w-full md:w-11/12 sm:w-11/12 flex flex-row items-center justify-center'>
        <div className='h-5/6 w-11/12 lg:w-7/12 xl:w-7/12 md:w-11/12 sm:w-11/12 flex flex-col items-center justify-center gap-7'>
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-7'>
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Sign In</Typography>
            <div className='w-full flex flex-col items-start justify-center gap-2'>
              <Typography>Email</Typography>
              <TextField
                id="outlined-email"
                variant="outlined"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className='w-full'
              />
              <Typography>Password</Typography>
              <TextField
                id="outlined-password"
                variant="outlined"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className='w-full'
              />
              <Typography className='self-end cursor-pointer text-primary hover:font-bold' onClick={() => navigate('/forgot-password')}>Forgot password?</Typography>
            </div>
            <Button type="submit" variant="contained" color="primary" sx={{ '&:hover': { backgroundColor: theme.palette.primary.dark } }}>Sign In</Button>
            <div className='w-full flex flex-wrap items-start justify-center gap-2'>
              <Typography>Don't have an account?</Typography>
              <Typography className='underline cursor-pointer text-primary hover:font-bold' onClick={() => navigate('/register')}>Sign Up</Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
