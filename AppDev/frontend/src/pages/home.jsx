import React from 'react';
//  Mobile browser autoplay: webkit-playsinline="true" playsInline
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function () {
  return (
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
            left: 0, height: '100%', width: '100%', borderRadius: '16px',
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
  );
}
