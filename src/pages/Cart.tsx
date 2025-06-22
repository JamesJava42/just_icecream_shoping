// src/pages/Cart.tsx
import { useCartStore } from '../store/cartStore';
import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import './cart.scss';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.08;
  const shipping = total * 0.1;
  const grandTotal = total + tax + shipping;

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Example dummy logic to determine nearest Clark Liquor
        const nearest = latitude > 33.8 ? 'Clark Liquor - Cerritos' : 'Clark Liquor - Long Beach';
        setLocation(`${nearest} (Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)})`);
      },
      () => {
        setLocation('Unable to retrieve your location.');
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
  email: formData.email,
  name: formData.name,
  phone: formData.phone || 'N/A',
  order_id: Math.floor(Math.random() * 90000) + 10000,
  orders: cartItems.map((item) => ({
    name: item.name,
    units: item.quantity,
    price: (item.price * item.quantity).toFixed(2),
    image_url: item.imageUrl,
  })),
  cost: {
    shipping: shipping.toFixed(2),
    tax: tax.toFixed(2),
    total: grandTotal.toFixed(2),
  },
  location: location || 'Not available',
};


    emailjs
      .send('service_ldso8ws', 'template_kmkzpbq', templateParams, 'tEMsxZw8BTj1b2zro')
      .then(() => {
        setSubmitted(true);
        clearCart();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Something went wrong. Try again.');
      });
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-message">🧾 Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)} × {item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="order-section">
          <h3>🧾 Order Summary</h3>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Tax (8%): ${tax.toFixed(2)}</p>
          <p>Shipping (10%): ${shipping.toFixed(2)}</p>
          <h4>Total: ${grandTotal.toFixed(2)}</h4>

          <form className="order-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              pattern="^[a-zA-Z\s]{2,}$"
              title="Enter a valid name (min 2 letters)"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <input
              type="tel"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              pattern="^[0-9]{10,15}$"
              title="Enter a valid phone number"
            />

            <div className="pickup-location">
              <strong>Pickup Location:</strong>
              <p>{location || 'Detecting nearest store...'}</p>
            </div>

            <button type="submit">✅ Confirm Order</button>
          </form>
        </div>
      )}

      {submitted && (
        <p className="success-message">✅ Order confirmation has been sent to your email!</p>
      )}
    </div>
  );
};

export default Cart;
