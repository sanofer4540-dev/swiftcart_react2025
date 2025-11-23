import "./App.css";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccessPage from "./components/OrderSuccessPage";



function App() {
  const [cart, setCart] = useState([]);

  // read user from localStorage on first load
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  // Sync userInfo when URL changes (e.g., after login sets localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!userInfo || userInfo._id !== parsed._id) {
        setUserInfo(parsed);
      }
    } else if (userInfo) {
      // if localStorage cleared, also clear state
      setUserInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/login");
  };

  // ---------- PROTECTED ROUTE HELPER ----------
  const RequireAuth = ({ children }) => {
    if (!userInfo) {
      // not logged in -> go to login
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // ----- CART LOGIC -----
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      {!hideNavbar && (
        <Navbar
          cartCount={cartItemCount}
          userInfo={userInfo}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        {/* Register as home page */}
        <Route path="/" element={<RegisterPage />} />

        {/* Product list */}
        <Route
          path="/products"
          element={
            <RequireAuth>
              <ProductList onAddToCart={handleAddToCart} />
            </RequireAuth>
          }
        />

        {/* Product detail */}
        <Route
          path="/products/:id"
          element={
            <RequireAuth>
              <ProductDetail onAddToCart={handleAddToCart} />
            </RequireAuth>
          }
        />

        {/* Cart page (protected) */}
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            </RequireAuth>
          }
        />

        <Route
  path="/order-success"
  element={
    <RequireAuth>
      <OrderSuccessPage />
    </RequireAuth>
  }
/>
        {/* Checkout page (protected) */}
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage cart={cart} />
            </RequireAuth>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
