// src/pages/ProductDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";
import { useCartStore } from "../store/cart.store";
import toast from "react-hot-toast";
import "./ProductDetail.scss"; // <-- FIXED IMPORT

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const add = useCartStore((s) => s.add);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
  
  if (isLoading) return <div className="loading-text">Loading product...</div>;
  if (!product) return <div className="loading-text">Product not found.</div>;

  return (
    <div className="detail-layout">
      <div className="detail-image-wrapper">
        <img src={product.image} alt={product.title} className="detail-image" />
      </div>
      <div className="detail-info">
        <h1 className="detail-title">{product.title}</h1>
        {/* ... (Your other JSX for price, description, etc. goes here) ... */}
        <button 
          onClick={() => { 
            add(product); 
            toast.success("Added to cart"); 
          }} 
          className="detail-add-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}