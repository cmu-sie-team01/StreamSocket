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

const ValidatePhone = (value) => value.match(/\d/g).length === 10;

const checkPhoneExist = (phone) => {
  if (phone === '123456781') {
    return true;
  }
  return false;
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
  const [isPhoneExist, setIsPhoneExist] = useState(true);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const CodevalueRef = useRef(''); // creating a refernce for TextField Component
  const PhoneValueRef = useRef('');
  const navigate = useNavigate();
  console.log(isPhoneExist);
  const validate = (values) => {
    const phone = values.get('phone');
    const code = values.get('code');

    if (!ValidatePhone(phone)) {
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
    setIsCodeSent(true);
    const data = new FormData(event.currentTarget);
    validate(data);
    const phone = data.get('phone');
    const code = data.get('code');
    console.log(code);
    console.log({
      code: data.get('code'),
      phone: data.get('phone'),
    });
    if (ValidatePhone(phone)) {
      console.log('code sent');
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
    }
  };

  const handleCodeOnchange = () => {
    if (CodevalueRef.current.value.length === 6) {
      // validate the Code
      console.log('req', JSON.stringify({
        mobile: PhoneValueRef.current.value, verification: CodevalueRef.current.value,
      }));
      fetch('http://127.0.0.1:8000/users/user/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: PhoneValueRef.current.value, verification: CodevalueRef.current.value,
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
                  error={isPhoneValid}
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
