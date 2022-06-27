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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright(props) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Built by '}
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

const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const checkEmailExist = (email) => {
  fetch(`http://127.0.0.1:8000/mobiles/${email}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
    });
  if (email === '00000@gmail.com') {
    return true;
  }
  return false;
};
const validPw = (pw) => {
  if (pw.length < 4) { return false; }
  return true;
};

export default function SignInEmail() {
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // initialize username, videos
    localStorage.setItem('username', email);

    // email validation
    if (!validEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    if (!checkEmailExist(email)) {
      setIsEmailExist(true);
    } else {
      setIsEmailExist(false);
    }

    // pw validation
    if (!validPw(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log('user entered a email, fecth using http://127.0.0.1:8000/users/token/');
    fetch('http://127.0.0.1:8000/users/token/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email, password,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.access) {
          // store userdata to localstorage
          console.log(res);
          navigate('/userprofile');
        } else {
          setIsPasswordWrong(true);
          console.log('login fail');
        }
      });
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isEmailValid || isEmailExist}
              helperText={(isEmailValid && 'Invalid email.(example@email.com)')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={isPasswordValid || isPasswordWrong}
              helperText={(isPasswordValid && 'password is invalid. (length >= 4)') || (isPasswordWrong && 'Wrong password.')}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link href="/signup" variant="body2">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
