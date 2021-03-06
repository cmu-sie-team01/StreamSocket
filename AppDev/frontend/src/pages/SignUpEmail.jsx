import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const validUserName = (un) => {
  if (un === '') return false;
  return true;
};
const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const validPw = (pw) => {
  if (pw.length < 4) { return false; }
  return true;
};
// const checkUserNameExist = (username) => {
//   if (username === '123') {
//     return true;
//   }
//   return false;
// };
// const checkEmailExist = (email) => {
//   if (email === '123@gmail.com') {
//     return true;
//   }
//   return false;
// };

export default function SignUpEmail() {
  const navigate = useNavigate();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const ExistEmail = async (email) => {
    fetch(`http://128.2.25.18:8000/users/emails/${email}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);

        if (res?.is_existed) {
          setIsEmailExist(true);
        } else {
          setIsEmailExist(false);
        }
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('userName');

    // const code = data.get('code');

    // email validation
    if (!validEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    // pw validation
    if (!validPw(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    // username validation
    if (!validUserName(username)) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }

    await ExistEmail(email).then(
      () => {
        console.log(isEmailExist);
        if (!isEmailExist && validEmail(email) && validUserName(username) && validPw(password)) {
          fetch('http://128.2.25.18:8000/users/user/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username, password, email,
            }),
          })
            .then((r) => r.json())
            .then((res) => {
              if (res) {
                console.log(res);
                navigate('/newhome');
              }
            });
        }
      },
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
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
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={isEmailValid || isEmailExist}
                  helperText={(isEmailValid && 'Invalid email.(example@email.com)') || (isEmailExist && 'Email Exists')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={isPasswordValid}
                  helperText={isPasswordValid && 'Invalid password. (length>=4)'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="user-name"
                  error={isUsernameValid}
                  helperText={isUsernameValid && 'UserName is required'}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I am over 13 year old."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
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
