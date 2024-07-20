import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import { useUserRole } from './context/UserRoleProvider';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AllUsers from './components/AllUsers';
import UserLogin from './components/UserLogin';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AddAdmin from './components/AddAdmin';
import AdminHome from './components/AdminHome';
import HomeUser from './components/HomeUser';
import AddInsurance from './components/AddInsurance';
import EditAdmin from './components/EditAdmin';
import Payment from './components/Payment';
import AdminRequest from './components/AdminRequest';
import ForgotPassword from './components/ForgotPassword';
import AdminEditProfile from './components/AdminEditProfile';
import AdminCalculate from './components/AdminCalculate';
import InsuranceAdmin from './components/InsuranceAdmin';
import Setting from './components/Setting';

const AppContent = () => {
  const location = useLocation();
  const { userRole } = useUserRole();

  const noSidebarRoutes = [
    '/register',
    '/forgot-password',
    '/login',
    '/users',
    '/user-login',
    '/home-user'
  ];

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowSidebar ? (
        <div>
          <Sidebar role={userRole} />
          <div className={`flex flex-row left-0 items-start justify-start xl:ml-60 lg:ml-60 md:ml-60 ml-20 ${shouldShowSidebar && 'collapsed'}`}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin-insurance" element={<InsuranceAdmin />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/home-admin" element={<AdminHome />} />
              <Route path="/admin-calculate" element={<AdminCalculate />} />
              <Route path="/add-insurance" element={<AddInsurance />} />
              <Route path="/edit-admin" element={<EditAdmin />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin-request" element={<AdminRequest />} />
              <Route path="/edit-profile" element={<AdminEditProfile />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/home-user" element={<HomeUser />} />
          {/* Include other routes that should not show the sidebar */}
        </Routes>
      )}
    </div>
  );
};

export default AppContent;
