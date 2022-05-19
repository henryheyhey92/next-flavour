import React, { useContext } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './App.css';
import UsersContext from './contexts/UsersContext';

export default function NavbarBootStrap() {
    let context = useContext(UsersContext);
    let navigate = useNavigate();

    const Logout = () => {
        context.logout()
        navigate('/')
    }

    const Login = () => {
        navigate('/login');
    }

    const GotoProduct = () => {
        navigate('/')
    }

    const GoToCart = () => {
        navigate('/cart')
    }

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className='title-name'>Next Flavour</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                // variant="dark" 
                                className="navbar-element"
                                // href="/"
                                onClick={GotoProduct}>Products</Nav.Link>
                            {/* <Nav.Link className="navbar-element" href="#pricing">About Us</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {context.loginStatus() ?
                                <Nav.Link
                                    className="navbar-element"
                                    onClick={Logout}>Logout</Nav.Link> :
                                <Nav.Link
                                    className="navbar-element"
                                    // href="/login"
                                    onClick={Login}>Login</Nav.Link>}

                            <Nav.Link
                                className="navbar-element"
                                // href="/cart"
                                onClick={GoToCart}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}