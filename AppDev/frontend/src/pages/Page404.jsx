import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import Img404 from '../404.png';

export default function Page404() {
  return (
    <Box
      height="100vh"
      width="100vw"
    >
      <Grid
        paddingTop="100px"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={Img404}
            height="200px"
          />
        </Grid>
        <Grid item xs={12} paddingTop="20%">
          <Typography>
            We can not find the content, try
            <Link href="/signin" variant="body2">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {'  '}
              Login
              {'  '}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href="/signup" variant="body2">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>

    </Box>
  );
}
