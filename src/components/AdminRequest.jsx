import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, IconButton, Hidden } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { field: 'name', headerName: 'ชื่อ-นามสกุล', flex: 1 },
  { field: 'position', headerName: 'ตำแหน่ง', flex: 1 },
  { field: 'company', headerName: 'บริษัท', flex: 1 },
  {
    field: 'actions',
    headerName: 'action',
    flex: 1,
    renderCell: (params) => (
      <div className='w-full'>
        <Hidden smDown>
          <Button variant="contained" color="primary" >ยืนยัน</Button>
          <Button variant="contained" color="error">ปฎิเสธ</Button>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="primary">
            <CheckIcon />
          </IconButton>
          <IconButton color="error">
            <CloseIcon />
          </IconButton>
        </Hidden>
      </div>
    ),
  },
  {
    field: '',
    headerName: 'slip',
    flex: 1,
    renderCell: (params) => (
      <div className='w-full'>
        <Button variant="contained" color="primary" >แสดง</Button>
      </div>
    ),
  },
];

const rows = [
  { id: 1, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 2, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  { id: 3, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 4, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  { id: 5, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 6, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  { id: 7, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 8, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  { id: 9, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 10, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  { id: 11, name: 'John Doe', position: 'ผู้จัดการ', company: 'ABC Corp', totalCustomers: 50 },
  { id: 12, name: 'Jane Smith', position: 'ตัวแทน', company: 'XYZ Ltd', totalCustomers: 40 },
  // Add more rows as needed
];

const AdminRequest = () => {
  return (
    <div className='w-full flex flex-col p-5'>
      <Typography variant='h5'>คำขอทั้งหมด</Typography>
      <div className='w-full p-4 rounded-xl'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          rowsPerPageOptions={[10]}
          pagination
        />
      </div>
    </div>
  );
};

export default AdminRequest;
