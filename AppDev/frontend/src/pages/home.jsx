import React from 'react';
//  Mobile browser autoplay: webkit-playsinline="true" playsInline
import Swiper from 'react-id-swiper';
import './home.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function () {
  return (
    <Box
      className="video_holder"
    >
      <CssBaseline />
      <Swiper>
        <video controls className="video_card" autoPlay muted webkit-playsinline="true" playsInline>
          <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4" type="video/mp4" />
        </video>
        <video className="video_card" autoPlay muted webkit-playsinline="true" playsInline>
          <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/3.mp4" type="video/mp4" />
        </video>
        <video className="video_card" autoPlay muted webkit-playsinline="true" playsInline>
          <source src="https://streamsocketvideo.s3.us-west-1.amazonaws.com/video/1.mp4" type="video/mp4" />
        </video>

      </Swiper>

    </Box>
  );
}
