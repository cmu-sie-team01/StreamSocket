import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './home';
import SignIn from './SignIn';
import BottomBar from './BottomBar';
import BasicTabs from './tabs';

function App() {
  const theme = createTheme();

  return (
    <BrowserRouter>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 0,
            }}
          >
            <BottomBar />

          </Box>
        </Container>
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<BasicTabs />} />
        <Route path="signin" element={<SignIn />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
