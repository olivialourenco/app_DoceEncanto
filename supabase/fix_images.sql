-- Execute este comando no SQL Editor do Supabase para corrigir imagens quebradas

-- Corrigir Cookie de Aveia (imagem quebrada)
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop'
WHERE name = 'Cookie de Aveia';

-- Corrigir outras imagens que possam estar quebradas
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop'
WHERE name = 'Cookie Red Velvet';

-- Verificar todas as imagens
SELECT name, image_url FROM products ORDER BY category, name;



