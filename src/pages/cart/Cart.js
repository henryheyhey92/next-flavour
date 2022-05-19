import React, { useEffect, useState, useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import axios from 'axios';
// import { headers } from '../../constant/Constants';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant/Constants';
import { Row, Card, Container, Col, ListGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import './style.css';


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
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        let sum = 0;
        const fetchCartItems = async () => {
            let response = await axios.get(BASE_URL + "api/shoppingCart/" + localStorage.getItem('userId'));
            setCartItems(response.data);
            for (let item of cartItems) {
                sum += (item.quantity * item.product.price) / 100
            }
            setSubTotal(sum);
        }
        fetchCartItems();

    }, [removeCartItem, addItem, substractItem, subTotal, cartItems]);

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
            const headers = {
                'Authorization': "Bearer " + localStorage.getItem("accessToken")
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/substract", requestBodyData, { headers });
            console.log("subtract changes")
            console.log(response.data)

            setSubtractItem(response.data);
            setTimeout(function () { //Start the timer
                setSubtractItem(false) //After 1 second, set to false
            }, 500)
        } else {
            //need to prom for get new access token or ask user to sign in
            let result = await context.getRefreshToken();
            if (result) {
                decreaseQty(product_id);
            }

        }
    }
    //increase cart quantity api
    const increaseQty = async (product_id) => {
        setAddItem();
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': product_id
            }
            const headers = {
                'Authorization': "Bearer " + localStorage.getItem("accessToken")
            }
            console.log("At here headers");
            console.log(headers);
            let response = await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, { headers });
            setAddItem(response.data);
            setTimeout(function () { //Start the timer
                setAddItem(false) //After 1 second, set to false
            }, 500)
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
        const headers = {
            'Authorization': "Bearer " + localStorage.getItem("accessToken")
        }
        let response = await axios.post(BASE_URL + "api/shoppingCart/remove/item", requestBodyData, { headers });
        setRemoveItem(response.data);
        setTimeout(function () { //Start the timer
            setRemoveItem(false) //After 1 second, set to false
        }, 500)
    }

    const checkoutFromCart = async () => {

        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        if (!accessTokenNotExpired) {
            const requestBodyData = {
                "user_id": localStorage.getItem('userId')
            }
            const headers = {
                'Authorization': "Bearer " + localStorage.getItem("accessToken")
            }
            console.log(requestBodyData);
            let response = await axios.get(BASE_URL + "api/checkout/" + localStorage.getItem('userId'), { headers });
            context.setStripeKey(response.data);
            if (response.data) {
                navigate('/Checkout');
            }
        } else {
            //need to prom for get new access token or ask user to sign in
            console.log("get new access token")
            let result = await context.getRefreshToken();
            if (result) {
                checkoutFromCart();
            }

        }


    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card className='m-2'>
                            <h1 className='title-name'>Summary</h1>
                            <Card.Body >
                                <ListGroup as="ol" numbered>
                                    {cartItems.map((e, i) => {
                                        return <ListGroup.Item
                                            key={i}
                                            as="li"
                                            className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{e.product.product_name}</div>
                                                S$({e.product.price / 100})
                                            </div>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Qty</div>
                                                x {e.quantity}
                                            </div>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Total</div>
                                                S${(e.product.price * e.quantity) / 100}
                                            </div>
                                        </ListGroup.Item>
                                    })}
                                </ListGroup>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between flex-row-reverse">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Cart total</div>
                                            S$({subTotal})
                                        </div>
                                        <Button className='mt-2 mb-2 btn-dark btn-lg'
                                            variant="outlined"
                                            onClick={() => { checkoutFromCart() }}>
                                            check out
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row >
                            {(cartItems.length !== 0) ? cartItems.map((e, i) => {
                                return (
                                    <Col xs={12} md={4} >
                                        <Card style={{ width: '18rem' }} className="m-2">
                                            <Card.Img variant="top" src={e.product.image_url} />
                                            <Card.Body>
                                                <Card.Title>{e.product.product_name}</Card.Title>
                                                <Card.Text>
                                                    inventory stock: {e.product.qty}
                                                </Card.Text>
                                            </Card.Body>
                                            <div className='d-flex justify-content-around '>
                                                <Button
                                                    variant="outlined"
                                                    className='btn-dark btn list-tag'
                                                    onClick={() => { decreaseQty(e.product_id) }}>
                                                    --
                                                </Button>
                                                <Button

                                                    className='btn-outline-dark btn'
                                                    name="quantity"
                                                    value={e.quantity}
                                                    onChange={onUpdateFormField}>
                                                    {e.quantity}

                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    style={{ width: '2rem' }}
                                                    className='btn-dark btn-lg list-tag'
                                                    onClick={() => { increaseQty(e.product_id) }}>+</Button>
                                            </div>
                                            <Button className='btn btn-outline-dark' value={e} onClick={() => { removeItemFromCart(e) }}>Remove item</Button>
                                        </Card>
                                    </Col>
                                )
                            }) : <h1>Loading...</h1>}
                        </Row>
                    </Col>
                </Row>



            </Container>


        </React.Fragment>

    )
}