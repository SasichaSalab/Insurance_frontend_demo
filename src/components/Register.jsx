import React, { useState } from 'react';
import axios from 'axios';
import { Typography, IconButton, useTheme, TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Button } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCancel = () => {
    navigate('/'); // Navigate to /login
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    position: '',
    company_name: '',
    lisense_number: '',
    phone_number: '',
    link: '',
    profile_image: null,
    intro_image: null,
    intro_description: '',
    payment_date: '',
    payment_expire: '',
    isConfirm: false,
    isTry: false,
  });

  const {
    email, password, name, position, company_name, lisense_number,
    phone_number, link, profile_image, intro_image, intro_description,
    payment_date, payment_expire, isConfirm, isTry,
  } = formData;

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onFileChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('email', email);
    formDataToSubmit.append('password', password);
    formDataToSubmit.append('name', name);
    formDataToSubmit.append('position', position);
    formDataToSubmit.append('company_name', company_name);
    formDataToSubmit.append('lisense_number', lisense_number);
    formDataToSubmit.append('phone_number', phone_number);
    formDataToSubmit.append('link', link);
    formDataToSubmit.append('profile_image', profile_image);
    formDataToSubmit.append('intro_image', intro_image);
    formDataToSubmit.append('intro_description', intro_description);
    formDataToSubmit.append('payment_date', payment_date);
    formDataToSubmit.append('payment_expire', payment_expire);
    formDataToSubmit.append('isConfirm', isConfirm);
    formDataToSubmit.append('isTry', isTry);

    try {
      const res = await axios.post('/api/auth/register', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-5 w-screen m-0'>
      <Typography variant='h4' sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Sign Up</Typography>
      <form className=' w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-start justify-center gap-2' onSubmit={onSubmit}>
        <div className='w-full sm:w-full md:w-full lg:w-2/6 xl:w-2/6'>
          <div className='w-full shadow-xl bg-white rounded-lg p-5 flex flex-col gap-2'>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>ข้อมูลส่วนตัว</Typography>
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              อัปโหลดรูปโปรไฟล์
            </Typography>
            <div className=' w-full flex flex-row items-center justify-center'>
              <div className='bg-blue-100 p-5 rounded-full w-32 h-32 flex items-center justify-center'>
                <input
                  type="file"
                  name="profile_image"
                  id="profile_image"
                  onChange={onFileChange}
                  accept="image/*"
                  style={{ display: 'none' }} // Hide the default file input
                />
                <label htmlFor="profile_image">
                  <IconButton component="span">
                    <AddAPhoto style={{ color: theme.palette.primary.main, width: '100%', height: '100%' }} />
                  </IconButton>
                </label>
              </div></div>
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              ชื่อ-นามสกุล
            </Typography>
            <TextField
              id="outlined-email"
              variant="outlined"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              className='w-full'
              InputProps={{
                style: { height: '40px' }, // Adjust the height as needed
              }}
            />
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              ตำแหน่ง
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="position"
              value={position}
              onChange={onChange}
              required
              className='flex flex-row w-full gap-2'
            >
              <div>
                <Radio value="ตัวแทน" />
                <span className='ml-2'>ตัวแทน</span>
              </div>
              <div>
                <Radio value="ผู้จัดการ" />
                <span className='ml-2'>ผู้จัดการ</span>
              </div>
            </RadioGroup>
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              ชื่อบริษัท
            </Typography>
            <TextField
              id="outlined-email"
              variant="outlined"
              type="text" name="company_name" value={company_name} onChange={onChange} required
              className='w-full'
              InputProps={{
                style: { height: '40px' }, // Adjust the height as needed
              }}
            />
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              เลขที่ใบอนุญาติ
            </Typography>
            <TextField
              id="outlined-email"
              variant="outlined"
              type="text" name="lisense_number" value={lisense_number} onChange={onChange} required
              className='w-full'
              InputProps={{
                style: { height: '40px' }, // Adjust the height as needed
              }}
            />
            <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
              เบอร์โทรศัพท์
            </Typography>
            <TextField
              id="outlined-email"
              variant="outlined"
              type="text" name="phone_number" value={phone_number} onChange={onChange} required
              className='w-full'
              InputProps={{
                style: { height: '40px' }, // Adjust the height as needed
              }}
            />
          </div>
        </div>
        <div className='w-full sm:w-full md:w-full lg:w-4/6 xl:w-4/6 flex flex-col gap-5'>
          <div className='w-full shadow-xl bg-white rounded-lg p-5  flex flex-col gap-2'>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>การเข้าสู่ระบบ</Typography>
            <div className='flex flex-wrap w-full gap-5'>
              <div className='flex flex-col gap-2 w-full lg:w-2/5 xl:w-2/5'>
                <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
                  อีเมล
                </Typography>
                <TextField
                  id="outlined-email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className='w-full'
                  InputProps={{
                    style: { height: '40px' },
                  }}
                />
              </div>
              <div className='flex flex-col gap-2 w-full lg:w-2/5 xl:w-2/5'>
                <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
                  รหัสผ่าน
                </Typography>
                <TextField
                  id="outlined-password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className='w-full'
                  InputProps={{
                    style: { height: '40px' },
                  }}
                />
              </div>
            </div>
          </div>
          <div className='w-full shadow-xl bg-white rounded-lg p-5'>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>การแนะนำตัว</Typography>
            <div className='flex flex-wrap w-full gap-5'>
              <div className='flex flex-col gap-2 w-full xl:w-2/5 lg:w-2/5'>
                <div className='flex flex-col gap-2'>
                  <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
                    link วีดีโอแนะนำตัว
                  </Typography>
                  <TextField
                    id="outlined-email"
                    variant="outlined"
                    type="text" name="link" value={link} onChange={onChange} required
                    className='w-full'
                    InputProps={{
                      style: { height: '40px' }, // Adjust the height as needed
                    }}
                  /></div>
                <div className='flex flex-col gap-2'>
                  <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
                    ข้อความแนะนำตัว
                  </Typography>
                  <TextField
                    id="outlined-intro-description"
                    variant="outlined"
                    name="intro_description"
                    value={intro_description}
                    onChange={onChange}
                    required
                    className='w-full'
                    multiline
                    rows={4} // Adjust the number of rows as needed
                    InputProps={{
                      style: { minHeight: '40px' }, // Minimum height
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 w-full xl:w-1/2 lg:w-1/2'>
                <Typography variant="body2" style={{ color: theme.palette.primary.main }}>
                  รูปภาพแนะนำตัว
                </Typography>
                <div className=' w-full flex flex-row items-center justify-center'>
                  <div className='bg-blue-100 p-5 rounded-full w-32 h-32 flex items-center justify-center'>
                    <input
                      type="file"
                      name="intro_image"
                      id="intro_image"
                      onChange={onFileChange}
                      accept="image/*"
                      style={{ display: 'none' }} // Hide the default file input
                    />
                    <label htmlFor="intro_image">
                      <IconButton component="span">
                        <AddAPhoto style={{ color: theme.palette.primary.main, width: '100%', height: '100%' }} />
                      </IconButton>
                    </label>
                  </div>
                </div></div>
            </div>
          </div>
          <div className='w-full px-5 flex flex-row gap-5 justify-start items-center'>
            <Checkbox sx={{ width: 10, height: 10 }} />
            <Typography>ข้าพเจ้ายินยอมให้เก็บข้อมูลในการยืนยันตัวตนของข้าพเจ้า</Typography>
          </div>
          <div className='w-full px-5 flex flex-row gap-5 justify-center items-center'>
            <Button type='submit' variant='contained'>บันทึก</Button>
            <Button variant='outlined' onClick={handleCancel}>ยกเลิก</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
