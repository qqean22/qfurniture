# QFurniture

A clone of [Modern Bench](https://modernbench.co.uk) structure and functionality, built with Next.js and Supabase. QFurniture offers a similar content/copy and data tree: product categories (Chairs, Tables, Table Legs, Seating), venue types (Hospitality, Commercial, Residential), and full-text search over products.

## Features

- **Structure**: Home, About, Chairs (Bar Stools, Metal Chairs, Wooden Chair), Seating (Banquette, Bench, Chesterfield, Back to Back), Tables, Table Legs, Venue types (Hospitality, Commercial, Residential), Projects, Catalogs
- **Search**: Full-text search over products (name, description) using Supabase
- **Data**: Categories and products stored in Supabase with a hierarchical category tree

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com)
   - In the SQL Editor, run the migration: `supabase/migrations/001_initial_schema.sql`
   - In Project Settings → API, copy the project URL and anon key

3. **Environment**

   Copy `.env.local.example` to `.env.local` and set:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

Without Supabase configured, the app still runs using fallback (static) data so you can browse the structure.

4. **Social links (Facebook, Instagram, TikTok)**

   To replace placeholder social links, edit **`src/lib/site-config.ts`** and set your profile URLs:

   ```ts
   export const SOCIAL_LINKS = {
     facebook: "https://www.facebook.com/your-page",
     instagram: "https://www.instagram.com/your-account",
     tiktok: "https://www.tiktok.com/@your-account",
   };
   ```

   Use full URLs including `https://`. Use `"#"` for any platform you don’t use yet.

## Data tree (mirroring Modern Bench)

- **Categories**: Chairs → Bar Stools, Metal Chairs, Wooden Chair; Tables; Table Legs; Seating → Banquette Seating, Bench Seating, Chesterfield Seating, Back to Back Seating
- **Venue types**: Hospitality, Commercial, Residential
- **Products**: Linked to categories (and optionally subcategories). Search uses a `search_vector` (tsvector) for full-text search.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database + full-text search)
