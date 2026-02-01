export const metadata = {
  title: "Catalogs | QFurniture",
  description: "Download our product catalogs and brochures.",
};

export default function CatalogsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Catalogs</h1>
      <p className="text-gray-600 mb-8">
        Download our latest product catalog to browse our full range of benches, chairs, tables, and seating solutions for commercial, hospitality, and residential use.
      </p>
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h2 className="font-semibold text-primary mb-2">2024 Catalogue</h2>
        <p className="text-sm text-gray-600 mb-4">Full product range and specifications.</p>
        <a href="#" className="inline-block px-4 py-2 bg-gold text-primary rounded-lg hover:bg-gold-light text-sm font-medium transition-colors">
          Download PDF
        </a>
      </div>
    </div>
  );
}
