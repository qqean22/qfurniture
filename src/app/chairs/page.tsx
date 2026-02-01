import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "Chairs | QFurniture",
  description: "Chairs combine everyday comfort with elegant design. From cozy corners to stylish dining areas.",
};

export default async function ChairsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: "chairs" }),
  ]);
  const chairSubcats = categories.filter((c) => c.parent_id && categories.find((p) => p.id === c.parent_id)?.slug === "chairs");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-4">Chairs</h1>
      {chairSubcats.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          <span className="text-gray-600">Categories:</span>
          <Link href="/chairs" className="px-3 py-1 rounded bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors">
            All Chairs
          </Link>
          {chairSubcats.map((c) => (
            <Link key={c.id} href={`/chairs/${c.slug}`} className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
              {c.name}
            </Link>
          ))}
        </div>
      )}
      <p className="text-gray-600 mb-8 max-w-2xl">
        Chairs combine everyday comfort with elegant design, enhancing homes, offices, and lounges. From cozy corners to stylish dining areas, they create a welcoming atmosphere, blending functionality with aesthetic appeal. Perfect for any setting, they offer relaxation, versatility, and a touch of sophistication inside and out.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500">No chairs found. Add products in Supabase or connect your database.</p>
      )}
    </div>
  );
}
