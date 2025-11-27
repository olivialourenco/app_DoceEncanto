import { StoreInfo } from '../types';

/**
 * Custom Store API Service
 * This simulates a custom REST endpoint that returns store information.
 * In production, this could be a Supabase Edge Function or Express server.
 */

// Simulated store data (this would come from a real API)
const STORE_DATA: StoreInfo = {
  highlightedProducts: [], // Will be filled with actual product IDs from Supabase
  openingHours: 'Seg-Sex: 9h às 18h | Sáb: 9h às 14h',
  message: '🍫 Bem-vindo à Brigaderia Doce Encanto!',
  promotion: '🎉 Promoção do dia: 10% OFF em todos os brigadeiros!',
};

// Simulated API endpoint URL (for documentation purposes)
export const STORE_API_URL = 'https://api.brigaderiadoceencanto.com.br/v1/store';

/**
 * Fetch store information from custom API
 * This simulates an HTTP call to our custom endpoint
 */
export async function fetchStoreInfo(): Promise<StoreInfo> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real implementation, this would be:
  // const response = await axios.get(STORE_API_URL);
  // return response.data;

  // Return simulated data with some randomization
  const promotions = [
    '🎉 Promoção do dia: 10% OFF em todos os brigadeiros!',
    '🍰 Compre 3 fatias de bolo e ganhe 1 grátis!',
    '🍪 Cookies fresquinhos saindo do forno!',
    '💝 Kit presente com 20% de desconto!',
    '🎂 Encomende seu bolo com 15% OFF!',
  ];

  const messages = [
    '🍫 Bem-vindo à Brigaderia Doce Encanto!',
    '✨ Doces feitos com amor e carinho!',
    '🎀 Adoce seu dia com nossos brigadeiros!',
    '💖 Felicidade em cada mordida!',
  ];

  return {
    ...STORE_DATA,
    message: messages[Math.floor(Math.random() * messages.length)],
    promotion: promotions[Math.floor(Math.random() * promotions.length)],
  };
}

/**
 * Get highlighted product IDs
 * This would typically come from the store API
 */
export async function getHighlightedProductIds(): Promise<string[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, this would return actual product IDs from the API
  // For now, we'll fetch the first 4 products from Supabase as highlights
  return [];
}

