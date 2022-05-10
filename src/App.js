import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from './pages/cart/Cart';
import Landing from './pages/landing/Landing';
import Products from './pages/products/Products'
import Users from './pages/users/Users';
import Profile from './pages/users/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Next flavour</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Landing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/cart">Cart</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products">Products</a>
              </li>
            </ul>
          </div>
          <div>
            {/* <a href="/cart" class="ml-3 btn btn-primary btn-sm">Cart</a> */}

            {/* <a href="/logout" class="ml-3 btn btn-primary btn-sm">Logout</a> */}

            <a href="/" class="ml-3 btn btn-primary btn-sm">Login</a>
  

          </div>
        </div>
      </nav>
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
      <Routes>
        {/* Landing route */}
        <Route path="/" element={<Landing />} />

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />


        {/* Contact Us route */}
        <Route path="/products" element={<Products />} />

        {/* Users route */}
        <Route path="/users" element={<Users />} />

        <Route path="/Profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
