import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calculate, HealthAndSafety, Payment, Dashboard, FactCheck, Settings, Add, ExitToApp } from '@mui/icons-material'; // Import icons
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = ({ role }) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  const adminRoutes = [
    { path: '/home-admin', name: 'Home', icon: <Home /> },
    { path: '/admin-dashboard', name: 'Main', icon: <Dashboard /> },
    { path: '/admin-calculate', name: 'Calculate', icon: <Calculate /> },
    { path: '/admin-insurance', name: 'Insurance', icon: <HealthAndSafety /> },
    { path: '/payment', name: 'Payment', icon: <Payment /> },
  ];

  const superAdminRoutes = [
    { path: '/home-admin', name: 'Home', icon: <Home /> },
    { path: '/super-admin-dashboard', name: 'Dashboard', icon: <Dashboard /> },
    { path: '/admin-calculate', name: 'Calculate', icon: <Calculate /> },
    { path: '/admin-insurance', name: 'Insurance', icon: <HealthAndSafety /> },
    { path: '/add-insurance', name: 'Add Insurance', icon: <Add /> },
    { path: '/admin-request', name: 'Request', icon: <FactCheck /> },
    { path: '/setting', name: 'Setting', icon: <Settings /> },
  ];

  const routes = role === 'superadmin' ? superAdminRoutes : adminRoutes;

  const handleLogout = () => {
    // Clear any user-related data (e.g., localStorage, sessionStorage)
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className={`sidebar ${isSmallScreen ? 'collapsed' : ''}`}>
      <nav>
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <NavLink
                to={route.path}
                className={({ isActive }) => 
                  isActive ? 'active' : ''
                }
              >
                <span className={`icon`}>
                  {route.icon}
                </span>
                {!isSmallScreen && <span>{route.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="logout-button">
          <button onClick={handleLogout} className="logout-btn">
            <ExitToApp /> Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
