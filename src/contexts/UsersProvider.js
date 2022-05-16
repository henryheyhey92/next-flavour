import React, { useState } from 'react'
import UsersContext from './UsersContext'
import axios from 'axios';
import { isExpired, decodeToken } from "react-jwt";

const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"

export default function UsersProvider(props) {
   
    const [userProfile, setUserProfile] = useState({});
    const [logIn, setLogIn] = useState(false);
    const [product, setProduct] = useState([]);
    const [addItem, setItem] = useState([]);  //for add to cart

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
                localStorage.setItem('userId', response.data.userId)
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
                console.log("post request to logout")
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

        },
        product: async () => {
            let response = await axios.get(BASE_URL + 'api/products');
            setProduct(response.data);
            if(response.data){
                return response.data
            }
        },
        //addItem to cart
        addToCart: async (itemId) => {
            const headers = {
                'Authorization': "Bearer" + " " + localStorage.getItem("accessToken")
            }
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': itemId
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, { headers });

            setItem(response.data);
            if(response.data){
                return response.data
            }else{
                //return no response data
                return false
            }

        },
        checkIfAccessTokenIsExpired: async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(!accessToken){
                //no accessToken return true
                return true;
            }
            try{
                console.log("Enter try block for check if access token is expired")
                // true => your token is expired
                // false => your token is not expired
                const isMyTokenExpired = isExpired(accessToken);
                console.log("token is it valid");
                console.log(isMyTokenExpired);
                console.log(accessToken);
                return isMyTokenExpired;
            }catch(err){
                console.log(err)
            }
        },
        checkIfRefreshTokenIsExpired: async () =>{
            const refreshToken = localStorage.getItem('refreshToken');
            if(!refreshToken){
                //no refreshToken return true
                return true;
            }
            try{
                console.log("Enter try block to check if refresh token is expired")
                const isMyRefreshTokenExpired = isExpired(refreshToken);
                // true => your token is expired
                // false => your token is not expired
                return isMyRefreshTokenExpired;
            }catch(err){
                console.log(err)
            }
        },
        getRefreshToken: async () => {
            const requestBody = {
                "refreshToken": localStorage.getItem('refreshToken')
            }
                let newAccessToken = await axios.post(BASE_URL + "api/users/refresh", requestBody)
            if(newAccessToken){
                localStorage.setItem('accessToken', newAccessToken.data.accessToken)
                return true;
            }else{
                //return false when no new access token
                return false
            }
            
        }

    }

    return <UsersContext.Provider value={context}>
        {props.children}
    </UsersContext.Provider>

}