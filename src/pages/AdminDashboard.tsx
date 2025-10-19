// src/pages/AdminDashboard.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';
import { Product } from '../models/Product';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

// You can move this to a separate component file if you want
const AdminProductRow: React.FC<{ product: Product }> = ({ product }) => {
  const handleEdit = () => {
    toast.success(`(Admin) Edit: ${product.title}`);
  };
  const handleDelete = () => {
    toast.error(`(Admin) Delete: ${product.title}`);
  };

  return (
    <tr>
      <td>
        <img src={product.image} alt={product.title} className="admin-product-img" />
      </td>
      <td>{product.title}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.stock}</td>
      <td>{product.category}</td>
      <td className="admin-actions">
        <button className="admin-btn edit-btn" onClick={handleEdit}>Edit</button>
        <button className="admin-btn delete-btn" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};


export default function AdminDashboard() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="admin-btn create-btn">Create New Product</button>
      </div>
      
      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map(product => (
              <AdminProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}