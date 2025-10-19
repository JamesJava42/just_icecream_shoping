// src/pages/OrderSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css"; // Import the CSS

export default function OrderSuccess() {
  return (
    <div className="success-container">
      <h1 className="success-title">Thank You!</h1>
      <p className="success-message">
        Your order has been placed successfully.
      </p>
      <Link to="/" className="success-home-link">
        Continue Shopping
      </Link>
    </div>
  );
}