// src/components/ProductCard.tsx
import { useCartStore } from '../store/cartStore';
import type { Product } from '../models/Product';
import './ProductCard.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        {product.tags && (
          <div>
            {product.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
};
