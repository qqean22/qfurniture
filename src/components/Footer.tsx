import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-teal text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4"><span className="text-gold">Q</span>Furniture</h3>
            <p className="text-sm">
              British furniture designer and manufacturer of made-to-measure contract furniture. Stylish benches, chairs and tables for commercial, hospitality and residential clients.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/chairs" className="hover:text-gold transition-colors">Chairs</Link></li>
              <li><Link href="/tables" className="hover:text-gold transition-colors">Tables</Link></li>
              <li><Link href="/seating/bench-seating" className="hover:text-gold transition-colors">Seating</Link></li>
              <li><Link href="/projects" className="hover:text-gold transition-colors">Projects</Link></li>
              <li><Link href="/catalogs" className="hover:text-gold transition-colors">Catalogs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">Unit 4, Middlesex<br />Perivale, Greenford UB6 7JD</p>
            <p className="text-sm mt-2"><a href="tel:07599173535" className="hover:text-gold transition-colors">07599 173535</a></p>
            <p className="text-sm mt-1 text-white/80">Open · Mon-Thu 10am - 7 pm, Saturday/Sunday 9am - 6pm, 
Friday CLOSED</p>
            <p className="text-sm mt-1"><a href="mailto:info@qualityfurniture.co.uk" className="hover:text-gold transition-colors">info@qualityfurniture.co.uk</a></p>
            <p className="text-sm"><a href="mailto:support@qualityfurniture.co.uk" className="hover:text-gold transition-colors">support@qualityfurniture.co.uk</a></p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Trusted by Thousands</h4>
            <ul className="text-sm space-y-1">
              <li>Excellent Customer Support</li>
              <li>12 Months Warranty</li>
              <li>Exclusive Online Deals</li>
              <li>Worldwide Free Shipping</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Quality Furniture Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">Facebook</a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
