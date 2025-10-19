// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We'll create this next

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Try to log in
    const success = login(email);
    
    if (success) {
      navigate('/'); // Redirect to home on success
    } else {
      setError('Invalid email. Try "admin@icecream.com"');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin / User Login</h2>
        <p>
          (Mock login: try <strong>admin@icecream.com</strong> or <strong>user@icecream.com</strong>)
        </p>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}