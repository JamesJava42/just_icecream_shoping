import type { Product } from '../models/Product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    // ✅ Correct path for Vite/React — must be inside /public
    const response = await fetch('/data/products.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    throw error;
  }
};
