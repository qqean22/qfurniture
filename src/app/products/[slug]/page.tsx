import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} | Quality Furniture Ltd` : "Product | Quality Furniture Ltd",
    description: product?.short_description ?? undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categoryName = product.category && typeof product.category === "object" ? (product.category as { name?: string }).name : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        {categoryName && (
          <>
            <span className="mx-2">/</span>
            <Link href={categoryName === "Chairs" ? "/chairs" : categoryName === "Tables" ? "/tables" : "/"} className="hover:text-gold transition-colors">{categoryName}</Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-primary">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-8xl text-gray-300 font-bold">{product.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
          {categoryName && (
            <Link href={categoryName === "Chairs" ? "/chairs" : categoryName === "Tables" ? "/tables" : "/"} className="text-teal hover:text-gold transition-colors text-sm">
              {categoryName}
            </Link>
          )}
          {product.price != null && (
            <p className="text-2xl font-semibold text-gold mt-4">£{Number(product.price).toFixed(2)}</p>
          )}
          {product.short_description && (
            <p className="text-gray-600 mt-4">{product.short_description}</p>
          )}
          {product.description && (
            <div className="mt-6 text-gray-700 prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          <div className="mt-8 flex gap-4">
            <a href="/#contact" className="inline-block px-6 py-3 bg-gold text-primary rounded-lg hover:bg-gold-light font-medium transition-colors">
              Enquire now
            </a>
            <Link href={categoryName === "Chairs" ? "/chairs" : categoryName === "Tables" ? "/tables" : "/"} className="inline-block px-6 py-3 border-2 border-teal text-teal rounded-lg hover:bg-teal hover:text-white font-medium transition-colors">
              Back to category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
