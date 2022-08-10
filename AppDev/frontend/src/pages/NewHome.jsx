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
import {
  Link,
} from 'react-router-dom';
import BathtubIcon from '@mui/icons-material/Bathtub';

import { Hidden, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import VideoBlock from '../component/VideoBlock';
import ProfileMenu from '../component/ProfileMenu';
import Notification from '../component/Notification';
import DirectMsg from '../component/DirectMsg';
import Page404 from './Page404';

const randomColor = () => {
  const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor1}`;
};
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

// eslint-disable-next-line react/prop-types
export default function NewHome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hasmore, setHasmore] = React.useState(true);
  const [refresh, setRefresh] = React.useState({
    items: [],
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchMoreData = async () => {
    // fetch the update video if exist
    const videoID = localStorage.getItem('videoID');

    if (videoID) {
      await fetch(`http://128.2.25.18:8000/videos/video/${videoID}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((r) => r.json())
        .then((res) => {
          setRefresh({
            items: refresh.items.concat({
              src: res.video,
              caption: res.caption,
              captionChinese: res.captionChinese,
              captionSpanish: res.captionSpanish,
              likesCount: res.likesCount,
              id: res.id,
              uid: res.author,
            }),
          });
        });
    }
    localStorage.setItem('videoID', '');

    // fetch one Video to backend
    await fetch('http://128.2.25.18:8000/videos/randomvideo/', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((r) => {
        if (r.status === 204) {
          setHasmore(false);
        } return r.json();
      })
      .then((res) => {
        setTimeout(() => {
          setRefresh({
            items: refresh.items.concat({
              src: res.video,
              caption: res.caption,
              likesCount: res.likesCount,
              id: res.id,
              uid: res.author,
            }),
          });
        }, 1500);
      });
  };
  const [iniVideo, setIniVideo] = useState([]);
  useEffect(() => {
    const fetchIni = async () => {
      await fetch('http://128.2.25.18:8000/videos/initialvideo/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((r) => r.json())
        .then((res) => {
          setIniVideo(iniVideo.concat(res));
        });
    };
    fetchIni();
  }, []);

  return (

    <ThemeProvider theme={theme1}>
      {localStorage.getItem('token') ? (
        <Box sx={{ display: 'flex', overflowY: 'scroll' }}>
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

              <Box sx={{ display: { xs: 'flex', md: 'flex', width: '100vw' } }}>

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
                <DirectMsg />
                <Notification />
                <ProfileMenu />
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

              {['User 1', 'C', '3'].map((text) => (
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
                        m: 1, bgcolor: randomColor(),
                      }}
                      >
                        {text[0]}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1, p: 1, m: 1, overflowX: 'scroll', overflowY: 'scroll',
            }}
          >
            <DrawerHeader />
            <InfiniteScroll
              dataLength={refresh.items.length}
              next={fetchMoreData}
              hasMore={hasmore}
              loader={<h4>Loading...</h4>}
              pullDownToRefreshThreshold={`${refresh.items.length * 800}px`}
              endMessage={<h4>No more items</h4>}
            >
              {
              iniVideo.map((item) => (
                <VideoBlock
                  key={item}
                  srcIn={item.video}
                  srtIn={item.caption}
                  srtCn={item.captionChinese}
                  srtSp={item.captionSpanish}
                  likesIn={item.likesCount}
                  idIn={item.id}
                  userIDIn={item.uid}
                  isProcessed
                  isHomeVideo
                />
              ))
            }
              {
              refresh.items.map((item) => (
                <VideoBlock
                  key={item}
                  srcIn={item.src}
                  srtIn={item.caption}
                  srtCn={item.captionChinese}
                  srtSp={item.captionSpanish}
                  likesIn={item.likesCount}
                  idIn={item.id}
                  userIDIn={item.uid}
                  isProcessed
                  isHomeVideo
                />
              ))
            }

            </InfiniteScroll>
          </Box>
        </Box>
      ) : <Page404 />}
    </ThemeProvider>
  );
}
