import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const seatingCopy: Record<string, { title: string; description: string }> = {
  "banquette-seating": {
    title: "Banquette Seating",
    description: "Banquette seating creates a cohesive and intimate ambiance for guests. Popular among restaurants, clubs, pubs, and cafes, it allows for consistent branding, colour schemes, and design elements that align with the overall aesthetic of your establishment.",
  },
  "bench-seating": {
    title: "Bench Seating",
    description: "Our bench seating option is perfect for creating a comfortable and relaxed setting in restaurants, shisha lounges, nightclubs, and hotel lobbies. Our in-house designer can provide a unique design that matches the theme of your venue.",
  },
  "chesterfield-seating": {
    title: "Chesterfield Seating",
    description: "Our Chesterfield seating option is perfect for creating a VIP section in your venue and providing further privacy for special occasions and events. Also suitable for bars and restaurants that want to match the design to their interests.",
  },
  "back-to-back-seating": {
    title: "Back to Back Seating",
    description: "Our back-to-back seating is a great solution for fitting more people comfortably into a limited space. Commonly used in restaurants, shisha lounges, cafes, nightclubs, and live music venues.",
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const copy = seatingCopy[slug];
  return {
    title: copy ? `${copy.title} | QFurniture` : "Seating | QFurniture",
  };
}

export default async function SeatingPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const copy = seatingCopy[slug];
  if (!category && !copy) notFound();
  const title = copy?.title ?? category?.name ?? slug;
  const description = copy?.description ?? category?.description ?? "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-primary">Seating</span>
        <span className="mx-2">/</span>
        <span className="text-primary">{title}</span>
      </nav>
      <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
      <p className="text-gray-700 leading-relaxed">{description}</p>
      <div className="mt-8">
        <Link href="/#contact" className="inline-block px-6 py-3 bg-gold text-primary rounded-lg hover:bg-gold-light font-medium transition-colors">
          Contact us for a quote
        </Link>
      </div>
    </div>
  );
}
