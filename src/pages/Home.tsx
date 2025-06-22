import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../models/Product';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load products.');
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ice creams...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <h2>🍦 Ice Cream Menu</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
