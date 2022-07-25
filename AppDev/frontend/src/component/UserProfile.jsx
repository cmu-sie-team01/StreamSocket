import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent,
} from '@mui/material';
import VideoBlock from './VideoBlock';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function userProfile({ userName }) {
  const theme = createTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [username, setName] = useState(0);
  const [likeVideos, setLikeVideos] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchIni = async () => {
      await fetch('http://128.2.25.18:8000/profiles/profile/', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((r) => r.json())
        .then((res) => {
          console.log(res);
          setName(res.user.username);
          setLikeVideos(likeVideos.concat(res.videos_like));
          setUploadVideos(uploadVideos.concat(res.videos_upload));
        });
    };
    fetchIni();
  }, []);
  const [selectedVideo, setSelectVideo] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Button
          component={Link}
          to="/newhome"
        >
          <ArrowBackIcon sx={{
            marginTop: '10px',
          }}
          />
        </Button>
        <CssBaseline />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { borderRadius: 20 },
          }}
        >

          <DialogContent>
            {selectedVideo ? (
              <VideoBlock
                srcIn={selectedVideo.video}
                srtIn={selectedVideo.caption}
                likesIn={selectedVideo.likesCount}
                idIn={selectedVideo.id}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Dismiss</Button>
          </DialogActions>
        </Dialog>

        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{
            width: 90, height: 90, m: 1,
          }}
          >
            {!userName ? 'default' : userName.charAt(0)}
          </Avatar>

          <Grid container>
            <Grid
              item
              xs={12}
              justify="center"
              style={{ padding: '5%' }}
            >
              <Typography component="span" variant="h6" align="center">
                {!userName ? 'default' : userName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  0
                  <span>
                    {(username)}
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  1
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  2
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} onClick={() => navigate('/following')}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  Following
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} onClick={() => navigate('/following')}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  Follower
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography component="span" variant="body1" align="center">
                  Likes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{ alignItems: 'center' }}
        >
          <Box width="100%" sx={{ borderBottom: 1, borderColor: 'divider', alignItems: 'center' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Tab sx={{ width: '50%' }} icon={<VideoLibraryIcon />} {...a11yProps(0)} />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Tab sx={{ width: '50%' }} icon={<FavoriteIcon />} {...a11yProps(1)} />
            </Tabs>

          </Box>
          <TabPanel value={value} index={0}>
            Your Videos
            <Container
              maxWidth="xs"
              sx={{
                padding: 0,
                width: '100%',
                paddingTop: '20px',
              }}
              component={Box}
            >
              <CssBaseline />
              <Grid
                container
                spacing={0}
                sx={{
                  display: 'flex',
                }}
              >
                {
                  uploadVideos.map((item) => (
                    <Grid xs={3} margin="2%">
                      <video
                        style={{
                          height: '20vh', maxWidth: '20vw', borderRadius: '12px', display: 'flex', backgroundColor: 'black',
                        }}
                        className="video_card"
                        autoPlay
                        muted
                        webkit-playsinline="true"
                        playsInline
                        onClick={async () => {
                          await fetch(`http://128.2.25.18:8000/videos/video/${item.id}/`, {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          }).then((r) => r.json())
                            .then((res) => {
                              console.log(res);
                              setSelectVideo(res);
                              setOpen(true);
                              console.log(selectedVideo);
                            });
                        }}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </Grid>
                  ))
                }

              </Grid>
            </Container>

          </TabPanel>
          <TabPanel value={value} index={1}>
            Your liked Videos
            <Container maxWidth="xs" sx={{ padding: 0, height: '100vh', width: '100vw' }}>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                {
                  likeVideos.map((item) => (
                    <video
                      style={{
                        height: '20vh', width: '20vw', borderRadius: '16px', display: 'flex', margin: '1%',
                      }}
                      className="video_card"
                      autoPlay
                      muted
                      webkit-playsinline="true"
                      playsInline

                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ))
                }
              </Box>
            </Container>
          </TabPanel>

        </Box>
      </Container>

    </ThemeProvider>
  );
}
