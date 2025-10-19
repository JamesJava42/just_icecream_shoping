// src/services/productService.ts
import { Product } from "../models/Product";
import productsData from "../assets/products.json"; // Assumes you created this JSON

export const fetchProducts = async (): Promise<Product[]> => {
  // simulate delay
  await new Promise(r => setTimeout(r, 200));
  return productsData as Product[];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const list = await fetchProducts();
  return list.find(p => p.id === id);
};