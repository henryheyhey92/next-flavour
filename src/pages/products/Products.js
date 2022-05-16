import React, { useContext, useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import UsersContext from '../../contexts/UsersContext';
import { BASE_URL } from '../../constant/Constants';

// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"

export default function Products() {

    //state
    const [product, setProduct] = useState([]);
    let context = useContext(UsersContext);
    //componment didmout
    useEffect(() => {
        const fetchProduct = async () => {
            let response = await axios.get(BASE_URL + 'api/products');
            setProduct(response.data);
            console.log(response.data);
        }
        fetchProduct()
    }, [])

    useEffect(() => {

    })

    const addToCart = async (e) => {
        //Check if access token is expired or not
        // true => your token is expired
        // false => your token is not expired  
        
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const headers = {
                'Authorization': "Bearer" + " " + localStorage.getItem("accessToken")
            }
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': e.target.value
            }
            let response = await axios.post(BASE_URL + "api/shoppingCart/additem", requestBodyData, { headers });

            console.log("check add cart result whether is true");
            console.log(response.data);
        } else {
            //need to prom for get new access token or ask user to sign in
            console.log("get new access token")
           let result = await context.getRefreshToken();
           if(result){
               console.log("call add to cart")
               addToCart(e);
           }

        }
    }

    return (
        <React.Fragment>
            <h1>Product details</h1>
            <p className="lead fs-2">Coffee Bean</p>

            <Row xs={1} md={3} className="g-3">
                {product.map((p, idx) => (
                    <Col>
                        <Card className="rounded-0" key={p.id}>
                            <Link to={"/" + p.id} className="text-decoration-none text-reset">
                                <Card.Img className="rounded-0" variant="top" src={p.image_url} key={p.image_url}/>
                                <Card.Body key={p.product_name}>
                                    <Card.Text className="lead fs-5" >
                                        {p.product_name} ({p.description})
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                            <Button variant="dark"
                                className="lead fs-5 rounded-0"
                                value={p.id}
                                onClick={addToCart}
                            >Add to Cart</Button>
                        </Card>
                    </Col>
                ))}
            </Row>

        </React.Fragment>

    )
}