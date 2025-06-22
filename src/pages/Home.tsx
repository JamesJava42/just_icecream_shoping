// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../models/Product';
import { ProductCard } from '../components/ProductCard';
import './home.scss';
import { getDistance } from '../utils/geoUtils';

export const Home = () => {

const dummyStores = [
  { name: 'Clark Liquor - Main Street', lat: 33.7815, lng: -118.1687 },
  { name: 'Clark Liquor - Long Beach Blvd', lat: 33.7960, lng: -118.1800 }
];



  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const [nearestStore, setNearestStore] = useState<string | null>(null);

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
//Geo-Locations
const findNearestStore = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const nearest = dummyStores.reduce((prev, curr) => {
        const prevDist = getDistance(latitude, longitude, prev.lat, prev.lng);
        const currDist = getDistance(latitude, longitude, curr.lat, curr.lng);
        return currDist < prevDist ? curr : prev;
      });

      setNearestStore(nearest.name);
    },
    (error) => {
      alert('Unable to retrieve your location');
      console.error(error);
    }
  );
};

////
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <p>Loading ice creams...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="home-page">
      <h2>🍦 Ice Cream Menu</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="Search ice cream..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
   <button className="locate-btn" onClick={findNearestStore}>
  📍 Locate Me
</button>

{nearestStore && (
  <p className="pickup-info">Nearest Pickup: <strong>{nearestStore}</strong></p>
)}
    </div>

    
  );
};
