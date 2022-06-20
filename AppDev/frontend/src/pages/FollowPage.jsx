import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { blue, orange } from '@mui/material/colors';
import Grid from '@mui/material/Grid';

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

export default function FollowPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab sx={{ width: '50%' }} label="Following 1" {...a11yProps(0)} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab sx={{ width: '50%' }} label="Follower 1" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid
            item
            xs={12}
            justify="center"
          >
            <Avatar sx={{
              width: 50, height: 50, m: 1, bgcolor: orange[500],
            }}
            >
              test
            </Avatar>
            test user1
          </Grid>
        </Grid>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid
            item
            xs={12}
            justify="center"
          >
            <Avatar sx={{
              width: 50, height: 50, m: 1, bgcolor: blue[500],
            }}
            >
              test2
            </Avatar>
            test user2
          </Grid>
        </Grid>
      </TabPanel>

    </Box>
  );
}
