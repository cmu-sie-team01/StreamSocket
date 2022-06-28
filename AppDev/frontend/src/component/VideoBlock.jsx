import React from 'react';
import Fab from '@mui/material/Fab';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
export default function VideoBlock({ srcIn }) {
  console.log(srcIn);
  return (
    <Box sx={{
      borderRadius: '16px',
      display: 'flex',
      position: 'relative',

    }}
    >
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
        <source src={srcIn} />
      </video>
      <Fab
        color="primary"
        disabled
        aria-label="like"
        sx={{
          position: 'absolute',
          bottom: '8%',
          right: 16,
        }}
      >
        <ReplyIcon />
      </Fab>
      <Fab
        color="primary"
        disabled
        aria-label="like"
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: 16,
        }}
      >
        <CommentIcon />
      </Fab>
      <Fab
        color="primary"
        disabled
        aria-label="like"
        sx={{
          position: 'absolute',
          bottom: '32%',
          right: 16,
        }}
      >
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}
