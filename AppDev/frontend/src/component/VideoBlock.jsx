import React from 'react';
import Fab from '@mui/material/Fab';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// eslint-disable-next-line react/prop-types
export default function VideoBlock({ srcIn }) {
  console.log(srcIn);
  return (
    <Box sx={{
      borderRadius: '16px',
      position: 'relative',
      maxWidth: '800px',
      marginBottom: '10px',
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
          <source src={srcIn} />
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
  );
}
