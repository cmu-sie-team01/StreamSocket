import * as React from 'react';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import {
  Link,
} from 'react-router-dom';
import BathtubIcon from '@mui/icons-material/Bathtub';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Hidden, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoBlock from '../component/VideoBlock';

const drawerWidth = 240;
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
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
let newVideoSrc = '';

// eslint-disable-next-line react/prop-types
export default function NewHome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState({
    items: [
      'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
      'https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4',
      'https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/3.mp4',
      newVideoSrc,
    ],
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    if (localStorage.getItem('video')) {
      newVideoSrc = `https://streamsocketvideos191545-dev.s3.us-west-1.amazonaws.com/public/${localStorage.getItem('video')}`;
    }
    const videos = [
      'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
      'https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4',
      'https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/3.mp4',
      newVideoSrc,
    ];
    setTimeout(() => {
      setRefresh({
        // items: refresh.items.concat(Array.from({ length: 4 })),
        items: refresh.items.concat(videos),
      });
    }, 1500);
    console.log(refresh);
  };
  return (
    <ThemeProvider theme={theme1}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          color="primary"
        >
          <Toolbar>
            <Hidden only={['xs']}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />

              </IconButton>
            </Hidden>
            <BathtubIcon sx={{ margin: '1%' }} />

            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  marginRight: 5,
                  marginLeft: 1,
                }}
              >
                Stream Socket
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                component={Link}
                to="/signin"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                component={Link}
                to="/newhome"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="For you" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                component={Link}
                to="/test"
              >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Follow" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                component={Link}
                to="/videoupload"
              >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          </List>
          <Divider />
          <List>
            {['User 1', 'User 2', 'User 3'].map((text) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  to="/userprofile"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',

                    }}
                  >
                    <Avatar sx={{
                      m: 1, bgcolor: deepOrange[500],
                    }}
                    >
                      u
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 1, m: 1 }}>
          <DrawerHeader />
          <InfiniteScroll
            dataLength={refresh.items.length}
            next={fetchMoreData}
            hasMore
            loader={<h4>Loading...</h4>}
          >
            {refresh.items.map((src) => (
              <div>
                <VideoBlock srcIn={src} />
              </div>
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
