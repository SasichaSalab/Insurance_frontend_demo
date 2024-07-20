import React from 'react';
import AdminData from './AdminData';
import AllInsurance from './AllInsurance';
import InsuranceForm from './InsuranceForm';

const HomeUser = () => {
  return (
    <div className='h-screen bg-white flex flex-col lg:flex-row gap-2 p-5'>
      <div className='w-full md:w-full sm:w-full lg:w-1/2 xl:w-1/2'>
        <AdminData>
          <div className=' rounded-lg shadow-sm w-full flex flex-col items-center'>
            <div className='mb-4 w-10/12'>
              <video className='w-full' controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='flex flex-row flex-wrap w-full'>
              <div className='mb-4 w-1/5'>
                <img
                  className='w-full object-contain'
                  src='https://via.placeholder.com/150'
                  alt='Introduction'
                />
              </div>
              <div className='text-gray-700 w-4/5 px-2'>
                This is an introduction text for the child component.
              </div>
            </div>
          </div>
        </AdminData>
      </div>
      <div className='w-full md:w-full sm:w-full lg:w-1/2'>
      <InsuranceForm/>
      <AllInsurance/>
      </div>
    </div>
  );
}

export default HomeUser;
