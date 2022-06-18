import React, { useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import Box from '@mui/material/Box';
import Videojs from '../component/VideoBlock';
import video2 from '../2.MP4';
import video1 from '../1.MP4';

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  width: 720,
  height: 300,
  controls: true,
  sources: [
    {
      src: '//vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4',
    },
  ],
};

function VideoHolder() {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const onVideoPress = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };
  return (
    <Box sx={{
      height: '92.5vh',
      width: '100vw',
      display: 'flex',
      flex: 'auto',
    }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption,react/jsx-props-no-spreading */}
      <Videojs {...videoJsOptions}>321</Videojs>

      <Swiper>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption,react/jsx-props-no-spreading */}
        <Videojs {...videoJsOptions}>321</Videojs>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption,react/jsx-props-no-spreading */}
        <video
          height="100vh"
          loop
          onClick={onVideoPress}
          ref={videoRef}
          src={video1}
          autoPlay
        />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          height="100vh"
          loop
          onClick={onVideoPress}
          ref={videoRef}
          src={video2}
          autoPlay
        />

        {/* <CardMedia */}
        {/*  component="video" */}
        {/*  image="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" */}
        {/*  autoPlay */}
        {/*  controls */}
        {/*  sx={ */}
        {/*        { height: '90vh' } */}
        {/*    } */}
        {/* /> */}
      </Swiper>
    </Box>

  );
}
export default VideoHolder;
