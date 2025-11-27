// Supabase client
export { supabase } from './supabaseClient';

// Product service
export {
  getProducts,
  getProductsByCategory,
  getProductById,
  getHighlightedProducts,
  getCategories,
} from './productsService';

// Cart service
export {
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateCartTotal,
} from './cartService';

// Wishlist service
export {
  getWishlistItems,
  isInWishlist,
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} from './wishlistService';

// CEP service (ViaCEP)
export {
  fetchAddressByCep,
  formatCep,
  isValidCep,
} from './cepService';

// Frete service (Correios simulation)
export {
  calculateFrete,
  calculateFreteFromStore,
  STORE_CEP,
} from './freteService';

// Store API service (custom API)
export {
  fetchStoreInfo,
  getHighlightedProductIds,
  STORE_API_URL,
} from './storeApiService';



