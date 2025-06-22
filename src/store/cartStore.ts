// src/store/cartStore.ts
import { create } from 'zustand';
import type { Product } from '../models/Product';

type CartItem = Product & { quantity: number };

type CartState = {
  increaseQuantity: any;
  decreaseQuantity: any;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

    increaseQuantity: (productId: number) =>
  set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),

decreaseQuantity: (productId: number) =>
  set((state) => ({
    cart: state.cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      ),
  })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));
