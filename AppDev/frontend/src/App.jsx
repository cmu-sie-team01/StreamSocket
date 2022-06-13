import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import React from 'react';
import BottomBar from './BottomBar';
import BasicTabs from './tabs';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <BasicTabs />
          <BottomBar />

        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
