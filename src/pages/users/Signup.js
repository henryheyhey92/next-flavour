import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import UsersContext from '../../contexts/UsersContext';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./style.css";

export default function Signup(props) {
    const navigate = new useNavigate();
    let context = useContext(UsersContext);

    const [userInfo, setUser] = useState({
        first_name : "",
        last_name: "",
        address : "",
        country: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: ""
    })

    const onUpdateFormField = (e) => setUser({
        ...userInfo,
        [e.target.name]: e.target.value
    })

    const Signup = async () => {
        let result = await context.SignUp(userInfo);
        console.log(result);
        if (result) {
            navigate('/')
        }
    }

    return (
        <React.Fragment>
            <Box>
                <Paper elevation={3} sx={{ m: 2 }}>
                    <h1 className='user-login'>Sign Up</h1>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField id="url-name"
                                label="First Name"
                                variant="outlined"
                                name='first_name'
                                value={userInfo.first_name}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                name='last_name'
                                value={userInfo.last_name}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                name='address'
                                value={userInfo.address}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Country"
                                variant="outlined"
                                name='country'
                                value={userInfo.country}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name='email'
                                value={userInfo.email}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Phone"
                                variant="outlined"
                                name='phone'
                                value={userInfo.phone}
                                onChange={onUpdateFormField}
                                className="textfield-user-reg"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
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
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                name='confirm_password'
                                value={userInfo.confirm_password}
                                onChange={onUpdateFormField}
                                className="textfield-style"
                                type="password"
                                helperText
                                sx={{ width: '100%', m: 1 }}
                            />
                        </Grid>

                    </Grid>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                        <Button sx={{ m: 2 }} variant="contained" onClick={Signup}>Sign Up</Button>
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>

    )
}