import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import UsersContext from '../../contexts/UsersContext';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./style.css";




// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"

export default function Users(props) {
    const navigate = new useNavigate();
    let context = useContext(UsersContext);

    const [userInfo, setUser] = useState({
        email: "",
        password: ""
    })

    const [logIn, setLogin] = useState(false);


    const onUpdateFormField = (e) => setUser({
        ...userInfo,
        [e.target.name]: e.target.value
    })

    useEffect(() => {
        console.log(userInfo);
        console.log(logIn);

    }, [userInfo, logIn]);


    const login = async () => {
        let result = await context.login(userInfo.email, userInfo.password);
        console.log(result);
        setLogin(true);
        if (result) {
            navigate('/Profile')
        }
    }



    const logout = async () => {
        console.log("Enter logout process");
        let result = await context.logout();
        console.log(result);
        setLogin(false);
    }


    return (
        <React.Fragment>
            <div className='login-image'>
                <h1 className='user-login'>Users Login page</h1>
                <Box>
                    <Paper elevation={3} sx={{ m: 2 }}>
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
                                    type="text"
                                    helperText
                                    sx={{ width: '100%', m: 1 }}
                                />
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                        <Button sx={{ m: 2 }} variant="contained" onClick={login}>login</Button>
                        {/* <Button variant="contained" onClick={logout}>logout</Button> */}
                    </Paper>
                </Box>
            </div>
        </React.Fragment>

    )
}