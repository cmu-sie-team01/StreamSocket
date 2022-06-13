// TODO:Validate inputs email/phone number
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import CountrySelect from './CountrySelect';

function Copyright(props) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Built By '}
      <Link color="inherit" href="https://github.com/cmu-sie-team01/StreamSocket">
        StreamSocket
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const theme = createTheme();

const validPhone = (phone) => {
  if (phone.length < 9) {
    return false;
  }
  return true;
};

const checkPhoneExist = (phone) => {
  if (phone === '123456789') {
    return true;
  }
  return false;
};
const validCode = (code) => {
  if (code === '1234') {
    return true;
  }
  return false;
};

export default function SignUpPhone() {
  // count down

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhoneExist, setIsPhoneExist] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const validate = (values) => {
    const phone = values.get('phone');
    const code = values.get('code');

    if (!validPhone(phone)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
    if (!checkPhoneExist(phone)) {
      setIsPhoneExist(true);
    } else {
      setIsPhoneExist(false);
    }
    if (!validCode(code)) {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    validate(data);
    const phone = data.get('phone');
    const code = data.get('code');
    console.log({
      code: data.get('code'),
      phone: data.get('phone'),
    });
    console.log(validPhone(phone));
    if (validPhone(phone) && validCode(code)) {
      alert('request sent');
      fetch('http://127.0.0.1:8000/users/sms_codes/669264338/', {
        method: 'GET',
        mode: 'cors',

      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <CountrySelect />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  error={isPhoneValid && isPhoneExist}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="code"
                  label="6-digit Code"
                  type="code"
                  id="code"
                  autoComplete="new-code"
                  error={isCodeValid}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Code
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
