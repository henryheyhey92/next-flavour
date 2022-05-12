import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from './pages/cart/Cart';
import Landing from './pages/landing/Landing';
import Products from './pages/products/Products'
import Users from './pages/users/Users';
import Profile from './pages/users/Profile';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import UsersProvider from "./contexts/UsersProvider";
import React from "react";



function App() {
  return (
    <Router>
      <Navbar />
      <nav>
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
      </nav>
      <UsersProvider>
        <Routes>
          {/* Landing route */}
          <Route path="/" element={<Landing />} />
          {/* Users route */}
          <Route path="/users" element={<Users />} />
          {/* Cart route */}
          <Route path="/cart" element={<Cart />} />
          {/* Contact Us route */}
          <Route path="/products" element={<Products />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </UsersProvider>
    </Router>
  );
}

export default App;
