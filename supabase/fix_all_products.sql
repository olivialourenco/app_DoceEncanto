-- =====================================================
-- CORREÇÃO COMPLETA DOS PRODUTOS - BRIGADERIA DOCE ENCANTO
-- Execute este script COMPLETO no SQL Editor do Supabase
-- =====================================================

-- PASSO 1: REMOVER produtos que não fazem sentido
DELETE FROM products WHERE name IN (
  'Brigadeiro de Limão',
  'Brigadeiro de Nutella',
  'Caixa Presente',
  'Kit Degustação',
  'Olho de Sogra',
  'Kit Festa 50 Doces',
  'Cookie Red Velvet'
);

-- PASSO 2: ATUALIZAR imagens com URLs corretas

-- Brigadeiro Tradicional - foto real de brigadeiro
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=400&fit=crop'
WHERE name = 'Brigadeiro Tradicional';

-- Brigadeiro de Pistache - foto de brigadeiro verde/pistache
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop'
WHERE name = 'Brigadeiro de Pistache';

-- Brigadeiro de Café - foto de brigadeiro com café
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop'
WHERE name = 'Brigadeiro de Café';

-- Bolo de Cenoura - foto real de bolo de cenoura com cobertura de chocolate
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop'
WHERE name = 'Bolo de Cenoura';

-- Torta de Maracujá - foto de torta amarela/maracujá
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=400&fit=crop'
WHERE name = 'Torta de Maracujá';

-- Cookie de Aveia - foto de cookie
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop'
WHERE name = 'Cookie de Aveia';

-- Beijinho/Donuts - atualizar para Donuts com foto correta
UPDATE products 
SET 
  name = 'Donuts Coloridos',
  description = 'Donuts fresquinhos com cobertura colorida e granulados. Perfeitos para alegrar seu dia!',
  image_url = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop'
WHERE name = 'Beijinho';

-- =====================================================
-- VERIFICAÇÃO FINAL - Ver todos os produtos restantes
-- =====================================================
SELECT 
  name, 
  category, 
  price, 
  image_url,
  available
FROM products 
ORDER BY category, name;



