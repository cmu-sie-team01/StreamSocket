import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Link,
} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0,
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        value="discover"
        icon={<ExploreIcon />}
      />
      <BottomNavigationAction
        value="add"
        icon={<AddIcon />}
        component={Link}
        to="/videoupload"
      />
      <BottomNavigationAction
        value="message"
        icon={<CommentIcon />}
        component={Link}
        to="/userprofile"
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
