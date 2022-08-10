import React, { } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import { motion } from 'framer-motion';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import Alert from '@mui/material/Alert';
import LanguageSelection from './LanguageSelection';
import ShareComp from './ShareComp';
import Comment from './Comment';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#000',
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
    forth: {
      light: '#CD853F',
      main: '#CD853F',
      dark: '#2F4F4F',
      contrastText: '#000',
    },
  },
});

// eslint-disable-next-line react/prop-types
export default function VideoBlock(props) {
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    srcIn, srtIn, srtCn, srtSp, likesIn, idIn, userIDIn, isProcessed, isHomeVideo,
  } = props;
  console.log(userIDIn, isProcessed, isHomeVideo);
  const [Sub, SetSub] = React.useState('');
  // eslint-disable-next-line react/prop-types
  const [like, setLike] = React.useState(likesIn !== 0 ? likesIn : 0);
  const [animation, setAnimation] = React.useState(false);
  const [isCommentOpen, SetCommentOpen] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('English');
  const changeSubLanguage = (language) => {
    if (language === 'Chinese') {
      setCurrentLanguage('Chinese');
    } else if (language === 'English') {
      setCurrentLanguage('English');
    } else if (language === 'Spanish') {
      setCurrentLanguage('Spanish');
    }
  };

  const handleDuration = (duration) => {
    console.log('onDuration', duration);
  };
  const handleProgress = (state) => {
    let currSubL = srtIn;
    if (currentLanguage === 'English') {
      currSubL = srtIn;
    } else if (currentLanguage === 'Chinese') {
      currSubL = srtCn;
    } else if (currentLanguage === 'Spanish') {
      currSubL = srtSp;
    }
    if (currSubL) { // eslint-disable-next-line react/prop-types
      const found = currSubL.find((element) => (
        state.playedSeconds <= element.endTime)
          && (state.playedSeconds >= element.startTime));
      if (found) {
        // console.log('onProgress', state, found.text);
        SetSub(found.text);
      } else {
        SetSub('');
      }
    }

    // We only want to update time slider if we are not currently seeking
  };
  const handleSeekChange = (e) => {
    console.log(parseFloat(e.target.value));
  };
  // eslint-disable-next-line react/prop-types
  const handleLike = async () => {
    await fetch(`http://128.2.25.18:8000/videos/like/${idIn}/`, {
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
          await fetch(`http://128.2.25.18:8000/videos/unlike/${idIn}/`, {
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
          {
            // eslint-disable-next-line no-nested-ternary
            isProcessed ? (
              isHomeVideo ? null
                : (
                  <Alert severity="success">
                    Captions and translations were generated!
                  </Alert>
                )
            )
              : (
                <Box
                  sx={{
                    width: '100%',
                    marginBottom: '3%',
                  }}
                  component={Grid}
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} />
                  <Grid item xs={12}>

                    <Alert severity="info">
                      We are generating the captions and translations for you now
                      <Box sx={{ width: '100%', marginTop: '3%' }}>
                        <LinearProgress />
                      </Box>
                    </Alert>

                  </Grid>
                </Box>
              )
          }
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
                      User
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      Description:
                      Test Video
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
                      style={{ maxWidth: '30px' }}
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
                          <InsertCommentIcon onClick={() => {
                            SetCommentOpen(!isCommentOpen);
                          }}
                          />
                        </Fab>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                          }}
                        >
                          2
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
                          <ShareComp />

                        </Fab>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                          }}
                        >
                          0
                        </Typography>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        bottom: '52.5%',
                        right: '0',
                        margin: '4%',
                      }}
                      >
                        <Fab
                          color="forth"
                          aria-label="like"
                          sx={{
                            maxHeight: '40px',
                            maxWidth: '40px',
                          }}
                        >
                          <LanguageSelection changeSubLanguage={changeSubLanguage} />
                        </Fab>
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
                  <Grid item xs={12}>
                    {
                      isCommentOpen ? <Comment /> : null
                    }
                  </Grid>

                </Grid>
              </Box>
            </Paper>
          </Box>
        </ThemeProvider>
      )

  );
}
