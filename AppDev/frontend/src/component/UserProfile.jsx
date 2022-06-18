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
import { deepOrange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

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
          <Typography>{children}</Typography>
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
export default function userProfile() {
  const theme = createTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            width: 90, height: 90, m: 1, bgcolor: deepOrange[500],
          }}
          >
            0
          </Avatar>

          <Grid container>
            <Grid
              item
              xs={12}
              justify="center"
            >
              <Typography component="h1" variant="h5" align="center">
                @00000
              </Typography>
            </Grid>
            <Grid xs={9} />
            <Grid item xs={4}>
              <Typography component="h1" variant="h6">
                Following 0
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component="h1" variant="h6">
                Follower 0
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component="h1" variant="h6">
                Likes 0
              </Typography>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            Your liked Videos
          </TabPanel>

        </Box>
      </Container>

    </ThemeProvider>
  );
}
