import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';

const Input = styled('input')({
  display: 'none',
});
export default function UploadButtons() {
  return (
    <div>

      <CssBaseline />
      <Container maxWidth="xs" sx={{ marginTop: '5%' }}>
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
            height: '90%',
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
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="contained-button-file">
                <Input accept="video/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="icon-button-file">
                <Input accept="video/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Stack>

          </Box>
        </Box>
      </Container>

    </div>
  );
}
