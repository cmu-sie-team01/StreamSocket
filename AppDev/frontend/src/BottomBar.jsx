import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%', position: 'absolute', bottom: 0 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/"

      />
      <BottomNavigationAction
        value="discover"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        value="add"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        value="message"
        icon={<CommentIcon />}
      />

      <BottomNavigationAction
        value="userprofile"
        icon={<AccountBoxIcon />}
        component={Link}
        to="/signin"
      />
    </BottomNavigation>
  );
}
