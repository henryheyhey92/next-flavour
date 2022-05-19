import React from "react";
import { Card, Container } from 'react-bootstrap';
import './style.css';

export default function StripePaymentSuccess() {

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-5 background-image">
        <Container>
          <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Payment Success</Card.Title>
                <Card.Text>
                  Hey, ! Thank you for purchasing coffee bean from us! Your payment has been confirmed. For more information please click on the order tab or the link below
                </Card.Text>
                <Card.Link href="/order">Link to review your order</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}