// product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// order.model.ts
export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
}

// review.model.ts
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}
