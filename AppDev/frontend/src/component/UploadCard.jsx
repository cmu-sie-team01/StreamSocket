import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Collapse, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Input = styled('input')({
  display: 'none',
});
// eslint-disable-next-line react/prop-types
export default function UploadButtons({ setVideos }) {
  const [uploading, setUploaded] = useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const onFileChange = async (file) => {
    // upload to s3
    setUploaded(true);
    const fileName = uuidv4();
    const result = await Storage.put(`${fileName}.mp4`, file);
    // console.log(result);
    if (result.key) {
      const re = [];
      re.push(result.key);
      setVideos(re);
      localStorage.setItem('video', result.key);
      if (checked) {
        console.log('checked', `https://streamsocketvideos191545-dev.s3.us-west-1.amazonaws.com/public/${result.key}`);
        // Create Video to backend
        await fetch('http://128.2.25.18:8000/videos/video/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            video: `https://streamsocketvideos191545-dev.s3.us-west-1.amazonaws.com/public/${result.key}`,
          }),
        }).then((r) => r.json())
          .then((res) => {
            localStorage.setItem('videoID', res.id);
            console.log('res!!!!', res);
          });
      }
    }
    setUploaded(false);
    setUploadSuccess(true);
  };

  return (
    <div>
      <Box sx={{ width: '100%', height: '100%' }}>

        <Collapse in={uploadSuccess}>
          <Alert
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUploadSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              )}
            sx={{ mb: 2 }}
          >
            Video Upload successfully!
          </Alert>
        </Collapse>
        <Button
          component={Link}
          to="/newhome"
        >
          <ArrowBackIcon sx={{

          }}
          />
        </Button>
      </Box>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ marginTop: '3%' }}>

        <Box sx={{
          bgcolor: '#DCDCDC',
          height: '85vh',
          borderStyle: 'dashed',
          borderWidth: 3,
          borderRadius: '8px',
          borderColor: 'Grey',
        }}
        >
          <Box sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
          >
            <Avatar sx={{
              width: 90, height: 90, m: 'auto', marginTop: '10%',
            }}
            >
              <CloudUploadIcon />
            </Avatar>

            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop="10%"
            >
              Select a Video to upload
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop="1%"
            >
              Or drag and drop a file
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop="10%"
            >
              Mp4 or WebM
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop="1%"
            >
              Up to 1 min
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop="1%"
            >
              Less than 1 GB
            </Typography>
            <Stack
              alignItems="center"
              spacing={2}
              marginTop="10%"
              display="flex"
            >
              {uploading ? (
                <Typography
                  color="primary"
                >
                  It takes a while to process subtitle
                </Typography>
              )
                : (<div />)}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Input accept="video/*" id="contained-button-file" multiple type="file" onChange={(e) => onFileChange(e.target.files[0])} />
                {
                  uploading ? (
                    <CircularProgress />
                  ) : (
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  )
                }
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="icon-button-file">
                <Input accept="video/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="icon-button-file" color="primary">
                <Input accept="video/*" id="icon-button-file" type="file" />
                <FormControlLabel
                  control={<Checkbox value="addSub" color="primary" onChange={async () => { setChecked(!checked); }} />}
                  label={(
                    <Typography color="primary">
                      Add auto-generated subtitles
                    </Typography>
)}
                />

              </label>
            </Stack>

          </Box>
        </Box>
      </Container>

    </div>
  );
}
