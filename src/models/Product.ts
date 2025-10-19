// src/models/Product.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  // This field is required
  category: 'ice-cream' | 'sundaes' | 'cones';
}