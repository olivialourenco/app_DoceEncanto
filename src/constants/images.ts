/**
 * Imagens de placeholder para a Brigaderia Doce Encanto
 * Usando Unsplash para imagens de alta qualidade de doces
 */

// Imagens de doces por categoria
export const SWEET_IMAGES = {
  // Brigadeiros e truffles
  brigadeiro: [
    'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop',
  ],
  
  // Bolos
  bolo: [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
  ],
  
  // Tortas
  torta: [
    'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop',
  ],
  
  // Cookies
  cookie: [
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590080875897-700a680e3ed7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
  ],
  
  // Docinhos variados
  docinhos: [
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  ],
  
  // Kits e especiais
  especiais: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop',
  ],
};

// Imagem padrão caso não encontre
export const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop';

// Imagem de banner/hero
export const HERO_IMAGES = {
  home: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  chocolate: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&h=400&fit=crop',
};

/**
 * Retorna uma imagem aleatória baseada na categoria
 */
export function getImageByCategory(category: string): string {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('brigadeiro')) {
    return SWEET_IMAGES.brigadeiro[Math.floor(Math.random() * SWEET_IMAGES.brigadeiro.length)];
  }
  if (categoryLower.includes('bolo')) {
    return SWEET_IMAGES.bolo[Math.floor(Math.random() * SWEET_IMAGES.bolo.length)];
  }
  if (categoryLower.includes('torta')) {
    return SWEET_IMAGES.torta[Math.floor(Math.random() * SWEET_IMAGES.torta.length)];
  }
  if (categoryLower.includes('cookie')) {
    return SWEET_IMAGES.cookie[Math.floor(Math.random() * SWEET_IMAGES.cookie.length)];
  }
  if (categoryLower.includes('docinho')) {
    return SWEET_IMAGES.docinhos[Math.floor(Math.random() * SWEET_IMAGES.docinhos.length)];
  }
  if (categoryLower.includes('especial')) {
    return SWEET_IMAGES.especiais[Math.floor(Math.random() * SWEET_IMAGES.especiais.length)];
  }
  
  return DEFAULT_PRODUCT_IMAGE;
}



