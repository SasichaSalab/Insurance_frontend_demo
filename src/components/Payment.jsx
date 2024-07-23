import React, { useState, useEffect } from 'react';
import { Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, Stepper, Step, StepLabel, TextField, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CalculateOutlined, Today, DateRange, CalendarMonth, PlusOne, Close } from '@mui/icons-material';

const Payment = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [slipImage, setSlipImage] = useState(null);

  const totalSlides = 3; // Number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // On the last step, close the dialog and reset the step
      handleCloseDialog();
      setActiveStep(0);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSlipChange = (e) => {
    setSlipImage(e.target.files[0]);
  };

  const steps = [
    'สแกน QR Code',
    'แนบสลิป',
    'รอผู้ดูแลระบบอนุมัติ'
  ];

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
    <div className='h-screen w-full bg-white flex flex-col items-start justify-start p-5'>
      <div className='h-1/12'>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Payment</Typography>
      </div>
      <div className='w-full h-full flex flex-wrap items-center justify-center'>
        <div className='h-96 w-72 bg-white rounded-lg shadow-xl border-2 border-primary'>
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
        <div className='xl:w-2/5 lg:w-2/3 w-full flex flex-col items-center justify-center gap-2 p-5'>
          <div className='w-full flex flex-wrap items-center justify-center gap-2'>
            <Button className='p-5 m-2 w-44 rounded-xl font-bold text-white flex flex-col items-center text-center gap-3' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} onClick={handleOpenDialog}>
              <Today style={{ fontSize: 60, color: 'white' }} />
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>รายเดือน</Typography>
              <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>1,431</Typography>
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>บาท/เดือน</Typography>
            </Button>
            <Button className='p-5 m-2 w-44 rounded-xl font-bold text-white flex flex-col items-center text-center gap-3' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} onClick={handleOpenDialog}>
              <DateRange style={{ fontSize: 60, color: 'white' }} />
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>ราย 3 เดือน</Typography>
              <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>4,293</Typography>
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>บาท/3เดือน</Typography>
            </Button>
          </div>
          <div className='w-full flex flex-wrap items-center justify-center gap-2'>
            <Button className='p-5 m-2 w-44 rounded-xl font-bold text-white flex flex-col items-center text-center gap-3' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} onClick={handleOpenDialog}>
              <CalendarMonth style={{ fontSize: 60, color: 'white' }} />
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>ราย 6 เดือน</Typography>
              <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>8,268</Typography>
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>บาท/6เดือน</Typography>
            </Button>
            <Button className='p-5 m-2 w-44 rounded-xl font-bold text-white flex flex-col items-center text-center gap-3' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} onClick={handleOpenDialog}>
              <PlusOne style={{ fontSize: 60, color: 'white' }} />
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>รายปี</Typography>
              <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>15,900</Typography>
              <Typography variant='h6' color='white' sx={{ fontWeight: 'bold' }}>บาท/ปี</Typography>
            </Button>
          </div>
        </div>
      </div>

      {/* QR Code Payment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          ชำระเงินด้วย QR Code
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className='flex flex-col items-center justify-center mt-5'>
            {activeStep === 0 && (
              <div className='flex flex-col items-center'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code" style={{ width: 256, height: 256 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>ชื่อบัญชี abcd efg</Typography>
              </div>
            )}
            {activeStep === 1 && (
              <div className='flex flex-col items-center'>
                <TextField
                  type="file"
                  onChange={handleSlipChange}
                  variant="outlined"
                  fullWidth
                />
                {slipImage && (
                  <div className='mt-3'>
                    <Typography variant='body1'>Attached Slip: {slipImage.name}</Typography>
                  </div>
                )}
              </div>
            )}
            {activeStep === 2 && (
              <div className='flex flex-col items-center text-center'>
                <Typography variant="h6">ชำระเงินสำเร็จแล้ว</Typography>
                <Typography variant="body1">การสมัครสมาชิกของคุณจะถูกส่งไปยังผู้ดูแลระบบ เมื่อผู้ดูและระบบอนุมัติการสมัครสมาชิกจึงจะสามารถใช้งานได้ กรุณารอรับอีเมล</Typography>
              </div>
            )}
            <div className='mt-5'>
              <Button disabled={activeStep === 0} onClick={handleBack}>กลับ</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ ml: 2 }}
              >
                {activeStep === steps.length - 1 ? 'ยอมรับ' : 'ถัดไป'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
