import { supabase } from './supabaseClient';
import { WishlistItem } from '../types';

/**
 * Get all wishlist items for a user
 */
export async function getWishlistItems(userId: string): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select(`
      *,
      product:products(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching wishlist:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Check if a product is in the wishlist
 */
export async function isInWishlist(userId: string, productId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows found, which is expected
    console.error('Error checking wishlist:', error.message);
  }

  return !!data;
}

/**
 * Toggle product in wishlist (add if not exists, remove if exists)
 */
export async function toggleWishlist(
  userId: string,
  productId: string
): Promise<{ added: boolean }> {
  // Check if already in wishlist
  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    // Remove from wishlist
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', existing.id);

    if (error) {
      console.error('Error removing from wishlist:', error.message);
      throw new Error(error.message);
    }

    return { added: false };
  }

  // Add to wishlist
  const { error } = await supabase
    .from('wishlist_items')
    .insert([{ user_id: userId, product_id: productId }]);

  if (error) {
    console.error('Error adding to wishlist:', error.message);
    throw new Error(error.message);
  }

  return { added: true };
}

/**
 * Remove item from wishlist by ID
 */
export async function removeFromWishlist(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error removing from wishlist:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Clear all items from wishlist
 */
export async function clearWishlist(userId: string): Promise<void> {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing wishlist:', error.message);
    throw new Error(error.message);
  }
}



