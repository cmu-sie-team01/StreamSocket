import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import BasicTabs from './pages/SignUpTabs';
import SignInTab from './pages/SignInTabs';
import UserProfile from './component/UserProfile';
import BottomBar from './component/BottomBar';

function App() {
  const theme = createTheme();
  return (
    <BrowserRouter>

      <ThemeProvider theme={theme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<BasicTabs />} />
        <Route path="signin" element={<SignInTab />} />
        <Route path="userprofile" element={<UserProfile />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>

  );
}

export default App;
