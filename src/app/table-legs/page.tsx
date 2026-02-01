import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "Table Legs | Quality Furniture Ltd",
  description: "Table legs and bases for commercial and residential furniture.",
};

export default async function TableLegsPage() {
  const products = await getProducts({ categorySlug: "table-legs" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Table Legs</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Quality table legs and bases to complete your furniture. Available in a range of styles and finishes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500">No table legs found. Add products in Supabase.</p>
      )}
    </div>
  );
}
