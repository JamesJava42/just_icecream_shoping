// src/store/cart.Store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../models/Product';

// This is the structure CartPage.tsx expects
export type CartItem = {
  product: Product;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Add a product or increment its quantity
      add: (product) => {
        const { items } = get();
        const itemInCart = items.find((i) => i.product.id === product.id);

        if (itemInCart) {
          // If item exists, increment quantity
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, qty: i.qty + 1 }
                : i
            ),
          }));
        } else {
          // If item doesn't exist, add it
          set((state) => ({
            items: [...state.items, { product: product, qty: 1 }],
          }));
        }
      },

      // Remove an item entirely
      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      // Update a specific item's quantity
      updateQty: (productId, qty) => {
        // Ensure quantity is at least 1
        const newQty = Math.max(1, qty);
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, qty: newQty } : i
          ),
        }));
      },

      // Clear the entire cart
      clear: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);