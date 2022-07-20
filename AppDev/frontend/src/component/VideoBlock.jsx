import React, { } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import { motion } from 'framer-motion';

import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ShareIcon from '@mui/icons-material/Share';
import { ThemeProvider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import SrtParser2 from 'srt-parser-2';
import TestSub from './test.srt';

let allText = '';

function readTextFile(file) {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
}
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
export default function VideoBlock(props) {
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    srcIn, srtIn, likesIn, idIn, userIDIn,
  } = props;
  console.log(userIDIn);
  const [Sub, SetSub] = React.useState('');
  // eslint-disable-next-line react/prop-types
  const [like, setLike] = React.useState(likesIn !== 0 ? likesIn : 0);
  const [animation, setAnimation] = React.useState(false);
  const parser = new SrtParser2();
  readTextFile(TestSub);
  const result = parser.fromSrt(allText);

  if (result.length !== 0) {
    result.map((sub) => {
      let temp = '';
      temp = sub.endTime.replace(/,/g, '.');
      let tempSplit = temp.split(':');
      const endTimeToSeconds = parseFloat(tempSplit[2])
          + parseFloat(tempSplit[1]) * 60.0 + parseFloat(tempSplit[0]) * 60.0 * 60.0;
      // eslint-disable-next-line no-param-reassign
      sub.endTime = endTimeToSeconds;
      temp = sub.startTime.replace(/,/g, '.');
      tempSplit = temp.split(':');
      // eslint-disable-next-line max-len
      const startTimeToSeconds = parseFloat(tempSplit[2])
          + parseFloat(tempSplit[1]) * 60.0 + parseFloat(tempSplit[0]) * 60.0 * 60.0;
      // eslint-disable-next-line no-param-reassign
      sub.startTime = startTimeToSeconds;
      return sub;
    });
  }

  const handleDuration = (duration) => {
    console.log('onDuration', duration);
  };
  const handleProgress = (state) => {
    // eslint-disable-next-line react/prop-types
    const found = srtIn.find((element) => (state.playedSeconds <= element.endTime)
    && (state.playedSeconds >= element.startTime));
    if (found) {
      // console.log('onProgress', state, found.text);
      SetSub(found.text);
    } else {
      SetSub('');
    }

    // We only want to update time slider if we are not currently seeking
  };
  const handleSeekChange = (e) => {
    console.log(parseFloat(e.target.value));
  };
  // eslint-disable-next-line react/prop-types
  const handleLike = async () => {
    await fetch(`http://127.0.0.1:8000/videos/like/${idIn}/`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((r) => r.json())
      .then(async (res) => {
        if (res.likesCount) {
          setLike(res.likesCount);
          setAnimation(!animation);
        } else if (res.count) {
          await fetch(`http://127.0.0.1:8000/videos/unlike/${idIn}/`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then((r2) => r2.json())
            .then((res2) => {
              if (res2.likesCount) {
                setLike(res2.likesCount);
                setAnimation(!animation);
              } else if (res2.count) {
                setAnimation(!animation);
              }
            });
        }
      });
    setAnimation(!animation);
  };
  return (
  // eslint-disable-next-line react/prop-types
    srcIn.length === 0 ? (null)
      : (
        <ThemeProvider theme={theme}>

          <Box sx={{
            borderRadius: '16px',
            position: 'relative',
            maxWidth: '800px',
            margin: 'auto',
            marginBottom: '2%',
          }}
          >
            <Paper
              elevation={3}
              style={{
                borderRadius: '16px',
                margin: '1%',

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
                        variant="subtitle1"
                        gutterBottom
                        color="fourth"
                        sx={{
                          position: 'absolute',
                          margin: 'auto',
                          width: '60%',
                          color: 'white',
                          bottom: '17%',
                        }}
                      >
                        <Box sx={{ opacity: 0.8, bgcolor: '#000000' }}>
                          {Sub}
                        </Box>
                      </Typography>

                      <Box sx={{
                        position: 'absolute',
                        bottom: '38%',
                        right: '0',
                        margin: '4%',
                      }}
                      >
                        {animation ? (
                          <motion.div
                            animate={{
                              scale: [1, 2, 2, 1, 1],
                              rotate: [0, 0, 270, 270, 0],
                              borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                            }}
                          >
                            <Fab
                              color="secondary"
                              aria-label="like"
                              sx={{
                                maxHeight: '40px',
                                maxWidth: '40px',
                              }}
                            >
                              <FavoriteIcon onClick={handleLike} />
                            </Fab>
                          </motion.div>
                        ) : (
                          <Fab
                            color="secondary"
                            aria-label="like"
                            sx={{
                              maxHeight: '40px',
                              maxWidth: '40px',
                            }}
                          >
                            <FavoriteIcon onClick={handleLike} />
                          </Fab>
                        )}
                        <Typography
                          variant="caption"
                          color="red"
                          sx={{
                            display: 'block',
                          }}
                        >
                          {like}
                        </Typography>

                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        bottom: '26%',
                        right: '0',
                        margin: '4%',
                      }}
                      >
                        <Fab
                          color="primary"
                          aria-label="like"
                          sx={{
                            maxHeight: '40px',
                            maxWidth: '40px',
                          }}
                        >
                          <InsertCommentIcon />
                        </Fab>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                          }}
                        >
                          12356
                        </Typography>
                      </Box>

                      <Box sx={{
                        position: 'absolute',
                        bottom: '14%',
                        right: '0',
                        margin: '4%',
                      }}
                      >
                        <Fab
                          color="third"
                          aria-label="like"
                          sx={{
                            maxHeight: '40px',
                            maxWidth: '40px',
                          }}
                        >
                          <ShareIcon />
                        </Fab>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                          }}
                        >
                          12356
                        </Typography>
                      </Box>
                      <ReactPlayer
                        style={{
                          borderRadius: '16px',
                          margin: '1%',
                        }}
                        playing={false}
                        controls
                        height="500px"
                        onProgress={handleProgress}
                        progressInterval={100}
                        onSeek={(e) => console.log('onSeek', e)}
                        onChange={handleSeekChange}
                        onDuration={handleDuration}
                        webkit-playsinline="true"
                        playsinline
                        url={srcIn}
                        muted
                        className="react-workout-player"
                        config={{
                          file: {
                            attributes: {
                              crossOrigin: 'true',
                            },
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
      )

  );
}
