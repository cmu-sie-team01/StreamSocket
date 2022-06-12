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
import { useForm } from "react-hook-form";

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

function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const checkUserNameExist = username=>{
    if (username === "123"){
        return true;
    }
    return false;
}
const checkEmailExist = email =>{
    if (email === "123@gmail.com"){
        return true;
    }
    return false;
}

export default function SignUpEmail() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); // watch input value by passing the name of it

    const [isUserNameValid, setIsUserNameValid] = useState("");
    const [isUserNameExist, setIsUserNameExist] = useState("");
    const [isEmailValid, setIsEmailValid] = useState("");
    const [isEmailExist, setIsEmailExist] = useState("");
    const [isPWEmpty, setIsPWEmpty] = useState("");
    const [isPWvalid, setisPWvalid] = useState("");

    const [checked, setChecked] = React.useState(false);



    const validate =  (event) =>{
        const values = new FormData(event.currentTarget);
        const username =values.get('userName');
        const email = values.get('email');
        const pw = values.get('password');
        if(username === null){
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


        if ( email===null){
            setIsEmailValid("Email is required");
        }
        else if( validEmail(email) === false){
            setIsEmailValid("Please enter a valid email");
        }
        else{
            setIsEmailValid("")
        }
        if(checkEmailExist(email)){
            setIsEmailExist("Email exists, change one");
        }
        else{
            setIsEmailExist("");
        }
        if(pw === null){
            setIsPWEmpty("Password is required");
        }
        else{
            setIsPWEmpty("")
        }
        if(pw !== null&&pw.length < 4){
            setisPWvalid("Password is invalid, length should larger than 4");
        }
        else{
            setisPWvalid("")
        }

    }

    const handleSubmit1 = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        await validate(data);
        const email = data.get('email');
        const username = data.get('userName');
        const password = data.get('password');

        console.log({
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
        });
        console.log(checked,email,username,checkEmailExist(email), checkUserNameExist(username));

        console.log(isEmailExist,isEmailValid,isUserNameExist,isUserNameValid,isPWEmpty,isPWvalid);

        if(checked&&isEmailExist===""&&isEmailValid===""&&isUserNameExist===""&&isUserNameValid===""&&isPWEmpty===""&&isPWvalid===""){
            fetch('http://127.0.0.1:8000/users/token/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),

            }).then(r=>r.json())
                .then((res)=>{
                    console.log(res);
                    if(res.detail == "No active account found with the given credentials"){
                        alert(res.detail);
                    }
                    else if(res.length !== 0){
                        console.log(res.access);
                        alert('token get!');
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
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>


                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error ={isEmailValid !== "" || isEmailExist !== ""}
                                    helperText={isEmailValid || isEmailExist}
                                    autoFocus
                                    {...register("example")}
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
                                    error={errors.exampleRequired && <span>This field is required</span>}
                                    helperText={isPWEmpty || isPWvalid}
                                    {...register("exampleRequired", { required: true })}
                                />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    error={isUserNameValid !== "" || isUserNameExist !==""}
                                    helperText={isUserNameValid || isUserNameExist}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="olderThan13" color="primary" />}
                                    label="I am over 13 years old."
                                    checked={checked}
                                    onChange={(event)=>{
                                        setChecked(event.target.checked);
                                    }}
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
