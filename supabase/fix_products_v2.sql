-- =====================================================
-- CORREÇÃO DOS PRODUTOS - VERSÃO 2
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1. REMOVER Brigadeiro de Café
DELETE FROM products WHERE name = 'Brigadeiro de Café';

-- 2. Brigadeiro Tradicional -> Petit Gateau
UPDATE products 
SET 
  name = 'Petit Gateau',
  description = 'Bolinho de chocolate com interior cremoso, servido quente. Uma explosão de sabor!',
  category = 'Bolos',
  price = 18.00,
  image_url = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop'
WHERE name = 'Brigadeiro Tradicional';

-- 3. Brigadeiro de Pistache -> Beijinho
UPDATE products 
SET 
  name = 'Beijinho',
  description = 'Beijinho tradicional de coco com cravo. Clássico das festas brasileiras!',
  category = 'Docinhos',
  price = 3.00,
  image_url = 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=400&fit=crop'
WHERE name = 'Brigadeiro de Pistache';

-- 4. Bolo de Cenoura - foto correta (bolo laranja com cobertura de chocolate)
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop'
WHERE name = 'Bolo de Cenoura';

-- =====================================================
-- VERIFICAÇÃO - Ver todos os produtos
-- =====================================================
SELECT 
  name, 
  category, 
  price,
  SUBSTRING(image_url, 1, 50) as image_preview
FROM products 
ORDER BY category, name;



