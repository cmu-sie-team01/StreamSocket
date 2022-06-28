import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ReplyIcon from '@mui/icons-material/Reply';

import Fab from '@mui/material/Fab';
import CommentIcon from '@mui/icons-material/Comment';
import Paper from '@mui/material/Paper';
import VideoBlock from '../component/VideoBlock';

const drawerWidth = 200;

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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let newVideoSrc = '';
  if (localStorage.getItem('video')) {
    newVideoSrc = `https://streamsocketvideos191545-dev.s3.us-west-1.amazonaws.com/public/${localStorage.getItem('video')}`;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="primary"

      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <BathtubIcon m={10} />
            Stream Socket
          </Typography>
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
              to="/"
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

        </List>
        <Divider />
        <List>
          {['user 1', 'User 2', 'User 3'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
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
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        <Box sx={{
          borderRadius: '16px',
          position: 'relative',
          maxWidth: '800px',

        }}
        >
          <Paper
            elevation={3}
            style={{
              borderRadius: '16px',
            }}
          >
            <video
              style={{
                width: '90%',
                borderRadius: '16px',
                maxWidth: '300px',
                margin: '5%',

                display: 'inline-block',
              }}
              controls
              className="video_card"
              autoPlay
              muted
              webkit-playsinline="true"
              playsInline
            >
              <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4" />
            </video>
            <Fab
              color="secondary"
              aria-label="like"
              sx={{
                display: 'inline-block',
              }}
            >
              <CommentIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="like"
              sx={{
                display: 'inline-block',
              }}
            >
              <CommentIcon />
            </Fab>
          </Paper>

        </Box>

        <VideoBlock
          srcIn="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/2.mp4"
        />
        <video
          style={{
            width: '100%', borderRadius: '16px',
          }}
          controls
          className="video_card"
          autoPlay
          muted
          webkit-playsinline="true"
          playsInline
        >
          <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/4.mp4" type="video/mp4" />
        </video>
        <video
          style={{
            width: '100%', borderRadius: '16px',
          }}
          controls
          className="video_card"
          autoPlay
          muted
          webkit-playsinline="true"
          playsInline
        >
          <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/3.mp4" type="video/mp4" />
        </video>
        <video
          style={{
            width: '100%', borderRadius: '16px',
          }}
          controls
          className="video_card"
          autoPlay
          muted
          webkit-playsinline="true"
          playsInline
        >
          <source src={newVideoSrc} />
        </video>
      </Box>
    </Box>
  );
}
