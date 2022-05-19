import React, { useEffect, useState, useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import axios from 'axios';
// import { headers } from '../../constant/Constants';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant/Constants';
import { Row, Card, Button, Container, Col, ListGroup, Badge } from 'react-bootstrap';



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
    const [subTotal, setSubTotal] = useState(0)
   
    useEffect(() => {
        let sum = 0;
        console.log("userId");
        console.log(localStorage.getItem('userId'))
        const fetchCartItems = async () => {
            let response = await axios.get(BASE_URL + "api/shoppingCart/" + localStorage.getItem('userId'));
            console.log(response.data);
            setCartItems(response.data);
            for (let item of cartItems) {
                sum += (item.quantity * item.product.price) / 100
            }
            setSubTotal(sum);
        }
        fetchCartItems();

    }, [removeCartItem, addItem, substractItem, subTotal]);

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
            const headers = {
                'Authorization': "Bearer " + localStorage.getItem("accessToken")
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/substract", requestBodyData, { headers });
            console.log("subtract changes")
            console.log(response.data)

            setSubtractItem(response.data);
            setTimeout(function() { //Start the timer
                setSubtractItem(false) //After 1 second, set to false
            }.bind(this), 1500)
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
            setTimeout(function() { //Start the timer
                setAddItem(false) //After 1 second, set to false
            }.bind(this), 1500)
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
        setTimeout(function() { //Start the timer
            setRemoveItem(false) //After 1 second, set to false
        }.bind(this), 1000)
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
            <Container>

                {/* for price listing */}
                <Card className='m-2'>
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
                                <Button className='mt-2 mb-2'
                                    // style={{ width: '100%' }}
                                    variant="primary"
                                    onClick={() => { checkoutFromCart() }}>
                                    check out
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

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