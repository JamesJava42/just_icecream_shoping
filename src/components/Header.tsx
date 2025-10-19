// src/components/Header.tsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import { useAuthStore } from "../store/auth.store"; // <-- 1. IMPORT AUTH STORE
import "./Header.css";

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- 2. GET AUTH STATE ---
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/'); // Go home after logout
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          IceCreamShop
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="header-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <div className={`header-links ${isMenuOpen ? "is-open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header-nav-link active" : "header-nav-link"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          {/* --- Dropdown Menu --- */}
          <div className="nav-item has-dropdown">
            <span className="header-nav-link">Products</span>
            <div className="dropdown-menu">
              <Link to="/products/ice-cream" className="dropdown-link" onClick={closeMenu}>
                Ice Cream
              </Link>
              <Link to="/products/sundaes" className="dropdown-link" onClick={closeMenu}>
                Sundaes
              </Link>
              <Link to="/products/cones" className="dropdown-link" onClick={closeMenu}>
                Cones
              </Link>
            </div>
          </div>
          {/* --- End Dropdown Menu --- */}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "header-nav-link cart-link active"
                : "header-nav-link cart-link"
            }
            onClick={closeMenu}
          >
            Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </NavLink>

          {/* --- 3. LOGIN/LOGOUT LOGIC --- */}
          {user ? (
            <button onClick={handleLogout} className="header-nav-link as-button">
              Logout ({user.isAdmin ? 'Admin' : 'User'})
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "header-nav-link active" : "header-nav-link"
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}