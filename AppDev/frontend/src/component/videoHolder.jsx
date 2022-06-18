import React from 'react';
import Swiper from 'react-id-swiper';
import Box from '@mui/material/Box';

function VideoHolder() {
  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
    }}
    >
      <Swiper>
        <Box
          sx={{
            minWidth: '100%',
            minHeight: '100%',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
        <Box
          sx={{
            width: '80vw',
            height: '85vh',
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
      </Swiper>
    </Box>

  );
}
export default VideoHolder;
