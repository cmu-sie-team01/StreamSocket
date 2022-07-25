import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme1 = createTheme({
  palette: {
    primary: {
      light: '#2F4F4F',
      main: '#2F4F4F',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    third: {
      light: '#5F9EA0',
      main: '#5F9EA0',
      dark: '#5F9EA0',
      contrastText: '#000',
    },
  },
});
export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    navigate('/signin');
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/userprofile');
  };
  const handleMyAccount = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme1}>

      <IconButton
        size="large"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleMyAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </ThemeProvider>
  );
}
