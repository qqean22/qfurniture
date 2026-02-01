import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qualityfurniture.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quality Furniture Ltd | Furniture Maker in Perivale, England",
  description:
    "Quality Furniture Ltd – furniture maker in Perivale, England. Made-to-measure contract furniture, restaurant booths, benches and seating for commercial, hospitality and residential clients.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Quality Furniture Ltd",
    title: "Quality Furniture Ltd | Furniture Maker in Perivale, England",
    description:
      "Quality Furniture Ltd – furniture maker in Perivale, England. Made-to-measure contract furniture, restaurant booths, benches and seating for commercial, hospitality and residential clients.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quality Furniture Ltd – Bespoke contract furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Furniture Ltd | Furniture Maker in Perivale, England",
    description:
      "Quality Furniture Ltd – furniture maker in Perivale, England. Made-to-measure contract furniture, restaurant booths, benches and seating for commercial, hospitality and residential clients.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
