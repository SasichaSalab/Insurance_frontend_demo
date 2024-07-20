import React from 'react';

const AdminData = ({ children }) => {
    return (
        <div className='p-4 w-full bg-white rounded-lg shadow-md h-full'>
            <div className='flex flex-row flex-wrap w-full gap-2'>
                <img
                    className='w-32 h-32 rounded-full object-cover mb-4'
                    src='https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw='
                    alt='Profile'
                />
                <div className='flex flex-wrap items-start justify-start gap-10'>
                    <div className='flex flex-col items-start justify-start'>
                        <div className='flex flex-col items-start justify-start h-10'>
                            <div className='text-lg font-semibold'>John Doe</div>
                        </div>
                        <div className='flex flex-wrap items-start justify-start gap-5'>
                            <div className='flex flex-col items-start justify-start gap-2'>
                                <div className='text-gray-500'>Phone: 123-456-7890</div>
                                <div className='text-gray-500'>Position: Manager</div>
                            </div>
                            <div className='flex flex-col items-start justify-start gap-2'>
                                <div className='text-gray-500'>Company: ABC Corp</div>
                                <div className='text-gray-500'>License Number: 123456789</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                {children}
            </div>
        </div>
    );
};

export default AdminData;
