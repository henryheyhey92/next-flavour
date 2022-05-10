import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"

let accessToken = null;
let refreshToken = null;

export default function Users() {
    const navigate = new useNavigate;
    const [userInfo, setUser] = useState({
        email: "",
        password: ""
    })
    const [response, setResponse] = useState(null);

    const onUpdateFormField = (e) => setUser({
        ...userInfo,
        [e.target.name]: e.target.value
    })


    // useEffect(() => { }, [response])

    const login = async () => {
        console.log("works")
        let data = {
            "email": userInfo.email,
            "password": userInfo.password
        }
        let response = await axios.post(BASE_URL + "api/users/login", data);
        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
        navigate("/Profile");  //it will navigate to the profile page
        // setResponse(result);
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
            {/* <Routes>
                <Route path="/Profile" element={<Profile />} />
            </Routes> */}
        </React.Fragment>

    )
}