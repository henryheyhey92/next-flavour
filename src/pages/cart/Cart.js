import React, { useEffect, useState } from 'react';
import UsersContext from '../../contexts/UsersContext';
import API_URL from '../../constant/Constants';
import axios from 'axios';
// import { Card, Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [testItem, setTestItem] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCartItems = async () => {
            let response = await axios.get(BASE_URL + "api/shoppingCart/" + localStorage.getItem('userId'));
            console.log(response.data);
            setCartItems(response.data);
        }
        fetchCartItems();

    }, []);

    useEffect(() => {
        console.log(cartItems.length);
        setTestItem(cartItems);
    }, [cartItems]);

    return (
        <React.Fragment>
            {(cartItems.length !== 0) ? cartItems.map(e => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={e.id}>
                        {/* <div><CardView sx={{m: 2}} data={e}/></div> */}
                        <Card sx={{ minWidth: 225, m: 2 }} >
                            <CardMedia
                                component="img"
                                sx={{ objectFit: "contain", height: 100, width: 100 }}
                                image={e.product.image_url}
                                alt="green iguana" />
                            <CardContent sx={{ height: 100 }} key={e.product.product_name}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {e.product.product_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {e.description}
                                </Typography>
                            </CardContent>
                            <CardActions key={e.price}>
                                <Button size="small">Update quantity</Button>
                                <Button size="small">Remove item</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) : <h1>Loading...</h1>}
        </React.Fragment>

    )
}