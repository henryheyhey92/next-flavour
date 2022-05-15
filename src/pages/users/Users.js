import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import UsersContext from '../../contexts/UsersContext';


const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"

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
    }, [userInfo]);
    

    const login = async () => {
        let result = await context.login(userInfo.email, userInfo.password);
        console.log(result);
        setLogin(true);
        if(result){
            navigate('/Profile')
        }
    }
        


    const logout = async () => {
        let result = await context.logout()
        console.log(result);
        setLogin(false);
    }


    return (
        <React.Fragment>
            <h1>Users Login page</h1>
            <Box
                sx={{
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWdith: "sx"
                }}
            >
                <TextField id="url-name"
                    label="Email"
                    variant="outlined"
                    name='email'
                    value={userInfo.email}
                    onChange={onUpdateFormField}
                    className="textfield-image-url"
                    helperText
                />

                <TextField id="Artwork-name"
                    label="Password"
                    variant="outlined"
                    name='password'
                    value={userInfo.password}
                    onChange={onUpdateFormField}
                    className="textfield-style"
                    type="text"
                    helperText
                />
            </Box>
            <Button onClick={login}>login</Button>
            <Button onClick={logout}>logout</Button>
        </React.Fragment>

    )
}