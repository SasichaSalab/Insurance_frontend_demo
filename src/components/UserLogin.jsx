import { Typography, Button, TextField, useTheme, Stepper, Step, StepLabel } from '@mui/material';
import React, { useState } from 'react';
import { Email, Phone, CalculateOutlined, PlagiarismOutlined, FaceRetouchingNatural } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['กรอกข้อมูล', 'ยืนยันตัวตน', 'กรอกข้อมูลยืนยันตัวตน'];

const UserLogin = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationType, setVerificationType] = useState('');
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleVerificationType = (type) => {
    setVerificationType(type);
    handleNext();
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    // Navigate to /home-user on login
    navigate('/home-user');
  };
  return (
    <div className="user-login-container">
      <div className="semi-circle-background hidden md:flex"></div>
      <div className="w-screen h-screen flex flex-row bg-gradient-sm-md md:bg-none">
      <div className='w-full lg:w-1/2 xl:w-1/2 h-full flex flex-row items-center justify-center'>
          <div className='w-72 lg:w-96 bg-white rounded-xl flex flex-col items-center justify-start pb-5'>
            <div className=' w-full bg-primary rounded-t-xl pั-5'>
              <Typography variant='h5' className=' text-white text-center'>กรุณากรอกชื่อ-นามสกุล และเบอร์โทรศัพท์หรืออีเมล
                ก่อนเข้าใช้งาน</Typography>
            </div>
            <Stepper activeStep={activeStep} alternativeLabel className='mt-10'>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className=' w-full p-5 gap-2 flex flex-col items-start'>
              {activeStep === 0 && (
                <>
                  <Typography>ชื่อ</Typography>
                  <TextField
                    id="outlined-email"
                    variant="outlined"
                    required
                    className='w-full'
                    InputProps={{
                      style: { height: '40px' },
                    }}
                  />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <Typography>ยืนยันตัวตน</Typography>
                  <div className="flex gap-2 w-full">
                    <Button variant='contained' color='tertiary' className="w-1/2 bg-tertiary rounded-xl flex flex-col items-center justify-center text-center" onClick={() => handleVerificationType('Email')}>
                      <Email style={{ fontSize: 30, color: theme.palette.primary.main }} />
                      <Typography>ยืนยันตัวตนด้วย Email</Typography>
                    </Button>
                    <Button variant='contained' color='tertiary' className="w-1/2 bg-tertiary rounded-xl flex flex-col items-center justify-center text-center" onClick={() => handleVerificationType('Phone')}>
                      <Phone style={{ fontSize: 30, color: theme.palette.primary.main }} />
                      <Typography>ยืนยันตัวตนด้วยเบอร์โทรศัพท์</Typography>
                    </Button>
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <Typography>{`กรอกข้อมูลยืนยันตัวตนด้วย${verificationType}`}</Typography>
                  <TextField
                    id="outlined-verification"
                    variant="outlined"
                    required
                    className='w-full'
                    InputProps={{
                      style: { height: '40px' },
                    }}
                  />
                </>
              )}
            </div>
            <div className="flex flex-row-reverse justify-between w-full p-5">
              {activeStep === 0 && (
                <Button variant='contained' sx={{ width: 150 }} onClick={handleNext}>ถัดไป</Button>
              )}
              {activeStep === 2 && (
                <Button variant='contained' sx={{ width: 150 }} onClick={handleLogin} >เข้าสู่ระบบ</Button>
              )}
              {activeStep !== 0 && (
                <Button variant='outlined' sx={{ width: 150 }} onClick={handleBack}>กลับ</Button>
              )}
            </div>
          </div>
        </div>
        <div className='hidden md:flex w-1/2 h-full flex-col items-start justify-center gap-10 pl-28'>
          <div className=' rounded-xl p-5 w-64 flex flex-col items-center text-center text-white' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }}>
            <PlagiarismOutlined style={{ fontSize: 60, color: 'white' }} />
            <Typography>ดูรายละเอียดประกันชีวิตได้ เพื่อเลือกประกันชีวิตที่เหมาะสมกับคุณ</Typography>
          </div>
          <div className=' ml-28 rounded-xl p-5 w-64 flex flex-col items-center text-center text-white' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }}>
            <CalculateOutlined style={{ fontSize: 60, color: 'white' }} />
            <Typography>ลองคำนวณได้เอง ไม่ต้องรอถามตัวแทน</Typography>
          </div>
          <div className=' rounded-xl p-5 w-64 flex flex-col items-center text-center text-white' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }}>
            <FaceRetouchingNatural style={{ fontSize: 60, color: 'white' }} />
            <Typography>ภาษาเข้าใจง่าย ไม่ยุ่งยาก</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin;
