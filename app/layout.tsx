import type { Metadata } from "next";
import RoadScrollBackground from "./components/RoadScrollBackground";
import TrustBadges from "./components/TrustBadges";
import "./globals.css";

const siteName = "Taxi du Môle";
const city = process.env.NEXT_PUBLIC_TDM_CITY || "Bonneville";
const postal = process.env.NEXT_PUBLIC_TDM_POSTAL || "74130";
const address = process.env.NEXT_PUBLIC_TDM_ADDRESS || "Avenue de la Gare, 74130 Bonneville";
const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Taxi à ${city} (${postal}) • Transferts 24/7 Haute-Savoie`,
    template: `%s — ${siteName}`,
  },
  description:
    `Taxi à ${city} (${postal}) : transferts 24/7 en Haute-Savoie (vallée de l’Arve, Annecy, Genève, stations de ski). ` +
    `Départ gare de ${city}. Réservation rapide.`,
  applicationName: siteName,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} — Taxi à ${city} (${postal})`,
    description:
      `Transferts premium 24/7 en Haute-Savoie. Départ gare de ${city}. Réservation immédiate.`,
    siteName,
    images: [
      {
        url: `${siteUrl}/og/home.svg`,
        width: 1200,
        height: 630,
        alt: "Taxi Du Mole - Accueil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Taxi à ${city} (${postal})`,
    description:
      `Transferts premium 24/7 en Haute-Savoie. Départ gare de ${city}. Réservation immédiate.`,
    images: [`${siteUrl}/og/home.svg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteName,
    url: siteUrl,
    telephone: phone,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Haute-Savoie" },
      { "@type": "City", name: city },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      postalCode: postal,
      addressLocality: city,
      addressCountry: "FR",
    },
  };

  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <RoadScrollBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TrustBadges />
        {children}
      </body>
    </html>
  );
}
