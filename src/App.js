import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AdminProjectApproval from "./pages/AdminProjectApproval";
import MyApplications from "./pages/MyApplications";
import Projects from "./pages/Projects";
import ToggleColorMode from "./pages/ToggleColorMode";
import AppAppBar from "./pages/AppAppBar";

import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Define your light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [mode, setMode] = useState('light');  

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Choose theme based on mode
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  const handleUserClick = (user) => {
    console.log('User selected:', user);
    setUser(user);
    setIsAdmin(false); // Switch to user mode or handle as needed
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} isAdmin={isAdmin} />
      <div className="App">
          <Routes>
          <Route path="/" element={<LandingPage onAdminClick={handleAdminClick} onUserClick={handleUserClick} />} />
            <Route path="/projects" element={<Projects user = {user}/>} />
            <Route path="/my-applications" element={<MyApplications user = {user}/>} />
            <Route path="/admin" element={isAdmin ? <AdminProjectApproval /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
