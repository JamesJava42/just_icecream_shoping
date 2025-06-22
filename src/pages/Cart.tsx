import { useCartStore } from '../store/cartStore';
import './cart.scss';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart); // ✅ use `cart` instead of `items`
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-message">🧾 Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="info">
                <h4>{item.name}</h4>
                <p>
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
