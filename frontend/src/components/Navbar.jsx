import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, userInfo, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
  <Link to="/products" className="navbar-logo">
    🛒 SwiftCart
  </Link>
</div>


      <div className="nav-right">

        {/* Home button */}
        <Link to="/products" className="nav-btn">Home</Link>

        {/* If user logged in */}
        {userInfo ? (
          <>
            <span className="nav-username">Hello, {userInfo.name}</span>

            <button
              onClick={onLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}

        {/* Cart */}
        <Link to="/cart" className="nav-btn">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
