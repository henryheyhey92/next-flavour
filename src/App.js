import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Cart from './pages/cart/Cart';
import Landing from './pages/landing/Landing';
import Products from './pages/products/Products';
import Users from './pages/users/Users';
import Profile from './pages/users/Profile';
import ProductDetails from './pages/products/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css'
import UsersProvider from "./contexts/UsersProvider";
import React from "react";
import NavbarBootStrap from "./NavbarBootStrap";
import Checkout from "./pages/checkout/Checkout";
import StripePaymentSuccess from "./pages/paymentStatus/success/StripePaymentSuccess";
import StripePaymentFailure from "./pages/paymentStatus/failure/StripePaymentFailure";



function App() {
  return (
    <UsersProvider>
      
      {/* <NavbarBootStrap /> */}
      <Router>
      <NavbarBootStrap />
      {/* <Navbar /> */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>

          </ul>
        </nav> */}

        <Routes>
          {/* Landing route */}
          <Route path="/" element={<Landing />} />
          {/* Users route */}
          <Route path="/users" element={<Users />} />
          {/* Cart route */}
          <Route path="/cart" element={<Cart />} />
          {/* Contact Us route */}
          <Route path="/products" element={<Products />} />
          <Route path="/:productId" element={<ProductDetails />} />
          <Route path="/Profile" element={<Profile />} />
          {/* route to checkout */}
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/paymentStatus/success" element={<StripePaymentSuccess />} />
          <Route path="/paymentStatus/failure" element={<StripePaymentFailure />} />
        </Routes>

      </Router>
    </UsersProvider>
  );
}

export default App;
