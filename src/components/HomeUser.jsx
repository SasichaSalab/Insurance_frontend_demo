import React from 'react';
import AdminData from './AdminData';
import AllInsurance from './AllInsurance';
import InsuranceForm from './InsuranceForm';

const HomeUser = () => {
  return (
    <div className=' bg-white flex flex-col lg:flex-row gap-2 p-5'>
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
            <div className='w-2/5'>
            <img
              className='w-full object-contain'
              src='https://t4.ftcdn.net/jpg/05/80/60/33/360_F_580603305_ysEbDBvHCKM9TyzEINHyW614NWLdTe0b.jpg'
              alt='Introduction'
            />
          </div>
          <div className='text-gray-700 w-3/5 px-2'>
            สวัสดีค่ะ/ครับ

            ยินดีต้อนรับเข้าสู่บริการของเรา! เราคือทีมงานที่พร้อมให้คำแนะนำและบริการด้านประกันภัยอย่างครบวงจร เพื่อให้คุณมั่นใจในความปลอดภัยและความคุ้มครองที่ดีที่สุดสำหรับคุณและครอบครัว

            หากคุณมีคำถามเกี่ยวกับผลิตภัณฑ์ประกันภัยหรือความต้องการในการคุ้มครองต่าง ๆ ไม่ว่าจะเป็นประกันชีวิต ประกันสุขภาพ หรือประกันภัยรถยนต์ ทีมงานของเรายินดีที่จะช่วยให้ข้อมูลและเสนอทางเลือกที่เหมาะสมกับคุณ

            เรามุ่งมั่นที่จะให้บริการที่ดีที่สุดและตอบสนองความต้องการของคุณอย่างเต็มที่ ติดต่อเราวันนี้เพื่อรับคำแนะนำและข้อมูลเพิ่มเติมค่ะ/ครับ

            ขอบคุณที่เลือกใช้บริการของเรา

            ทีมงานประกันภัย
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
