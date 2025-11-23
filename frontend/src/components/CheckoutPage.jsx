import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage({ cart }) {
  const navigate = useNavigate();

  // simple shipping form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!name || !address || !city || !postalCode) {
      setMessage("Please fill in all shipping details.");
      return;
    }

    // Optional: show a small local message before navigation
    setMessage("Order placed successfully! 🎉");

    // Go to order success page
    navigate("/order-success");
  };

  // If cart is empty, show a simple message
  if (!cart || cart.length === 0) {
    return (
      <div className="checkout-page">
        <h2 className="checkout-title">Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-layout">
        {/* Shipping form */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h3 className="checkout-section-title">Shipping Details</h3>

          {message && <div className="checkout-message">{message}</div>}

          <label className="checkout-label">
            Full Name
            <input
              className="checkout-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="checkout-label">
            Address
            <textarea
              className="checkout-input"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label className="checkout-label">
            City
            <input
              className="checkout-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label className="checkout-label">
            Postal Code
            <input
              className="checkout-input"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="checkout-place-button">
            Place Order
          </button>
        </form>

        {/* Order summary */}
        <div className="checkout-summary">
          <h3 className="checkout-section-title">Order Summary</h3>

          <ul className="checkout-items">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <div>
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-qty">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="checkout-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-total-row">
            <span>Total</span>
            <span className="checkout-total-amount">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
