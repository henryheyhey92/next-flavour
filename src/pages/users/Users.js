import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import UsersContext from '../../contexts/UsersContext';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./style.css";
import {
    Link
  } from "react-router-dom";
import { BASE_URL } from '../../constant/Constants';
import axios from 'axios';


export default function Users() {

    useEffect(() => {

    }, []);

    const navigate = new useNavigate();
    const context = useContext(UsersContext);
    const {loginStatus, setLoginState} = context;

    const [userInfo, setUser] = useState({
        email: "",
        password: ""
    })


    const onUpdateFormField = (e) => setUser({
        ...userInfo,
        [e.target.name]: e.target.value
    })


    const handleLogin = async () => {
        // let result = await login(userInfo.email, userInfo.password);
        let response = await axios.post(BASE_URL + "api/users/login", {
            "email": userInfo.email,
            "password": userInfo.password
        })
        console.log("🚀 ~ file: Users.js:44 ~ handleLogin ~ response:", response)

        if(response.data){
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('localLoginStatus', true);
            setLoginState(true);
            navigate('/')
        }
    }


    return (
        <React.Fragment>
            <div className='login-image'>
                {/* <h1 className='user-login-none'>Users Login page</h1> */}
                <Box>

                    <Paper elevation={3} sx={{ m: 2 }}>
                        <h1 className='user-login'>Users Login</h1>
                        <Grid container spacing={2} sx={{ width: '100%' }}>

                            <Grid item xs={12} sm={6}>
                                <TextField id="url-name"
                                    label="Email"
                                    variant="outlined"
                                    name='email'
                                    value={userInfo.email}
                                    onChange={onUpdateFormField}
                                    className="textfield-image-url"
                                    helperText
                                    sx={{ width: '100%', m: 1 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="Artwork-name"
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    value={userInfo.password}
                                    onChange={onUpdateFormField}
                                    className="textfield-style"
                                    type="password"
                                    helperText
                                    sx={{ width: '100%', m: 1 }}
                                />
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                        <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleLogin}>login</Button>
                            {/* <Button variant="contained" onClick={logout}>logout</Button> */}
                            <Box sx={{textAlign: 'center'}}><Link to={"/signup"} >No account? Click here to sign up</Link></Box>
                           
                        </Box>


                    </Paper>
                </Box>
            </div>
        </React.Fragment>

    )
}