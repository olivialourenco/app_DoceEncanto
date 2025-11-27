import { supabase } from './supabaseClient';
import { Product, ProductCategory } from '../types';

/**
 * Fetch all available products
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .eq('category', category)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching products by category:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }

  return data;
}

/**
 * Fetch highlighted/featured products (for home screen)
 */
export async function getHighlightedProducts(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)
    .eq('available', true);

  if (error) {
    console.error('Error fetching highlighted products:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('available', true);

  if (error) {
    console.error('Error fetching categories:', error.message);
    throw new Error(error.message);
  }

  // Get unique categories
  const categories = [...new Set(data?.map(p => p.category))] as ProductCategory[];
  return categories;
}



