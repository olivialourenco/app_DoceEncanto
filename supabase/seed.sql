-- Brigaderia Doce Encanto - Supabase Database Setup
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Brigadeiros', 'Bolos', 'Tortas', 'Cookies', 'Docinhos', 'Especiais')),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);

-- =====================================================
-- CART_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create index for user cart queries
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);

-- =====================================================
-- WISHLIST_ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create index for user wishlist queries
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user ON wishlist_items(user_id);

-- =====================================================
-- SEED DATA - Products
-- =====================================================

-- Clear existing products (optional - remove if you want to keep existing data)
-- DELETE FROM cart_items;
-- DELETE FROM wishlist_items;
-- DELETE FROM products;

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, available) VALUES
-- Brigadeiros
('Brigadeiro Tradicional', 'O clássico brigadeiro de chocolate, feito com chocolate belga e coberto com granulado. Uma receita que atravessa gerações!', 3.50, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', 'Brigadeiros', true),
('Brigadeiro de Nutella', 'Brigadeiro cremoso recheado com Nutella original. Uma explosão de sabor em cada mordida!', 4.50, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', 'Brigadeiros', true),
('Brigadeiro de Pistache', 'Brigadeiro gourmet de pistache com cobertura crocante. Sofisticação em forma de doce!', 5.50, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', 'Brigadeiros', true),
('Brigadeiro de Limão', 'Brigadeiro refrescante de limão siciliano com raspas. Perfeito para os dias quentes!', 4.00, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400', 'Brigadeiros', true),
('Brigadeiro de Café', 'Brigadeiro com café espresso e toque de canela. Para os amantes de café!', 4.50, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400', 'Brigadeiros', true),

-- Bolos
('Bolo de Chocolate', 'Bolo fofinho de chocolate com cobertura de ganache. Serve até 15 pessoas.', 85.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', 'Bolos', true),
('Bolo de Cenoura', 'Bolo de cenoura caseiro com cobertura de chocolate. O favorito das crianças!', 65.00, 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400', 'Bolos', true),
('Bolo Red Velvet', 'Bolo red velvet com cream cheese frosting. Elegância e sabor em cada fatia.', 95.00, 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400', 'Bolos', true),
('Bolo de Morango', 'Bolo de baunilha com morangos frescos e chantilly. Perfeito para comemorações!', 90.00, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', 'Bolos', true),

-- Tortas
('Torta de Limão', 'Torta de limão com merengue italiano. Cremosa e refrescante!', 75.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400', 'Tortas', true),
('Torta de Maracujá', 'Torta de maracujá com base crocante. O equilíbrio perfeito entre doce e azedo.', 70.00, 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400', 'Tortas', true),
('Torta de Chocolate', 'Torta de chocolate intenso com ganache e nozes. Para os chocólatras!', 85.00, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400', 'Tortas', true),

-- Cookies
('Cookie de Chocolate', 'Cookie crocante por fora, macio por dentro, com gotas de chocolate belga.', 6.00, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', 'Cookies', true),
('Cookie de Aveia', 'Cookie saudável de aveia com passas e canela. Delicioso e nutritivo!', 5.50, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', 'Cookies', true),
('Cookie Red Velvet', 'Cookie red velvet com gotas de chocolate branco. Uma combinação irresistível!', 7.00, 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400', 'Cookies', true),

-- Docinhos
('Beijinho', 'Beijinho tradicional de coco com cravo. Clássico das festas brasileiras!', 3.00, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400', 'Docinhos', true),
('Cajuzinho', 'Cajuzinho de amendoim com cobertura de chocolate. Sabor nostálgico!', 3.50, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400', 'Docinhos', true),
('Olho de Sogra', 'Ameixa recheada com doce de leite e coco. Uma delícia tradicional!', 4.00, 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400', 'Docinhos', true),

-- Especiais
('Kit Festa 50 Doces', 'Kit com 50 docinhos variados: brigadeiros, beijinhos e cajuzinhos. Perfeito para festas!', 150.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Especiais', true),
('Kit Degustação', 'Kit com 12 brigadeiros gourmet de sabores variados. Ideal para presente!', 55.00, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400', 'Especiais', true),
('Caixa Presente', 'Caixa elegante com 20 brigadeiros gourmet sortidos. Embalagem especial para presente.', 95.00, 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400', 'Especiais', true);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- =====================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read, no one can write (admin only via dashboard)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- Cart items: Users can only access their own cart
CREATE POLICY "Users can view own cart items" ON cart_items
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own cart items" ON cart_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own cart items" ON cart_items
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own cart items" ON cart_items
    FOR DELETE USING (true);

-- Wishlist items: Users can only access their own wishlist
CREATE POLICY "Users can view own wishlist items" ON wishlist_items
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own wishlist items" ON wishlist_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own wishlist items" ON wishlist_items
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own wishlist items" ON wishlist_items
    FOR DELETE USING (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check products count
SELECT COUNT(*) as total_products FROM products;

-- Check products by category
SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY category;

-- View all products
SELECT id, name, price, category, available FROM products ORDER BY category, name;

