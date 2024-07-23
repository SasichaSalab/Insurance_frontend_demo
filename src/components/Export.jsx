import { Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import React, { useState } from 'react'

const Export = () => {
  const [caseType, setCaseType] = useState('');
  const [year, setYear] = useState('');

  const handleCaseChange = (event) => {
    setCaseType(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className='w-full  p-5 flex flex-col gap-2'>
      <div className='w-full gap-5 flex flex-row'>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>เรียน josj akfjif</Typography>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>เพศ ชาย</Typography>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>อายุ 14</Typography>
      </div>
      <div className='w-full flex flex-wrap xl:flex-nowrap lg:flex-nowrap gap-1'>
        <div className='p-2 bg-white rounded-lg shadow-md flex flex-wrap xl:flex-row lg:flex-row items-center justify-between w-full xl:w-1/2 lg:w-1/2 gap-1'>
          <div className='w-full gap-5 flex flex-row items-center'>
            <Typography>ระยะเวลาที่ต้องชำระเบี้ย</Typography>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl'>
              12 ปี
            </div>
          </div>
          <div className='w-full gap-5 flex flex-row items-center'>
            <Typography>ระยะเวลาที่ต้องชำระเบี้ย</Typography>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl'>
              18 ปี
            </div>
          </div>
          <div className='w-full h-0.5 bg-black rounded-full'></div>
          <div className='w-full gap-5 flex flex-row items-center'>
            <Typography>เงินออมสุทธิ</Typography>
            <div className='p-2 rounded-xl'>
              864000 บาท
            </div>
          </div>
          <div className='w-full flex flex-col items-start'>
            <div className='flex flex-row'>
              <Typography sx={{ fontWeight: 'bold' }}>เงินที่ได้รับเมื่อครบสัญญา</Typography>
              <Typography color='primary' sx={{ fontWeight: 'bold' }}>(118%)</Typography>
            </div>
            <Typography color='primary' variant='h6' sx={{ fontWeight: 'bold', alignSelf: 'flex-end' }}>1,019,520 บาท</Typography>
          </div>
        </div>
        <div className='p-2 bg-white rounded-lg shadow-md flex flex-col items-start justify-start w-full xl:w-1/2 lg:w-1/2 gap-2'>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>ความคุ้มครองที่ได้รับ</Typography>
          <div className='w-full flex flex-col items-start'>
            <Typography sx={{ fontWeight: 'bold' }}>ทุนประกันคุ้มครองชีวิต</Typography>
            <Typography color='primary' variant='h6' sx={{ fontWeight: 'bold', alignSelf: 'flex-end' }}>1,019,520 บาท</Typography>
          </div>
          <div className='w-full h-0.5 bg-black rounded-full'></div>
          <div className='w-full flex flex-row items-center'>
            <Typography>1.ค่ารักษาพยาบาลไม่จำกัดครั้ง กรณีอุบัติเหตุ</Typography>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
              30,000 บาท
            </div>
          </div>
          <div className='w-full flex flex-row items-center'>
            <Typography>2.คุ้มครอง การสูญเสียอวัยวะ จ่ายสูงสุด</Typography>
            <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
              1,306,715 บาท
            </div>
          </div>
        </div>
      </div>
      <div className='p-2 bg-white rounded-lg shadow-md flex flex-wrap xl:flex-row lg:flex-row items-center justify-between w-full gap-1'>
      <div className='w-full flex flex-row gap-2'>
        <FormControl variant='outlined' className='w-1/2'>
          <InputLabel>กรณี</InputLabel>
          <Select value={caseType} onChange={handleCaseChange} label='กรณี' sx={{ height: '40px' }}>
            <MenuItem value='เจ็บป่วย'>เจ็บป่วย</MenuItem>
            <MenuItem value='อุบัติเหตุ'>อุบัติเหตุ</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='w-1/2'>
          <InputLabel>ปีที่</InputLabel>
          <Select value={year} onChange={handleYearChange} label='ปีที่' sx={{ height: '40px' }}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
      </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-1'>
            <Typography color='primary' sx={{ fontWeight: 'bold' }}>ก้อนที่1</Typography>
            <Typography>(100% ของทุนประกัน)</Typography></div>
          <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
            1,306,715 บาท
          </div>
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-1'>
            <Typography color='primary' sx={{ fontWeight: 'bold' }}>ก้อนที่2</Typography>
            <Typography>(รับเงินที่ออมมา คืนทั้งหมด)</Typography></div>
          <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
            864,000 บาท
          </div>
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-1'>
            <Typography color='primary' sx={{ fontWeight: 'bold' }}>ก้อนที่3</Typography>
            <Typography>(บริษัทจ่ายเพิ่มให้อีก 18%)</Typography></div>
          <div style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }} className='p-2 rounded-xl self-end'>
            155,520 บาท
          </div>
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <Typography color='primary' variant='h5' sx={{ fontWeight: 'bold' }}>รวม</Typography>
          <Typography color='primary' variant='h5' sx={{ fontWeight: 'bold' }}>2,326,235.06 บาท</Typography>
        </div>
      </div>
    </div>
  )
}

export default Export
