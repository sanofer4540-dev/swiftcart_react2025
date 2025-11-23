import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutPage.css"; // reuse same CSS file

const OrderSuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Order Placed!</h2>
        <p className="success-text">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        <div className="success-actions">
          <Link to="/products" className="success-btn primary">
            Continue Shopping
          </Link>
          <Link to="/cart" className="success-btn secondary">
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
