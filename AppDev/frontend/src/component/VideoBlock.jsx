import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';

import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ShareIcon from '@mui/icons-material/Share';
import { ThemeProvider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import TestCaption from './test.vtt';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    third: {
      light: '#f44336',
      main: '#5F9EA0',
      dark: '#f44336',
      contrastText: '#000',
    },
  },
});

// eslint-disable-next-line react/prop-types
export default function VideoBlock({ srcIn }) {
  console.log(srcIn);
  return (
    <ThemeProvider theme={theme}>

      <Box sx={{
        borderRadius: '16px',
        position: 'relative',
        maxWidth: '800px',
        margin: 'auto',
        marginBottom: '1%',
      }}
      >
        <Paper
          elevation={3}
          style={{
            borderRadius: '16px',
          }}
        >
          <Box
            sx={{
              borderRadius: '16px',
              position: 'relative',
              maxWidth: '800px',
              margin: 'auto',
              marginBottom: '1%',
              padding: '2%',
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Grid
              container
              spacing={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Avatar sx={{
                  bgcolor: deepOrange[500],
                  margin: 'auto',
                }}
                >
                  u
                </Avatar>
                <Typography variant="caption" display="block" gutterBottom>
                  UserName
                </Typography>
              </Grid>
              <Grid
                item
                xs={5}
              >
                <Typography variant="caption" display="block" gutterBottom>
                  Description here:
                  sdfajlisj
                  jskfja...
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
              >
                <Button
                  variant="contained"
                  disableElevation
                  size="small"
                >
                  Follow
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    borderRadius: '16px',
                    position: 'relative',
                    maxWidth: '300px',
                    margin: 'auto',
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <Typography
                    variant="caption"
                    gutterBottom
                    color="secondary"
                    aria-label="like"
                    sx={{
                      position: 'absolute',
                      margin: 'auto',
                    }}
                  >
                    Caption Display Here
                  </Typography>
                  <Fab
                    color="secondary"
                    aria-label="like"
                    sx={{
                      position: 'absolute',
                      bottom: '38%',
                      right: '0',
                      margin: '4%',
                    }}
                  >
                    <FavoriteIcon />
                  </Fab>
                  <Fab
                    color="primary"
                    aria-label="like"
                    sx={{
                      position: 'absolute',
                      bottom: '26%',
                      right: '0',
                      margin: '4%',
                    }}
                  >
                    <InsertCommentIcon />
                  </Fab>
                  <Fab
                    color="third"
                    aria-label="like"
                    sx={{
                      position: 'absolute',
                      bottom: '14%',
                      right: '0',
                      margin: '4%',
                    }}
                  >
                    <ShareIcon />
                  </Fab>

                  <ReactPlayer
                    style={{
                      width: '100%',
                      borderRadius: '16px',
                      maxWidth: '350px',
                      margin: '3%',
                    }}
                    webkit-playsinline="true"
                    playsinline
                    url="https://download.ted.com/talks/KateDarling_2018S-950k.mp4"
                    controls
                    width="100%"
                    height="500px"
                    muted
                    className="react-workout-player"
                    config={{
                      file: {
                        attributes: {
                          crossOrigin: 'true',
                        },
                        tracks: [
                          {
                            kind: 'subtitles', src: { TestCaption }, srcLang: 'en', default: true,
                          },
                          { kind: 'subtitles', src: 'subs/subtitles.ja.vtt', srcLang: 'ja' },
                          { kind: 'subtitles', src: 'subs/subtitles.de.vtt', srcLang: 'de' },
                        ],
                      },
                    }}
                  />

                </Box>
              </Grid>
            </Grid>
          </Box>

        </Paper>
      </Box>
    </ThemeProvider>

  );
}
