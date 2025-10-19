// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import the CSS

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <Link to="/" className="not-found-link">
        Go to Homepage
      </Link>
    </div>
  );
}