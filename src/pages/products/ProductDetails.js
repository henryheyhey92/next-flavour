import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Row, Card, Button, Container, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../constant/Constants';
import './style.css'


// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function ProductDetails() {
    const params = useParams();
    const productId = params.productId
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

    return (
        <React.Fragment>
            <h1 className='product-detail'>Product individual Details</h1>
            <Container>
                <Row >
                    <Col sm={12} md={6}>
                        <Card className=''>
                            <Card.Img className="mt-2" variant="top" src={productDetails.image_url} />
                            <Card.Body>
                                <Card.Text className="lead fs-5" >
                                    {productDetails.product_name}
                                    ${parseInt(productDetails.price) / 100}
                                </Card.Text>
                            </Card.Body>
                            <Button variant="light" className="lead fs-5 rounded-0 list-tag">Add to Cart</Button>
                        </Card>
                    </Col>

                    <Col>
                        {/* this is for populating cert */}
                        <Card className='m-2'>
                            <Card.Body>
                                <div className='m-1'>Certificates :</div>
                                <ListGroup horizontal>
                                    {productDetails.certificates.map((cert, i) => {
                                        return (<ListGroup.Item key={i}>{cert.name}</ListGroup.Item>)
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card className='m-2'>
                            <Card.Body>
                                <div className='m-1'>Country :</div>
                                <ListGroup horizontal>
                                    {productDetails.origins.map((ori, i) => {
                                        return (<ListGroup.Item key={i}>{ori.country_name}</ListGroup.Item>)
                                    })}
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