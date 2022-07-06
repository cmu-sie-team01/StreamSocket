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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Box
          sx={{
            marginTop: 8,
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
            <Container maxWidth="xs" sx={{ padding: 0, height: '100vh' }}>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >

                <video
                  style={{
                    left: 0, height: '20vh', width: '10vw', borderRadius: '12px',
                  }}
                  controls
                  className="video_card"
                  autoPlay
                  muted
                  webkit-playsinline="true"
                  playsInline
                >
                  <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4" type="video/mp4" />
                </video>
              </Box>
            </Container>

          </TabPanel>
          <TabPanel value={value} index={1}>
            Your liked Videos
            <Container maxWidth="xs" sx={{ padding: 0, height: '100vh' }}>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >

                <video
                  style={{
                    left: 0, height: '20vh', width: '10vw', borderRadius: '12px',
                  }}
                  controls
                  className="video_card"
                  autoPlay
                  muted
                  webkit-playsinline="true"
                  playsInline
                >
                  <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4" type="video/mp4" />
                </video>
              </Box>
            </Container>
          </TabPanel>

        </Box>
      </Container>

    </ThemeProvider>
  );
}
