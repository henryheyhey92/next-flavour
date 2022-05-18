import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import './App.css';
import UsersContext from './contexts/UsersContext';

export default function NavbarBootStrap(props) {
    let context = useContext(UsersContext);
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className='title-name'>Next Flavour</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="navbar-element" href="/">Products</Nav.Link>
                            {/* <Nav.Link className="navbar-element" href="#pricing">About Us</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {context.loginStatus() ? 
                            <Nav.Link className="navbar-element" 
                                        href="/"
                                        onClick={() => {
                                            context.logout()
                                        }}>Logout</Nav.Link> :
                            <Nav.Link className="navbar-element" href="/login">Login</Nav.Link>}
                            
                            <Nav.Link className="navbar-element" href="/cart">
                                <i class="fa-solid fa-cart-shopping"></i>
                                </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}