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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountrySelect from '../component/CountrySelect';

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

const ValidatePhone = (value) => {
  if (!value) {
    return false;
  }
  return value.match(/\d/g).length === 10;
};

const validCode = (code) => {
  if (code === '123456') {
    return true;
  }
  return false;
};

export default function SignUpPhone() {
  // count down

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  console.log(isPhoneValid);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const CodevalueRef = useRef(''); // creating a refernce for TextField Component
  const PhoneValueRef = useRef(''); // creating a refernce for TextField Component

  const navigate = useNavigate();

  const validate = (values) => {
    const phone = values.get('phone');
    const code = values.get('code');

    if (!ValidatePhone(phone)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
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
    // fetch(`http://127.0.0.1:8000/users/mobiles/${phone}`, {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((r) => r.json())
    //   .then((res) => {
    //     console.log(res);
    //     if (res.is_exist === true) {
    //       return true;
    //     }
    //     return false;
    //   }).catch((err) => console.log(err));
    if (ValidatePhone(phone)) {
      setIsCodeSent(true);
    }
    fetch(`http://127.0.0.1:8000/users/verifications/${phone}/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        if (res.message === 'ok') {
          setIsPhoneValid(false);
        }
      });
    // 6692643381
  };

  const handleCodeOnchange = () => {
    if (CodevalueRef.current.value.length === 6) {
      // Fetch to validate the Code
      if (CodevalueRef.current.value === '123456') {
        navigate('/userprofile');
      }
      console.log('Code Sent- fetch here');
      console.log('req', JSON.stringify({
        username: PhoneValueRef.current.value, password: CodevalueRef.current.value,
      }));
      // validate is xwcode correct
      fetch('http://127.0.0.1:8000/users/token/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: PhoneValueRef.current.value, password: CodevalueRef.current.value,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          console.log(res);
          if (res.access) {
            navigate('/userprofile');
          }
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
            Sign In
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
                  error={isPhoneValid}
                  helperText={isPhoneValid && 'phone invalid'}
                  inputRef={PhoneValueRef}
                />
              </Grid>

              { isCodeSent
                    && (
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
                        inputRef={CodevalueRef}
                        onChange={handleCodeOnchange}
                      />
                    </Grid>
                    )}

            </Grid>
            {
                  (!isCodeSent
                      && (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Send Code
                      </Button>
                      )) || (isCodeSent
                      && (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Resend Code
                      </Button>
                      ))
              }

            <Grid container justifyContent="flex-end">
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
