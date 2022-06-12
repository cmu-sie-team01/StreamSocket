//TODO:Validate inputs email/phone number
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
import {useState} from "react";
import CountrySelect from "./CountrySelect";

function Copyright(props) {
    return (
        <Typography  component={'span'} variant="body2" color="text.secondary" align="center" {...props}>
            {'Built by '}
            <Link color="inherit" href="https://github.com/cmu-sie-team01/StreamSocket">
                StreamSocket
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function validPhone(phone) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(phone).toLowerCase());
}
const checkUserNameExist = username=>{
    if (username === "123"){
        return true;
    }
    return false;
}
const checkPhoneExist = phone =>{
    if (phone === "123456789"){
        return true;
    }
    return false;
}

export default function SignUpPhone() {
    const [isUserNameValid, setIsUserNameValid] = useState("");
    const [isUserNameExist, setIsUserNameExist] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState("");
    const [isPhoneExist, setIsPhoneExist] = useState("");
    const [isPWEmpty, setIsPWEmpty] = useState("");
    const [isPWvalid, setisPWvalid] = useState("");

    const [checked, setChecked] = React.useState(false);

    const validate = values =>{
        const username =values.get('userName');
        const phone = values.get('phone');
        const pw = values.get('password');
        if(username === ""){
            setIsUserNameValid("Username is required");
        }
        else{
            setIsUserNameValid("");
        }
        if(checkUserNameExist(username)){
            setIsUserNameExist("Username exists");
        }
        else{
            setIsUserNameExist("");
        }


        if ( phone===""){
            setIsPhoneValid("Phone is required");
        }
        else if( validPhone(phone) === false){
            setIsPhoneValid("Please enter a valid Phone");
        }
        else{
            setIsPhoneValid("")
        }
        if(checkPhoneExist(phone)){
            setIsPhoneExist("Email exists, change one");
        }
        else{
            setIsPhoneExist("");
        }
        if(pw === ""){
            setIsPWEmpty("Password is required");
        }
        else{
            setIsPWEmpty("")
        }
        if(pw.length < 4){
            setisPWvalid("Password is invalid, length should larger than 4");
        }
        else{
            setisPWvalid("")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        validate(data);
        const phone = data.get('phone');
        const username = data.get('userName');
        const password = data.get('password');

        console.log({
            username: data.get('userName'),
            phone: data.get('phone'),
            password: data.get('password'),
        });

        if(true){
            fetch('http://127.0.0.1:8000/users/token/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),

            }).then(r=>r.json())
                .then((res)=>{
                    if(res.acceess){
                        alert("token got");
                        console.log(res);
                    }

                });
        }


        // fetch('http://127.0.0.1:8000/users/sms_codes/6692643381/', {
        //     method: 'GET',
        //     mode:'cors',
        //
        // })
        //     .then((res) => res.json())
        //     .then((result) => {
        //         console.log(result);
        //     },
        // );
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

                            <Grid item xs={12} >
                                <CountrySelect/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    error ={isPhoneValid !== "" || isPhoneExist !== ""}
                                    helperText={isPhoneValid || isPhoneExist}
                                    autoFocus
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
                                    error={isPWEmpty!==""||isPWvalid!==""}
                                    helperText={isPWEmpty || isPWvalid}

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
                                <Link href="#" variant="body2">
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
