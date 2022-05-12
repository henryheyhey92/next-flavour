import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import UsersContext from '../../contexts/UsersContext';
import axios from 'axios';

const BASE_URL = "https://3001-henryheyhey-espressoexp-1blfs1n110r.ws-us44.gitpod.io/"


export default function ProductDetails() {
    const params = useParams();
    const productId = params.productId
    const [productDetails, setProductDetails] = useState({});
    const context = useContext(UsersContext);

    useEffect(() => {
        const fetchProductDetails = async () => {
            let response = await axios.get(BASE_URL + 'api/products/' + productId);
            setProductDetails(response.data);
            console.log(response.data);
        }
        fetchProductDetails();
    }, [productId])

    return (
        <React.Fragment>
            <h1>Product individual Details</h1>
            <Row className="g-3 m-5">
                <Card className="rounded-0">
                    <Card.Img className="rounded-0" variant="top" src={productDetails.image_url} />
                    <Card.Body>
                        <Card.Text className="lead fs-5" >
                            {productDetails.product_name} ({productDetails.description})
                            ${productDetails.price}
                        </Card.Text>
                    </Card.Body>
                    <Button variant="dark" className="lead fs-5 rounded-0">Add to Cart</Button>
                </Card>

            </Row>

        </React.Fragment>
    )
}