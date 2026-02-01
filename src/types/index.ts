export type CategoryType = "product" | "venue" | "seating";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  type: CategoryType;
  sort_order: number;
  created_at: string;
  children?: Category[];
}

export interface VenueType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  category_id: string | null;
  subcategory_id: string | null;
  venue_type_ids: string[];
  created_at: string;
  updated_at: string;
  category?: Category | null;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  type: string | null;
  created_at: string;
  updated_at: string;
}
