-- Execute este comando no SQL Editor do Supabase para trocar Beijinho por Donuts

UPDATE products 
SET 
  name = 'Donuts Coloridos',
  description = 'Donuts fresquinhos com cobertura colorida e granulados. Perfeitos para alegrar seu dia!'
WHERE name = 'Beijinho';

-- Verificar a alteração
SELECT id, name, description, price FROM products WHERE name LIKE '%Donut%';



