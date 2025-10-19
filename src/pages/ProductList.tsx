// src/pages/ProductList.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "./ProductList.css"; 

export default function ProductList() {
  // 1. Get the category from the URL (e.g., "ice-cream")
  const { category } = useParams<{ category: string }>();

  // 2. Fetch all products using React Query
  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className="loader">Loading products...</div>;
  if (error) return <div className="error">Error loading products.</div>;

  // 3. Filter the products based on the category
  const filteredProducts = allProducts?.filter(
    (product) => product.category === category
  ) || [];

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">{category}</h1>
      
      {filteredProducts.length > 0 ? (
        <div className="product-list-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}