import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Card, Button, Container, ListGroup, Spinner, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../constant/Constants';
import './style.css'
import UsersContext from '../../contexts/UsersContext';


// const BASE_URL = "https://3000-henryheyhey-espressoexp-1blfs1n110r.ws-us45.gitpod.io/"


export default function Orders() {
    // const params = useParams();
    let context = useContext(UsersContext);
    let user_id = null;
    user_id = localStorage.getItem('userId');
    const [userOrdersDetails, setUserOrdersDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            let response = await axios.get(BASE_URL + 'api/orders/result/' + user_id);
            setUserOrdersDetails(response.data);
            console.log("user order ")
            console.log(response.data);
        }
        fetchOrderDetails();
    }, [context.getOrderState(), user_id])

    //for progress 
    const progressInstance = (status_id) => {
        let now = 0;
        let progressLabel = ""
        if (status_id === 1) {
            now = 25;
            progressLabel = "paid"
        } else if (status_id === 2) {
            now = 50;
            progressLabel = "processing"
        } else if (status_id === 3) {
            now = 75;
            progressLabel = "shipped"
        } else {
            now = 100;
            progressLabel = "completed"
        }
        return (status_id ? <ProgressBar now={now} label={`${progressLabel}`} /> : <h1>loading</h1>)
    }

    return (
        <React.Fragment>
            <h1 className='product-detail'>Order Details</h1>
            <Container>
                {userOrdersDetails ? userOrdersDetails.map((item, i) => {
                    return (
                        <Card key={i} className="p-2">
                            <>
                                {['sm'].map((breakpoint) => (
                                    <ListGroup key={breakpoint} horizontal={breakpoint} className="my-2">
                                        <ListGroup.Item>product name: {item.product_name}</ListGroup.Item>
                                        <ListGroup.Item>order date: {item.order_date}</ListGroup.Item>
                                        <ListGroup.Item>quantity: {item.quantity}</ListGroup.Item>
                                        <ListGroup.Item>shipping address: {item.shipping_address}</ListGroup.Item>
                                    </ListGroup>
                                ))}
                            </>
                            <div>Item status:</div>
                            {progressInstance(item.status_id)}
                        </Card>

                    )
                }) :
                    
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>}


            </Container>
        </React.Fragment>
    )
}