import React, { useState } from 'react'
import UsersContext from './UsersContext'
import axios from 'axios';

const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"

export default function UsersProvider(props) {
   
    const [userProfile, setUserProfile] = useState({});
    const [logIn, setLogIn] = useState(false);

    const context = {
        login: async (email, password) => {
            console.log("it works");
            let response = await axios.post(BASE_URL + "api/users/login", {
                "email": email,
                "password": password
            })
            if (response.data) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setLogIn(true);
                console.log("response data")
                console.log(response.data)
                return true;
            } else {
                setLogIn(false);
                return false;
            }


        },

        profile: async () => {
            let response = await axios.get(BASE_URL + "api/users/profile", {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("accessToken")
                }
            })
            if (response.data) {
                setUserProfile(response.data);
                return response.data;
            } else {
                setUserProfile({})
                return false;
            }

        },

        logout: async () => {
            let data = {
                'refreshToken': localStorage.getItem('refreshToken')
            }
            console.log(data);
            if (data) {
                let response = await axios.post(BASE_URL + "api/users/logout", data)
                if (response.data) {
                    setLogIn(false);
                    setUserProfile({});
                    localStorage.clear()
                    return true; //logout success
                }
            }else{
                return false; //no refresh token
            }

        }

    }

    return <UsersContext.Provider value={context}>
        {props.children}
    </UsersContext.Provider>

}