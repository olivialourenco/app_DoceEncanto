// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: ProductCategory;
  available: boolean;
  created_at?: string;
}

export type ProductCategory = 'Brigadeiros' | 'Bolos' | 'Tortas' | 'Cookies' | 'Docinhos' | 'Especiais';

// Cart types
export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

// Wishlist types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
}

// Address types (ViaCEP)
export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

// Frete types (Correios simulation)
export interface FreteOption {
  codigo: string;
  nome: string;
  valor: string;
  prazo: string;
}

// Custom API types
export interface StoreInfo {
  highlightedProducts: string[];
  openingHours: string;
  message: string;
  promotion?: string;
}

// Storage keys
export const STORAGE_KEYS = {
  USER_ID: '@brigaderia:userId',
  MUSIC_ENABLED: '@brigaderia:musicEnabled',
  LAST_CEP: '@brigaderia:lastCep',
  CART_BACKUP: '@brigaderia:cartBackup',
  WISHLIST_BACKUP: '@brigaderia:wishlistBackup',
} as const;



