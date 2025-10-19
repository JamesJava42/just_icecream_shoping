// src/pages/Checkout.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import emailjs from '@emailjs/browser';
import "./Checkout.css"; // Uses the updated CSS

interface ShippingInfo {
  name: string;
  email: string;
  phone?: string;
}

export default function Checkout() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ShippingInfo>();
  const navigate = useNavigate();

  // 1. Get data from the correct cart store
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);

  // 2. Calculate totals (logic from old Cart.tsx)
  const total = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const tax = total * 0.08;
  const grandTotal = total + tax;

  // 3. Geolocation logic (from old Cart.tsx)
  const [location, setLocation] = useState('');
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = latitude > 33.8 ? '13770 Clark Ave, Bellflower, CA 90706' : '13770 Clark Ave, Bellflower, CA 90706';
        setLocation(`${nearest} (Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)})`);
      },
      () => {
        setLocation('Unable to retrieve your location.');
      }
    );
  }, []);

  // 4. Submit handler with EmailJS (from old Cart.tsx)
  const onSubmit = async (data: ShippingInfo) => {
    const templateParams = {
      email: data.email,
      name: data.name,
      phone: data.phone || 'N/A',
      order_id: Math.floor(Math.random() * 90000) + 10000,
      // Use the correct store item structure
      orders: items
        .map((item) => `${item.product.title} (${item.qty} x $${item.product.price.toFixed(2)})`)
        .join('\n'), // Use newline for better email formatting
      location: location || 'Not available',
      tax: tax.toFixed(2),
      total: grandTotal.toFixed(2),
    };

    try {
      // Use the EmailJS details from your Cart.tsx
      await emailjs.send('service_ldso8ws', 'template_kmkzpbq', templateParams, 'tEMsxZw8BTj1b2zro');
      clearCart();
      navigate("/success"); // Redirect to success page
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-page-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* --- Left Column: Form --- */}
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              {...register("name", { required: "Name is required" })}
              className="form-input" 
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
              })}
              className="form-input"
              type="email"
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone (Optional)</label>
            <input 
              {...register("phone")}
              className="form-input"
              type="tel"
            />
          </div>
          
          <button type="submit" className="checkout-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* --- Right Column: Summary --- */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items-list">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="summary-item">
                <span>{product.title} (x{qty})</span>
                <strong>${(product.price * qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-total">
            <strong>Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>
          <div className="pickup-location">
            <strong>Pickup Location:</strong>
            <p>{location || 'Detecting nearest store...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}