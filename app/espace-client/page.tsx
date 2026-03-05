import type { Metadata } from "next";
import ClientSpacePanel from "../components/ClientSpacePanel";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Espace client taxi",
  description:
    "Espace client Taxi du Môle: retrouvez vos demandes de réservation, références et statut de paiement.",
  path: "/espace-client",
  keywords: ["espace client taxi", "suivi réservation taxi", "référence réservation taxi"],
});

export default function EspaceClientPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/espace-client",
    pageTitle: "Espace client taxi",
    pageDescription:
      "Suivi client des demandes de réservation Taxi du Môle avec référence et état du paiement.",
    serviceType: "Suivi réservation taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto max-w-7xl px-5 py-16">
          <h1 className="font-[var(--font-bebas)] text-6xl tracking-tight text-black sm:text-7xl">
            Espace client
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Vérifie l&apos;état de ta réservation, ton mode de paiement et tes informations de trajet.
          </p>
          <div className="mt-6">
            <ClientSpacePanel />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
