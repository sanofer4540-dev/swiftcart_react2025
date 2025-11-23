import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage({ cart, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Product Image */}
            <div className="cart-item-image-wrapper">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
              ) : (
                <div className="cart-item-placeholder">No Image</div>
              )}
            </div>

            {/* Product Info */}
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity Buttons */}
            <div className="cart-item-qty">
              <button onClick={() => onDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncrease(item.id)}>+</button>
            </div>

            {/* Remove Button */}
            <button
              className="cart-remove-button"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* Total */}
      {cart.length > 0 && (
        <div className="cart-total">
          Total: <strong>${total.toFixed(2)}</strong>
        </div>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;
