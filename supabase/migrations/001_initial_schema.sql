-- QFurniture schema mirroring Modern Bench structure
-- Categories: hierarchical (Chairs > Bar Stools/Metal/Wooden, Tables, Table Legs, Seating > Banquette/Bench/Chesterfield/Back to Back)
-- Venue types: Hospitality, Commercial, Residential
-- Products with category, subcategory, venue types, seating types

-- Category types
CREATE TYPE category_type AS ENUM ('product', 'venue', 'seating');

-- Categories (hierarchical: parent_id for subcategories)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  type category_type NOT NULL DEFAULT 'product',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Venue types (Hospitality, Commercial, Residential)
CREATE TABLE venue_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  gallery_urls TEXT[],
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES categories(id),
  venue_type_ids UUID[] DEFAULT '{}',
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Full-text search on products
CREATE INDEX products_search_idx ON products USING GIN(search_vector);

CREATE OR REPLACE FUNCTION products_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.short_description, '')), 'B');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_update
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE products_search_trigger();

-- Pages (About, Venue landing pages, Seating landing pages)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_description TEXT,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed categories (mirror Modern Bench nav tree)
INSERT INTO categories (name, slug, type, sort_order) VALUES
  ('Chairs', 'chairs', 'product', 1),
  ('Tables', 'tables', 'product', 2),
  ('Table Legs', 'table-legs', 'product', 3),
  ('Seating', 'seating', 'product', 4);

INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Bar Stools', 'bar-stools', id, 'product', 1 FROM categories WHERE slug = 'chairs';
INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Metal Chairs', 'metal-chairs', id, 'product', 2 FROM categories WHERE slug = 'chairs';
INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Wooden Chair', 'wooden-chair', id, 'product', 3 FROM categories WHERE slug = 'chairs';

INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Banquette Seating', 'banquette-seating', id, 'seating', 1 FROM categories WHERE slug = 'seating';
INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Bench Seating', 'bench-seating', id, 'seating', 2 FROM categories WHERE slug = 'seating';
INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Chesterfield Seating', 'chesterfield-seating', id, 'seating', 3 FROM categories WHERE slug = 'seating';
INSERT INTO categories (name, slug, parent_id, type, sort_order)
SELECT 'Back to Back Seating', 'back-to-back-seating', id, 'seating', 4 FROM categories WHERE slug = 'seating';

-- Venue types
INSERT INTO venue_types (name, slug, sort_order) VALUES
  ('Hospitality', 'hospitality', 1),
  ('Commercial', 'commercial', 2),
  ('Residential', 'residential', 3);

-- Sample products
INSERT INTO products (name, slug, short_description, price, category_id)
SELECT 'Compact', 'compact', 'Elegant compact table for any space.', 429.00, id FROM categories WHERE slug = 'tables' LIMIT 1;
INSERT INTO products (name, slug, short_description, price, category_id)
SELECT 'Fir Wood', 'fir-wood', 'Solid fir wood table.', 429.00, id FROM categories WHERE slug = 'tables' LIMIT 1;
INSERT INTO products (name, slug, short_description, price, category_id)
SELECT 'Glass', 'glass', 'Glass top table.', 429.00, id FROM categories WHERE slug = 'tables' LIMIT 1;
INSERT INTO products (name, slug, short_description, price, category_id)
SELECT 'Alegra', 'alegra', 'Comfortable dining chair.', 399.00, id FROM categories WHERE slug = 'chairs' LIMIT 1;
INSERT INTO products (name, slug, short_description, price, category_id)
SELECT 'Argos', 'argos', 'Modern chair design.', 429.00, id FROM categories WHERE slug = 'chairs' LIMIT 1;

-- Enable RLS (optional; allow anon read for public catalog)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read venue_types" ON venue_types FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read pages" ON pages FOR SELECT USING (true);