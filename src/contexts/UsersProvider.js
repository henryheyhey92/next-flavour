import React, { useState } from 'react'
import UsersContext from './UsersContext'
import axios from 'axios';
import { isExpired } from "react-jwt";
import { BASE_URL } from '../constant/Constants';


export default function UsersProvider(props) {

    // const [userProfile, setUserProfile] = useState({});
    // const [logIn, setLogIn] = useState(false);
    // const [product, setProduct] = useState([]);
    // const [addItem, setItem] = useState([]);  //for add to cart
    const [stripeKey, setStripeKey] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [turnOrderOn, setOrderState] = useState(false);

    const context = {
        setLoginState: (toggle) => {
            setLoginStatus(toggle);
        },
        loginStatus: () => {
            return loginStatus;
        },
        profile: async () => {

            if (loginStatus) {
                const token = localStorage.getItem("accessToken")
                let response = await axios.get(BASE_URL + "api/users/profile", {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.data) {
                    return response.data;
                } else {
                    // setUserProfile({})
                    return false;
                }
            }else{
                return false;
            }


        },

        logout: async () => {
            let data = {
                'refreshToken': localStorage.getItem('refreshToken')
            }
            console.log("logout context function")
            console.log(data);
            if (data) {
                console.log("post request to logout")
                let response = await axios.post(BASE_URL + "api/users/logout", data)
                if (response.data) {
                    setLoginStatus(false);
                    // setUserProfile({});
                    localStorage.clear();
                    console.log()
                    // return true; //logout success
                }
            } else {
                return false; //no refresh token
            }

        },
        product: async () => {
            let response = await axios.get(BASE_URL + 'api/products');
            // setProduct(response.data);
            if (response.data) {
                return response.data
            }
        },
        //addItem to cart
        addToCart: async (itemId) => {
            const headers = {
                'Authorization': "Bearer " + localStorage.getItem("accessToken")
            }
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': itemId
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, { headers });

            // setItem(response.data);
            if (response.data) {
                return response.data
            } else {
                //return no response data
                return false
            }

        },
        checkIfAccessTokenIsExpired: async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                //no accessToken return true
                return true;
            }
            try {
                console.log("Enter try block for check if access token is expired")
                // true => your token is expired
                // false => your token is not expired
                const isMyTokenExpired = isExpired(accessToken);
                console.log("token is it valid");
                console.log(isMyTokenExpired);
                console.log(accessToken);
                return isMyTokenExpired;
            } catch (err) {
                console.log(err)
            }
        },
        checkIfRefreshTokenIsExpired: async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                //no refreshToken return true
                return true;
            }
            try {
                console.log("Enter try block to check if refresh token is expired")
                const isMyRefreshTokenExpired = isExpired(refreshToken);
                // true => your token is expired
                // false => your token is not expired
                return isMyRefreshTokenExpired;
            } catch (err) {
                console.log(err)
            }
        },
        getRefreshToken: async () => {
            const requestBody = {
                "refreshToken": localStorage.getItem('refreshToken')
            }
            let newAccessToken = await axios.post(BASE_URL + "api/users/refresh", requestBody)
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken.data.accessToken)
                return true;
            } else {
                //return false when no new access token
                return false
            }

        },
        setStripeKey: (keys) => {
            setStripeKey(keys);
        },
        getStripKey: () => {
            return stripeKey;
        },
        //search by text
        searchByText: async (reqboyObj) => {
            let response = await axios.get(BASE_URL + 'api/products/search/text', reqboyObj);
            return response
        },
        setOrderState: (state) => {
            setOrderState(state);
        },
        getOrderState: () => {
            return turnOrderOn
        }

    }

    return <UsersContext.Provider value={context}>
        {props.children}
    </UsersContext.Provider>

}