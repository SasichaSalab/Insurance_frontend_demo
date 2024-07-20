import React from 'react'
import { Typography } from '@mui/material'
import InsuranceForm from './InsuranceForm'

const AdminCalculate = () => {
    return (
        <div className='h-screen w-full bg-white flex flex-col items-start justify-start p-5'>
            <div className='h-1/12'>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>คำนวณ</Typography>
            </div>
            <div className='w-full'>
                <InsuranceForm />
            </div>
        </div>
    )
}

export default AdminCalculate