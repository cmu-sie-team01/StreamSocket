// ref: https://stackoverflow.com/questions/51232245/is-it-possible-to-use-material-ui-button-navigation-with-react-router
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Page404 from './component/404';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div>
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
          <BottomNavigationAction
            value="nearby"
            component={Link}
            to="/404"
            icon={<HomeIcon />}
          />

          <BottomNavigationAction
            icon={<FavoriteIcon />}
            component={Link}
            to="/404"
            value="signin"
          />
          <BottomNavigationAction
            value="folder"
            component={Link}
            to="/404"
            icon={<MailOutlineIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/signin"
            value="signin"
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<Page404 />} />

        </Routes>
      </div>
    </Router>

  );
}
