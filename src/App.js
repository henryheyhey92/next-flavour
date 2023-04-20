import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './pages/cart/Cart';
// import Landing from './pages/landing/Landing';
import Products from './pages/products/Products';
import Users from './pages/users/Users';
import Signup from "./pages/users/Signup";
import Profile from './pages/users/Profile';
import ProductDetails from './pages/products/ProductDetails';
import UsersProvider from "./contexts/UsersProvider";
import React from "react";
import NavbarBootStrap from "./NavbarBootStrap";
import Checkout from "./pages/checkout/Checkout";
import StripePaymentSuccess from "./pages/paymentStatus/success/StripePaymentSuccess";
import StripePaymentFailure from "./pages/paymentStatus/failure/StripePaymentFailure";
import Orders from "./pages/order/Orders";
import NextFlavourAppBar from './components/AppBar';
import Main from "./pages/main/main";


function App() {
  return (
    <UsersProvider>
      <Router>
        {/* <NavbarBootStrap /> */}
        <NextFlavourAppBar/>
        <Routes>
          <Route path="/product" element={<Products />} />
          <Route path='/' element={<Main />} />
          <Route path="/login" element={<Users />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:productId" element={<ProductDetails />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paymentStatus/success" element={<StripePaymentSuccess />} />
          <Route path="/paymentStatus/failure" element={<StripePaymentFailure />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order" element={<Orders/>} />
        </Routes>
      </Router>
    </UsersProvider>
  );
}

export default App;
