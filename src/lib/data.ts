import { supabase } from "./supabase";
import type { Category, VenueType, Product, Page } from "@/types";

const hasSupabase = () =>
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0;

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase()) return getFallbackCategories();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return getFallbackCategories();
  return (data as Category[]) ?? [];
}

export async function getCategoriesTree(): Promise<Category[]> {
  const all = await getCategories();
  const root = all.filter((c) => !c.parent_id);
  const withChildren = root.map((r) => ({
    ...r,
    children: all.filter((c) => c.parent_id === r.id).sort((a, b) => a.sort_order - b.sort_order),
  }));
  return withChildren;
}

export async function getVenueTypes(): Promise<VenueType[]> {
  if (!hasSupabase()) return getFallbackVenueTypes();
  const { data, error } = await supabase
    .from("venue_types")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return getFallbackVenueTypes();
  return (data as VenueType[]) ?? [];
}

export async function getProducts(options?: {
  categorySlug?: string;
  subcategorySlug?: string;
  venueSlug?: string;
  limit?: number;
}): Promise<Product[]> {
  if (!hasSupabase()) return getFallbackProducts(options?.categorySlug);
  let query = supabase.from("products").select("*, category:categories(*)");
  if (options?.categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .single();
    if (cat?.id) query = query.eq("category_id", cat.id);
  }
  if (options?.subcategorySlug) {
    const { data: sub } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.subcategorySlug)
      .single();
    if (sub?.id) query = query.eq("subcategory_id", sub.id);
  }
  if (options?.limit) query = query.limit(options.limit);
  query = query.order("created_at", { ascending: false });
  const { data, error } = await query;
  if (error) return getFallbackProducts(options?.categorySlug);
  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabase()) return getFallbackProductBySlug(slug);
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .single();
  if (error || !data) return getFallbackProductBySlug(slug);
  return data as Product;
}

export async function searchProducts(q: string): Promise<Product[]> {
  if (!q.trim()) return [];
  if (!hasSupabase()) return getFallbackProducts().filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .textSearch("search_vector", q, { type: "websearch", config: "english" });
  if (error) {
    const { data: fallback } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .or(`name.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%`);
    return (fallback as Product[]) ?? [];
  }
  return (data as Product[]) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getSeatingCategories(): Promise<Category[]> {
  const all = await getCategories();
  const seating = all.find((c) => c.slug === "seating");
  if (!seating) return [];
  return all.filter((c) => c.parent_id === seating.id).sort((a, b) => a.sort_order - b.sort_order);
}

// Fallback data when Supabase is not configured
function getFallbackCategories(): Category[] {
  const root: Category[] = [
    { id: "1", name: "Chairs", slug: "chairs", description: null, parent_id: null, type: "product", sort_order: 1, created_at: "" },
    { id: "2", name: "Tables", slug: "tables", description: null, parent_id: null, type: "product", sort_order: 2, created_at: "" },
    { id: "3", name: "Table Legs", slug: "table-legs", description: null, parent_id: null, type: "product", sort_order: 3, created_at: "" },
    { id: "4", name: "Seating", slug: "seating", description: null, parent_id: null, type: "product", sort_order: 4, created_at: "" },
  ];
  const sub: Category[] = [
    { id: "5", name: "Bar Stools", slug: "bar-stools", description: null, parent_id: "1", type: "product", sort_order: 1, created_at: "" },
    { id: "6", name: "Metal Chairs", slug: "metal-chairs", description: null, parent_id: "1", type: "product", sort_order: 2, created_at: "" },
    { id: "7", name: "Wooden Chair", slug: "wooden-chair", description: null, parent_id: "1", type: "product", sort_order: 3, created_at: "" },
    { id: "8", name: "Banquette Seating", slug: "banquette-seating", description: null, parent_id: "4", type: "seating", sort_order: 1, created_at: "" },
    { id: "9", name: "Bench Seating", slug: "bench-seating", description: null, parent_id: "4", type: "seating", sort_order: 2, created_at: "" },
    { id: "10", name: "Chesterfield Seating", slug: "chesterfield-seating", description: null, parent_id: "4", type: "seating", sort_order: 3, created_at: "" },
    { id: "11", name: "Back to Back Seating", slug: "back-to-back-seating", description: null, parent_id: "4", type: "seating", sort_order: 4, created_at: "" },
  ];
  return [...root, ...sub];
}

function getFallbackVenueTypes(): VenueType[] {
  return [
    { id: "v1", name: "Hospitality", slug: "hospitality", description: null, sort_order: 1, created_at: "" },
    { id: "v2", name: "Commercial", slug: "commercial", description: null, sort_order: 2, created_at: "" },
    { id: "v3", name: "Residential", slug: "residential", description: null, sort_order: 3, created_at: "" },
  ];
}

function getFallbackProducts(categorySlug?: string): Product[] {
  const list: Product[] = [
    { id: "p1", name: "Compact", slug: "compact", description: null, short_description: "Elegant compact table.", price: 429, image_url: null, gallery_urls: null, category_id: "2", subcategory_id: null, venue_type_ids: [], created_at: "", updated_at: "" },
    { id: "p2", name: "Fir Wood", slug: "fir-wood", description: null, short_description: "Solid fir wood table.", price: 429, image_url: null, gallery_urls: null, category_id: "2", subcategory_id: null, venue_type_ids: [], created_at: "", updated_at: "" },
    { id: "p3", name: "Glass", slug: "glass", description: null, short_description: "Glass top table.", price: 429, image_url: null, gallery_urls: null, category_id: "2", subcategory_id: null, venue_type_ids: [], created_at: "", updated_at: "" },
    { id: "p4", name: "Alegra", slug: "alegra", description: null, short_description: "Comfortable dining chair.", price: 399, image_url: null, gallery_urls: null, category_id: "1", subcategory_id: null, venue_type_ids: [], created_at: "", updated_at: "" },
    { id: "p5", name: "Argos", slug: "argos", description: null, short_description: "Modern chair design.", price: 429, image_url: null, gallery_urls: null, category_id: "1", subcategory_id: null, venue_type_ids: [], created_at: "", updated_at: "" },
  ];
  if (!categorySlug) return list;
  const catId = categorySlug === "chairs" ? "1" : categorySlug === "tables" ? "2" : null;
  if (!catId) return list;
  return list.filter((p) => p.category_id === catId);
}

function getFallbackProductBySlug(slug: string): Product | null {
  return getFallbackProducts().find((p) => p.slug === slug) ?? null;
}
