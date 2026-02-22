import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "../components/HeaderNav";
import SeoJsonLd from "../components/SeoJsonLd";
import SiteFooter from "../components/SiteFooter";
import { buildPageMetadata, buildServiceJsonLd } from "../lib-seo";

const image = process.env.NEXT_PUBLIC_TDM_GARES_IMAGE || "/logo-taxi-du-mole.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Transferts gares ferroviaires",
  description:
    "Taxi vers et depuis les gares d’Annecy, Genève, Bellegarde, Cluses et Annemasse avec prise en charge ponctuelle.",
  path: "/gares-ferroviaires",
  keywords: ["taxi gare annecy", "taxi gare geneve", "transfert gare bonneville"],
});

export default function GaresFerroviairesPage() {
  const jsonLd = buildServiceJsonLd({
    pagePath: "/gares-ferroviaires",
    pageTitle: "Transferts gares ferroviaires",
    pageDescription:
      "Service taxi pour gares régionales et transfrontalières depuis Bonneville et vallée de l’Arve.",
    serviceType: "Transfert gare en taxi",
  });

  return (
    <>
      <HeaderNav />
      <SeoJsonLd data={jsonLd} />
      <main className="bg-white text-slate-900">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Gares ferroviaires</h1>
            <p className="mt-4 text-slate-600">
              Taxi Du Môle prend en charge vos transferts depuis et vers les gares d’Annecy,
              Genève, Bellegarde, Cluses, Annemasse et les principales connexions ferroviaires
              de la région.
            </p>
            <p className="mt-3 text-slate-600">
              Nous adaptons les horaires aux arrivées et départs de trains pour garantir un
              enchaînement fluide de porte à porte.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Image gares</p>
            <div className="mt-3 flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
              <Image src={image} alt="Transfert gares ferroviaires" width={360} height={360} className="h-auto w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
