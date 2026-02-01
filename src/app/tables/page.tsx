import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "Tables | Quality Furniture Ltd",
  description: "Discover our range of stylish and functional tables for commercial and residential use.",
};

export default async function TablesPage() {
  const products = await getProducts({ categorySlug: "tables" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Tables</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Discover a range of stylish and functional tables for restaurants, cafes, and homes. From compact to large format, we offer designs to suit every space.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500">No tables found. Add products in Supabase.</p>
      )}
    </div>
  );
}
