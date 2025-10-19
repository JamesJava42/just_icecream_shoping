import React from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import "./Home.css"; // <-- 1. MAKE SURE THIS LINE IS HERE

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"], 
    queryFn: fetchProducts
  });

  if (isLoading) {
    return <div className="loading-text">Loading products...</div>;
  }

  return (
    <div>
      {/* 2. MAKE SURE THIS CLASSNAME IS HERE */}
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}