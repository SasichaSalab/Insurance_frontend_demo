import React, { useState } from 'react';
import InsuranceCard from './InsuranceCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const insuranceData = [
  { id: 1, name: 'Insurance A', minAge: 18, maxAge: 65, coverageYears: 10 },
  { id: 2, name: 'Insurance B', minAge: 21, maxAge: 60, coverageYears: 15 },
  { id: 3, name: 'Insurance C', minAge: 25, maxAge: 70, coverageYears: 20 },
  { id: 4, name: 'Insurance D', minAge: 30, maxAge: 65, coverageYears: 25 },
  { id: 5, name: 'Insurance E', minAge: 35, maxAge: 55, coverageYears: 30 },
  { id: 6, name: 'Insurance F', minAge: 40, maxAge: 60, coverageYears: 35 },
  // Add more insurance data as needed
];

const AllInsurance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const cardsPerPage = 4;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClickOpen = (insurance) => {
    setSelectedInsurance(insurance);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedInsurance(null);
  };

  const startIndex = (currentPage - 1) * cardsPerPage;
  const displayedCards = insuranceData.slice(startIndex, startIndex + cardsPerPage);
  const totalPages = Math.ceil(insuranceData.length / cardsPerPage);

  return (
    <div className="p-4">
      <Typography variant="h6" gutterBottom>ประกันภัยทั้งหมด</Typography>
      <div className={`grid grid-cols-2 gap-4`}>
        {displayedCards.map((insurance) => (
          <Button key={insurance.id} sx={{ margin: 0, padding: 0 }} onClick={() => handleClickOpen(insurance)}>
            <InsuranceCard {...insurance} />
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </div>
      {selectedInsurance && (
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openDialog}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle>
            <Typography color='primary' sx={{ fontWeight: 'bold', fontSize: 25 }}>{selectedInsurance.name}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2'>
              <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
                คุ้มครอง 0- 65 ปี
              </div>
              <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
                เบี้ยต่ำสุด 5000 บาท
              </div>
            </div>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className=' rounded-xl p-4 flex flex-col items-center justify-center gap-2'>
              <Typography variant='h5' color={'white'}>เสียชีวิตปกติ</Typography>
              <div className='flex flex-wrap gap-2 w-full'>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  รับ 100% ของทุนประกัน
                </div>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  คืนเงินที่ออมมาทั้งหมด
                </div>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  จ่ายเพิ่ม18%
                </div>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className=' rounded-xl p-4 flex flex-col items-center justify-center gap-2'>
              <Typography variant='h5' color={'white'}>เสียชีวิตกรณีอุบัติเหตุ</Typography>
              <div className='flex flex-wrap gap-2 w-full'>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  รับ 200% ของทุนประกัน
                </div>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  คืนเงินที่ออมมาทั้งหมด
                </div>
                <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start'>
                  จ่ายเพิ่ม18%
                </div>
              </div>
            </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AllInsurance;
