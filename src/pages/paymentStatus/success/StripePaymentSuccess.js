import React from "react";
import { Row, Card, Button, Container, Col, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";


export default function StripePaymentSuccess() {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <Container>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Payment Success</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Hey, ! Thank you for purchasing coffee bean from us! Your payment has been confirmed. For more information please click on the order tab or the link below
            </Card.Text>
            <Card.Link href="/order">Link to review your order</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
}