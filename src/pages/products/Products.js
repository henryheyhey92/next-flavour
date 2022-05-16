import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
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
        let accessToken = localStorage.getItem("accessToken");
        let accessTokenNotExpired = await context.checkIfAccessTokenIsExpired();
        if (!accessTokenNotExpired) {
            //call the profile api or cart 
            const headers = {
                'Authorization': "Bearer " + accessToken
            }
            const requestBodyData = {
                "user_id": localStorage.getItem('userId'),
                'product_id': e.target.value
            }
            let response = await axios.post(BASE_URL + 'api/shoppingCart/additem', requestBodyData, { headers });

            console.log("check add cart result whether is true");
            console.log(response.data);
        } else {
            //need to prom for get new access token or ask user to sign in
            console.log("get new access token")
            let result = await context.getRefreshToken();
            if (result) {
                console.log("call add to cart")
                addToCart(e);
            }

        }
    }

    return (
        <React.Fragment>
            <Typography className="lead fs-2" sx={{ml: 2}}>Coffee Bean Products</Typography>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', m:2 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Row xs={1} md={3} className="g-3">
                {product.map((p, idx) => (
                    <Col>
                        <Card className="rounded-0" key={p.id}>
                            <Link to={"/" + p.id} className="text-decoration-none text-reset">
                                <Card.Img className="rounded-0" variant="top" src={p.image_url} key={p.image_url} />
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