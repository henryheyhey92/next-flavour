import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Row, Card, Button, Container, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../constant/Constants';
import './style.css'
import UsersContext from '../../contexts/UsersContext';


// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function ProductDetails() {
    const params = useParams();
    let productId = params.productId
    let context = useContext(UsersContext);
    const [productDetails, setProductDetails] = useState({});
    // const context = useContext(UsersContext);

    useEffect(() => {
        const fetchProductDetails = async () => {
            console.log("Calling fetch product details")
            let response = await axios.get(BASE_URL + 'api/products/getId/' + productId);
            setProductDetails(response.data);
            console.log(response.data);
        }
        fetchProductDetails();
    }, [productId])


    useEffect(() => {
        console.log(productId);
    }, [productId]);


    //for add to cart 
    const addToCart = async (e) => {
        //Check if access token is expired or not
        // true => your token is expired
        // false => your token is not expired  
        console.log("value of e");
        console.log(e.target.value);
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
         await axios.post(BASE_URL + 'api/shoppingCart/additem', requestBodyData, { headers });
        } else {
            //need to prom for get new access token or ask user to sign in
            let result = await context.getRefreshToken();
            if (result) {
                addToCart(e);
            }

        }
    }

    return (
        <React.Fragment>
            <h1 className='product-detail'>Product Details</h1>
            <Container>
                <Row >
                    <Col sm={12} md={6}>
                        <Card className=''>
                            <Card.Img className="mt-2" variant="top" src={productDetails.image_url} />
                            <Card.Body>
                                <Card.Text className="lead fs-5 justify-content-center" >
                                    {productDetails.product_name}
                                    <Card.Subtitle className="mb-2 text-muted"> 
                                    ${parseInt(productDetails.price) / 100}
                                    </Card.Subtitle>
                                </Card.Text>
                            </Card.Body>
                            <Button variant="light" 
                                    className="lead fs-5 rounded-0 list-tag"
                                    value={productId}
                                    onClick={addToCart}>Add to Cart</Button>
                        </Card>
                    </Col>

                    <Col>
                        {/* this is for populating cert */}
                        <Card className='m-2'>
                            <Card.Body>
                                <div className='m-1'>Certificates :</div>
                                <ListGroup horizontal>       
                                    {productDetails.certificates? productDetails.certificates.map((cert, i) => {
                                        return (<ListGroup.Item key={i}>{cert.name}</ListGroup.Item>)
                                    }) : "Loading"}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card className='m-2'>
                            <Card.Body>
                                <div className='m-1'>Country :</div>
                                <ListGroup horizontal>
                                    {productDetails.origins ? productDetails.origins.map((ori, i) => {
                                        return (<ListGroup.Item key={i}>{ori.country_name}</ListGroup.Item>)
                                    }) : "Loading"}
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        <Card className='m-2'>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Product description</Card.Subtitle>
                                <Card.Text>
                                    {productDetails.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </React.Fragment>
    )
}