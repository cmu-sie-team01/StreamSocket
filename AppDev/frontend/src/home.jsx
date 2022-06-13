import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>

      <Fab disabled aria-label="like">
        home page

      </Fab>
    </Box>
  );
}
