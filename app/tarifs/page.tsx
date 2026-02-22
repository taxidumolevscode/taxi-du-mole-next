import type { Metadata } from "next";
import Estimator from "../components/Estimator";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tarifs taxi Haute-Savoie",
  description:
    "Tarifs Taxi Du Môle en Haute-Savoie: estimation distance et durée, tarif jour 2,44€/km et tarif nuit 3,66€/km.",
  path: "/tarifs",
  keywords: ["tarif taxi haute-savoie", "devis taxi bonneville", "prix taxi genève", "simulateur taxi"],
});

export default function TarifsPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/tarifs",
    pageTitle: "Tarifs taxi Haute-Savoie",
    pageDescription:
      "Page de devis et estimation prix taxi pour trajets vallée de l'Arve, Genève et stations de ski.",
    serviceType: "Devis et tarification taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto max-w-7xl px-5 py-16">
          <h1 className="font-[var(--font-bebas)] text-6xl tracking-tight text-black sm:text-7xl">Tarifs</h1>
          <p className="mt-3 max-w-4xl text-slate-600">
            Consultez un devis estimatif pour vos trajets en Haute-Savoie, vallée de l&apos;Arve,
            Genève et stations de ski. Le simulateur calcule la distance et la durée pour fournir
            une estimation claire avant réservation.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black text-black">Référence tarifaire</h2>
              <p className="mt-2 text-slate-600">Tarif jour: <strong>2,44€ / km</strong></p>
              <p className="mt-1 text-slate-600">Tarif nuit: <strong>3,66€ / km</strong></p>
              <p className="mt-2 text-sm text-slate-500">
                Le tarif final dépend du contexte de prise en charge, de l&apos;horaire, de la route
                réelle et du niveau de service demandé.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black text-black">Simulateur départ / destination</h2>
              <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <Estimator />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
