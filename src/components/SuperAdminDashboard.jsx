import React, { useState } from 'react';
import AdminData from './AdminData';
import AdminHome from './AdminHome'; // Import AdminHome component
import AdminEditProfile from './AdminEditProfile'; // Import AdminEditProfile component
import { Typography, Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions,TextField } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Close, Edit } from '@mui/icons-material';

const SuperAdminDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    date: '',
    fullName: '',
    contact: '',
    insuranceName: '',
    selectedPlan: '',
    premiumAmount: ''
  });
  const columns = [
    { field: 'name', headerName: 'ชื่อ-นามสกุล', flex: 1 },
    { field: 'position', headerName: 'ตำแหน่ง', flex: 1 },
    { field: 'company', headerName: 'บริษัท', flex: 1 },
    { field: 'totalCustomers', headerName: 'ลูกค้าที่งหมด(คน)', flex: 1 },
    {
      field: 'status',
      headerName: 'สถานะ',
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
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <div className='w-full gap-1 flex flex-row items-center justify-center'>
          <Button variant="contained" color="primary" onClick={() => handleDialogOpen('show', params.row)}>ข้อมูล</Button>
          <Button variant="outlined" color="primary" onClick={() => handleDialogOpen('edit', params.row)}>แก้ไข</Button>
          <IconButton color="error" onClick={(event) => handleDeleteOpen(event, params.row)}>
            <Delete style={{ fontSize: 20 }} />
          </IconButton>
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
    { field: 'date', headerName: 'วันที่คำนวณ', flex: 1 },
    { field: 'fullName', headerName: 'ชื่อ-นามสกุล', flex: 1 },
    { field: 'contact', headerName: 'ติดต่อ', flex: 1 },
    { field: 'insuranceName', headerName: 'ชื่อประกันที่คำนวณ', flex: 1 },
    { field: 'selectedPlan', headerName: 'แผน', flex: 1 },
    { field: 'premiumAmount', headerName: 'ทุนประกัน', flex: 1 },
    {
      field: '',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <div className='w-full gap-1 flex flex-row items-center justify-center'>
          <IconButton color="primary" onClick={() => handleEditOpen(params.row)}>
            <Edit style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton color="error" onClick={(event) => handleDeleteOpen(event, params.row)}>
            <Delete style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const additionalRows = [
    { id: 1, date: '2024-07-20', fullName: 'Alice Johnson', contact: 'alice@example.com', insuranceName: 'Plan A', selectedPlan: 'Option 1', premiumAmount: '$100' },
    { id: 2, date: '2024-07-20', fullName: 'Bob Brown', contact: 'bob@example.com', insuranceName: 'Plan B', selectedPlan: 'Option 2', premiumAmount: '$200' },
    // Add more rows as needed
  ];

  const handleDialogOpen = (type, rowData) => {
    if (type === 'show') {
      setDialogContent(<AdminHome data={rowData} />);
    } else if (type === 'edit') {
      setDialogContent(<AdminEditProfile data={rowData} />);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent(null);
  };

  const handleDeleteOpen = (event, row) => {
    event.stopPropagation(); // Stop event propagation to prevent row selection
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteConfirm = () => {
    // Implement the delete logic here (e.g., call an API to delete the row)
    console.log('Deleted row:', rowToDelete);
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };
  const handleEditOpen = (row) => {
    setRowToEdit(row);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setRowToEdit(null);
  };
  const handleEditConfirm = () => {
    // Implement the save/edit logic here (e.g., call an API to save the edited row)
    console.log('Edited row:', rowToEdit);
    setEditDialogOpen(false);
    setRowToEdit(null);
  };
  return (
    <div className='flex flex-col lg:flex-col gap-2 p-5 w-full'>
      <div className='flex flex-wrap'>
        <div className='xl:w-1/2 lg:w-1/2 w-full'>
          <AdminData />
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
        <Typography variant='h5'>จัดการข้อมูล admin</Typography>
        <div className='w-full p-4 rounded-xl' style={{ height: '420px' }}> {/* Explicit height for the DataGrid container */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            pagination
            onRowClick={(params, event) => event.stopPropagation()} // Prevent row selection when clicking on the row
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth='md' fullWidth>
        <DialogTitle>
          รายละเอียด
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dialogContent}
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth='sm' fullWidth>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent>
          <Typography>คุณแน่ใจหรือว่าต้องการลบรายการนี้?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">ยกเลิก</Button>
          <Button onClick={handleDeleteConfirm} color="error">ลบ</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth='md' fullWidth>
        <DialogTitle>
          แก้ไขข้อมูล
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleEditClose}
            aria-label="close"
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" className='flex flex-col gap-4'>
            <TextField
              label="วันที่คำนวณ"
              value={editFormData.date}
              onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
              fullWidth
            />
            <TextField
              label="ชื่อ-นามสกุล"
              value={editFormData.fullName}
              onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
              fullWidth
            />
            <TextField
              label="ติดต่อ"
              value={editFormData.contact}
              onChange={(e) => setEditFormData({ ...editFormData, contact: e.target.value })}
              fullWidth
            />
            <TextField
              label="ชื่อประกันที่คำนวณ"
              value={editFormData.insuranceName}
              onChange={(e) => setEditFormData({ ...editFormData, insuranceName: e.target.value })}
              fullWidth
            />
            <TextField
              label="แผน"
              value={editFormData.selectedPlan}
              onChange={(e) => setEditFormData({ ...editFormData, selectedPlan: e.target.value })}
              fullWidth
            />
            <TextField
              label="ทุนประกัน"
              value={editFormData.premiumAmount}
              onChange={(e) => setEditFormData({ ...editFormData, premiumAmount: e.target.value })}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">ยกเลิก</Button>
          <Button onClick={handleEditConfirm} color="secondary">บันทึก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SuperAdminDashboard;
