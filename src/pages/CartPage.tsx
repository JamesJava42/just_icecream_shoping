// src/pages/CartPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import "./CartPage.css"; // Uses CartPage.css

export default function CartPage() {
  const { items, remove, updateQty, clear } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="cart-page-container">
        <h1 className="cart-page-title">Your Cart</h1>
        <p className="cart-empty-message">Your cart is empty.</p>
        <Link to="/" className="cart-checkout-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-page-title">Your Cart</h1>
      <div className="cart-container">
        <div className="cart-list">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <div>
                  <Link to={`/product/${product.id}`} className="cart-item-title">
                    {product.title}
                  </Link>
                  <p className="cart-item-price">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    className="cart-item-qty"
                    value={qty}
                    onChange={(e) => updateQty(product.id, parseInt(e.target.value))}
                    min="1"
                  />
                  <button
                    onClick={() => remove(product.id)}
                    className="cart-item-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="cart-checkout-btn">
            Proceed to Checkout
          </Link>
          <button onClick={clear} className="cart-clear-btn">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}