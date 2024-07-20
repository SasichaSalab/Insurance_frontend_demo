import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { UserRoleProvider } from './context/UserRoleProvider'; // Import the context provider
import './App.css'; // Import your CSS file
import AppContent from './AppContent';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <UserRoleProvider>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </UserRoleProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
