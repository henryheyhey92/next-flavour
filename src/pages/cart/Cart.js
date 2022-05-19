import React, { useEffect, useState, useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import axios from 'axios';
// import { Card, Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { headers } from '../../constant/Constants';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant/Constants';
import { Row, Card, Button, Container, Col, Table } from 'react-bootstrap';



// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function Cart() {
    let context = useContext(UsersContext);
    let navigate = new useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [addItem, setAddItem] = useState();
    const [substractItem, setSubtractItem] = useState();
    const [removeCartItem, setRemoveItem] = useState();
    const [qty, setItemQuantity] = useState({
        quantity: ""
    });
    // const [stripKeys, setStripeKey] = useSate({
    //     'sessionId': "", // 4. Get the ID of the session
    //     'publishableKey': ""
    // })
    // const userId = localStorage.getItem('userId');

    //api for get shopping cart item
    useEffect(() => {
        console.log("userId");
        console.log(localStorage.getItem('userId'))
        const fetchCartItems = async () => {
            let response = await axios.get(BASE_URL + "api/shoppingCart/" + localStorage.getItem('userId'));
            console.log(response.data);
            setCartItems(response.data);
        }
        fetchCartItems();

    }, [removeCartItem, addItem, substractItem]);

    useEffect(() => {
        console.log(removeCartItem);
    }, [removeCartItem]);

    const onUpdateFormField = (e) => setItemQuantity({
        ...qty,
        [e.target.name]: e.target.value
    })

    // decrease cart quantity api
    const decreaseQty = async (product_id) => {
        setSubtractItem();
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        console.log("is access token");
        console.log(accessTokenNotExpired);
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': product_id
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/substract", requestBodyData, { headers });
            setSubtractItem(response.data);
        } else {
            //need to prom for get new access token or ask user to sign in
            console.log("get new access token")
            let result = await context.getRefreshToken();
            if (result) {
                console.log("call add to cart")
                decreaseQty(product_id);
            }

        }
    }
    //increase cart quantity api
    const increaseQty = async (product_id) => {
        setAddItem();
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        console.log("is access token");
        console.log(accessTokenNotExpired);
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': product_id
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, { headers });
            setAddItem(response.data);
        } else {
            //need to prom for get new access token or ask user to sign in
            console.log("get new access token")
            let result = await context.getRefreshToken();
            if (result) {
                console.log("call add to cart")
                increaseQty(product_id);
            }

        }
    }

    const removeItemFromCart = async (removeItem) => {
        setRemoveItem()
        const requestBodyData = {
            "user_id": removeItem.user_id,
            "product_id": removeItem.product_id,
            "cart_quantity": removeItem.quantity
        }
        let response = await axios.post(BASE_URL + "api/shoppingCart/remove/item", requestBodyData, { headers });
        setRemoveItem(response.data);
    }

    const checkoutFromCart = async () => {
        const requestBodyData = {
            "user_id": localStorage.getItem('userId')
        }
        const headers = {
            'Authorization': "Bearer " + localStorage.getItem("accessToken")
        }
        console.log("Enter check out front function");
        console.log("user_id");
        console.log(requestBodyData);
        let response = await axios.get(BASE_URL + "api/checkout/" + localStorage.getItem('userId'), { headers });
        context.setStripeKey(response.data);
        if (response.data) {
            navigate('/Checkout');
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Button className='mt-2 mb-2'
                    style={{ width: '100%' }}
                    variant="primary"
                    onClick={() => { checkoutFromCart() }}>
                    check out
                </Button>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>added quantity</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {cartItems.map((e, i) => {
                               return <td key={i}>{e.product.product_name}</td>
                            })}
                        </tr>
                        <tr>
                            <td>2</td>
                            {cartItems.map((e, i) => {
                               return <td key={i}>{e.product.quantity}</td>
                            })}
                        </tr>
                        <tr>
                            <td>3</td>
                            {cartItems.map((e, i) => {
                               return <td key={i}>{parseInt(e.product.quantity) * (parseInt(e.product.price)/100)}</td>
                            })}
                        </tr>
                    </tbody>
                </Table>
            </Container>

            {(cartItems.length !== 0) ? cartItems.map((e, i) => {
                return (
                    <Container>
                        <Card style={{ width: 'auto', }} className="justify-content-center">
                            <Card.Img variant="top" src={e.product.image_url} />
                            <Card.Body>
                                <Card.Title>{e.product.product_name}</Card.Title>
                                <Card.Text>
                                    inventory stock: {e.product.qty}
                                </Card.Text>
                            </Card.Body>
                            <Row>
                                <Col xs={6}>
                                    <Row>
                                        <Col xs={4} className="">
                                            <Button
                                                variant="primary"
                                                onClick={() => { decreaseQty(e.product_id) }}>-</Button>
                                        </Col>
                                        <Col xs={4}>
                                            <Card.Text
                                                name="quantity"
                                                value={e.quantity}
                                                onChange={onUpdateFormField}>
                                                {e.quantity}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={4}>
                                            <Button
                                                variant="primary"
                                                onClick={() => { increaseQty(e.product_id) }}>+</Button>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={6}>
                                    <Button variant="primary" value={e} onClick={() => { removeItemFromCart(e) }}>Remove item</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                )
            }) : <h1>Loading...</h1>}
        </React.Fragment>

    )
}