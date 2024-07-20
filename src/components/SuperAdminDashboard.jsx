import React from 'react';
import AdminData from './AdminData';
import { Typography, Button, IconButton, Hidden } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from '@mui/x-data-grid';
import { MoreHoriz } from '@mui/icons-material';

const columns = [
  { field: 'name', headerName: 'ชื่อ-นามสกุล', flex: 1 },
  { field: 'position', headerName: 'ตำแหน่ง', flex: 1 },
  { field: 'company', headerName: 'บริษัท', flex: 1 },
  { field: 'totalCustomers', headerName: 'ลูกค้าที่งหมด(คน)', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          color: params.value === 'active' ? 'blue' : 'red',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: '',
    headerName: 'slip',
    flex: 1,
    renderCell: (params) => (
      <div className='w-full gap-1 flex flex-row items-center justify-center'>
        <Button variant="contained" color="primary">แสดง</Button>
        <Button variant="outlined" color="primary">แก้ไข</Button>
        <MoreHoriz style={{ fontSize: 20 }} />
      </div>
    ),
  },
];

const rows = [
  { id: 1, name: 'John Doe', position: 'ตัวแทน', company: 'ABC Corp', totalCustomers: 50, status: 'active' },
  { id: 2, name: 'Jane Smith', position: 'ผู้จัดการ', company: 'XYZ Ltd', totalCustomers: 40, status: 'expire' },
  // Add more rows as needed
];

const additionalColumns = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'fullName', headerName: 'Full Name', flex: 1 },
  { field: 'contact', headerName: 'Contact', flex: 1 },
  { field: 'insuranceName', headerName: 'Insurance Name', flex: 1 },
  { field: 'selectedPlan', headerName: 'Selected Plan', flex: 1 },
  { field: 'premiumAmount', headerName: 'Premium Amount', flex: 1 },
];

const additionalRows = [
  { id: 1, date: '2024-07-20', fullName: 'Alice Johnson', contact: 'alice@example.com', insuranceName: 'Plan A', selectedPlan: 'Option 1', premiumAmount: '$100' },
  { id: 2, date: '2024-07-20', fullName: 'Bob Brown', contact: 'bob@example.com', insuranceName: 'Plan B', selectedPlan: 'Option 2', premiumAmount: '$200' },
  // Add more rows as needed
];

const SuperAdminDashboard = () => {
  return (
    <div className='flex flex-col lg:flex-col gap-2 p-5 w-full'>
      <div className='flex flex-wrap'>
        <div className='xl:w-1/2 lg:w-1/2 w-full'>
          <AdminData/>
        </div>
        <div className='flex flex-wrap xl:w-1/2 lg:w-1/2 w-full items-center justify-center'>
          <div className='m-2 w-32 h-28 bg-primary text-white rounded-lg shadow-md text-center flex flex-col items-center justify-center'>
            <Typography variant='h6'>จำนวนลูกค้าทั้งหมด</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>18</Typography>
          </div>
          <div className='m-2 w-32 h-28 bg-primary text-white rounded-lg shadow-md text-center flex flex-col items-center justify-center'>
            <Typography variant='h6'>จำนวนลูกค้าทั้งหมด</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>18</Typography>
          </div>
          <div className='m-2 w-32 h-28 bg-primary text-white rounded-lg shadow-md text-center flex flex-col items-center justify-center'>
            <Typography variant='h6'>จำนวนลูกค้าทั้งหมด</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>18</Typography>
          </div>
          <div className='m-2 w-32 h-28 bg-primary text-white rounded-lg shadow-md text-center flex flex-col items-center justify-center'>
            <Typography variant='h6'>จำนวนลูกค้าทั้งหมด</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>18</Typography>
          </div>
        </div>
      </div>
      <div className='p-2 w-full flex flex-wrap justify-between items-center rounded-lg shadow-md' style={{ background: 'linear-gradient(to left, #15B5EE, #0056A9)' }}>
        <div className='xl:w-1/3 lg:w-1/3 w-full text-white flex flex-col items-center justify-center'>
          <div className='p-5 py-5 text-center max-w-96 rounded-lg shadow-md flex flex-col items-center justify-center' style={{ background: 'linear-gradient(to bottom, #15B5EE, #0056A9)' }}>
            <Typography variant='h5'>วันนี้ 18/12/2564</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>จำนวนลูกค้า ที่เข้ามาลองใช้วันนี้</Typography>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>2 คน</Typography>
          </div>
        </div>
        <div className='xl:w-2/3 lg:w-2/3 w-full h-[300px]'> {/* Explicit height for the container */}
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 3],
                showMark: () => true, // Show mark for all data points
                color: '#fff', // Primary color
              },
            ]}
            height={300}
          />
        </div>
      </div>
      <div className='w-full flex flex-col p-5'>
        <Typography variant='h5'>ข้อมูลลูกค้า</Typography>
        <div className='w-full p-4 rounded-xl' style={{ height: '420px' }}> {/* Explicit height for the DataGrid container */}
          <DataGrid
            rows={additionalRows}
            columns={additionalColumns}
            pageSize={5}
            pagination
          />
        </div>
      </div>
      <div className='w-full flex flex-col p-5'>
        <Typography variant='h5'>admin management</Typography>
        <div className='w-full p-4 rounded-xl' style={{ height: '420px' }}> {/* Explicit height for the DataGrid container */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
