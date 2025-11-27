import { supabase } from './supabaseClient';
import { CartItem, Product } from '../types';

/**
 * Get all cart items for a user
 */
export async function getCartItems(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Add product to cart or increase quantity if already exists
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<CartItem | null> {
  // Check if item already exists in cart
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating cart item:', error.message);
      throw new Error(error.message);
    }
    return data;
  }

  // Insert new item
  const { data, error } = await supabase
    .from('cart_items')
    .insert([{ user_id: userId, product_id: productId, quantity }])
    .select()
    .single();

  if (error) {
    console.error('Error adding to cart:', error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<CartItem | null> {
  if (quantity <= 0) {
    await removeFromCart(itemId);
    return null;
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select()
    .single();

  if (error) {
    console.error('Error updating cart quantity:', error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error removing from cart:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Clear all items from cart
 */
export async function clearCart(userId: string): Promise<void> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing cart:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);
}

