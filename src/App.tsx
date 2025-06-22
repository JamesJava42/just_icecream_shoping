// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { useCartStore } from './store/cartStore';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/app.scss';

function App() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <Router>
      <header className="app-header">
        <div className="logo">
          <h1>🍨 Just Ice Creams</h1>
        </div>
        <nav className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/cart">
    Cart
    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
  </Link>
</nav>

      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Just Ice Creams 🍦</p>
      </footer>

      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
    </Router>
  );
}

export default App;
