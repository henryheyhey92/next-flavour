import React, { useEffect, useState } from 'react'
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

const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"

export default function Products() {

    //state
    const [product, setProduct] = useState([]);

    //componment didmout
    useEffect(() => {
        const fetchProduct = async () => {
            let response = await axios.get(BASE_URL + 'api/products');
            setProduct(response.data);
            console.log(response.data);
        }
        fetchProduct()
    }, [])


    return (
        <React.Fragment>
            <h1>Product details</h1>
            <p className="lead fs-2">Coffee Bean</p>

            <Row xs={1} md={3} className="g-3">
                {product.map((p, idx) => (
                    <Col>
                        <Card className="rounded-0">
                            {/* <Link to={"/products/" + p.id} className="text-decoration-none text-reset"> */}
                                <Card.Img className="rounded-0" variant="top" src={p.image_url} />
                                <Card.Body>
                                    <Card.Text className="lead fs-5" >
                                        {p.product_name} ({p.description})
                                    </Card.Text>
                                </Card.Body>
                            {/* </Link> */}
                            <><Button variant="dark" className="lead fs-5 rounded-0">Add to Cart</Button>{' '}</>
                        </Card>
                    </Col>
                ))}
            </Row>

        </React.Fragment>

    )
}