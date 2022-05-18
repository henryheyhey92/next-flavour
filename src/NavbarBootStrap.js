import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './App.css';

export default function NavbarBootStrap(props) {
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className='title-name'>Next Flavour</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="#pricing">About Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Login</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}