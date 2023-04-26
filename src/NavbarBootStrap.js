import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import UsersContext from "./contexts/UsersContext";

export default function NavbarBootStrap() {
  let context = useContext(UsersContext);
  let navigate = useNavigate();

  const Logout = () => {
    context.setOrderState(false);
    context.logout();
    navigate("/");
  };

  const Login = () => {
    context.setOrderState(false);
    navigate("/login");
  };

  const GotoProduct = () => {
    // context.setOrderState(false);
    navigate("/");
  };

  const GoToCart = () => {
    context.setOrderState(false);
    navigate("/cart");
  };

  const GoToOrder = () => {
    // context.setOrderState(false);
    context.setOrderState(true);
    navigate("/order");
  };

  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 99 }}
      >
        <Container>
          <Navbar.Brand href="/" className="title-name">
            Next Flavour
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link className="navbar-element" href="#pricing">About Us</Nav.Link> */}
            </Nav>
            <Nav>
              {/* go to the product page */}
              <Nav.Link
                // variant="dark"
                className="navbar-element"
                // href="/"
                onClick={GotoProduct}
              >
                Products
              </Nav.Link>
              {/* don use local storage for login */}
              {localStorage.getItem("localLoginStatus") ? (
                <Nav.Link className="navbar-element" onClick={Logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  className="navbar-element"
                  // href="/login"
                  onClick={Login}
                >
                  Login
                </Nav.Link>
              )}
              <Nav.Link
                className="navbar-element"
                // href="/cart"
                onClick={GoToOrder}
              >
                Order
              </Nav.Link>
              <Nav.Link
                className="navbar-element"
                // href="/cart"
                onClick={GoToCart}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}
