export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  discount: number; // скидка в процентах, 0 — без скидки
}

export interface CartItem {
  product: Product;
  quantity: number;
}
