export const metadata = {
  title: "Accessories | Quality Furniture Ltd",
  description: "Furniture accessories and finishing touches.",
};

export default function AccessoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Accessories</h1>
      <p className="text-gray-600 mb-8">
        Discover our range of furniture accessories to complete your commercial or residential project.
      </p>
      <a href="/#contact" className="inline-block px-6 py-3 bg-gold text-primary rounded hover:bg-gold-light font-medium transition-colors">
        Contact us
      </a>
    </div>
  );
}
