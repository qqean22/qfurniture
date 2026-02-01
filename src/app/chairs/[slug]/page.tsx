import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug && c.parent_id);
  return {
    title: cat ? `${cat.name} | QFurniture` : "Chairs | QFurniture",
  };
}

export default async function ChairsSubcategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: "chairs", subcategorySlug: slug }),
  ]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/chairs" className="hover:text-gold transition-colors">Chairs</Link>
        <span className="mx-2">/</span>
        <span className="text-primary">{cat.name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-primary mb-8">{cat.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {allProducts.length === 0 && (
        <p className="text-gray-500">No products in this category yet.</p>
      )}
    </div>
  );
}
