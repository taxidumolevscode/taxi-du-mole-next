import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../../components/HeaderNav";
import SeoJsonLd from "../../components/SeoJsonLd";
import SiteFooter from "../../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_TRAJET_LONG_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Taxi long trajet Haute-Savoie",
  description:
    "Réservation taxi longue distance depuis Bonneville et vallée de l’Arve vers Genève, Savoie et destinations inter-régionales.",
  path: "/type-de-trajet/long-trajet",
  keywords: ["taxi long trajet", "taxi longue distance", "réserver taxi vallée arve"],
});

export default function LongTrajetPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/type-de-trajet/long-trajet",
    pageTitle: "Taxi long trajet Haute-Savoie",
    pageDescription:
      "Service taxi longue distance confortable et ponctuel pour déplacements privés et professionnels.",
    serviceType: "Taxi longue distance",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Long trajet</h1>
            <p className="mt-4 text-slate-600">
              Besoin d’un trajet inter-ville ou inter-région ? Taxi Du Môle propose un service
              longue distance confortable et sécurisé, avec une préparation adaptée à votre timing.
            </p>
            <p className="mt-3 text-slate-600">
              C’est la solution idéale pour déplacements professionnels, transferts familiaux,
              rendez-vous médicaux éloignés ou voyages privés sans contrainte logistique.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image long trajet</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Taxi long trajet" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
