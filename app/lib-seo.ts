import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const siteUrl = rawSiteUrl.replace(/\/$/, "");
export const siteName = "Taxi du Môle";
export const phone = process.env.NEXT_PUBLIC_TDM_PHONE || "+33680423031";
export const email = process.env.NEXT_PUBLIC_TDM_EMAIL || "contact@taxidumole.com";
export const city = process.env.NEXT_PUBLIC_TDM_CITY || "Bonneville";
export const postal = process.env.NEXT_PUBLIC_TDM_POSTAL || "74130";
export const address =
  process.env.NEXT_PUBLIC_TDM_ADDRESS || "Avenue de la Gare, 74130 Bonneville";

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

const staticOgByPath: Record<string, string> = {
  "/": "/og/home.svg",
  "/type-de-trajet": "/og/type-de-trajet.svg",
  "/ski-transfert": "/og/ski-transfert.svg",
  "/tarifs": "/og/tarifs.svg",
  "/reserver-en-ligne": "/og/reserver-en-ligne.svg",
  "/taxi-conventionne": "/og/taxi-conventionne.svg",
  "/transport-touristique": "/og/transport-touristique.svg",
  "/gares-ferroviaires": "/og/gares-ferroviaires.svg",
  "/station-de-ski": "/og/station-de-ski.svg",
  "/transport-touristique-haute-savoie": "/og/transport-touristique-haute-savoie.svg",
  "/transport-geneve": "/og/transport-geneve.svg",
  "/type-de-trajet/aeroport-gares": "/og/trajet-aeroport-gares.svg",
  "/type-de-trajet/hotel-loisirs": "/og/trajet-hotel-loisirs.svg",
  "/type-de-trajet/long-trajet": "/og/trajet-long-trajet.svg",
  "/type-de-trajet/stations-de-ski": "/og/trajet-stations-de-ski.svg",
  "/type-de-trajet/prive-entreprises-scolaire": "/og/trajet-prive-entreprises-scolaire.svg",
};

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const url = `${siteUrl}${input.path}`;
  const ogImagePath = staticOgByPath[input.path] || "/og/home.svg";
  const ogImageUrl = `${siteUrl}${ogImagePath}`;

  return {
    title: `${input.title} | ${siteName}`,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${input.title} | ${siteName}`,
      description: input.description,
      url,
      siteName,
      locale: "fr_FR",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${input.title} - ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteName}`,
      description: input.description,
      images: [ogImageUrl],
    },
  };
}

export function buildServiceJsonLd(input: {
  pagePath: string;
  pageTitle: string;
  pageDescription: string;
  serviceType: string;
}) {
  const url = `${siteUrl}${input.pagePath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: siteName,
        url: siteUrl,
        telephone: phone,
        email,
        areaServed: [
          { "@type": "AdministrativeArea", name: "Haute-Savoie" },
          { "@type": "AdministrativeArea", name: "Vallée de l'Arve" },
          { "@type": "City", name: "Genève" },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          postalCode: postal,
          addressLocality: city,
          addressCountry: "FR",
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: input.pageTitle,
        serviceType: input.serviceType,
        provider: { "@id": `${siteUrl}/#localbusiness` },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Haute-Savoie" },
          { "@type": "AdministrativeArea", name: "Vallée de l'Arve" },
          { "@type": "City", name: "Genève" },
        ],
        description: input.pageDescription,
        url,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: input.pageTitle,
        description: input.pageDescription,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName, url: siteUrl },
      },
    ],
  };
}
