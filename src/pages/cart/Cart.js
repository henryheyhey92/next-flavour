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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { headers } from '../../constant/Constants';
const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [removeCartItem, setRemoveItem] = useState();
    const [qty, setItemQuantity] = useState({
        quantity: ""
    });
    const userId = localStorage.getItem('userId');

    //api for get shopping cart item
    useEffect(() => {
        const fetchCartItems = async () => {
            let response = await axios.get(BASE_URL + "api/shoppingCart/" + localStorage.getItem('userId'));
            console.log(response.data);
            setCartItems(response.data);
        }
        fetchCartItems();

    }, [removeCartItem]);

    //api for update shopping cart item


    //api for remove shopping cart item



    useEffect(() => {
        console.log(removeCartItem);
    }, [removeCartItem]);

    const onUpdateFormField = (e) => setItemQuantity({
        ...qty,
        [e.target.name]: e.target.value
    })

    const decreaseQty = () =>{

    }

    const increaseQty = () => {

    }

    const removeItemFromCart = async (removeItem) => {
        setRemoveItem()
        console.log("Remove item")
        console.log(removeItem);
        const requestBodyData = {
            "user_id": removeItem.user_id,
            "product_id": removeItem.product_id,
            "cart_quantity": removeItem.quantity
        }
        let response = await axios.post(BASE_URL + "api/shoppingCart/remove/item", requestBodyData, { headers });
        setRemoveItem(response.data);
    }

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
                            <CardContent sx={{ height: 200 }} key={e.product.product_name}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {e.product.product_name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    inventory stock: {e.product.qty}
                                </Typography>
                                <Box sx={{ display: 'inline-flex' , m: 3}}>
                                    <Button sx={{ mr: 1 }}
                                        variant="contained"
                                        size="small"
                                        onClick={decreaseQty}>-</Button>
                                    <TextField id="outlined-basic"
                                        label="Outlined"
                                        variant="outlined"
                                        size="small"
                                        name="quantity"
                                        value={e.quantity}
                                        onChange={onUpdateFormField}
                                    />
                                    <Button sx={{ ml: 1 }}
                                        variant="contained"
                                        size="small"
                                        onClick={increaseQty}>+</Button>
                                </Box>
                                <Typography sx={{ m: 2 }} variant="body2" color="text.secondary" component="div">
                                    {e.product.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ mt: 2 }} key={e.price}>
                                <Button variant="contained" size="small" value={e} onClick={() => {removeItemFromCart(e)}}>Remove item</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) : <h1>Loading...</h1>}
        </React.Fragment>

    )
}