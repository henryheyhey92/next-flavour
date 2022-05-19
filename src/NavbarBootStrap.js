import React, { useContext } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import './App.css';
import UsersContext from './contexts/UsersContext';

export default function NavbarBootStrap() {
    let context = useContext(UsersContext);


    const Logout = () =>{
        context.logout()
    }
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className='title-name'>Next Flavour</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="dark" className="navbar-element" href="/">Products</Button>
                            {/* <Nav.Link className="navbar-element" href="#pricing">About Us</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {context.loginStatus() ? 
                            <Button  variant="dark"
                                        href="/Profile"
                                        className="navbar-element"
                                        onClick={Logout}>Logout</Button> :
                            <Nav.Link className="navbar-element" href="/login">Login</Nav.Link>}
                            
                            <Button variant="dark" className="navbar-element" href="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}