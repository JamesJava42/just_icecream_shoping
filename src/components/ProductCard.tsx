// src/components/ProductCard.tsx
import React from "react";
import { Product } from "../models/Product";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store"; // <-- 1. IMPORT AUTH STORE
import toast from "react-hot-toast";
import "./ProductCard.css";
import { useCartStore } from "../store/cart.store";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const add = useCartStore(s => s.add);
  const user = useAuthStore(s => s.user); // <-- 2. GET THE USER
  const isAdmin = user?.isAdmin || false; // Check if user is admin

  // Admin-only actions
  const handleEdit = () => {
    // In a real app, you'd navigate to an edit page
    toast.success(`(Admin) Edit: ${product.title}`);
  };
  const handleDelete = () => {
    // In a real app, you'd call a delete mutation
    toast.error(`(Admin) Delete: ${product.title}`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
        />
      </Link>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">{product.description}</p>
        
        {/* --- 3. CONDITIONAL BUTTONS --- */}
        {isAdmin ? (
          <div className="admin-actions">
            <button onClick={handleEdit} className="admin-btn edit-btn">Edit</button>
            <button onClick={handleDelete} className="admin-btn delete-btn">Delete</button>
          </div>
        ) : (
          <button
            onClick={() => {
              add(product);
              toast.success("Added to cart");
            }}
            className="product-card-button"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;